# Dual-Representation Parity Standards: SVG & Three.js

In the `default-book-design-types` design studio, every fantasy book cover exists as two parallel, synchronized representations:
1. **Editable Vector Drawings (SVG):** 7 orthographic/axonometric views per rank, plus multi-book comparison sheets.
2. **Interactive 3D Solid Models (Three.js):** Real-time WebGL mesh assemblies, PBR surfaces, and GLSL shader effects.

Both representations derive from the single master source of truth in `models/shared/design.mjs`. This document defines the strict parity requirements between them.

---

## 1. 1:1 Component ID Parity

Every physical element of the book must share identical naming across both representations:
- **SVG:** Represented as `<g id="{id}" data-component="{id}">`
- **Three.js:** Represented as `object.name = "{id}"` and `object.userData.componentId = "{id}"`

### Component Classification Inventory
| Component Namespace | Purpose | Parity Requirement |
|---|---|---|
| `body.front-cover`, `body.rear-cover` | Main book cover boards | Must exist in both representations |
| `body.spine` | Curved book spine | Must exist in both representations |
| `body.pages` | Interior page block | Must exist in both representations |
| `ornament.frame.*` | Border rails & corner brackets | 100% ID matching between SVG and Three.js |
| `ornament.marker.*` | Rank identification studs/medallions | Exactly matches rank marker count (1, 2, or 3) |
| `sigil.*` / `motif.*` | Central sigil & fantasy motifs | Must use identical spline curve master paths |
| `label.*` | Book title, rank, metadata | Content text must match identically |

---

## 2. Dimensional & Envelope Parity

The millimeter dimensions ($L \times H \times B$) stored in `<metadata>` of the SVG must match the `userData.dimensions` in the Three.js root group:

- **Initial:** $260 \times 160 \times 50\text{ mm}$ ($L \times H \times B$)
- **Advanced:** $310 \times 210 \times 80\text{ mm}$
- **Meistro:** $380 \times 280 \times 120\text{ mm}$

When evaluated at pose 0 (closed resting state), Three.js bounding box dimensions must match the nominal millimeter specifications within $\pm 0.06\text{ mm}$.

---

## 3. Color & Tone Mapping Parity

Both SVG and Three.js consume the same 5-role elemental palette (`cover`, `primary`, `secondary`, `ornament`, `pages`):
- When a component is assigned a tone (e.g. `c.tone = 'ornament'`), the SVG fill/stroke color (`design.palette[c.tone]`) must match the Three.js material base color (`material.color.getHexString()`).
- Grayscale mode parity: In both SVG and Three.js, desaturation must follow the canonical Rec. 709 luminance weights:
  $$Y = 0.2126R + 0.7152G + 0.0722B$$

---

## 4. Layer Budget & Motion Parity

- **Layer Counts:** The number of visual motion channels in SVG (simulated or keyframed) must correspond directly to the Three.js shader effect planes (`fx.layerCount`):
  - Initial: 1 layer
  - Advanced: 3 layers
  - Meistro: 5 layers
- **Evidence Gating:** Status cues (outcome success/failure, archive seals) must have identical gating logic in both:
  - SVG: Gated by `design.evidence.label` and `options.effects`
  - Three.js: Gated by `evidenceState(config).outcome` and `cue.visible`

---

## 5. Parity Audit Checklist

An automated or manual parity audit passes if and only if:
1. Every component ID present in the Three.js model (excluding line3 wireframe helpers and rear faces in front view) is found as a `data-component` in the corresponding SVG front view.
2. Rank marker counts in SVG and Three.js are equal.
3. Metadata configuration blocks (`<metadata>` in SVG and `root.userData.config` in Three.js) are structurally equivalent.
4. Color palette values for the primary and accent elements match across both files.
