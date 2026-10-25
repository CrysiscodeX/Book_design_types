# Spine repairs — verified corrections and remaining construction work

23 October 2026. This is the repair record following the preserved [before-state audit](../index.html). **Full binding validation remains false.**

## What changed

The wizard grimoire now uses one material-frame reference for covering, adhesive, lining, cap/endband placement and the lower-spine repair. The neutral cross-section has a proposed fixed 55 mm arc length. When the board joints approach, a circular arc transitions into a return with straight legs and a semicircular end; tangents remain continuous. This prevents the earlier unconstrained contraction. Raised bands are offsets from that reference, not extra topology pretending to be sewing. Exact historical material behaviour has not been established.

Supports taper into the actual board-lacing terminals. Axial jitter at writing-leaf roots was removed so the paired leaves meet their gathering returns; fore-edge shaping remains separate. The book and its adjustable cradle contacts are 30 mm higher to keep the deeper return above the fixed cradle rails and studio slab near the first leaf.

The repair follows the external lower spine rather than the front board. Its 80–520 µm thickness is geometric. The studio shadow map could not resolve this bonded overlay without self-shadow striping: it continues to cast contact shadows but does not receive that shadow map. This rendering decision does not remove the physical layer.

The Initial/Advanced/Meistro source spines and decorative bands now have closed boundaries. Capped sweeps retain their UVs. Current JSON exports are regenerated; historical snapshots were not changed. The studio still explicitly defers binding mechanics.

## Runtime and inspection

Malformed poses and camera data validate before the current object is changed. Legacy version-1 specifications without neutralSpineLength remain loadable with the new proposed default. Inline saved camera/target coordinates now restore and orbit changes persist. Dynamic module imports are covered by the visible load-error handler, including blocked CDN tests.

Joint and repair bookmarks use the actual attachment/surface frame. Gathering inspection deliberately isolates the whole closed return piece, making its visibility independent of the paper stack; the UI labels this inspection action. It does not claim that an isolated return is the entire sewn gathering.

## Performance and corrective geometry

Rebuilding every binding component per animation frame caused an intermediate page-turn regression. Three corrective samples at 0%, 50% and 100% now supply closed geometry and transforms for in-between motion. Sweeps use a stable reference frame so vertices retain correspondence. The measured maximum error against direct lofts is 0.000802 mm across 42 non-key poses; the study tolerance is 0.005 mm. This is a bounded approximation, not a physics solver.

- orbit: **57.87 fps**, 1920 × 1080; median 16.70 ms, p95 18.00 ms.
- turn: **51.02 fps**, 1920 × 1080; median 17.60 ms, p95 21.70 ms.
- close: **23.13 fps**, 3840 × 2160; median 44.30 ms, p95 46.90 ms.
- close-native: **43.21 fps**, 1920 × 1080; median 24.50 ms, p95 29.20 ms.

Device: ANGLE (Intel, Intel(R) Arc(TM) 140V GPU (16GB) (0x000064A0) Direct3D11 vs_5_0 ps_5_0, D3D11). The close-native case pins DPR 1 diagnostically. The production close view retains automatic 2× supersampling, and its cost is reported separately. Runs are short local measurements, not guarantees for other hardware.

## Verification

- Covering/lining intersection checks: 21 opening/leaf configurations, 0 crossing witnesses. Seven opening angles × leaf positions 1, 120, 238.
- Neutral arc range: 54.999796–54.999981 mm. Measured at an inter-band cross-section, separately from the raised-band skin offsets.
- Minimum sampled book Y: 25.564 mm, above the 20 mm rail top. This is an envelope witness, not all-pair cradle collision proof.
- Gathering return endpoints: 33 poses; maximum mid-surface gap 0.000003725 mm at three longitudinal samples. This is not a sewing-hole validation.
- Full existing motion suite: 313 states plus 36 refinements, passed=true. Its original paper/board witness limits still apply.
- Default source geometry: 663 meshes, passed=true. Two meshes are render-only distance representations.
- Viewer suite: 48 checks, passed=true. New independent Chrome/Edge outcomes: true. Conversation sandbox: true.
- Studio design suite: nine tests passed, including rank dimensions, variants, export reload and historical snapshot integrity. New spine topology checks independently cover all three ranks.

