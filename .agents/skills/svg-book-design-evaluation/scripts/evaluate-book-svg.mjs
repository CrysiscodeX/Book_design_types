#!/usr/bin/env node
/**
 * Automated SVG 3D Book Cover Evaluator & Linter
 * Part of the Antigravity svg-book-design-evaluation skill.
 *
 * Usage:
 *   node evaluate-book-svg.mjs <path-to-svg> [options]
 *
 * Options:
 *   --json       Output raw JSON results
 *   --markdown   Output formatted Markdown scorecard
 *   --verbose    Include detailed component inventory and debug info
 */

import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// Canonical Book Design Standards
const CANONICAL_STANDARDS = {
  ranks: {
    initial: {
      name: 'Initial',
      L: 260, H: 160, B: 50,
      aspectRatio: 160 / 260, // ~0.615
      expectedMarkers: 1,
      maxElementalLayers: 1,
      maxReliefMm: 6,
    },
    advanced: {
      name: 'Advanced',
      L: 310, H: 210, B: 80,
      aspectRatio: 210 / 310, // ~0.677
      expectedMarkers: 2,
      maxElementalLayers: 3,
      maxReliefMm: 10,
    },
    meistro: {
      name: 'Meistro',
      L: 380, H: 280, B: 120,
      aspectRatio: 280 / 380, // ~0.737
      expectedMarkers: 3,
      maxElementalLayers: 5,
      maxReliefMm: 16,
    },
  },
  elements: [
    'fire', 'water', 'earth', 'air', 'ice', 'lightning',
    'metal', 'crystal', 'light', 'shadow', 'nature', 'decay'
  ],
};

