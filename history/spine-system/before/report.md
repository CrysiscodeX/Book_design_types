# Spine systems — construction, movement and compatibility audit

23 October 2026 · eight current projects · no model repairs

The current spine systems are not validated physical bindings. The grimoire adds individually solid components and coordinated motion, but the interfaces do not form a demonstrated continuous binding. Earlier scene books range from box proxies to closed parts without resolved attachment; the studio has directly measured open spine geometry. Passing topology and browser smoke checks did not establish craftsmanship or assembly correctness.

## Executive disposition

**REWORK. Full binding validation: false.** Critical defects are not averaged into a cosmetic score. Some scoped checks pass; they do not override missing or failed interfaces.

- **Wizard grimoire — rework:** connected but inconsistent proposed supported tight-back (B01–B06).
- **Woodland portal shelf books — rework:** box cover/page instances and bands (P01).
- **Hollow-tree shelf / return / stacks — rework:** boxes with partial page-edge hints (P01).
- **Gothic miniature shelf books — rework:** miniature box instances (P01).
- **Gothic miniature open book — rework:** open surfaces and central rod (R02).
- **Gothic room shelf books — not established:** boards, paper, rounded spine (P02).
- **Gothic room central book — rework:** closed blocks and leaves; primitive spine (R01).
- **Dragon-wing shelf books — not established:** boards, paper, lining, scaled spine (P02).
- **Dragon exemplar shelf books — not established:** similar construction with different transforms (P02).
- **Initial studio — rework:** visual binding design, mechanics explicitly deferred (S01–S03).
- **Advanced studio — rework:** visual binding design, mechanics explicitly deferred (S01–S03).
- **Meistro studio — rework:** visual binding design, mechanics explicitly deferred (S01–S03).

## Measurements and method

21 spine profiles plus 306 turning samples; 100 deterministic factory cycles and 100 reduced-motion UI cycles. Triangle pair tests use AABB hierarchy pruning and two-way segment/triangle intersections. Closed containment uses deduplicated odd-ray counts. These are diagnostic implementations, not certified robust predicates: coplanar overlap and tangent contact remain unresolved. Contact counts are not penetration depths or unique collisions. Studio topology is measured in its native mm; grimoire geometry in metres.

Midpoint 60° spine arc: 43.011 mm versus 50.668 mm closed. Outer-face area: 12928 versus 15212 mm². Consistent surface parameters are tracked, but no material constitutive model is present. Lining normal-offset projection crosses zero and changes sign. Centre support endpoints fail to meet visible lacing in fully open/closed states.

Fixtures show a pair of overlapping closed shells passes the original topology checker despite detected surface crossings. Open and inverted fixtures are recorded independently. The 0.005/0.05 mm SAT thresholds discriminate known overlaps identically in m/mm; this is not an arbitrary-mesh penetration calibration.

## Eight expert-informed perspectives

### Hand bookbinder

The first question is not whether the spine looks rounded, but whether the sections can actually be sewn, lined and attached to the boards in the order implied by the assembly. The centre cord does not meet its visible lacing terminal in the sampled closed and fully open states. Separate return pieces can be closed solids and still fail to form a folded sheet with their leaves. Build the gathering, support and board attachment as one construction sequence before embellishing bands.

Findings: B01, B02, B05, R01. Reference context: Espinosa.

### Book conservator

A repair should make its location and purpose legible. This patch follows the front board, so it cannot establish a lower-spine repair while the spine flexes independently. The cap and endband need an inspectable relationship: the Met describes a folded layer of pared leather protecting an endband. A rolled-looking strip and repeated torus loops alone do not establish that relationship. Concealed construction needs a labelled section, not an obstructed bookmark.

Findings: B04, B06, F03. Reference context: Met, LOC.

### Binding historian / bibliographer

Keep the proposed supported tight-back identity distinct from later case-binding and hollow-back interpretations. A visible cavity is not by itself evidence of an intentional hollow. Record what is proposed, what is merely a display proxy, and what construction the cited object actually demonstrates. The old studio already says opening/fabrication are deferred; it should not be condemned for absent animation, but its advertised solid export still needs solid geometry.

Findings: C03, B01, R02. Reference context: LoB, SHI.

### Mechanical engineer

