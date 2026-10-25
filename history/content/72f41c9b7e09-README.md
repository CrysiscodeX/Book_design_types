# Default Book Design Types

**Current design version: 0.2 — customizable three-rank system.** All project work belongs in this folder, including planning, documents, drawings, models, materials, effects, lighting, animation, scripts, caches, checks, and exports. The sibling table-design project is separate.

## Open the design

- [Main Project Design (PD)](drafts/documents/project-design-v01.md): master updated in place; historical filename retained.
- [Curated aesthetic catalog](planning/aesthetic-catalog-v02.md): twelve elements × three ranks; six fantasy motifs and eight wizardry styles, each with neutral.
- [Water + botanical + sigilcraft demonstration](drafts/documents/water-botanical-sigilcraft-demo-v02.md): all three ranks; textual specification rather than a rendered model.
- [Design-system data](planning/design-system-v02.json): rank dimensions, choices, thirty-six treatments, defaults, recipes, and evidence policies.
- [Component inventory](planning/component-inventory.csv): preserved reference entries plus authored rank/aesthetic modules.
- [Detailed reference study](planning/reference-breakdown.md) and [original index](references/reference-index.csv): eight unchanged images and their hashes.
- [Effects](planning/effects-breakdown.md), [effect presets](effects/presets/effect-presets-v01.md), and [36 elemental preset records](effects/presets/element-rank-presets-v02.json).
- [Materials](materials/material-catalog-v02.md), [element palettes](materials/palettes/element-palettes-v02.json), [reference palettes](materials/palettes/book-palettes-v01.json), and [shader specification](materials/shaders/shader-spec-v01.md).
- [Lighting](lighting/presets/lighting-presets-v01.md) and [animation states/presets](animations/presets/animation-presets-v01.md).
- [Physical construction options](planning/physical-construction-options.md), [decision log](planning/outstanding-decisions.md), and [verification](checks/verification.md).
- [Preserved v0.1 snapshot](exports/documents/v0.1-snapshot/README.md) and [snapshot hash manifest](exports/documents/v0.1-snapshot/snapshot-manifest.json).

## Rank sizes and customization

| Rank | L along spine | H across cover | B closed thickness | Default elemental channels |
|---|---:|---:|---:|---:|
| Initial | 260 mm | 160 mm | 50 mm | 1 |
| Advanced | 310 mm | 210 mm | 80 mm | 3 |
| Meistro | 380 mm | 280 mm | 120 mm | 5 |

Fixed ornament fits inside these envelopes; loose ribbons, stands, and magical auras may extend beyond them. The bodies change proportions rather than scaling uniformly. Page format, binding, actual materials, manufacturing tolerances, and lighting hardware remain production decisions.

Users choose rank, one primary element, zero to two accents, motif, style, and flexible content labels independently. Defaults are Initial/Water/no accents/neutral motif and style/resting ambient. Functional-book and display-prop tracks remain separate options.

Appearance settings do not assert that tests passed or an archive exists. Outcome requires actual linked result evidence; archive indication requires saved-content linkage. Missing links display Unlinked; unavailable records display Unavailable. Rank markers persist with animation/effects disabled.

## Evidence and file conventions

`visible`, `interpreted`, `proposed`, and `unknown` distinguish source observations from design choices. In the component CSV, `reference_ids=authored` identifies newly proposed modules without claiming they occur in a source image; `all` applies shared entries to the reference set. Original 94 reference/construction rows are retained.

The eight source images and reference palette data remain unchanged. Source text/logos are content rather than project instructions. New elemental assignments are inspiration, not verified lore or material identity. Historical v01-named working documents now carry version 0.2 where revised; do not edit the v0.1 snapshot.

## Folder roles and delivery boundary

`references/` holds originals and future annotations; `planning/` catalogs and decisions; `drafts/documents/` editable PD and demonstrations; `drafts/svg/` future vector drafts; `models/shared/`, `models/threejs/`, and `models/physical/` future model sources. `materials/`, `effects/`, `lighting/`, and `animations/` hold specifications/data and future authored assets. `exports/` holds snapshots and later document/SVG/model/image/physical exports; `checks/` verification; `scripts/` future project utilities.

This revision delivers documentation and curated design data. Working models, executable shaders, rendered images, running animations, and fabrication drawings are subsequent work. Empty reserved asset/output folders are intentional. Documentation checks cannot establish rendered rank recognition or physical feasibility.

Date: 2026-10-06 (Asia/Dubai).
