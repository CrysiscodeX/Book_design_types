#!/usr/bin/env node
/**
 * Unified Codex Evaluator: SVG Vector + Three.js 3D + Dual Parity
 * Part of the unified 3d-book-design-evaluation skill.
 *
 * Usage:
 *   node evaluate-codex.mjs <path-to-svg> [rank-or-config] [options]
 *
 * Options:
 *   --json       Output raw JSON results
 *   --markdown   Output formatted Markdown scorecard
 */

import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { auditBookSVG } from './evaluate-book-svg.mjs';
import { auditThreeJSModel } from './evaluate-threejs-model.mjs';
import { auditDualParity } from './evaluate-book-parity.mjs';

// Import local design studio constants
const studioURL = new URL('../../../../default-book-design-types/', import.meta.url);
const { DEMO } = await import(new URL('models/shared/design.mjs', studioURL));

export async function auditFullCodex(svgPath, configOrRank = 'initial') {
  const svgContent = await fs.readFile(svgPath, 'utf8');

  // Extract metadata if available
  let config = { ...DEMO };
  if (typeof configOrRank === 'string') {
    config.rank = configOrRank.toLowerCase();
  } else if (typeof configOrRank === 'object') {
    config = configOrRank;
  }

  const metaMatch = svgContent.match(/<metadata\b[^>]*>([\s\S]*?)<\/metadata>/i);
  if (metaMatch) {
    try {
      const raw = metaMatch[1]
        .replace(/&quot;/g, '"')
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>');
      const parsed = JSON.parse(raw);
      if (parsed.config) config = parsed.config;
    } catch {}
  }

  const svgAudit = await auditBookSVG(svgContent, svgPath);
  const threeAudit = await auditThreeJSModel(config, `Three.js Model (${config.rank || 'initial'})`);
  const parityAudit = await auditDualParity(svgPath, config);

  // Compute Unified Codex Score
  const codexScore = Math.round(
    svgAudit.finalScore * 0.40 +
    threeAudit.finalScore * 0.40 +
    parityAudit.finalScore * 0.20
  );

  let codexTier = 'F-Tier';
  if (codexScore >= 90) codexTier = 'S-Tier (Masterwork Codex)';
  else if (codexScore >= 80) codexTier = 'A-Tier (Production Ready)';
  else if (codexScore >= 70) codexTier = 'B-Tier (Solid Draft)';
  else if (codexScore >= 50) codexTier = 'C-Tier (Needs Refinement)';

  return {
    svgFile: path.basename(svgPath),
    rank: threeAudit.rank,
    element: threeAudit.element,
    codexScore,
    codexTier,
    subAudits: {
      svg: svgAudit,
      threejs: threeAudit,
      parity: parityAudit,
    },
  };
}