Treat the cords, sewn sections, lining, covering and board attachments as a load path. Geometry that stops short cannot transmit the loads implied by the scene unless another attachment is specified. The 15% arc and area change is a strong modelling warning but cannot be converted into material stress without constitutive properties. Covers supported by pads do not prove the binding is in equilibrium. Gravity and external opening controls must remain explicit.

Findings: B02, B03, C03. Reference context: Conroy.

### Computational geometry specialist

A watertight mesh is only one predicate. Multiple closed shells can overlap or be fully contained; both must be tested independently. Open studio spines make their signed-volume result unsuitable as a physical volume. The new hierarchy tests find surface-crossing witnesses between spine and lining, but do not solve coplanar contact or establish a penetration depth. Pair-level attachment regions are needed before contact can be accepted.

Findings: B01, S01, S02, Q01. Reference context: Three-dispose.

### Animation / simulation specialist

The deterministic cycle result is useful, but it certifies only repeatability for that sequence. A moving binding needs material correspondence and connected roots, not independent shapes rebuilt at each angle. Reversal, a partly turned leaf, spread changes and a closing cover must all reach the same physical assembly. ETH page-block separation is relevant to runtime strategy, not evidence validating this spine.

Findings: B03, B05, F04. Reference context: ETH.

### Technical artist / material specialist

The reviewed spine preset obscures the assembly behind a cover and cradle. The joint capture largely shows broad surfaces rather than the joint. This is a presentation defect independent of polygon count. Box-based shelf books may be effective scene props at distance but cannot inherit the hero book’s inspection promise. Neutral and grazing comparisons should show actual folds, layer edges and contact shadows before grain or warm light is used to sell age.

Findings: F03, P01, B06. Reference context: Three-colour.

### QA / metrology specialist

Tests must be able to fail when the named property is broken. The clay-class assertion is non-discriminating; a metadata thickness assertion does not inspect a solid; a resolving attachment ID does not test contact. The invalid-import test now demonstrates state mutation before failure. Unit-scaled tolerance fixtures pass, but this does not calibrate arbitrary mesh penetration, all coordinate transforms or real leather strain. Keep each limited pass bounded.

Findings: Q01, F01, C01. Reference context: Three-dispose.

## Findings register

### B01 · spine / lining — rework

**Affected:** wizard-grimoire. **Severity:** critical. **Confidence:** high.

**Requirement:** Lining must remain on its intended side of the covering with deliberate spacing.

**Observed / measured:** At 60°, the 0.7 mm world-X shift projects from -0.694 to +0.561 mm onto the spine normal. Triangle crossing counts are 1788 / 4050 / 3104 at 0 / 60 / 130°.

**Cause:** Lining is translated on the world X axis instead of offset in the spine local surface frame.

**Correction:** Construct common layer interfaces from a shared reference surface and normals; define bonded regions and terminations.

**Acceptance test:** Check signed separation, thickness and contact regions for every sampled pose.

**Evidence / reproduction:** wizard-grimoire/book.mjs: spinePoint and liner update; measurements.json pairs/poses

**Uncertainty:** Crossing counts are triangle-pair witnesses, not unique collisions or penetration depth. Some contact may be intended; no explicit lining/cover attachment-region allowance establishes these crossings as valid.

### B02 · cord / board lacing — rework

**Affected:** wizard-grimoire. **Severity:** critical. **Confidence:** high.

**Requirement:** Support ends must connect to board lacing.

**Observed / measured:** At 130°, cord-end centre distances to front/rear lacing surfaces are 3.745 / 3.610 mm; cord radius is 1.2 mm. Broad-phase boxes are disjoint in tested centre-cord/lacing pairs.

**Cause:** Cords and lacing are authored independently; registry attachment is not physical continuity.

**Correction:** Create a single routed support per station, with board entry, channel, and visible terminal.

**Acceptance test:** Track both ends and board entry through all poses; check separation and local attachment containment.

**Evidence / reproduction:** extra-results.json attachment; measurements.json pairs

**Uncertainty:** Only centre station tested geometrically; other four stations share the generator but are not separately certified.

### B03 · spine deformation — rework

**Affected:** wizard-grimoire. **Severity:** high. **Confidence:** high.

