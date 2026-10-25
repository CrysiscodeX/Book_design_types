# Comprehensive SVG 3D Book Cover Evaluation Rubric

This rubric defines the scoring criteria, qualitative descriptors, and inspection workflows for auditing SVG designs of 3D fantasy book covers.

Total possible points: **100 Points** across 7 primary dimensions, governed by a mandatory **Technical Vector Standards Gatekeeper**.

---

## Grading Tiers

| Score | Tier | Status | Description |
|---|---|---|---|
| **90–100** | **S-Tier** | Masterwork Exemplar | Stunning 3D illusion, rich tactile textures, flawless geometric alignment, optimized responsive motion, completely free of technical flaws. |
| **80–89** | **A-Tier** | Production Ready | Highly polished, strong depth and relief hierarchy, clean composition, minor opportunities for micro-texture or animation choreography polish. |
| **70–79** | **B-Tier** | Solid Draft | Functional 3D book cover with recognizable rank and elemental cues. Requires refinement in quiet zones, bevel highlights, or reduced-motion handling. |
| **50–69** | **C-Tier** | Needs Improvement | Noticeably flat appearance, crowded typography, incorrect layer counts for declared rank, or uncalibrated contrast. |
| **0–49** | **F-Tier** | Defective / Incomplete | Geometric clipping, broken paths, missing viewBox, non-standard dimensions, or invalid XML. |

---

## Dimension 1: 3D Elements & Relief Architecture (Max: 20 Points)

Evaluates how convincingly the 2D vector graphic conveys physical 3D volume, embossed relief, thickness, and spatial depth.

| Points | Criteria & Descriptors |
|---|---|
| **18–20 (Exceptional)** | Flawless isometric, axonometric, or orthographic relief projection. Multi-tiered relief plates with visible step heights ($Z$-layering: base board $\to$ inlays $\to$ framing rails $\to$ corner caps $\to$ central medallion). Cohesive raking light highlights (bright top/left strokes, dark bottom/right drop shadows) create tangible chiseled bevels. Occlusion is strictly preserved across views. |
| **14–17 (Proficient)** | Clear sense of 3D volume and plate layering. Bevels and shadows are present on major components. Minor inconsistencies in lighting direction or slight planar flattening on secondary ornament. |
| **10–13 (Adequate)** | Some raised borders and drop shadows, but overall design feels mostly 2.5D or flat-stamped. Thickness of the book spine or board edges lacks volumetric depth. |
| **0–9 (Inadequate)** | Completely flat vector layout. No lighting highlights, bevels, or depth indicators. Looks like a 2D poster rather than a physical book binding. |

---

## Dimension 2: Animations & Temporal Dynamics (Max: 15 Points)

Evaluates dynamic motion layers, performance optimization, and accessibility compliance.

| Points | Criteria & Descriptors |
|---|---|
| **14–15 (Exceptional)** | Elemental motion layer count matches declared rank exactly (Initial: 1 quiet resting layer; Advanced: 3 coordinated routing layers; Meistro: 5 nested circulating layers). Powered by GPU-accelerated CSS keyframes or lightweight SMIL. Smooth 60fps execution with zero layout reflows. Includes full `@media (prefers-reduced-motion: reduce)` block that parks elements cleanly. Strictly zero rapid flashing ($> 3\text{ Hz}$). |
| **11–13 (Proficient)** | Motion is aesthetically pleasing and conforms to layer budget. Reduced-motion query is present. Transitions between keyframes are slightly abrupt or rely on opacity pulsing only. |
| **8–10 (Adequate)** | Motion present but exceeds or undershoots rank layer budget (e.g., 4 chaotic layers on an Initial rank). Missing reduced-motion accessibility overrides, or motion triggers excessive repaints. |
| **0–7 (Inadequate)** | Flashing or erratic animations that cause vestibular discomfort. Static SVG that failed to include requested motion, or broken animation tags causing rendering artifacts. |

---

## Dimension 3: Graphic Alignments & Compositional Structure (Max: 15 Points)

Evaluates proportional balance, grid alignment, hinge allowances, and typography quiet zones.

| Points | Criteria & Descriptors |
|---|---|
| **14–15 (Exceptional)** | Conforms precisely to canonical $H/L$ aspect ratios (~0.615 Initial, ~0.677 Advanced, ~0.737 Meistro). Strict $12\text{–}18\text{ mm}$ hinge flex zone maintained with zero relief obstruction. Protected quiet zones around title, subtitles, and status badges guarantee zero collision with ornament. Elegant visual weight distribution (golden section or optical center balance). |
| **11–13 (Proficient)** | Strong compositional balance and grid adherence. Hinge area is respected. Minor alignment imperfection between border rails and corner caps ($\le 1\text{ mm}$ visual offset) or tight margins around secondary metadata. |
| **8–10 (Adequate)** | Generally centered, but lacks clear grid rhythm. Ornaments crowd the title text or impinge upon the spine hinge line. Margins are inconsistent. |
| **0–7 (Inadequate)** | Severe alignment errors: asymmetrical borders without artistic intent, text overlapping relief plates, or aspect ratio distorted away from book specifications. |

