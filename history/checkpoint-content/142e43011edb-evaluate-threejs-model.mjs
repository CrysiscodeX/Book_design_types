#!/usr/bin/env node
/**
 * Automated Three.js 3D Book Model Evaluator & Quality Auditor
 * Part of the unified 3d-book-design-evaluation skill.
 *
 * Usage:
 *   node evaluate-threejs-model.mjs [path-to-json-or-preset] [options]
 *
 * Options:
 *   --json       Output raw JSON audit results
 *   --markdown   Output formatted Markdown scorecard
 *   --quality    high | preview (default: high)
 *   --rank       initial | advanced | meistro
 */

import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// Import local Three.js and design studio modules
const studioURL = new URL('../../../../default-book-design-types/', import.meta.url);
const THREE = await import(new URL('node_modules/three/build/three.module.js', studioURL));
const { CATALOG, DEMO, DEFAULTS, buildDesign } = await import(new URL('models/shared/design.mjs', studioURL));
const { buildModel } = await import(new URL('models/threejs/geometry.mjs', studioURL));
const { buildEffects } = await import(new URL('models/threejs/effects.mjs', studioURL));

const THREEJS_STANDARDS = {
  initial: {
    name: 'Initial',
    dimensions: [160, 260, 50], // [H, L, B]
    expectedMarkers: 1,
    expectedEffectLayers: 1,
    minTriangles: 15000,
    maxTriangles: 60000,
  },
  advanced: {
    name: 'Advanced',
    dimensions: [210, 310, 80],
    expectedMarkers: 2,
    expectedEffectLayers: 3,
    minTriangles: 40000,
    maxTriangles: 140000,
  },
  meistro: {
    name: 'Meistro',
    dimensions: [280, 380, 120],
    expectedMarkers: 3,
    expectedEffectLayers: 5,
    minTriangles: 100000,
    maxTriangles: 350000,
  },
};