**Requirement:** Surface deformation must agree with an explicit material-coordinate model.

**Observed / measured:** Midline cross-section changes 50.668 → 43.011 mm at 60° (-15.11%); corresponding outer-face area changes 15212 → 12928 mm² (-15.01%).

**Cause:** Authored spine curve is rebuilt from independent cover positions with an added bulge; no strain/paring model.

**Correction:** Define a reference binding and neutral surface; distribute bending and compression by layer, with justified limits.

**Acceptance test:** Track consistent surface locations, local edge lengths and triangle areas; reject unexplained collapse or stretch.

**Evidence / reproduction:** measurements.json poses leaf120

**Uncertainty:** This is geometric distortion, not a calibrated leather stress/strain result. Compression can be physically appropriate; magnitude alone is not proof of failure.

### B04 · repair / spine — rework

**Affected:** wizard-grimoire. **Severity:** high. **Confidence:** high.

**Requirement:** A lower-spine repair must physically bridge the described region.

**Observed / measured:** Patch and stitches are children of front-cover and reference its leather face.

**Cause:** Description and actual parent/attachment disagree.

**Correction:** Either relocate the repair across the actual spine with coordinated deformation, or describe it honestly as a cover repair.

**Acceptance test:** Inspect patch front/back, bonded perimeter and movement relative to its stated damaged region.

**Evidence / reproduction:** wizard-grimoire/book.mjs repair.lower-spine-patch

**Uncertainty:** No physical specimen was measured.

### B05 · gatherings / sewing — not established

**Affected:** wizard-grimoire. **Severity:** high. **Confidence:** high.

**Requirement:** Bifolia and stitch paths must remain connected at the fold and supports.

**Observed / measured:** 240 leaf identities and 120 closed return pieces exist; sewing loops are positioned on spinePoint, not verified through actual fold holes.

**Cause:** Independent geometric constructions and incomplete contact checks.

**Correction:** Define one gathering topology with paired leaves, fold and station paths; derive sewing from it.

**Acceptance test:** Measure all fold/leaf endpoints and stitch/support/board interfaces; do not accept metadata as continuity.

**Evidence / reproduction:** wizard-grimoire/book.mjs folds/sewing; prior motion exclusions

**Uncertainty:** No physical specimen was measured.

### B06 · headcap / endband / shoulder — not established

**Affected:** wizard-grimoire. **Severity:** high. **Confidence:** high.

**Requirement:** Caps must fold around their layer stack and endbands must have defined seating/attachment.

**Observed / measured:** Caps, cores and loops follow spinePoint independently. Closed geometry exists, but tiedowns, material-frame separation and shoulder transitions are not verified.

**Cause:** Anatomical suggestion replaces resolved construction interfaces.

**Correction:** Author a complete head/tail section with pared folds, endband attachment and board transitions.

**Acceptance test:** Inspect both end sections in clay and measure component interfaces through opening.

**Evidence / reproduction:** wizard-grimoire/book.mjs caps/endbands; captures/bookmark-head.png

**Uncertainty:** No physical specimen was measured.

### S01 · spine body — rework

**Affected:** book studio: Initial / Advanced / Meistro. **Severity:** critical. **Confidence:** high.

**Requirement:** Exported solids must have closed oriented boundaries.

**Observed / measured:** Each live spine has 160 boundary edges. Open-surface signed volumes are negative; they are not physical volumes.

**Cause:** Generator connects elliptical rings but supplies no end caps; side winding also needs review.

**Correction:** Cap the shape and validate intended orientation; treat construction mechanics separately.

**Acceptance test:** Closed-boundary, oriented-normal and self-intersection tests on live and reloaded exports.

**Evidence / reproduction:** measurements.json studio; default-book-design-types/models/threejs/geometry.mjs spineGeometry

**Uncertainty:** No physical specimen was measured.

### S02 · raised bands — rework

**Affected:** book studio: all ranks. **Severity:** high. **Confidence:** high.

**Requirement:** Raised bands intended as solids need finished ends.

**Observed / measured:** Each inspected band has 16 boundary edges.

**Cause:** TubeGeometry endpoints are not capped.

**Correction:** Use capped sweeps with deliberate roots; identify decorative versus structural bands.

