# Verification — v0.3

Date: 2026-10-06, Asia/Dubai. **Geometry/runtime: PASS. Documentation/source preservation: checked separately by scripts/check-documents.mjs. Physical feasibility: UNVERIFIED.**

## Geometry and portable files

Nine Node tests pass. 97 constructed configurations cover 36 base element/rank masters, 42 motif/style treatments (every non-neutral module at every rank), 15 recipe/rank combinations, a mixed three-element case, and the optional inset bookmark at all three ranks.

- All position buffers are finite. Closed bounds fit X=H, Y=L, Z=B, with a 0.06 mm numerical comparison allowance; this is a software precision check, not a fabrication tolerance.
- Canonical dimensions are Initial 260/160/50, Advanced 310/210/80, Meistro 380/280/120 mm. Marker counts are 1/2/3; live elemental channels are 1/3/5. Accent elements reuse existing channels.
- Shared component IDs are unique and occur in the SVG metadata/groups. Exploded poses return to the original closed bounds. Master and preview share descriptors/dimensions while tessellation differs.
- Tested high-detail assemblies range from 33,612 to 117,258 triangles across this sample. The demonstration registry contains 482 rank-qualified components.
- Three exported offline solid JSON files reload with ObjectLoader and retain bounds, millimeter metadata, static material settings, embedded labels/maps, and components. A studio-exported browser assembly also reloads. Live shaders, lights/environment, floor, and selection helpers are excluded.
- Twenty-four editable SVGs exist in working and export folders; corresponding copies match, all IDs are unique, and no embedded screenshots occur. The core gradient and optical vectors are illustrative approximations.

Structured geometry results: [geometry-results.json](geometry-results.json). Source: [design.test.mjs](design.test.mjs).

## Executed browser checks

Four browser tests pass in installed Chrome; latest full run 28 seconds. Browser fixture uses a 1500×1100 viewport, with a separate 390×844 responsive check.

- All 36 element/rank shader combinations compile with no captured console/page errors. Every motif/style is rebuilt at all ranks; all five recipes are exercised at all ranks.
- Rank, element, accent, motif, style, independent labels, construction intention, bookmark, quality, recipe, view, component selector/picking, explosion, configuration file restoration, comparison, lighting, and responsive layout are exercised.
- Actual downloads of editable SVG, current-view PNG, configuration JSON, and solid Three.js JSON are saved and checked. Configuration restores independently editable industry and style choices; the solid assembly reloads with finite bounds and components.
- Evidence begins Unlinked. Outcome/Archived are disabled until the required supplied fields exist. A clearly labeled supplied failure fixture enables Outcome and returns to Resting after 1.5 animation seconds; a saved reference enables Archived. Clearing evidence restores Unlinked. Source references are not fetched and records are not independently verified. Unit checks cover absent sourceRef and unavailable evidence.
- Water frames at time 0 and 4 differ visibly. Reset to 0 is pixel-identical. Pause leaves time unchanged. Reduced-motion frames at different times are pixel-identical. These assertions test a representative Water Meistro sequence; they do not claim pixel-difference testing for every family.
- Captures include same-scale ranks, neutral/grayscale with effects suppressed, Meistro front/exploded, mobile layout, and browser rasterization of the elemental SVG. Visual review confirms changing proportions, frame/node topology, persistent labels, and effects-independent identity. Spine marker counts are also checked geometrically. The review is authored, not an independent user study.

Results: [browser-results.json](browser-results.json), [element compilation records](browser-element-results.json), [browser test source](studio.spec.mjs), and [visual evidence](../exports/screenshots/README.md).

## Performance and resource observation

Twelve alternating Initial Fire / Meistro Water rebuilds return to stable geometry and texture counts: Initial 114 / 20; Meistro 220 / 21. Identical repeated configurations do not grow these renderer counters. A final live frame may register an additional active route-dot geometry. Counters include persistent scene/postprocessing resources; they are not byte-level memory measurements.

| Meistro Water, botanical + sigilcraft | Master | Preview |
|---|---:|---:|
| Solid triangles | 100,122 | 25,646 |
| Recorded live frames | 80 | 80 |
| Wall time for sample | 1319.3 ms | 1368.2 ms |
| Mean render submission | 2.67 ms | 2.87 ms |

Renderer reported: **ANGLE (Intel, Intel(R) Arc(TM) 140V GPU (16GB) (0x000064A0) Direct3D11 vs_5_0 ps_5_0, D3D11)**. Live ambient effects and playback are enabled for these samples. Submission time measures JavaScript renderer/composer calls, not GPU completion. The short sample does not establish a universal FPS/device target, and preview tessellation is not necessarily faster when draw calls/postprocessing dominate. Further profiling may justify batching fine curves; the editable master is retained.

Measured record: [resource-results.json](resource-results.json).

## Documentation, references, and snapshot audit

[Documentation checks](documentation-checks-v03.json) verify source catalog/module agreement, all eight original-image hashes, the immutable v0.1 (22 files) and v0.2 (29 files) snapshot hashes, preserved catalog rows, local Markdown links, SVG ID/copy consistency, portable files, and master/document-export agreement. Snapshots retain historical text and links. Links from the documentation/data-only v0.2 snapshot to excluded prior exports resolve against the active project root; the snapshot contents themselves remain unchanged.

Original 139 catalog rows are preserved and three implemented module entries added; the first 94 source-evidence rows remain unchanged. The generated runtime registry records demonstration components separately. Reference-inspired presets remain distinct from authored element/motif/style compositions.

Run npm.cmd run check, npm.cmd run check:browser, then node scripts/record-verification.mjs and node scripts/check-documents.mjs. The browser suite saves screenshots; SVG/model regeneration commands are in the [README](../README.md).

## Practical limits

This is a local visual design studio and first model library. It does not open covers, turn pages, execute skills, verify test evidence, resolve remote provenance, or provide physical fabrication/CAD drawings. The models are visual meshes, not certified watertight manufacturing solids. Boards, backs, attachments, page striations, ornament depths, shader optics, and physical translations are authored proposals. Actual binding, paper count, materials, fastening, mass, clearance, tolerances, illumination hardware, and target-device approval remain open.

Optical layers are controlled artistic approximations; volumetric fluids, physical caustics/refraction, snow/heat simulation, and reference-exact reconstruction are not claimed. Offline exports use a Latin pixel font; browser exports use installed font glyphs. Full title text remains in config metadata even where presentation text is fitted/truncated. Effects and scene objects stay separate from solid export; restoring animation requires the project source and configuration.