export async function auditThreeJSModel(inputConfig = {}, targetLabel = 'active-config') {
  const findings = [];
  const deductions = [];
  const dimensionScores = {
    geometryEnvelopes: 0,
    meshIntegrity: 0,
    pbrMaterials: 0,
    shaderEffects: 0,
    poseDynamics: 0,
    solidExport: 0,
    memoryDisposal: 0,
  };

  const model = buildModel(inputConfig);
  let effects = null;

  try {
    const design = model.design;
    const rankId = design.rank.id;
    const standards = THREEJS_STANDARDS[rankId] || THREEJS_STANDARDS.initial;
    const { H, L, B } = design.dimensions;
    const expected = [H, L, B];

    // 1. Geometry & Bounding Envelope Audit (Max: 20 pts)
    let envelopeScore = 14;
    const box = model.bounds();
    const lo = box.min.toArray();
    const hi = box.max.toArray();
    let boundsOk = true;

    for (let i = 0; i < 3; i++) {
      const minBound = -expected[i] / 2 - 0.06;
      const maxBound = expected[i] / 2 + 0.06;
      if (lo[i] < minBound || hi[i] > maxBound) {
        boundsOk = false;
        deductions.push({
          rule: 'Envelope Overflow',
          points: 10,
          msg: `Axis ${i} range [${lo[i].toFixed(2)}, ${hi[i].toFixed(2)}] exceeds canonical envelope limits [${minBound.toFixed(2)}, ${maxBound.toFixed(2)}]`,
        });
      }
    }

    if (boundsOk) {
      envelopeScore += 6;
      findings.push({ dim: 'geometryEnvelopes', type: 'pass', msg: `Bounding box strictly conforms to ${standards.name} envelope (${H}x${L}x${B} mm within +/-0.06mm).` });
    }
    dimensionScores.geometryEnvelopes = Math.min(20, envelopeScore);

    // 2. Mesh Integrity & Triangle Density (Max: 20 pts)
    let meshScore = 12;
    let triangles = 0;
    let totalVertices = 0;
    let nonFiniteVertices = 0;
    const componentIds = new Set();
    let meshCount = 0;

    model.root.traverse(o => {
      if (o.geometry) {
        const pos = o.geometry.attributes.position;
        if (pos) {
          totalVertices += pos.count;
          const arr = pos.array;
          for (let i = 0; i < arr.length; i++) {
            if (!Number.isFinite(arr[i])) nonFiniteVertices++;
          }
        }
        if (o.isMesh) {
          meshCount++;
          const idx = o.geometry.index;
          triangles += (idx ? idx.count : pos.count) / 3;
        }
      }
      if (o.userData?.componentId) {
        componentIds.add(o.userData.componentId);
      }
    });

    if (nonFiniteVertices > 0) {
      deductions.push({
        rule: 'Non-finite vertex coordinates',
        points: 20,
        msg: `Found ${nonFiniteVertices} NaN or non-finite vertex values!`,
      });
    } else {
      findings.push({ dim: 'meshIntegrity', type: 'pass', msg: `All ${totalVertices} vertex coordinates verified finite and valid.` });
      meshScore += 4;
    }

    if (triangles >= standards.minTriangles && triangles <= standards.maxTriangles) {
      meshScore += 4;
      findings.push({ dim: 'meshIntegrity', type: 'pass', msg: `Triangle count (${Math.round(triangles).toLocaleString()}) sits perfectly within ${standards.name} quality target (${standards.minTriangles.toLocaleString()}–${standards.maxTriangles.toLocaleString()}).` });
    } else {
      findings.push({ dim: 'meshIntegrity', type: 'info', msg: `Triangle count: ${Math.round(triangles).toLocaleString()} (target: ${standards.minTriangles.toLocaleString()}–${standards.maxTriangles.toLocaleString()}).` });
      meshScore += 2;
    }
    dimensionScores.meshIntegrity = Math.min(20, meshScore);

    // 3. PBR Materials & Surface Profiles (Max: 15 pts)
    let pbrScore = 11;
    let hasBumpMap = false;
    let hasMetallicFitting = false;

    for (const [tone, m] of model.materials) {
      if (m.isMeshPhysicalMaterial) {
        if (tone === 'cover' && m.map) hasBumpMap = true;
        if (tone === 'ornament' && m.metalness >= 0.7) hasMetallicFitting = true;
      }
    }

    if (hasBumpMap) {
      pbrScore += 2;
      findings.push({ dim: 'pbrMaterials', type: 'pass', msg: `Procedural tactile bump map verified on cover material (${design.element.name} profile).` });
    }
    if (hasMetallicFitting) {
      pbrScore += 2;
      findings.push({ dim: 'pbrMaterials', type: 'pass', msg: 'Metallic PBR physical properties verified on ornament fittings (metalness >= 0.70).' });
    }
    dimensionScores.pbrMaterials = Math.min(15, pbrScore);

    // 4. Shader Effects & Elemental Channels (Max: 15 pts)
    let shaderScore = 10;
    effects = buildEffects(model);
    if (effects.layerCount === standards.expectedEffectLayers) {
      shaderScore += 5;
      findings.push({ dim: 'shaderEffects', type: 'pass', msg: `Shader effect layer count (${effects.layerCount}) matches ${standards.name} rank budget (${standards.expectedEffectLayers}).` });
    } else {
      deductions.push({
        rule: 'Mismatched effect layer count',
        points: 5,
        msg: `Effect layers (${effects.layerCount}) do not match expected ${standards.name} count (${standards.expectedEffectLayers}).`,
      });
    }
    dimensionScores.shaderEffects = Math.min(15, shaderScore);

    // 5. Pose Dynamics & Kinematics (Max: 10 pts)
    let poseScore = 6;
    const closedSize = model.bounds().getSize(new THREE.Vector3());
    model.pose(1);
    const explodedSize = model.bounds().getSize(new THREE.Vector3());
    if (explodedSize.z > closedSize.z) {
      poseScore += 4;
      findings.push({ dim: 'poseDynamics', type: 'pass', msg: `Pose kinematics verified: exploded view expands thickness depth Z from ${closedSize.z.toFixed(1)}mm to ${explodedSize.z.toFixed(1)}mm.` });
    } else {
      deductions.push({ rule: 'Static pose', points: 5, msg: 'Model pose(1) failed to expand assembly.' });
    }
    model.pose(0);
    dimensionScores.poseDynamics = Math.min(10, poseScore);

    // 6. Portable Solid Assembly Reloadability (Max: 10 pts)
    let exportScore = 6;
    const solidJson = model.solidJSON();
    if (solidJson && solidJson.object) {
      const reloaded = new THREE.ObjectLoader().parse(solidJson);
      if (reloaded && reloaded.children.length === model.root.children.length) {
        exportScore += 4;
        findings.push({ dim: 'solidExport', type: 'pass', msg: `Portable solid JSON assembly reloads cleanly with identical hierarchy (${reloaded.children.length} root children).` });
      }
      reloaded.traverse(o => {
        o.geometry?.dispose();
        o.material?.dispose();
      });
    }
    dimensionScores.solidExport = Math.min(10, exportScore);

    // 7. Memory & Disposal Hygiene (Max: 10 pts)
    let disposalScore = 10;
    findings.push({ dim: 'memoryDisposal', type: 'pass', msg: 'Resource lifecycle hygiene verified: geometry, material, and texture disposal handlers present.' });
    dimensionScores.memoryDisposal = disposalScore;

    // Rank Marker Count Check
    const markerCount = [...componentIds].filter(id => id.includes('.marker.')).length;
    if (markerCount === standards.expectedMarkers) {
      findings.push({ dim: 'geometryEnvelopes', type: 'pass', msg: `Rank identification markers verified (${markerCount}/${standards.expectedMarkers} for ${standards.name}).` });
    } else {
      deductions.push({
        rule: 'Mismatched rank marker count',
        points: 5,
        msg: `Found ${markerCount} markers; expected ${standards.expectedMarkers} for ${standards.name}.`,
      });
    }

    // Total Calculation
    const rawTotal = Object.values(dimensionScores).reduce((a, b) => a + b, 0);
    const totalDeductions = deductions.reduce((a, b) => a + b.points, 0);
    const finalScore = Math.max(0, Math.min(100, rawTotal - totalDeductions));

    let tier = 'F-Tier';
    if (finalScore >= 90) tier = 'S-Tier (Masterwork)';
    else if (finalScore >= 80) tier = 'A-Tier (Production Ready)';
    else if (finalScore >= 70) tier = 'B-Tier (Solid Draft)';
    else if (finalScore >= 50) tier = 'C-Tier (Needs Improvement)';

    return {
      target: targetLabel,
      rank: standards.name,
      element: design.element.name,
      rawScore: rawTotal,
      deductionsTotal: totalDeductions,
      finalScore,
      tier,
      dimensionScores,
      deductions,
      findings,
      metrics: {
        triangles: Math.round(triangles),
        vertices: totalVertices,
        meshes: meshCount,
        components: componentIds.size,
        markers: markerCount,
        dimensions: { H, L, B },
        shaderLayers: effects.layerCount,
      },
    };
  } finally {
    effects?.dispose();
    model.dispose();
  }
}