**Acceptance test:** Inspect end caps, intersections, and parent attachment at actual scale.

**Evidence / reproduction:** measurements.json studio.spines

**Uncertainty:** No physical specimen was measured.

### S03 · live / JSON export — pass

**Affected:** book studio: all ranks. **Severity:** info. **Confidence:** high.

**Requirement:** Current exported geometry must reload at the same dimensions.

**Observed / measured:** Live and exported XYZ bounds agree for the three tested default rank configurations.

**Cause:** Shared source and export construction preserve dimensions.

**Correction:** Preserve this regression while repairing the source geometry.

**Acceptance test:** Reload exported geometry and compare bounds, units and identifiers.

**Evidence / reproduction:** measurements.json studio

**Uncertainty:** Matching bounds is not full geometry/material/animation parity. Reproducing an open spine reproduces the defect too.

### R01 · lining / hinges / page roots — rework

**Affected:** Gothic room central book. **Severity:** high. **Confidence:** high.

**Requirement:** Static open pose still needs plausible construction.

**Observed / measured:** A 24 × 9 × 538 mm rounded box is called flexible spine lining; cylindrical hinge rolls and mirrored signature blocks do not establish a connected binding.

**Cause:** Separate solid primitives suggest anatomy without shared attachment surfaces.

**Correction:** Rebuild as a binding assembly rather than adding more trim to the box.

**Acceptance test:** Head/tail sections must show how signatures, supports, boards, lining and covering meet.

**Evidence / reproduction:** gothic-library-room/physical-assets.mjs buildBoundBook; extra-results.json roomReport

**Uncertainty:** No physical specimen was measured.

### R02 · pages / spine — rework

**Affected:** Gothic miniature foreground book. **Severity:** high. **Confidence:** high.

**Requirement:** Pages intended for close inspection require thickness and a binding.

**Observed / measured:** Four single-sided curved page surfaces per side and a central rod; no closed page-edge construction in this generator.

**Cause:** Distant-view miniature construction.

**Correction:** Declare distant-only scope or replace with closed leaves/page blocks and connected binding.

**Acceptance test:** Side and underside inspection must not expose zero-thickness leaves.

**Evidence / reproduction:** gothic-miniature-library/model.mjs buildOpenBook

**Uncertainty:** No physical specimen was measured.

### P01 · covers / paper / spine — rework

**Affected:** woodland portal / hollow tree / Gothic miniature shelf books. **Severity:** medium. **Confidence:** high.

**Requirement:** 5–10 cm inspection requires more than solid exterior boxes.

**Observed / measured:** Portal uses overlapping cover/page boxes; hollow-tree and miniature books use coloured box instances with surface bands; separate page top hints do not form complete bindings.

**Cause:** Composition-scale proxies were retained under later close-up expectations.

**Correction:** Separate distance proxies from physically built hero books; clearly document supported inspection distance per family.

**Acceptance test:** Inspect top, fore-edge, back and underside of representative upright/stacked/side-facing variants.

**Evidence / reproduction:** respective model.mjs book builders

**Uncertainty:** These proxies can remain suitable at intended distant scales; historical mechanics are not applicable to their original presentation purpose.

### P02 · spine shell / boards — not established

**Affected:** Gothic room / dragon shelf books. **Severity:** high. **Confidence:** high.

**Requirement:** Closed subparts must form one non-overlapping usable book.

**Observed / measured:** Distinct boards and paper plus rounded spines exist; no complete binding interface or opening model. Dragon generators use different widths/offsets around similar half-ellipse spines.

**Cause:** Independent constants and nonuniform instance scales.

**Correction:** Define one local book frame and component interfaces; retain intentional static-book scope.

**Acceptance test:** Test narrowest/widest books, lean/stack transforms, paper/spine containment and world-space normals.

**Evidence / reproduction:** gothic-library-room/model.mjs; dragon-wing-bookcase/builders.mjs; dragon-carving-exemplar/assembly.mjs

**Uncertainty:** No physical specimen was measured.

### F01 · pose import — rework

**Affected:** wizard viewer / public assembly. **Severity:** high. **Confidence:** high.

**Requirement:** Rejected import must preserve previous valid state.

