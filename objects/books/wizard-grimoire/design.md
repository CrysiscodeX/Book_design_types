# Working wizard grimoire — anatomy rebuild, v2

The governing design authority is **Andre Olivier, The Anatomy & Physics of the Book, 24 October 2026**, supplied in this conversation. This file and the executable binding knowledge replace the former mixed tight-back/case assumptions. The supplied screenshot documents a failure in the previous digital model; it is not evidence of historical construction.

## Selected binding architecture

The live object is a **rounded and backed, sewn-on-tapes, hollow-back case binding**. The case and text block are separate assemblies. The paper hollow separates the lined text-block spine from the card stiffener and leather case spine. Five linen tapes, mull flanges and endpaper hinges provide the declared attachment graph. A laced-board flexible tight back is a separate architecture; this book does not claim that structure.

The revised knowledge is executable in `shared/Part_1-Engine-Root/book-binding-knowledge.mjs` and readable in the generated `exports/anatomy.html`. Binding families, anatomy, grain, bending, swell, moisture, gravity, failure modes, approximate workshop rules and retired assumptions are recorded separately. The reference values are proposals, not standards.

## Build outward from the text block

- Writing paper: 292 × 212 mm, 240 leaves / 480 pages, 0.16 mm caliper.
- Gatherings: 24, each containing five nested bifolia / ten leaves. This is a proposed arrangement, not a standard single-sheet imposition.
- Writing-paper caliper: 38.4 mm. Two free endpaper leaves: 0.36 mm total.
- Fold swell: 24 × 0.25 mm thread × proposed 0.55 compression factor = 3.3 mm. It is concentrated at the folds; it is not uniform interleaf air.
- Proposed rounded spine thickness: 42.06 mm. Starting closed round: 120°.
- Balanced binder’s boards: 298 × 212 × 3 mm, derived from the paper, shoulder allowance and 3 mm squares.
- Joint gaps: 9 mm. Mull flanges: 30 mm. Pared covering turn-ins: 15 mm. Calfskin appearance: 0.7 mm; joints: 0.45 mm.
- Case neutral curve: approximately 50.380 mm, derived from its closed geometry and maintained through opening. The full envelope is measured from the actual posed meshes, including furniture.

Paper, endpaper, board and applicable lining grain runs along the spine (runtime Z). Leather directional properties are not treated as machine-paper grain. Moisture, anisotropic stiffness, glue cure, fatigue and gravity are design knowledge; the viewer does not solve those material phenomena.

## Construction and movement

`Part_1-Engine-Root/book-v2.mjs` exposes `createWizardBook(THREE, spec)`, returning `root`, `parts`, `groups`, `leaves`, `anchors`, `math`, `setPose`, `setDisplay`, `setArt`, `registry`, `bounds`, `updateLOD` and `dispose`.

`binding-kinematics.mjs` integrates the folded spine from material coordinates and reading position. Leaf curves are integrated by arc length, with concentrated gutter sampling and closed normal-offset thickness. The active leaf and resting source leaves retain physical identity. Two closed stack proxies filter subpixel distant rendering; they are explicitly labelled render representations and are excluded from physical counts.

Boards rotate at their joint lines. A separately constrained card curve bows away, without shrinking its neutral length. Mull flanges and endpaper hinges follow their attachment frames. Endbands follow the text block; leather headcaps finish the case. The hollow has separate inner/outer walls and thin annular head/tail rims. It is not a solid wedge or a hanging extra board.

The 0–130° opening and representative page turn above 110° are externally controlled. Clasps pull clear before dropping. Closing settles an interrupted turn before engaging. The cradle has closed feet, shaped support tops and defined pads. This is authored kinematics, not a paper, leather, cloth or rigid-body simulation.

## Viewer and evidence

Start with `npm start` from this object directory; use port 4194. Orbit, dolly, pan, free inspection, saved views, neutral/grazing light, clay, assembly isolation/explosion and JSON state remain available. V1 state is rejected rather than imported into incompatible mechanics. Six representative spreads retain the original authored field notes and illustrations.

The generated record is `exports/review.html`; the revised anatomy is `exports/anatomy.html`; actual posed sections are `exports/svg/drawings.svg`. Component IDs, dimensions, material treatments and attachments are recorded in `Part_1-Engine-Root/component-spec.json`.

## Applicable checks

Run from this directory:

- `npm run check`: source solidity at the default pose and seven opening poses; derived case-curve length.
- `npm run check:motion`: 313 poses plus 36 endpoint refinements, actual-mesh paper SAT and sampled thickness/width.
- `npm run check:fittings`: outer paper/endpaper to board clearance, feet to slab, strap-to-paper release checks.
- `npm run check:browser`: current v2 viewer controls and state.
- `npm run check:inline`: actual v2 assembly inside the conversation sandbox.
- `npm run benchmark`: isolated measured orbit, turn and close-inspection performance at 1920 × 1080.
- `npm run capture`, `npm run documents`, `npm run build:inline`, `npm run review`: current captures and generated evidence.

Legacy check entry names are adapters to the applicable v2 checks. Old `book.sample` spine/repair checks are historical v1 evidence and are not represented as passing for v2. The owned embedded recipe is `Part_2-Connectors/inline-recipe.mjs`; it lists exact source modules for the shared builder.

## Extraction requirements

Choose the binding family before describing ornament. Specify text-block format, leaf/page counts, gatherings, caliper, thread, swell, grain, rounding and backing. Derive boards, squares, shoulders, joints and spine width. State which layers are bonded and where, the physical load path, and which spine moves with the endbands.

For every part describe front, back, side, underside, thickness, edge profile, layers, support, attachment region and clearance. Distinguish geometry from surface detail. Specify the closest intended inspection distance (50–100 mm), closed/open/intermediate shape, joint pivots, release sequence and stack redistribution. Relate wear to handling, bending, moisture or repair history. Mark unseen construction and numerical workshop choices as proposed.

Require separate evidence for source solidity, placement, movement, material appearance, viewer operation and performance. State what each test covers. Do not use triangle counts, frame rate or closed topology as proof of craftsmanship, historical accuracy or universal collision freedom.

## Remaining limits

Needle-hole bores, all sewn tie-down routes, every adhesive microcontact, endband load capacity and full continuous collision freedom are not certified. Material appearance is procedural and six spreads are a typeset manuscript interpretation. A physical sewn dummy, material calibration and manufacturing tolerances remain necessary for fabrication. Magic remains deferred.