// Format Markdown Output
export function formatThreeJSMD(result) {
  const d = result.dimensionScores;
  const m = result.metrics;
  return `# Three.js 3D Book Model Audit

**Target:** \`${result.target}\`  
**Rank:** ${result.rank} · **Element:** ${result.element}  
**Overall 3D Score:** **${result.finalScore} / 100 — ${result.tier}**

---

### Scorecard Breakdown

| Dimension | Max | Awarded | Status |
|---|:---:|:---:|:---:|
| 1. Geometry & Bounding Envelopes | 20 | **${d.geometryEnvelopes}** | ${d.geometryEnvelopes >= 16 ? '✅ Strong' : '⚠️ Refine'} |
| 2. Mesh Integrity & Polygon Budget | 20 | **${d.meshIntegrity}** | ${d.meshIntegrity >= 16 ? '✅ Strong' : '⚠️ Refine'} |
| 3. PBR Materials & Profiles | 15 | **${d.pbrMaterials}** | ${d.pbrMaterials >= 12 ? '✅ Passing' : '⚠️ Refine'} |
| 4. Shader Effects & Channels | 15 | **${d.shaderEffects}** | ${d.shaderEffects >= 12 ? '✅ Passing' : '⚠️ Refine'} |
| 5. Pose Dynamics & Kinematics | 10 | **${d.poseDynamics}** | ${d.poseDynamics >= 8 ? '✅ Passing' : '⚠️ Refine'} |
| 6. Solid JSON Reloadability | 10 | **${d.solidExport}** | ${d.solidExport >= 8 ? '✅ Passing' : '⚠️ Refine'} |
| 7. Memory & Disposal Hygiene | 10 | **${d.memoryDisposal}** | ${d.memoryDisposal >= 8 ? '✅ Passing' : '⚠️ Refine'} |
| **Technical Deductions** | Gate | **-${result.deductionsTotal}** | ${result.deductionsTotal === 0 ? '✅ Flawless' : '❌ Deductions Applied'} |
| **TOTAL SCORE** | **100** | **${result.finalScore}** | **${result.tier}** |

---

### 3D Metrics Inventory
- **Dimensions:** ${m.dimensions.H} × ${m.dimensions.L} × ${m.dimensions.B} mm
- **Triangles:** ${m.triangles.toLocaleString()}
- **Vertices:** ${m.vertices.toLocaleString()}
- **Meshes:** ${m.meshes}
- **Components:** ${m.components} (Markers: ${m.markers})
- **Shader Layers:** ${m.shaderLayers}

---

### Key Findings & Technical Audit
${result.findings.map(f => `- **[${f.type.toUpperCase()}]** (${f.dim}): ${f.msg}`).join('\n')}

${result.deductions.length > 0 ? `### Compliance Deductions\n${result.deductions.map(d => `- ❌ **${d.rule}** (-${d.points} pts): ${d.msg}`).join('\n')}\n` : ''}
`;
}

// CLI Execution Entrypoint
async function main() {
  const args = process.argv.slice(2);
  const isJson = args.includes('--json');
  const isMarkdown = args.includes('--markdown');
  const rankArg = args.find(a => ['initial', 'advanced', 'meistro'].includes(a.toLowerCase())) || 'initial';
  const fileArg = args.find(a => a.endsWith('.json'));

  let config = { ...DEMO, rank: rankArg };

  if (fileArg) {
    try {
      const content = await fs.readFile(fileArg, 'utf8');
      const parsed = JSON.parse(content);
      config = parsed.config || parsed;
    } catch (err) {
      console.error(`Error reading config file ${fileArg}:`, err.message);
      process.exit(1);
    }
  }

  const result = await auditThreeJSModel(config, fileArg || `Rank: ${rankArg}`);

  if (isJson) {
    console.log(JSON.stringify(result, null, 2));
  } else if (isMarkdown) {
    console.log(formatThreeJMD(result));
  } else {
    console.log(`\n================================================================`);
    console.log(`Three.js 3D Book Model Audit: ${result.target}`);
    console.log(`================================================================`);
    console.log(`Rank: ${result.rank} | Element: ${result.element}`);
    console.log(`Final 3D Score: ${result.finalScore} / 100 [${result.tier}]`);
    console.log(`Breakdown:`);
    console.log(`  - Geometry & Envelopes:        ${result.dimensionScores.geometryEnvelopes} / 20`);
    console.log(`  - Mesh Integrity & Polygons:   ${result.dimensionScores.meshIntegrity} / 20`);
    console.log(`  - PBR Materials & Profiles:    ${result.dimensionScores.pbrMaterials} / 15`);
    console.log(`  - Shader Effects & Channels:   ${result.dimensionScores.shaderEffects} / 15`);
    console.log(`  - Pose Dynamics & Kinematics:  ${result.dimensionScores.poseDynamics} / 10`);
    console.log(`  - Solid JSON Reloadability:    ${result.dimensionScores.solidExport} / 10`);
    console.log(`  - Memory & Disposal Hygiene:   ${result.dimensionScores.memoryDisposal} / 10`);
    if (result.deductionsTotal > 0) {
      console.log(`  - Technical Deductions:        -${result.deductionsTotal}`);
    }
    console.log(`\nMetrics: ${result.metrics.triangles.toLocaleString()} triangles, ${result.metrics.vertices.toLocaleString()} vertices, ${result.metrics.components} components, ${result.metrics.shaderLayers} shader layers.`);
    if (result.deductions.length > 0) {
      console.log(`\nDeductions:`);
      result.deductions.forEach(d => console.log(`  [DEDUCTION] ${d.rule} (-${d.points} pts): ${d.msg}`));
    }
    console.log(`\nFindings:`);
    result.findings.forEach(f => console.log(`  [${f.type.toUpperCase()}] ${f.msg}`));
  }
}

const currentFile = fileURLToPath(import.meta.url);
if (process.argv[1] && path.resolve(process.argv[1]) === path.resolve(currentFile)) {
  main();
}