**Observed / measured:** turn:"invalid" throws Cannot read properties of undefined (reading x); stateUnchanged=false.

**Cause:** Pose is applied before complete validation/transactional commit.

**Correction:** Validate and construct candidate pose before mutation; reject or normalize invalid values under a documented contract.

**Acceptance test:** Wrong types, missing fields, non-finite API values, version/unit mismatch must fail without state change.

**Evidence / reproduction:** browser-results.json malformed pose import; measurements.json malformed

**Uncertainty:** No physical specimen was measured.

### F02 · camera persistence — rework

**Affected:** wizard inline preview. **Severity:** medium. **Confidence:** high.

**Requirement:** Saved camera state must restore.

**Observed / measured:** Requested [0.19,0.21,0.23]; actual [0.37,0.42,0.47].

**Cause:** Restore reads spread/pose but calls fit instead of restoring saved camera/target.

**Correction:** Restore valid camera/target after model pose; default fit only when state is absent.

**Acceptance test:** Orbit/pan, save globals, reload, compare camera and target numerically.

**Evidence / reproduction:** browser-results.json inline camera restore

**Uncertainty:** No physical specimen was measured.

### F03 · bookmarks — rework

**Affected:** wizard viewer. **Severity:** high. **Confidence:** high.

**Requirement:** Inspection must reveal the named surface.

**Observed / measured:** Fold bookmark centre ray hits leaf.126; head/joint results and captures show occlusion. The Spine preset view also shows obstructing cover/support.

**Cause:** Bookmark tests check anchor distance rather than intended visibility.

**Correction:** Author object-aware camera directions and labelled isolation/sections for concealed features.

**Acceptance test:** Named detail must be visible at 50–100 mm, with usable light, orbit and clipping.

**Evidence / reproduction:** browser-results.json bookmarks; captures/bookmark-fold.png; captures/bookmark-joint.png

**Uncertainty:** Centre-ray occlusion is a diagnostic witness, not a proof that the feature is invisible everywhere in the frame.

### F04 · repeated transitions — pass

**Affected:** wizard viewer / factory. **Severity:** info. **Confidence:** high.

**Requirement:** Repeated permitted operations must not accumulate deterministic geometry drift.

**Observed / measured:** 100 factory cycles have 0 mm profile drift; 100 reduced-motion UI open/turn/close cycles settle closed with released=0 and finite spine coordinates.

**Cause:** Deterministic rebuilding avoids accumulated pose offsets in this sequence.

**Correction:** Keep as regression; extend to animated adversarial actions.

**Acceptance test:** Repeat with opening reversal, mid-turn close, spread selection and pause/resume.

**Evidence / reproduction:** measurements.json cycles; browser-results.json UI cycles

**Uncertainty:** Not proof of attachment validity, animated endurance or absence of all state-dependent failures.

### F05 · Chrome / Edge layout — pass

**Affected:** wizard runtime. **Severity:** info. **Confidence:** high.

**Requirement:** Load on tested engines and narrow layouts without overflow.

**Observed / measured:** Chrome 156 and Edge 155 load at tested desktop/DPR1 and 320px/DPR2 layouts; fonts loaded; no captured page exceptions in valid-state runs.

**Cause:** Pinned local runtime works in both tested Chromium environments.

**Correction:** Retain matrix with exact browser and drawing-buffer dimensions.

**Acceptance test:** Repeat local and embedded workflows on each claimed environment.

**Evidence / reproduction:** browser-results.json matrix

**Uncertainty:** Two Chromium browsers are not two rendering-engine families. Physical touch, Firefox/WebKit and other GPUs remain untested.

### F06 · performance / supersampling — pass

**Affected:** wizard rendering. **Severity:** info. **Confidence:** high.

**Requirement:** Measure 1080p orbit, turn and close independently.

**Observed / measured:** New isolated 90-frame runs meet 30 fps in all three diagnostic 1080p modes; previous production 4K close remains 22.92 fps.

**Cause:** Close inspection automatically raises pixel ratio; frame cost depends on buffer size.

**Correction:** Expose quality/performance tradeoff if production close must meet 30 fps; never reduce physical construction silently.

**Acceptance test:** Report buffer resolution, DPR, CPU/GPU and frame percentiles with each measurement.