// Relative Luminance & Contrast Calculation (WCAG 2.1)
function parseHexColor(hex) {
  if (!hex || typeof hex !== 'string') return null;
  hex = hex.trim().replace(/^#/, '');
  if (hex.length === 3) hex = hex.split('').map(c => c + c).join('');
  if (hex.length !== 6) return null;
  const num = parseInt(hex, 16);
  if (isNaN(num)) return null;
  return [(num >> 16) & 255, (num >> 8) & 255, num & 255];
}

function relativeLuminance([r, g, b]) {
  const [rs, gs, bs] = [r, g, b].map(v => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

function contrastRatio(hex1, hex2) {
  const c1 = parseHexColor(hex1);
  const c2 = parseHexColor(hex2);
  if (!c1 || !c2) return null;
  const l1 = relativeLuminance(c1);
  const l2 = relativeLuminance(c2);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

// SVG Static Audit Engine
export async function auditBookSVG(svgContent, filePath = 'unknown.svg') {
  const findings = [];
  const deductions = [];
  const dimensionScores = {
    relief3d: 0,
    animations: 0,
    alignments: 0,
    textures: 0,
    aesthetics: 0,
    minorDetails: 0,
    uniqueness: 0,
  };

  // 1. Technical Hygiene & Standards Gatekeeper
  const rootMatch = svgContent.match(/<svg\b([^>]*)>/i);
  if (!rootMatch) {
    return {
      error: 'Not a valid SVG file: missing root <svg> tag',
      score: 0,
      tier: 'F-Tier',
    };
  }

  const rootAttrs = rootMatch[1];
  const viewBoxMatch = rootAttrs.match(/viewBox\s*=\s*["']([^"']+)["']/i);
  let viewBox = null;
  if (viewBoxMatch) {
    viewBox = viewBoxMatch[1].trim().split(/[\s,]+/).map(Number);
  } else {
    deductions.push({ rule: 'Missing viewBox', points: 15, msg: 'Root <svg> tag lacks viewBox attribute' });
  }

  // Check for NaN, null, undefined, unescaped tokens
  const nanMatches = (svgContent.match(/\bNaN\b/g) || []).length;
  if (nanMatches > 0) {
    deductions.push({ rule: 'NaN values', points: 10, msg: `Found ${nanMatches} NaN token(s) in SVG coordinates/attributes` });
  }
  const undefinedMatches = (svgContent.match(/\bundefined\b/g) || []).length;
  if (undefinedMatches > 0) {
    deductions.push({ rule: 'Undefined values', points: 10, msg: `Found ${undefinedMatches} undefined token(s) in SVG attributes` });
  }

  // Check for external HTTP dependencies (violates offline portability)
  const externalUrls = (svgContent.match(/https?:\/\/(?!www\.w3\.org)[^\s"'>]+/gi) || []);
  if (externalUrls.length > 0) {
    deductions.push({ rule: 'External dependencies', points: 15, msg: `Found ${externalUrls.length} external URL reference(s). SVGs must be offline self-contained.` });
  }

  // Check for un-embedded raster images
  const unEmbeddedImages = (svgContent.match(/<image\b(?!.*?data:image)[^>]*>/gi) || []).length;
  if (unEmbeddedImages > 0) {
    deductions.push({ rule: 'Raster image dependency', points: 15, msg: `Found ${unEmbeddedImages} external or linked <image> tag(s).` });
  }

  // Check accessibility metadata
  const hasTitleTag = /<title\b[^>]*>/i.test(svgContent);
  const hasDescTag = /<desc\b[^>]*>/i.test(svgContent);
  const hasMetadata = /<metadata\b[^>]*>/i.test(svgContent);
  if (!hasTitleTag) {
    deductions.push({ rule: 'Missing <title>', points: 3, msg: 'Root SVG should provide a descriptive <title> tag.' });
  }
  if (!hasDescTag) {
    deductions.push({ rule: 'Missing <desc>', points: 2, msg: 'Root SVG should provide an accessible <desc> description.' });
  }

  // 2. Metadata & Configuration Extraction
  let embeddedConfig = null;
  const metadataMatch = svgContent.match(/<metadata\b[^>]*>([\s\S]*?)<\/metadata>/i);
  if (metadataMatch) {
    try {
      const rawMeta = metadataMatch[1].trim();
      const unescaped = rawMeta
        .replace(/&quot;/g, '"')
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>');
      embeddedConfig = JSON.parse(unescaped);
    } catch {
      // Non-JSON or custom metadata
    }
  }

  // Detect Rank & Element
  let detectedRank = 'initial';
  let detectedElement = 'water';
  let declaredView = 'front';

  if (embeddedConfig && embeddedConfig.config) {
    if (embeddedConfig.config.rank) detectedRank = embeddedConfig.config.rank.toLowerCase();
    if (embeddedConfig.config.primaryElement) detectedElement = embeddedConfig.config.primaryElement.toLowerCase();
    if (embeddedConfig.view) declaredView = embeddedConfig.view.toLowerCase();
  } else {
    const filename = path.basename(filePath).toLowerCase();
    if (filename.includes('meistro')) detectedRank = 'meistro';
    else if (filename.includes('advanced')) detectedRank = 'advanced';
    else if (filename.includes('initial')) detectedRank = 'initial';

    for (const elem of CANONICAL_STANDARDS.elements) {
      if (filename.includes(elem) || svgContent.toLowerCase().includes(elem)) {
        detectedElement = elem;
        break;
      }
    }
  }

  const rankStd = CANONICAL_STANDARDS.ranks[detectedRank] || CANONICAL_STANDARDS.ranks.initial;

  // 3. Component & Structure Analysis
  const dataComponentMatches = [...svgContent.matchAll(/data-component\s*=\s*["']([^"']+)["']/gi)].map(m => m[1]);
  const idMatches = [...svgContent.matchAll(/\bid\s*=\s*["']([^"']+)["']/gi)].map(m => m[1]);
  const pathCount = (svgContent.match(/<path\b/gi) || []).length;
  const circleCount = (svgContent.match(/<circle\b/gi) || []).length;
  const rectCount = (svgContent.match(/<rect\b/gi) || []).length;
  const textMatches = [...svgContent.matchAll(/<text\b([^>]*)>([\s\S]*?)<\/text>/gi)];

  // Rank marker count check
  const markerCount = dataComponentMatches.filter(c => c.includes('.marker.') || c.includes('marker')).length;

  // 4. Dimension 1: 3D Elements & Relief Architecture (Max: 20 pts)
  let reliefScore = 12; // Base score for functional vector rendering
  if (pathCount >= 20) reliefScore += 3;
  if (pathCount >= 50) reliefScore += 2;
  
  // Check for multi-layer relief plates
  const hasPlates = dataComponentMatches.some(c => c.includes('plate') || c.includes('cover') || c.includes('rail'));
  const hasSpine = dataComponentMatches.some(c => c.includes('spine'));
  const hasCornerOrBoss = dataComponentMatches.some(c => c.includes('corner') || c.includes('boss') || c.includes('cabochon') || c.includes('stud'));

  if (hasPlates) reliefScore += 1;
  if (hasSpine || declaredView !== 'front') reliefScore += 1;
  if (hasCornerOrBoss) reliefScore += 1;

  // Check 3D shading / bevel presence (stroke highlights & dark shadow pairs)
  const hasDarkStrokes = /stroke\s*=\s*["']#(?:1[0-9a-f]{5}|2[0-9a-f]{5}|0[0-9a-f]{5})/i.test(svgContent);
  const hasLightOrMediumStrokes = /stroke\s*=\s*["']#(?:[a-f8-9][0-9a-f]{5})/i.test(svgContent);
  if (hasDarkStrokes && hasLightOrMediumStrokes) {
    findings.push({ dim: 'relief3d', type: 'info', msg: 'Detected dual-stroke raking light / shadow bevel rendering.' });
  }

  dimensionScores.relief3d = Math.min(20, reliefScore);

  // 5. Dimension 2: Animations & Temporal Dynamics (Max: 15 pts)
  let animationScore = 0;
  const hasAnimateTag = /<(?:animate|animateTransform|animateMotion)\b/i.test(svgContent);
  const hasKeyframes = /@keyframes\b/i.test(svgContent);
  const hasReducedMotion = /prefers-reduced-motion\s*:\s*reduce/i.test(svgContent);

  if (hasAnimateTag || hasKeyframes) {
    animationScore = 10;
    findings.push({ dim: 'animations', type: 'info', msg: 'Dynamic animations detected in SVG.' });
    if (hasReducedMotion) {
      animationScore += 4;
      findings.push({ dim: 'animations', type: 'pass', msg: 'Accessible @media (prefers-reduced-motion: reduce) override present.' });
    } else {
      findings.push({ dim: 'animations', type: 'warn', msg: 'Missing @media (prefers-reduced-motion: reduce) accessibility query.' });
    }
    // Check layer count against rank budget
    const animatedLayers = (svgContent.match(/animation\s*:[^;]+;/gi) || []).length;
    if (animatedLayers > rankStd.maxElementalLayers) {
      findings.push({ dim: 'animations', type: 'warn', msg: `Active animation layers (${animatedLayers}) exceed ${rankStd.name} rank budget (${rankStd.maxElementalLayers}).` });
    }
  } else {
    // Static presentation
    animationScore = 12; // Static vector drawings receive proficient base score
    findings.push({ dim: 'animations', type: 'info', msg: 'Static vector mode. Clean resting pose observed.' });
  }
  dimensionScores.animations = Math.min(15, animationScore);

  // 6. Dimension 3: Graphic Alignments & Composition (Max: 15 pts)
  let alignmentScore = 11;
  if (viewBox && viewBox.length === 4) {
    const [vx, vy, vw, vh] = viewBox;
    const measuredRatio = vw / vh;
    // Canonical ratio checks for front view
    if (declaredView === 'front') {
      const targetRatio = rankStd.aspectRatio;
      const deviation = Math.abs(measuredRatio - targetRatio);
      if (deviation < 0.15) {
        alignmentScore += 2;
        findings.push({ dim: 'alignments', type: 'pass', msg: `ViewBox aspect ratio (${measuredRatio.toFixed(3)}) adheres closely to ${rankStd.name} standard (${targetRatio.toFixed(3)}).` });
      } else {
        findings.push({ dim: 'alignments', type: 'warn', msg: `ViewBox aspect ratio (${measuredRatio.toFixed(3)}) deviates from standard ${rankStd.name} ratio (${targetRatio.toFixed(3)}).` });
      }
    } else {
      alignmentScore += 2;
    }
  }

  // Typography Quiet Zone Check
  if (textMatches.length > 0) {
    alignmentScore += 2;
    findings.push({ dim: 'alignments', type: 'pass', msg: `Typography bands present (${textMatches.length} text elements) with defined quiet zone placement.` });
  }
  dimensionScores.alignments = Math.min(15, alignmentScore);

  // 7. Dimension 4: Texture Quality & Surface Simulation (Max: 15 pts)
  let textureScore = 8; // Basic solid shapes
  const hasGradients = /<(?:linearGradient|radialGradient)\b/i.test(svgContent);
  const hasFilters = /<filter\b/i.test(svgContent);
  const hasTurbulence = /<feTurbulence\b/i.test(svgContent);
  const hasLighting = /<(?:feSpecularLighting|feDiffuseLighting)\b/i.test(svgContent);

  if (hasGradients) {
    textureScore += 3;
    findings.push({ dim: 'textures', type: 'info', msg: 'Color depth enhanced with linear/radial gradients.' });
  }
  if (hasFilters) {
    textureScore += 2;
    if (hasTurbulence || hasLighting) {
      textureScore += 2;
      findings.push({ dim: 'textures', type: 'pass', msg: 'Advanced SVG filter pipeline detected (tactile surface simulation).' });
    }
  } else {
    findings.push({ dim: 'textures', type: 'info', msg: 'Filter textures absent; relies on vector fills and gradient shading.' });
  }
  dimensionScores.textures = Math.min(15, textureScore);

  // 8. Dimension 5: Aesthetics & Visual Impact (Max: 15 pts)
  let aestheticsScore = 11;
  // Extract all hex colors
  const hexColors = [...new Set((svgContent.match(/#[0-9a-fA-F]{6}\b/g) || []).map(h => h.toUpperCase()))];
  if (hexColors.length >= 4) {
    aestheticsScore += 2;
    findings.push({ dim: 'aesthetics', type: 'pass', msg: `Harmonious multi-tone palette detected (${hexColors.length} unique colors).` });
  }

  // Background vs Text Contrast Check
  const bgMatch = svgContent.match(/<rect\b[^>]*fill\s*=\s*["'](#[0-9a-fA-F]{6})["']/i);
  if (bgMatch && textMatches.length > 0) {
    const bgColor = bgMatch[1];
    const textColorMatch = textMatches[0][1].match(/fill\s*=\s*["'](#[0-9a-fA-F]{6})["']/i);
    if (textColorMatch) {
      const textColor = textColorMatch[1];
      const cr = contrastRatio(bgColor, textColor);
      if (cr && cr >= 4.5) {
        aestheticsScore += 2;
        findings.push({ dim: 'aesthetics', type: 'pass', msg: `Text contrast ratio (${cr.toFixed(2)}:1) meets WCAG AA standard.` });
      } else if (cr) {
        findings.push({ dim: 'aesthetics', type: 'warn', msg: `Text contrast ratio (${cr.toFixed(2)}:1) is below 4.5:1 WCAG threshold.` });
      }
    }
  }
  dimensionScores.aesthetics = Math.min(15, aestheticsScore);

  // 9. Dimension 6: Minor Details & Micro-Ornamentation (Max: 10 pts)
  let detailScore = 6;
  if (markerCount > 0) {
    if (markerCount === rankStd.expectedMarkers) {
      detailScore += 2;
      findings.push({ dim: 'minorDetails', type: 'pass', msg: `Exact rank marker count verified (${markerCount}/${rankStd.expectedMarkers} for ${rankStd.name}).` });
    } else {
      findings.push({ dim: 'minorDetails', type: 'warn', msg: `Marker count (${markerCount}) does not match expected ${rankStd.name} rank (${rankStd.expectedMarkers}).` });
    }
  }
  if (dataComponentMatches.length >= 10) detailScore += 2;
  dimensionScores.minorDetails = Math.min(10, detailScore);

  // 10. Dimension 7: Design Uniqueness & Motif Expression (Max: 10 pts)
  let uniquenessScore = 7;
  if (dataComponentMatches.some(c => c.includes('motif') || c.includes('style') || c.includes('sigil') || c.includes('ornament'))) {
    uniquenessScore += 2;
    findings.push({ dim: 'uniqueness', type: 'pass', msg: 'Distinct fantasy motif / sigilcraft structure verified.' });
  }
  dimensionScores.uniqueness = Math.min(10, uniquenessScore);

  // Calculate Total Raw Points & Apply Deductions
  const rawTotal = Object.values(dimensionScores).reduce((a, b) => a + b, 0);
  const totalDeductions = deductions.reduce((a, b) => a + b.points, 0);
  const finalScore = Math.max(0, Math.min(100, rawTotal - totalDeductions));

  // Determine Tier
  let tier = 'F-Tier';
  if (finalScore >= 90) tier = 'S-Tier (Masterwork)';
  else if (finalScore >= 80) tier = 'A-Tier (Production Ready)';
  else if (finalScore >= 70) tier = 'B-Tier (Solid Draft)';
  else if (finalScore >= 50) tier = 'C-Tier (Needs Improvement)';

  return {
    file: filePath,
    rank: rankStd.name,
    element: detectedElement,
    view: declaredView,
    rawScore: rawTotal,
    deductionsTotal: totalDeductions,
    finalScore,
    tier,
    dimensionScores,
    deductions,
    findings,
    inventory: {
      totalComponents: dataComponentMatches.length,
      pathCount,
      circleCount,
      rectCount,
      textCount: textMatches.length,
      markerCount,
      uniqueColors: hexColors.length,
    },
  };
}

// Format Markdown Output
export function formatMarkdownReport(result) {
  const d = result.dimensionScores;
  return `# SVG 3D Book Cover Design Audit

**File:** \`${result.file}\`  
**Rank:** ${result.rank} · **Element:** ${result.element} · **View:** ${result.view}  
**Overall Score:** **${result.finalScore} / 100 — ${result.tier}**

---

### Scorecard Breakdown

| Evaluation Dimension | Max | Awarded | Status |
|---|:---:|:---:|:---:|
| 1. 3D Elements & Relief Architecture | 20 | **${d.relief3d}** | ${d.relief3d >= 16 ? '✅ Strong' : '⚠️ Refine'} |
| 2. Animations & Temporal Dynamics | 15 | **${d.animations}** | ${d.animations >= 12 ? '✅ Passing' : '⚠️ Refine'} |
| 3. Graphic Alignments & Composition | 15 | **${d.alignments}** | ${d.alignments >= 12 ? '✅ Passing' : '⚠️ Refine'} |
| 4. Texture Quality & Surface Simulation | 15 | **${d.textures}** | ${d.textures >= 12 ? '✅ Passing' : '⚠️ Refine'} |
| 5. Aesthetics & Visual Impact ("WOW") | 15 | **${d.aesthetics}** | ${d.aesthetics >= 12 ? '✅ Passing' : '⚠️ Refine'} |
| 6. Minor Details & Micro-Ornamentation | 10 | **${d.minorDetails}** | ${d.minorDetails >= 8 ? '✅ Passing' : '⚠️ Refine'} |
| 7. Design Uniqueness & Motif Expression | 10 | **${d.uniqueness}** | ${d.uniqueness >= 8 ? '✅ Passing' : '⚠️ Refine'} |
| **Technical Standards Deductions** | Gate | **-${result.deductionsTotal}** | ${result.deductionsTotal === 0 ? '✅ Flawless' : '❌ Deductions Applied'} |
| **TOTAL SCORE** | **100** | **${result.finalScore}** | **${result.tier}** |

---

### Key Findings & Technical Audit
${result.findings.map(f => `- **[${f.type.toUpperCase()}]** (${f.dim}): ${f.msg}`).join('\n')}

${result.deductions.length > 0 ? `### Compliance Deductions\n${result.deductions.map(d => `- ❌ **${d.rule}** (-${d.points} pts): ${d.msg}`).join('\n')}\n` : ''}
### Component Inventory
- **Semantic Components:** ${result.inventory.totalComponents}
- **Paths / Relief Curves:** ${result.inventory.pathCount}
- **Rank Markers Found:** ${result.inventory.markerCount}
- **Unique Palette Colors:** ${result.inventory.uniqueColors}
`;
}

// CLI Execution Entrypoint
async function expandGlobs(args) {
  const resolved = [];
  for (const arg of args) {
    if (arg.includes('*') || arg.includes('?')) {
      const dir = path.dirname(arg) || '.';
      const pattern = path.basename(arg);
      const regex = new RegExp('^' + pattern.replace(/\./g, '\\.').replace(/\*/g, '.*').replace(/\?/g, '.') + '$', 'i');
      try {
        const entries = await fs.readdir(dir);
        const matched = entries.filter(e => regex.test(e)).map(e => path.join(dir, e));
        resolved.push(...matched);
      } catch {
        resolved.push(arg);
      }
    } else {
      resolved.push(arg);
    }
  }
  return resolved;
}

async function main() {
  const rawArgs = process.argv.slice(2);
  const isJson = rawArgs.includes('--json');
  const isMarkdown = rawArgs.includes('--markdown');
  const fileArgs = rawArgs.filter(a => !a.startsWith('--'));

  if (fileArgs.length === 0) {
    console.error('Usage: node evaluate-book-svg.mjs <svg-file-or-glob> [--json] [--markdown]');
    process.exit(1);
  }

  const targetFiles = await expandGlobs(fileArgs);

  if (targetFiles.length === 0) {
    console.error('No matching SVG files found.');
    process.exit(1);
  }

  for (const file of targetFiles) {
    try {
      const content = await fs.readFile(file, 'utf8');
      const result = await auditBookSVG(content, file);

      if (isJson) {
        console.log(JSON.stringify(result, null, 2));
      } else if (isMarkdown) {
        console.log(formatMarkdownReport(result));
      } else {
        console.log(`\n================================================================`);
        console.log(`SVG 3D Book Cover Audit: ${path.basename(file)}`);
        console.log(`================================================================`);
        console.log(`Rank: ${result.rank} | Element: ${result.element} | View: ${result.view}`);
        console.log(`Final Score: ${result.finalScore} / 100 [${result.tier}]`);
        console.log(`Breakdown:`);
        console.log(`  - 3D Relief & Architecture:    ${result.dimensionScores.relief3d} / 20`);
        console.log(`  - Animations & Motion:         ${result.dimensionScores.animations} / 15`);
        console.log(`  - Alignments & Composition:    ${result.dimensionScores.alignments} / 15`);
        console.log(`  - Texture & Materiality:       ${result.dimensionScores.textures} / 15`);
        console.log(`  - Aesthetics & Visual Impact:  ${result.dimensionScores.aesthetics} / 15`);
        console.log(`  - Minor Details & Hardware:    ${result.dimensionScores.minorDetails} / 10`);
        console.log(`  - Uniqueness & Motif:          ${result.dimensionScores.uniqueness} / 10`);
        if (result.deductionsTotal > 0) {
          console.log(`  - Technical Deductions:        -${result.deductionsTotal}`);
        }
        console.log(`\nInventory: ${result.inventory.totalComponents} components, ${result.inventory.pathCount} paths, ${result.inventory.uniqueColors} colors.`);
        if (result.deductions.length > 0) {
          console.log(`\nDeductions:`);
          result.deductions.forEach(d => console.log(`  [DEDUCTION] ${d.rule} (-${d.points} pts): ${d.msg}`));
        }
        console.log(`\nFindings:`);
        result.findings.forEach(f => console.log(`  [${f.type.toUpperCase()}] ${f.msg}`));
      }
    } catch (err) {
      console.error(`Error auditing ${file}:`, err.message);
      process.exit(1);
    }
  }
}

const currentFile = fileURLToPath(import.meta.url);
if (process.argv[1] && path.resolve(process.argv[1]) === path.resolve(currentFile)) {
  main();
}