## Finding-by-finding status

### B01 · Covering / lining — Corrected in sampled poses

Shared local surface frame, matched 2 mm longitudinal subdivisions and a proposed 0.05 mm adhesive film; no covering–lining crossing witnesses in 21 opening/leaf combinations.

### B02 · Support terminal gaps — Corrected at measured terminals

Tapered supports now end inside the board-lacing terminals. Centre-station endpoints are contained at 42 sampled ends; full cord/board routing and all five stations are not independently certified.

### B03 · Spine contraction — Geometric constraint corrected

A 55 mm neutral path replaces the unconstrained bulge. Circular arcs become tangent-continuous returns when the joints approach. This is authored kinematics, not calibrated material physics.

### B04 · Repair location — Corrected

The replacement patch and stitches belong to the repair assembly, follow the actual spine surface and have physical thickness.

### B05 · Gatherings / sewing — Partly established

Paired leaf roots and their returns meet in 33 sampled poses. Complete sewing-hole and support-to-gathering attachment construction is still not established.

### B06 · Caps / endbands — Further validation required

Their positions now use the shared surface frame. Historical paring, tiedowns and every cap interface remain proposed.

### S01 / S02 · Studio spines and bands — Corrected

Closed elliptical cylinders and capped sweeps replace open surfaces in Initial, Advanced and Meistro. Current JSON exports regenerated; historical snapshots unchanged.

### F01 · Invalid imports — Corrected for tested invalid states

Finite pose values, camera and saved cameras validate before mutation; tested rejected imports preserve state. Legacy v1 neutral-length omission defaults to 55 mm.

### F02 · Inline saved camera — Corrected

Camera and target restore; orbit/pan changes persist. Module imports are inside the error boundary.

### F03 · Inspection views — Improved and scoped

Joint and repair cameras now reach intended surfaces. Fold inspection explicitly isolates its complete return and persists through material changes. Other inspection framing remains a visual review topic.

### F06 · Runtime performance — Measured separately by resolution

Corrective poses reuse closed geometry; stable sweep frames prevent vertex correspondence flips. The final 1080p measurements and supersampled cost appear below.

### F07 · Blocked CDN — Corrected

Import failure terminates the loading state with a visible error. The local viewer continues to use local dependencies.

### R01 / R02 / P01 / P02 · Other library and dragon book families — Not changed in this pass

Their proxy/primitive and unresolved binding findings remain open. This repair does not silently replace scene props with a new hero book.

### Q01 / C01 / C02 / C03 · Whole-system validation — Still limited

Independent outcome tests were added. Complete binding mechanics, all representation parity, all transforms and physical material calibration remain unestablished.

## Remaining construction and evidence gaps

The rest of the library and dragon scene books are unchanged. Their close-up proxy limitations remain in the audit. The grimoire still needs complete, independently checked sewing routes through the gatherings, lining-to-gathering contact appropriate to its declared binding, historical cap/endband attachment and whole-assembly placement validation. Fixed arc length, closed meshes and passing sampled checks do not establish a physically correct tight-back book. No gravity, friction, adhesive constitutive model, stress solver, physical specimen measurement, continuous collision certificate or new device support is claimed.

## Reproduce

From the workspace root run the repair check, gathering check, interpolation check and browser check scripts in this folder. Use `node wizard-grimoire/motion-checks.mjs`, `node wizard-grimoire/checks.mjs`, `node wizard-grimoire/browser-qa.mjs`, and `node wizard-grimoire/inline-qa.mjs` for existing suites. Run `benchmark.mjs` separately from other jobs. Generate the inline bundle with `node wizard-grimoire/build-inline.mjs` after source edits. `repair-status.json` and the raw result files preserve the measured scope.