**Evidence / reproduction:** performance.json; measurements.json priorPerformance

**Uncertainty:** 1080p close test pins pixel ratio to 1 in memory; production source is unchanged. Short samples do not establish sustained thermal performance.

### Q01 · test adequacy — rework

**Affected:** earlier verification reports. **Severity:** critical. **Confidence:** high.

**Requirement:** A pass claim must match the property actually tested.

**Observed / measured:** Clay test checks MeshStandardMaterial, which ordinary materials also use; bookmark test checks distance; half-turn check reads geometry metadata/groups. Topology fixture with overlapping closed shells passes despite actual crossings.

**Cause:** Tests mirror implementation declarations and omit interface-level outcomes.

**Correction:** Use negative fixtures and independent outcomes; split topology, collision, physical continuity, visibility and functionality gates.

**Acceptance test:** Deliberately break each target property and demonstrate its specific test fails.

**Evidence / reproduction:** wizard-grimoire/browser-qa.mjs; inline-qa.mjs; extra-results.json fixtures

**Uncertainty:** No physical specimen was measured.

### C01 · units / transforms — not established

**Affected:** all reusable book components. **Severity:** high. **Confidence:** high.

**Requirement:** Shared components need an explicit dimensional contract.

**Observed / measured:** Studio scene geometry and exports use mm; wizard and library geometry use metres; Gothic open-book surfaces include scale.x=-1.

**Cause:** Independent local conventions with no common adapter.

**Correction:** Specify unit conversion, axis basis, pivot, normal handling and invariant identifiers at component boundaries.

**Acceptance test:** Compare equivalent scenes in m/mm and translated/rotated/reflected frames, including contact results.

**Evidence / reproduction:** source inventory and geometry factories

**Uncertainty:** SAT fixtures agree at scale 1/1000; full cross-project geometry/normal equivalence is not established. Reflections are not automatically defects.

### C02 · representation parity — not established

**Affected:** current SVG / inline / exports. **Severity:** medium. **Confidence:** high.

**Requirement:** Simplified representations must state which properties they retain.

**Observed / measured:** Studio SVG spine renderer emits a rounded rectangle while 3D emits an open elliptical shell. Wizard inline bundles the same source but uses different controls and restore behaviour.

**Cause:** Shared broad dimensions are mistaken for full visual/mechanical parity.

**Correction:** Document representation contracts and fingerprint source bundle; test dimensions/IDs/materials/pose separately.

**Acceptance test:** Compare component inventory and silhouettes per supported view, then round-trip supported state.

**Evidence / reproduction:** default-book-design-types/models/shared/svg.mjs; wizard-grimoire/build-inline.mjs; inline-template.html

**Uncertainty:** No physical specimen was measured.

### C03 · physical simulation / material validation — not established

**Affected:** all studies. **Severity:** high. **Confidence:** high.

**Requirement:** Physics claims need calibrated material behaviour and external validation.

**Observed / measured:** Current wizard geometry has no gravity/friction/stress solver or measured anisotropic material properties.

**Cause:** Controlled authored kinematics were used for a construction study.

**Correction:** Retain that explicit scope; add constraints first and only select a solver after physical behaviour is specified.

**Acceptance test:** Compare a physical binding model and measured opening/section curves before calling the result physically validated.

**Evidence / reproduction:** wizard-grimoire/README.md; geometry.mjs

**Uncertainty:** No strength, equilibrium, conservation-treatment suitability or historical fabrication certification is given.

### F07 · CDN failure presentation — rework

**Affected:** wizard inline preview. **Severity:** medium. **Confidence:** high.

**Requirement:** Unavailable runtime must produce a meaningful error or fallback.

**Observed / measured:** Blocking esm.sh leaves the preview unloaded and still saying Preparing the book… after the failure observation window.

**Cause:** Static module import fails before the viewer catch block can present the intended error.

**Correction:** Use an outer loading/error boundary that covers module retrieval as well as scene construction.

**Acceptance test:** Block CDN, disconnect network, and force module failure; loading state must terminate with useful recovery guidance.

**Evidence / reproduction:** followup-results.json cdn

**Uncertainty:** Single controlled blocked-origin case, not every possible network failure.

### F08 · materials / factory resource ownership — pass