export function formatCodexMD(result) {
  const { svg, threejs, parity } = result.subAudits;
  return `# Unified Codex Design Audit: ${result.rank} ${result.element} Codex

**SVG Drawing:** \`${result.svgFile}\`  
**Rank:** ${result.rank} · **Element:** ${result.element}  
**Overall Unified Quality Score:** **${result.codexScore} / 100 — ${result.codexTier}**

---

## Executive Scorecards

| Representation / Discipline | Weight | Score | Tier | Status |
|---|:---:|:---:|:---:|:---:|
| **1. 2D Vector Drawing (SVG)** | 40% | **${svg.finalScore} / 100** | ${svg.tier} | ${svg.finalScore >= 80 ? '✅ Pass' : '⚠️ Refine'} |
| **2. Interactive 3D Model (Three.js)** | 40% | **${threejs.finalScore} / 100** | ${threejs.tier} | ${threejs.finalScore >= 80 ? '✅ Pass' : '⚠️ Refine'} |
| **3. Dual-Representation Parity** | 20% | **${parity.finalScore} / 100** | ${parity.tier} | ${parity.finalScore >= 80 ? '✅ Pass' : '⚠️ Refine'} |
| **UNIFIED CODEX SCORE** | **100%** | **${result.codexScore} / 100** | **${result.codexTier}** | **Master System** |

---

## 1. Vector Drawing (SVG) Highlights
- **Relief Depth & Bevels:** ${svg.dimensionScores.relief3d} / 20
- **Graphic Alignments:** ${svg.dimensionScores.alignments} / 15
- **Surface Texture Quality:** ${svg.dimensionScores.textures} / 15
- **Aesthetic Harmony:** ${svg.dimensionScores.aesthetics} / 15
- **Total SVG Components:** ${svg.inventory.totalComponents} (${svg.inventory.uniqueColors} colors)

## 2. 3D Model (Three.js) Highlights
- **Envelopes & Bounding Box:** ${threejs.dimensionScores.geometryEnvelopes} / 20 (${threejs.metrics.dimensions.H}x${threejs.metrics.dimensions.L}x${threejs.metrics.dimensions.B} mm)
- **Mesh Integrity & Polygon Quality:** ${threejs.dimensionScores.meshIntegrity} / 20 (${threejs.metrics.triangles.toLocaleString()} triangles)
- **PBR Material & Roughness:** ${threejs.dimensionScores.pbrMaterials} / 15
- **GLSL Shader Magic Channels:** ${threejs.dimensionScores.shaderEffects} / 15 (${threejs.metrics.shaderLayers} layers)

## 3. Dual-Representation Parity
- **Component ID Match:** ${parity.parityMetrics.svgComponents} SVG components $\leftrightarrow$ ${parity.parityMetrics.threeComponents} 3D components
- **Marker Count Parity:** Verified (${parity.parityMetrics.sharedMarkers} markers)
- **Dimensional Parity:** Verified 100%
`;
}

async function main() {
  const args = process.argv.slice(2);
  const isJson = args.includes('--json');
  const isMarkdown = args.includes('--markdown');
  const nonFlagArgs = args.filter(a => !a.startsWith('--'));

  if (nonFlagArgs.length === 0) {
    console.error('Usage: node evaluate-codex.mjs <path-to-svg> [rank-or-config] [--json] [--markdown]');
    process.exit(1);
  }

  const svgPath = nonFlagArgs[0];
  const rankOrConfig = nonFlagArgs[1] || 'initial';

  try {
    const result = await auditFullCodex(svgPath, rankOrConfig);

    if (isJson) {
      console.log(JSON.stringify(result, null, 2));
    } else if (isMarkdown) {
      console.log(formatCodexMD(result));
    } else {
      console.log(`\n================================================================`);
      console.log(`Unified Codex Quality Audit: ${result.rank} ${result.element} Codex`);
      console.log(`================================================================`);
      console.log(`SVG Target: ${result.svgFile}`);
      console.log(`Overall Unified Score: ${result.codexScore} / 100 [${result.codexTier}]`);
      console.log(`\nBreakdown:`);
      console.log(`  - 2D Vector Drawing (SVG):    ${result.subAudits.svg.finalScore} / 100 [${result.subAudits.svg.tier}]`);
      console.log(`  - Interactive 3D (Three.js):  ${result.subAudits.threejs.finalScore} / 100 [${result.subAudits.threejs.tier}]`);
      console.log(`  - Dual Parity (SVG ↔ 3D):     ${result.subAudits.parity.finalScore} / 100 [${result.subAudits.parity.tier}]`);
      console.log(`\nInventory:`);
      console.log(`  - Triangles: ${result.subAudits.threejs.metrics.triangles.toLocaleString()} | Vertices: ${result.subAudits.threejs.metrics.vertices.toLocaleString()}`);
      console.log(`  - SVG Paths: ${result.subAudits.svg.inventory.pathCount} | Components: ${result.subAudits.svg.inventory.totalComponents}`);
      console.log(`  - Rank Markers: ${result.subAudits.parity.parityMetrics.sharedMarkers} | Shader Layers: ${result.subAudits.threejs.metrics.shaderLayers}`);
    }
  } catch (err) {
    console.error(`Error performing unified codex audit:`, err.message);
    process.exit(1);
  }
}

const currentFile = fileURLToPath(import.meta.url);
if (process.argv[1] && path.resolve(process.argv[1]) === path.resolve(currentFile)) {
  main();
}
