---
name: svg-book-design-evaluation
description: >-
  Evaluates, scores, and audits both SVG vector artwork and Three.js 3D solid models
  for fantasy book covers, grimoires, and codex bindings. Audits 3D elements, animations,
  minor details, graphic alignments, texture quality, design uniqueness, aesthetics,
  Three.js mesh geometry, PBR shaders, and dual-representation parity across Initial,
  Advanced, and Meistro rank specifications.
---

# 3D Book Cover Design Evaluation Skill (SVG & Three.js)

This skill provides an exhaustive, multi-dimensional evaluation workflow and automated auditing suite for **both SVG vector drawings and Three.js interactive 3D solid models**. It ensures visual and aesthetic excellence, technical vector hygiene, 3D mesh integrity, PBR shader fidelity, and 1:1 dual-representation parity across the `default-book-design-types` design system.

---

## Architecture & Supporting Resources

- **Automated SVG Evaluator:** [`evaluate-book-svg.mjs`](./scripts/evaluate-book-svg.mjs)
- **Automated Three.js Model Evaluator:** [`evaluate-threejs-model.mjs`](./scripts/evaluate-threejs-model.mjs)
- **Automated Dual-Parity Evaluator:** [`evaluate-book-parity.mjs`](./scripts/evaluate-book-parity.mjs)
- **Unified Codex Evaluator Runner:** [`evaluate-codex.mjs`](./scripts/evaluate-codex.mjs)
- **Comprehensive Rubrics (SVG, Three.js, Parity):** [`evaluation-rubric.md`](./references/evaluation-rubric.md)
- **Three.js Quality Standards & Specifications:** [`threejs-quality-standards.md`](./references/threejs-quality-standards.md)
- **Dual-Representation Parity Standards:** [`dual-representation-parity.md`](./references/dual-representation-parity.md)
- **Technical Standards & Canonical Envelopes:** [`book-cover-standards.md`](./references/book-cover-standards.md)
- **Audit Report Template:** [`evaluation-report-template.md`](./examples/evaluation-report-template.md)

---

## When to Activate This Skill

Activate this skill when:
- Reviewing, grading, or verifying SVG artwork and/or Three.js models for 3D fantasy books, codices, and grimoires.
- Auditing SVG vector relief, bevel highlights, directional lighting, and depth layering.
- Auditing Three.js mesh geometry, bounding box envelopes ($H \times L \times B \pm 0.06\text{ mm}$), triangle budgets, and finite coordinates.
- Checking PBR materials (roughness, metalness, clearcoat, transmission, procedural bump textures).
- Verifying elemental shader profiles (`effects.mjs`) and motion layer budgets (1 for Initial, 3 for Advanced, 5 for Meistro).
- Verifying 1:1 dual-representation parity between SVG drawings and Three.js solid models.
- Auditing portable solid JSON exports (`exports/threejs/*.json`) for reloadability and resource disposal hygiene.

---

## Evaluation Workflow

Follow this procedure to conduct an audit:

### Step 1: Run Automated Audits

#### A. Unified Full Codex Audit (SVG + Three.js + Parity)
```powershell
node .agents/skills/svg-book-design-evaluation/scripts/evaluate-codex.mjs <path-to-svg> [rank]
```
Outputs the aggregate **Unified Codex Score** ($40\% \text{ SVG} + 40\% \text{ Three.js} + 20\% \text{ Parity}$).

#### B. Individual Representation Audits
```powershell
# Audit SVG vector drawing
node .agents/skills/svg-book-design-evaluation/scripts/evaluate-book-svg.mjs <path-to-svg>

# Audit Three.js 3D solid model & shaders
node .agents/skills/svg-book-design-evaluation/scripts/evaluate-threejs-model.mjs --rank <initial|advanced|meistro>

# Audit 1:1 Parity between SVG and Three.js
node .agents/skills/svg-book-design-evaluation/scripts/evaluate-book-parity.mjs <path-to-svg> [rank]
```

### Step 2: Qualitative Visual & Physical Review

Using [`evaluation-rubric.md`](./references/evaluation-rubric.md), evaluate the qualitative aspects:

1. **Vector Relief & 3D Illusion:** Does the 2D SVG convincingly communicate physical depth via paired highlight and shadow bevel strokes?
2. **Three.js Mesh & Lighting Response:** In WebGL runtime, does the model react realistically to raking key lights, clearcoat reflections, and metallic highlights?
3. **Motion & Dynamic Hierarchy:** Does ambient motion stay restful? Are active elemental channels routed logically without fabricating test outcomes?
4. **Quiet Zones & Composition:** Are typography, status chips, and rank markers unobstructed by ornamental relief paths?
5. **Elemental Identity & Craftsmanship:** Does the codex feel like a luxury, museum-grade enchanted artifact true to its 5-tone elemental palette?

### Step 3: Technical Gatekeepers & Compliance

Enforce strict compliance gates:
- **Geometry Envelopes:** Bounds must not exceed canonical millimeter envelopes by more than $\pm 0.06\text{ mm}$.
- **Vector Hygiene:** Zero `NaN`, `null`, `undefined`, unescaped entities, or external network dependencies.
- **Mesh Integrity:** Zero non-finite vertex positions or degenerate triangles.
- **Accessibility:** Motion must respect `@media (prefers-reduced-motion: reduce)` and prohibit rapid flashing ($> 3\text{ Hz}$).
- **Memory Hygiene:** WebGL instances must implement complete `.dispose()` routines.

### Step 4: Synthesize the Audit Report

Produce an executive report following [`evaluation-report-template.md`](./examples/evaluation-report-template.md) with final tier classification:
- **S-Tier (90–100):** Masterwork Codex (Production Exemplar)
- **A-Tier (80–89):** Production Ready
- **B-Tier (70–79):** Solid Draft
- **C-Tier (50–69):** Needs Refinement
- **F-Tier (<50):** Defective / Desynchronized