**Affected:** wizard runtime. **Severity:** info. **Confidence:** high.

**Requirement:** Actual material mode identity and bounded factory GPU resources must be demonstrated.

**Observed / measured:** Clay instance identity and original-material restoration pass. Six factory create/render/dispose cycles retain 315 geometry and 13 texture counters after cleanup. Blocked local storage still permits loading.

**Cause:** Current materials and factory cleanup behave consistently in these tests.

**Correction:** Keep instance-identity checks and warm-baseline resource observations.

**Acceptance test:** Repeat ownership and full viewer remount tests; do not demand zero internal renderer cache entries.

**Evidence / reproduction:** followup-results.json

**Uncertainty:** Not a JS heap, full-viewer remount or prolonged lifetime leak proof.

## Previous claims corrected

| Previous claim | Actual test | Missing coverage | Correct conclusion |
|---|---|---|---|
| Solid geometry passes | Welded boundaries and positive aggregate volume | Self-crossing, containment, interfaces | Some source meshes are watertight; assembly correctness is not established. |
| Attachment IDs resolve | Registry lookup | Actual distance, routing and bonding | Metadata links exist; cords can still stop short. |
| Bookmark is 50–100 mm | Camera-to-target distance | Occlusion, surface distance, lighting | Named feature may be hidden. |
| Clay works | Material class is MeshStandardMaterial | Comparison against intended clay instance | Non-discriminating assertion. |
| Half turn is a solid leaf | Thickness metadata and material groups | Geometry and binding contact | Declaration needs separate geometry and interface tests. |
| Inline state restores | Pose/spread restoration | Saved camera and target | Camera restore fails new outcome test. |
| High FPS | Orbit/turn at 1080p | Production close at 4K | Ordinary target passes; 4K close is slower. |

## Coverage and remaining obligations

- **Actual-mesh interface crossing / containment fixtures — pass.** AABB hierarchy + segment-triangle witnesses and odd-ray containment; limited fixtures only.
- **Coplanar overlap, exhaustive self-intersection, all attachment regions — not established.** Algorithm explicitly excludes robust coplanar/tangent classification; no exhaustive self-BVH on every source mesh.
- **Paper/rigid tolerance thresholds in m and mm — pass.** 3/7 micrometre and 0.04/0.07 mm SAT fixtures agree under 1000× scaling.
- **Fixtures with collisions missed between five slices — pass.** Off-slice box collision at Z=3.7 mm is detected by triangle witnesses and missed by nominal 0/5/10/15/20 mm slice planes; diagnostic fixture only.
- **Seven openings × three leaf positions — pass.** 21 spine profiles; no claim of complete contact validity.
- **2% page-turn grid at 110° / 130° × three leaf positions — pass.** 306 active-leaf topology and spine profile samples.
- **Adaptive refinement / continuous contact proof — not established.** No full continuous collision proof or exhaustive adaptive contact search.
- **100 factory and reduced-motion UI cycles — pass.** Stable deterministic profile and settled closed state.
- **100 fully animated adversarial cycles / reproducible interruptions — not established.** Earlier normal animation smoke tests exist; new endurance suite is reduced-motion only.
- **Full leaf content identity / gathering continuity / support route — not established.** Part names do not prove topology, content placement or continuous attachment.
- **Chrome / Edge local DPR/layout matrix — pass.** Four measured combinations, not the full Cartesian product of all widths/DPRs.
- **Firefox / WebKit / physical touch / other GPUs — not established.** Not executed.
- **Context loss and restore — pass.** Chrome restored context and rendered again in this test.
- **Blocked CDN/storage / lifecycle mount endurance / keyboard focus accessibility — rework.** Blocked storage loads; six factory cleanup cycles have stable GPU counters. Blocked CDN remains loading. Full viewer remount/heap and accessibility suite not established.
- **JSON rejected atomically / inline camera round trip — rework.** Both fail new outcome checks.
- **Static proxy opening mechanics — not applicable.** Not advertised; close-up solid construction evaluated separately.
- **Craftsmanship at 50–100mm for every family — rework.** Representative wizard captures show obstructions; source-based proxies lack physical construction; all-family matched runtime capture not completed.
- **All-family world-normal and SVG silhouette parity — not established.** Static implementation reviewed; not a complete perceptual/transform equivalence suite.
- **Production supersampled close reaches 30fps — rework.** Recorded 22.92fps at 3840×2160. Diagnostic 1080p passes.
- **Actual clay identity and material restoration — pass.** New independent instance-identity checks pass; old class-only test remains inadequate.
- **Deterministic animated interruption sequence — pass.** Nine fixed actions at 95 ms spacing remain finite; not 100-cycle animated endurance.