---

## Dimension 4: Texture Quality & Surface Simulation (Max: 15 Points)

Evaluates the tactile materiality of surfaces (leather grain, brushed metal, polished stone, foil stamping, weathered patina).

| Points | Criteria & Descriptors |
|---|---|
| **14–15 (Exceptional)** | Sophisticated vector texture simulation. Correctly implements SVG filter primitives (`feTurbulence` for organic grain, `feSpecularLighting` / `feDiffuseLighting` for metallic sheen and relief depth). Rich multi-stop linear/radial gradients provide realistic metallic foil and gemstone refraction. Vector micro-hatching or stippling adds tangible craftsmanship. |
| **11–13 (Proficient)** | Effective surface simulation using gradients and subtle filter textures. Surface feels distinct from flat paper, though specular lighting on metal fittings could be sharper. |
| **8–10 (Adequate)** | Relies solely on flat solid colors with basic linear gradients. Little to no tactile differentiation between metal fittings, leather board, and gemstone inlays. |
| **0–7 (Inadequate)** | Harsh, flat, unshaded fills. Zero texture or gradient work. Looks like raw unrendered vector wireframes. |

---

## Dimension 5: Aesthetics & Visual Impact ("WOW" Factor) (Max: 15 Points)

Evaluates color harmony, contrast ratios, emotional resonance, and thumbnail test performance.

| Points | Criteria & Descriptors |
|---|---|
| **14–15 (Exceptional)** | Exquisite curated color harmony adhering to the 5-tone elemental system. High perceived value evoking an authentic, museum-grade enchanted artifact. Passes the "thumbnail test" with flying colors—focal silhouette, rank markers, and title remain instantly legible at $200\text{px}$ width. High contrast ratios ($> 4.5:1$) for all text. |
| **11–13 (Proficient)** | Visually appealing and cohesive palette. Good contrast and hierarchy. Clear focal point, though secondary ornamentation slightly competes with the central emblem. |
| **8–10 (Adequate)** | Competent but unremarkable aesthetic. Colors feel somewhat generic or muddy. Passes readability checks but lacks the "wow" factor of a luxury artifact. |
| **0–7 (Inadequate)** | Clashing, oversaturated, or drab color palette. Poor contrast makes text unreadable. Cluttered visual hierarchy with no clear focal entry point. |

---

## Dimension 6: Minor Details & Micro-Ornamentation (Max: 10 Points)

Evaluates secondary hardware, filigree, fastenings, and coordinate precision.

| Points | Criteria & Descriptors |
|---|---|
| **9–10 (Exceptional)** | Rich micro-details: delicately articulated corner brackets, spine ribs, rivet studs, cabochon bezels, bookmark ribbon, and filigree arabesques. Vector coordinates are cleanly rounded (2–3 decimal places) with zero `NaN` or unrounded artifacts. Micro-details remain sharp across zoom levels. |
| **7–8 (Proficient)** | Good secondary detailing including corner fittings and spine bands. Minor instances of path simplification or minor coordinate floating-point clutter. |
| **5–6 (Adequate)** | Basic fittings present, but lacking delicate filigree or micro-ornamentation. Edges appear overly plain or blocky. |
| **0–4 (Inadequate)** | Zero micro-ornamentation. Corner brackets and spine markers missing entirely. Raw or malformed path coordinates. |

---

## Dimension 7: Design Uniqueness & Motif Expression (Max: 10 Points)

Evaluates creative originality, elemental fidelity, and fantasy discipline expression.

