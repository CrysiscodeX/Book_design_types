#!/usr/bin/env node
import {resourceURL} from '../../../../shared/Part_2-Connectors/resources.mjs';
/**
 * Automated Dual-Representation Parity Evaluator: SVG vs Three.js
 * Part of the unified 3d-book-design-evaluation skill.
 *
 * Usage:
 *   node evaluate-book-parity.mjs <path-to-svg> [path-to-config-or-rank] [options]
 *
 * Options:
 *   --json       Output raw JSON results
 *   --markdown   Output formatted Markdown scorecard
 */

import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// Import local Three.js and design studio modules
const studioURL = resourceURL('../../../../default-book-design-types/', import.meta.url);
const THREE = await import(resourceURL('node_modules/three/build/three.module.js', studioURL));
const { CATALOG, DEMO, DEFAULTS, buildDesign } = await import(resourceURL('models/shared/design.mjs', studioURL));
const { buildModel } = await import(resourceURL('models/threejs/geometry.mjs', studioURL));

export async function auditDualParity(svgPath, configOrRank = 'initial') {
  const svgContent = await fs.readFile(svgPath, 'utf8');
  const findings = [];
  const deductions = [];
  let parityScore = 100;

  // 1. Extract SVG Component IDs and Metadata
  const svgComponentIds = new Set(
    [...svgContent.matchAll(/data-component\s*=\s*["']([^"']+)["']/gi)].map(m => m[1])
  );

  let svgMeta = null;
  const metaMatch = svgContent.match(/<metadata\b[^>]*>([\s\S]*?)<\/metadata>/i);
  if (metaMatch) {
    try {
      const raw = metaMatch[1]
        .replace(/&quot;/g, '"')
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>');
      svgMeta = JSON.parse(raw);
    } catch {}
  }

  // Determine Rank and Build Three.js Model
  let rankId = typeof configOrRank === 'string' ? configOrRank.toLowerCase() : 'initial';
  let config = { ...DEMO, rank: rankId };

  if (typeof configOrRank === 'object') {
    config = configOrRank;
    rankId = config.rank || 'initial';
  } else if (svgMeta && svgMeta.config) {
    config = svgMeta.config;
    rankId = config.rank || rankId;
  }

  const model = buildModel(config);

  try {
    const design = model.design;
    const threeComponentIds = new Set();
    for (const c of design.components) {
      threeComponentIds.add(c.id);
    }

    // 2. Component ID Parity Audit
    // Note: in front SVG view, rear-only plates and line3 spine wires are intentionally culled
    const declaredView = svgMeta?.view || 'front';
    const missingInSvg = [];
    const missingInThree = [];

    for (const c of design.components) {
      if (declaredView === 'front') {
        if (c.parent === 'rear' || c.type === 'line3' || c.id === 'body.spine') continue;
      }
      if (!svgComponentIds.has(c.id)) {
        missingInSvg.push(c.id);
      }
    }

    for (const id of svgComponentIds) {
      if (!threeComponentIds.has(id) && !id.includes('effect')) {
        missingInThree.push(id);
      }
    }

    if (missingInSvg.length === 0) {
      findings.push({ dim: 'components', type: 'pass', msg: `All physical 3D components match in SVG (${svgComponentIds.size} visible components).` });
    } else {
      parityScore -= Math.min(30, missingInSvg.length * 5);
      deductions.push({
        rule: 'Components missing in SVG',
        points: missingInSvg.length * 5,
        msg: `Found ${missingInSvg.length} 3D components missing from SVG: ${missingInSvg.slice(0, 5).join(', ')}${missingInSvg.length > 5 ? '...' : ''}`,
      });
    }

    if (missingInThree.length === 0) {
      findings.push({ dim: 'components', type: 'pass', msg: 'Zero orphaned SVG elements; all map to 3D solid assembly.' });
    } else {
      parityScore -= Math.min(20, missingInThree.length * 5);
      deductions.push({
        rule: 'Orphaned SVG elements',
        points: missingInThree.length * 5,
        msg: `Found ${missingInThree.length} SVG components absent from Three.js: ${missingInThree.slice(0, 5).join(', ')}`,
      });
    }

    // 3. Dimensional Envelope Parity Audit
    if (svgMeta && svgMeta.dimensions) {
      const { H: sH, L: sL, B: sB } = svgMeta.dimensions;
      const { H: mH, L: mL, B: mB } = design.dimensions;
      if (sH === mH && sL === mL && sB === mB) {
        findings.push({ dim: 'dimensions', type: 'pass', msg: `Dimension parity verified: ${sH}x${sL}x${sB} mm match identically.` });
      } else {
        parityScore -= 20;
        deductions.push({
          rule: 'Dimension mismatch',
          points: 20,
          msg: `SVG dimensions (${sH}x${sL}x${sB}) do not match Three.js (${mH}x${mL}x${mB}).`,
        });
      }
    } else {
      findings.push({ dim: 'dimensions', type: 'info', msg: 'SVG lacks explicit metadata dimensions block; nominal rank dimensions used.' });
    }

    // 4. Rank Marker Parity Audit
    const svgMarkers = [...svgComponentIds].filter(id => id.includes('.marker.')).length;
    const threeMarkers = [...threeComponentIds].filter(id => id.includes('.marker.')).length;
    if (svgMarkers === threeMarkers) {
      findings.push({ dim: 'markers', type: 'pass', msg: `Rank marker parity verified (${svgMarkers} markers in both).` });
    } else {
      parityScore -= 15;
      deductions.push({
        rule: 'Marker count mismatch',
        points: 15,
        msg: `SVG has ${svgMarkers} markers while Three.js has ${threeMarkers}.`,
      });
    }

    // 5. Palette Mapping Parity
    const svgColors = [...new Set((svgContent.match(/#[0-9a-fA-F]{6}\b/g) || []).map(c => c.toUpperCase()))];
    const designColors = Object.values(design.palette).map(c => c.toUpperCase());
    const matchedColors = designColors.filter(c => svgColors.includes(c));
    if (matchedColors.length >= 3) {
      findings.push({ dim: 'palette', type: 'pass', msg: `Elemental palette parity verified: ${matchedColors.length} core tones shared.` });
    } else {
      findings.push({ dim: 'palette', type: 'warn', msg: `Low palette overlap between SVG and Three.js definitions.` });
    }

    const finalScore = Math.max(0, Math.min(100, parityScore));
    let tier = 'F-Tier';
    if (finalScore >= 95) tier = 'S-Tier (Flawless Parity)';
    else if (finalScore >= 85) tier = 'A-Tier (Strong Parity)';
    else if (finalScore >= 70) tier = 'B-Tier (Acceptable Parity)';
    else tier = 'C-Tier (Desynchronized)';

    return {
      svgFile: path.basename(svgPath),
      rank: design.rank.name,
      element: design.element.name,
      view: declaredView,
      finalScore,
      tier,
      deductions,
      findings,
      parityMetrics: {
        svgComponents: svgComponentIds.size,
        threeComponents: threeComponentIds.size,
        sharedMarkers: svgMarkers,
        dimensions: design.dimensions,
      },
    };
  } finally {
    model.dispose();
  }
}

// Format Markdown Output
export function formatParityMD(result) {
  return `# Dual-Representation Parity Audit: SVG ↔ Three.js

**SVG Target:** \`${result.svgFile}\`  
**Rank:** ${result.rank} · **Element:** ${result.element} · **View:** ${result.view}  
**Parity Score:** **${result.finalScore} / 100 — ${result.tier}**

---

### Parity Metrics Inventory
- **SVG Components:** ${result.parityMetrics.svgComponents}
- **Three.js Components:** ${result.parityMetrics.threeComponents}
- **Rank Markers:** ${result.parityMetrics.sharedMarkers}
- **Shared Dimensions:** ${result.parityMetrics.dimensions.H} × ${result.parityMetrics.dimensions.L} × ${result.parityMetrics.dimensions.B} mm

---

### Audit Findings
${result.findings.map(f => `- **[${f.type.toUpperCase()}]** (${f.dim}): ${f.msg}`).join('\n')}

${result.deductions.length > 0 ? `### Parity Deductions\n${result.deductions.map(d => `- ❌ **${d.rule}** (-${d.points} pts): ${d.msg}`).join('\n')}\n` : ''}
`;
}

// CLI Execution Entrypoint
async function main() {
  const args = process.argv.slice(2);
  const isJson = args.includes('--json');
  const isMarkdown = args.includes('--markdown');
  const nonFlagArgs = args.filter(a => !a.startsWith('--'));

  if (nonFlagArgs.length === 0) {
    console.error('Usage: node evaluate-book-parity.mjs <path-to-svg> [rank-or-config] [--json] [--markdown]');
    process.exit(1);
  }

  const svgPath = nonFlagArgs[0];
  const rankOrConfig = nonFlagArgs[1] || 'initial';

  try {
    const result = await auditDualParity(svgPath, rankOrConfig);

    if (isJson) {
      console.log(JSON.stringify(result, null, 2));
    } else if (isMarkdown) {
      console.log(formatParityMD(result));
    } else {
      console.log(`\n================================================================`);
      console.log(`Dual-Representation Parity Audit: ${result.svgFile} ↔ Three.js`);
      console.log(`================================================================`);
      console.log(`Rank: ${result.rank} | Element: ${result.element} | View: ${result.view}`);
      console.log(`Parity Score: ${result.finalScore} / 100 [${result.tier}]`);
      console.log(`\nFindings:`);
      result.findings.forEach(f => console.log(`  [${f.type.toUpperCase()}] ${f.msg}`));
      if (result.deductions.length > 0) {
        console.log(`\nDeductions:`);
        result.deductions.forEach(d => console.log(`  [DEDUCTION] ${d.rule} (-${d.points} pts): ${d.msg}`));
      }
    }
  } catch (err) {
    console.error(`Error performing parity audit:`, err.message);
    process.exit(1);
  }
}

const currentFile = fileURLToPath(import.meta.url);
if (process.argv[1] && path.resolve(process.argv[1]) === path.resolve(currentFile)) {
  main();
}