## Runtime and performance

- chrome 156.0.8078.48; viewport 1920; DPR 1; buffer 1594×964; overflow-free=true.
- chrome 156.0.8078.48; viewport 320; DPR 2; buffer 480×1053; overflow-free=true.
- edge 155.0.4283.62; viewport 1920; DPR 1; buffer 1594×964; overflow-free=true.
- edge 155.0.4283.62; viewport 320; DPR 2; buffer 480×1053; overflow-free=true.

- orbit: 61.59 fps; median 16.60 ms / p95 17.70 ms; 1920×1080; 689 draw calls.
- turn: 44.71 fps; median 22.70 ms / p95 30.40 ms; 1920×1080; 689 draw calls.
- close: 60.37 fps; median 16.70 ms / p95 17.90 ms; 1920×1080; 1971 draw calls.

Device: ANGLE (Intel, Intel(R) Arc(TM) 140V GPU (16GB) (0x000064A0) Direct3D11 vs_5_0 ps_5_0, D3D11). Close 1080p pins renderer ratio to 1 diagnostically; production is unchanged. Previous production close: 22.92fps, 3840×2160, median44.70ms/p9548.10ms. Short samples do not establish sustained performance.

## Remediation order

1. Choose and document the binding architecture; establish a common unit/frame contract and shared layer surfaces.
2. Route complete gatherings/supports into boards; resolve joint zones, caps, lining and endpapers; constrain deformation in material coordinates.
3. Repair invalid-input transactionality, state restore, visibility and representation contracts.
4. Refine authored folds, wear, grain, lighting, inspection performance and distant-detail transitions.

Do not begin with more ornament. A new cap or band cannot repair a disconnected load path.

## References and proposal register

- **LoB:** [Language of Bindings](https://lob.is.ed.ac.uk/) — Vocabulary; not a dimensional or mechanical specification.
- **SHI:** [Science History Institute anatomy](https://www.sciencehistory.org/collections/blog/how-to-judge-a-book-by-its-cover/) — Components and sections/endleaves; does not substantiate our exact reconstruction.
- **Conroy:** [The Movement of the Book Spine](https://cool.culturalheritage.org/coolaic/sg/bpg/annual/v06/bp06-01.html) — Spine action, supports and joint interaction; preliminary analysis, not a calibrated constitutive model.
- **Espinosa:** [Hard-board laced-in conservation binding](https://cool.culturalheritage.org/coolaic/sg/bpg/annual/v02/bpga02-05.pdf) — Construction comparison; one conservation structure, not a universal medieval binding.
- **LOC:** [Library of Congress rebacking](https://www.loc.gov/preservation/conservators/diderot/treatment.html) — Documented lining and attachment treatment; treatment context must not be mistaken for an original fantasy-book specification.
- **Met:** [Headcaps and handling](https://www.metmuseum.org/ja/perspectives/fragility-of-headcaps) — Pared folded leather and protection of endbands; use-related damage evidence.
- **ETH:** [Book simulation research](https://igl.ethz.ch/projects/book-simulation/) — Interactive pages and page-block separation; current fetch timed out, previously read during planning. No new source verification claimed.
- **Three-colour:** [Three.js colour management](https://threejs.org/manual/pages/color-management.html) — Colour versus non-colour texture channels and rendering conventions.
- **Three-dispose:** [Three.js disposal](https://threejs.org/manual/pages/how-to-dispose-of-objects.html) — Explicit resource ownership; warm internal caches are not automatically leaks.

All eight viewpoints are analytical lenses, not independent professional consultations. Exact material properties, opening forces, concealed fabrication and historical fit are not measured. No solver, physical specimen or fabrication approval is provided. No existing model or existing verification report was edited. Source preservation manifest checks 272 files; changed=0.
