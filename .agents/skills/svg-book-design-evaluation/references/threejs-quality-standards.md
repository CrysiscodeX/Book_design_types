# Three.js 3D Book Model Quality Standards & Technical Specifications

This reference defines the geometry, material, shader, assembly, and runtime performance standards for Three.js 3D book models in the `default-book-design-types` design studio.

---

## 1. Geometric Precision & Bounding Envelopes

Every 3D book model is constructed in millimeters ($mm$) with axes oriented as:
- **$X$-Axis:** Cover width ($H$)
- **$Y$-Axis:** Spine length / Book height ($L$)
- **$Z$-Axis:** Thickness / Relief depth ($B$)

### Bounding Envelope Compliance
In closed resting state (`pose(0)`), the complete solid assembly root bounds must not exceed the canonical dimensions by more than $\pm 0.06\text{ mm}$ (tolerance threshold):

| Rank | Canonical Envelope ($H \times L \times B$) | Allowable Axis Ranges ($X, Y, Z$) | Max Allowable Tolerance |
|---|---|---|---|
| **Initial** | $160 \times 260 \times 50\text{ mm}$ | $X \in [-80, 80]$, $Y \in [-130, 130]$, $Z \in [-25, 25]$ | $\pm 0.06\text{ mm}$ |
| **Advanced** | $210 \times 310 \times 80\text{ mm}$ | $X \in [-105, 105]$, $Y \in [-155, 155]$, $Z \in [-40, 40]$ | $\pm 0.06\text{ mm}$ |
| **Meistro** | $280 \times 380 \times 120\text{ mm}$ | $X \in [-140, 140]$, $Y \in [-190, 190]$, $Z \in [-60, 60]$ | $\pm 0.06\text{ mm}$ |

### Vertex Integrity & Normal Computation
- **Finite Attributes:** Every `Float32Array` buffer attribute (`position`, `normal`, `uv`) must contain exclusively finite numerical values. Strictly zero `NaN`, `null`, or `Infinity`.
- **Indexed Geometries:** Mesh faces must use valid index arrays. Vertex normals must be properly computed (`computeVertexNormals()`) for smooth PBR lighting response.
- **Tube & Spine Geometries:** Spine curves and ornamental filigree tubes must use smooth Catmull-Rom spline sampling (minimum 8–14 radial segments for production quality).

---

## 2. Triangle Budgets & Polygon Density

To balance visual fidelity against WebGL rendering performance, assemblies must observe target polygon budgets:

| Rank | Recommended Triangle Budget | Minimum Facet Count (High Quality) |
|---|---|---|
| **Initial** | $25,000\text{ – }50,000$ triangles | Spine: 80 segments; Tubes: 28 sample points |
| **Advanced** | $50,000\text{ – }120,000$ triangles | Spine: 80 segments; Tubes: 28 sample points |
| **Meistro** | $120,000\text{ – }300,000$ triangles | Spine: 80 segments; Tubes: 28 sample points |

*Note: Models in preview mode (`quality: 'preview'`) may use lower tessellation (~10k–30k triangles) but must share identical component IDs and dimension rules with the master asset.*

---

## 3. Materials, PBR & Surface Profiles

Materials are instantiated via `THREE.MeshPhysicalMaterial` mapped to the 5 elemental palette roles:
- `cover`: Base board material with procedural tactile bump texture (128x128 repeat-wrapped DataTexture).
- `primary`: Dominant elemental color.
- `secondary`: Accent elemental color.
- `ornament`: Metallic fittings (corner caps, rails, bosses, hinges).
- `pages`: Paper text block.

### PBR Physical Parameters by Element Family

| Elemental Profile | Cover Roughness | Cover Metalness | Clearcoat | Transmission | Special Surface Attributes |
|---|:---:|:---:|:---:|:---:|---|
| **Fire** | $0.78$ | $0.00$ | $0.00$ | $0.00$ | Charred scorched grain texture |
| **Water** | $0.32$ | $0.00$ | $0.55$ | $0.00$ | Pearl-like high clearcoat gloss |
| **Earth** | $0.93$ | $0.00$ | $0.00$ | $0.00$ | High roughness stone strata grain |
| **Air** | $0.58$ | $0.00$ | $0.00$ | $0.00$ | Satin filigree finish |
| **Ice** | $0.20$ | $0.00$ | $0.35$ | $0.15$ | Low roughness, translucent secondary inlays |
| **Lightning** | $0.48$ | $0.00$ | $0.00$ | $0.00$ | High-contrast conductor rails |
| **Metal** | $0.22$ | $0.75$ | $0.00$ | $0.00$ | High metalness brushed plate |
| **Crystal** | $0.26$ | $0.00$ | $0.00$ | $0.22$ | Glass/gem transmission ($thickness = 2\text{ mm}$) |
| **Light** | $0.42$ | $0.00$ | $0.00$ | $0.00$ | Polished ivory and gold sheen |
| **Shadow** | $0.89$ | $0.00$ | $0.00$ | $0.00$ | Deep matte light absorption |
| **Nature** | $0.75$ | $0.00$ | $0.00$ | $0.00$ | Organic matte grain |
| **Decay** | $0.92$ | $0.00$ | $0.00$ | $0.00$ | Weathered patinated finish |

*All metallic ornament fittings (`tone === 'ornament'`) must have `metalness >= 0.75` and `roughness <= 0.28`.*

---

## 4. Shader Effects & Elemental Motion Channels

Custom GLSL shader profiles (`models/threejs/effects.mjs`) simulate elemental magic in the runtime viewer.

### Layer Budgets by Rank
- **Initial:** Exactly **1** elemental shader material.
- **Advanced:** Exactly **3** coordinated shader materials.
- **Meistro:** Exactly **5** nested circulating shader materials.

### GLSL Profile Compliance
- Shader profiles must correctly index the 12 elemental profiles (`kind` 0 through 11).
- Uniforms must include: `time`, `kind`, `layer`, `intensity`, `gray`, `activity`, `tint`.
- Additive blending (`THREE.AdditiveBlending`) is used for energy elements; normal blending (`THREE.NormalBlending`) for Shadow.
- Depth writing must be disabled (`depthWrite: false`) on transparent magical effect planes.

### Motion Dynamics & Reduced-Motion Safety
- **Reduced Motion:** When `reduced === true`, `time` must freeze at $0$, and particle orbital rotation must halt cleanly.
- **Evidence Gating:** Outcome indicators and archive badges must remain hidden unless verified evidence is linked (`evidenceState(config).outcome === true`).

---

## 5. Portable Solid Export & Lifecycle Hygiene

### Solid Assembly Export (`exports/threejs/book-*.json`)
1. **Offline Self-Containment:** JSON export must contain complete geometry buffers, materials, and embedded textures. No external CDN or web texture references.
2. **Typography Portability:** Offline JSON models must use the embedded 5x7 bitmap pixel font data texture. Canvas textures are restricted to the interactive browser runtime.
3. **Reloadability:** `new THREE.ObjectLoader().parse(json)` must reconstruct the scene graph with matching dimensions and child count.
4. **Memory Hygiene:** Every model and effect instance must implement `.dispose()`, traversing the scene graph and cleanly disposing all `BufferGeometry`, `Material`, and `Texture` instances.
