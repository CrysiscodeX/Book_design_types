# Fieldwork — a working wizard grimoire

Independent Three.js construction and movement study. Start with `npm install`, then `npm start` and open http://127.0.0.1:4194/. Node.js 20+ is recommended. The existing library and dragon projects are unchanged.

## Spine remediation — 23 October 2026

The covering now follows a proposed **55 mm fixed-length neutral cross-section**: a circular arc, transitioning to a tangent-continuous return with straight legs when the board joints approach. Raised bands are a separate offset from that reference. This replaces the previous freely shrinking bulge; it is a geometric constraint, not a calibrated leather constitutive model.

Covering, a proposed **0.05 mm adhesive film**, and lining share surface frames and aligned longitudinal subdivisions. Tapered cords enter the board-lacing terminals. The repair and its stitches follow the actual lower spine. The cradle contact height is raised 30 mm to clear the deeper return, including near the first leaf. Root-wise axial jitter is removed so gathering returns meet their paired leaves; fore-edge shaping remains separate.

Invalid pose/camera imports validate before mutation. Legacy v1 specifications without the new neutral-length field receive the 55 mm default. Joint and repair bookmarks follow the actual assembly; gathering inspection explicitly isolates the complete return. Inline camera persistence and module-load errors are repaired.

The [repair evidence](http://127.0.0.1:4195/repairs/index.html) is separate from the preserved [before-state audit](http://127.0.0.1:4195/). Complete sewing-hole routes, the tight-back attachment of lining to every gathering, material response and whole-assembly collision freedom are still not certified. The thin bonded repair casts a contact shadow but does not receive the studio shadow map, which cannot resolve its 80–520 µm thickness without self-shadow striping.

## Inspect

Use **Closed binding** and **Open to read** to compare the complete object. A clasp first pulls clear of its raised catch. The selected solid leaf can then turn above 110°. Pause at intermediate positions; inspect its underside and 0.16 mm edge. Drag to orbit, wheel to dolly, right-drag to pan. Inspect contains free movement, saved cameras, isolation, explosion and ten 50–100 mm bookmarks. Turn-in inspection explicitly isolates the complete cover to expose concealed construction.

All 240 writing leaves retain stable identities and closed source geometry. At distance, two closed page-block representations hide subpixel edge moiré; approaching or selecting Paper restores the individual leaves. This replaces rendering detail, not the construction specification. Six representative spreads contain original illustrations and text. The content is a typeset manuscript interpretation using system fonts; it is not a facsimile of a historical manuscript.

Close inspection uses 2× supersampling to reduce thin-edge aliasing. Ordinary navigation uses the device ratio capped at 1.5. Performance records distinguish 1920 × 1080 ordinary navigation from the larger supersampled inspection buffer. **Expose cover lining** moves the complete pastedown aside; this is an explicit inspection explosion, not a normal reading position.

The nominal accumulated layer budget is **51.280 mm**, including 0.048 mm of explicit endpaper clearances. Outer envelopes include separately measured coverings, spine, repair and furniture. See `component-spec.json` for the actual closed/open/turning envelopes.

## Files and interfaces

- `book.mjs`: `createWizardBook(THREE, spec)` returns `root`, `parts`, `groups`, `setPose`, `setDisplay`, `registry`, `bounds` and `dispose`.
- `specification.mjs`: fixed millimetre construction specification, evidence references, spread identities and layer budget. Runtime coordinates use metres.
- `geometry.mjs`: capped paired surfaces, thickness-aware parametric shells, periodic profile sweeps and capped tubes. Turning pages are not height fields.
- `materials.mjs`, `content.mjs`: original procedural material channels and six spreads, independent of construction and pose.
- `viewer.mjs`: local UI, camera/state transfer and measured performance. Reused navigation mathematics are copied into the independent `navigation.mjs`.
- `material-study.html`: five solid material swatches under neutral/grazing light.
- `drawings.svg`: dimensioned front, rear, fore-edge, open section and explicitly capped layer section.
- `inline-preview.html`: embeddable local viewer. `inline-template.html` and `build-inline.mjs` produce the in-conversation fragment from the same assembly source.
- `review.html`, `verification.md`: captures, test coverage, source/proposal register and remaining uncertainties.

```js
import { createWizardBook } from './book.mjs';
import { DEFAULT_SPEC } from './specification.mjs';
const book = createWizardBook(THREE, DEFAULT_SPEC);
scene.add(book.root);
book.setPose({ opening: 130, leaf: 104, turn: 0.5 });
// Attach createPageArt(THREE) separately using book.setArt(art).
// Dispose art in its owning viewer, then book.dispose() when finished.
```

Pose angles use degrees: 0 closed, 130 maximum; `turn` runs 0–1; `leaf` is a zero-based physical index, constrained to 1–238. A separate 0–1 `release` parameter controls clasps while closed. The viewer sequences release before opening and settles an interrupted leaf before closing. `setPose` itself is a deterministic geometry setter. There is no runtime gravity, friction or material-stress solver.

## Verify

Run each command independently:

```text
npm run check
npm run check:motion
npm run check:fittings
npm run check:browser
npm run benchmark
npm run capture
npm run documents
node write-review.mjs
node build-inline.mjs
```

Browser checks use installed Chrome at `C:/Program Files/Google/Chrome/Application/chrome.exe`. All local runtime resources are served from this project. The conversation fragment uses pinned, allowlisted Three.js CDN imports because its sandbox cannot import the local server.

## Limits

This is a proposed digital construction study. Geometry/manoeuvrability checks do not establish museum-quality craftsmanship. Grain and wear are original procedural appearances; material calibration and hand-finished corner folding remain review topics. Concealed glue, every stitch contact, through-edge board passages and comprehensive 3D self-intersection/containment are not certified. Local inner-board channels and flattened cord ends are visible solids; the complete concealed lacing route remains schematic. Magic remains deliberately deferred.