| Points | Criteria & Descriptors |
|---|---|
| **9–10 (Exceptional)** | Unmistakable elemental character instantly communicating its element (e.g. Fire's scorched grain and ember routes; Water's flowing pearl inlays; Air's spiral filigree). Authentic interpretation of selected fantasy motif (Arcane, Celestial, Alchemical, Draconic, Botanical) avoiding generic stock tropes. Distinctive silhouette. |
| **7–8 (Proficient)** | Clear elemental identity and recognizable motif. Solid execution that differentiates itself from standard fantasy templates. |
| **5–6 (Adequate)** | Recognizable element, but relies heavily on generic fantasy clichés (e.g., standard circle-in-a-square). Motif expression is faint. |
| **0–4 (Inadequate)** | Ambiguous elemental theme (impossible to tell Fire from Nature or Metal). Generic, uninspired composition. |

---

## Technical Vector Standards Gatekeeper (Deductions / Disqualifications)

This section acts as a strict compliance gatekeeper. Violations incur direct point deductions from the total score:

- **Missing `viewBox` or invalid aspect ratio:** -15 pts
- **Invalid XML or unescaped entities (`&`, `<`, `>`):** -20 pts (or immediate failure)
- **Presence of `NaN`, `null`, or `undefined` in attributes:** -10 pts
- **Missing semantic `data-component` or `id` attributes:** -10 pts
- **External HTTP/CDN dependencies or un-embedded `<image>`:** -15 pts (violates offline portability)
- **Missing `<title>` or `<desc>` accessibility tags:** -5 pts
- **Flashing animation violating WCAG 2.3.1 ($> 3\text{ Hz}$):** -20 pts

---

## Part II: Three.js 3D Model Quality Rubric (100 Points)

Evaluates the real-time WebGL 3D solid mesh assemblies, PBR physical materials, GLSL shader magic, and resource hygiene.

### 1. Geometry & Bounding Envelopes (20 Points)
- **18–20 pts:** Closed resting bounds match nominal $[H, L, B]$ within $\pm 0.06\text{ mm}$ on all three axes. Axis ranges centered cleanly.
- **14–17 pts:** Bounds fit within $\pm 1.0\text{ mm}$; minor offset on relief extremities.
- **0–13 pts:** Model exceeds canonical thickness envelope $B$ or distorts proportions.

### 2. Mesh Integrity & Polygon Density (20 Points)
- **18–20 pts:** 100% finite coordinates (zero `NaN`/`Infinity`). Smooth Catmull-Rom tubes and spine geometry. Triangle count sits squarely inside rank targets (Initial: 25k–50k; Advanced: 50k–120k; Meistro: 120k–300k).
- **14–17 pts:** Finite vertices; polygon density slightly high or low but smooth without visible facet creasing.
- **0–13 pts:** Broken vertex normals, degenerate non-manifold geometry, or non-finite coordinate values.

### 3. PBR Materials & Surface Profiles (15 Points)
- **14–15 pts:** Accurate `MeshPhysicalMaterial` parameters matching elemental profile (Water clearcoat, Metal metallic plates, Ice/Crystal transmission). Procedural bump map applied to cover board.
- **11–13 pts:** Clean PBR materials with proper metalness/roughness separation, but bump map missing or uncalibrated.
- **0–10 pts:** Flat `MeshBasicMaterial` used where physical PBR was required, or mismatched elemental roughness.

### 4. Shader Effects & Channels (15 Points)
- **14–15 pts:** GLSL elemental shader profiles active. Material layer count strictly matches rank budget (Initial: 1, Advanced: 3, Meistro: 5). Additive blending configured; transparent depth writing disabled.
- **11–13 pts:** Shaders function correctly, but minor layer budget mismatch or uncalibrated emission intensity.
- **0–10 pts:** Shader compile errors or chaotic effect layers overwhelming the book body.

### 5. Pose Dynamics & Kinematics (10 Points)
- **9–10 pts:** Exploded view `pose(1)` smoothly expands assembly depth ($Z$-axis) and reveals interior structure; `pose(0)` returns perfectly to closed envelope.
- **7–8 pts:** Functional pose transformation with minor clipping between exploded plates.
- **0–6 pts:** Static mesh; pose interpolation broken or non-functional.

### 6. Portable Solid Assembly Reloadability (10 Points)
- **9–10 pts:** `solidJSON()` exports offline self-contained scene graph; reloads cleanly via `new THREE.ObjectLoader().parse()` with matching child counts and zero missing assets.
- **0–6 pts:** Export fails, throws runtime errors during reload, or depends on external network URLs.

### 7. Memory & Disposal Hygiene (10 Points)
- **9–10 pts:** Complete `.dispose()` method traversing scene graph and releasing all geometries, materials, and textures without WebGL memory leaks.
- **0–6 pts:** Missing disposal handlers, leaving dangling GPU buffers.

---

## Part III: Dual-Representation Parity Rubric (100 Points)

Evaluates the synchronization and consistency between the 2D SVG drawings and 3D Three.js models.

| Dimension | Points | Criteria |
|---|:---:|---|
| **Component ID 1:1 Parity** | 40 | Every 3D mesh object has a corresponding `<g data-component="...">` in the SVG drawing (excluding backface culled parts in front view). Zero orphaned SVG elements. |
| **Dimensional & Envelope Parity** | 20 | Millimeter dimensions ($H \times L \times B$) in SVG `<metadata>` match Three.js `userData.dimensions` identically. |
| **Rank Marker Parity** | 15 | Exactly matching marker count across both representations (1 for Initial, 2 for Advanced, 3 for Meistro). |
| **Elemental Palette Parity** | 15 | Hex color codes for cover, primary, secondary, ornament, and page tones match between SVG and Three.js materials. |
| **Evidence & Gating Semantics** | 10 | Outcome and archive indicators follow identical gating rules in both SVG and 3D runtime. |

---

## Unified Codex Score Formulation

When auditing a complete fantasy book codex release, the overall unified quality score is calculated as:

$$\text{Unified Codex Score} = 0.40 \times \text{SVG Score} + 0.40 \times \text{Three.js 3D Score} + 0.20 \times \text{Dual Parity Score}$$

- **S-Tier (90–100):** Masterwork Codex (Exemplary 2D vector, flawless 3D solid assembly, and 100% parity)
- **A-Tier (80–89):** Production Ready
- **B-Tier (70–79):** Solid Draft
- **C-Tier (50–69):** Needs Refinement
- **F-Tier (<50):** Defective / Desynchronized

