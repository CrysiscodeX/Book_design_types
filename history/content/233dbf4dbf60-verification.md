# Verification and construction review

Generated 2026-10-23T14:01:44.414Z. This is a proposed physical study and visual review candidate.

## Independent results

| Check | Result | Coverage |
|---|---|---|
| Solid geometry | PASS | 663 source meshes including two explicitly labelled distance representations; finite coordinates/normals, closed boundaries, consistent winding, positive volume and non-degenerate triangles. |
| Motion / paper placement | PASS | 313 states plus 36 refined endpoints. 14890 changed-geometry audits; actual-mesh cross-section witnesses and board-plane/floor checks. |
| Fittings / support | PASS | 34 hook states, 36 pad/post witnesses and four feet against the slab. |
| Local browser | PASS | 48 checks; 0 browser exceptions. |
| Conversation sandbox | PASS | Pinned CDN imports, actual assembly, partial leaf turn, clay control and 736/320 px layouts. |

## Thin-paper measurements

Sampled thickness 0.159976–0.160019 mm, nominal 0.160 mm. Maximum sampled across-leaf width error 0.002326%. Paper tolerance 0.005 mm; unintended rigid contacts 0.05 mm. Intended hook-tip seating is separately bounded by part identifiers, local curve region and 0.15 mm maximum depth. Fixture tests distinguish separated, allowed-tolerance and deliberately intersecting examples.

Independent actual-mesh cross-section SAT witnesses at five longitudinal positions: all adjacent leaves at seven opening angles; active leaf against every other writing leaf at 2% turn intervals, with endpoint refinement. Board-plane and floor witnesses are separate. This is sampled coverage, not continuous collision proof.

## Dimensions

Nominal layer budget 51.280 mm; sewing-swell allowance 53.680 mm. Actual envelopes in runtime X/Y/Z (width / vertical height / spine length):

- closed: 244.695 × 58.842 × 301.900 mm.
- open: 449.744 × 139.524 × 301.900 mm.
- midTurn: 449.744 × 244.231 × 301.900 mm.

Envelopes include all book fittings and exclude the cradle/slab. The board format remains 300 × 220 × 4 mm.

## Performance

Installed Chrome; ordinary orbit/turn measurements use a 1920 × 1080 buffer at DPR 1. Close inspection uses a 3840 × 2160 supersampled buffer. Material lighting and shadows are enabled. The 30 fps ordinary-navigation target is assessed separately from the higher-resolution inspection measurement.

| Mode | Mean rate | Median frame | 95th percentile | Draw calls | Rendered triangles |
|---|---|---|---|---|---|
| orbit (1920 × 1080) | 57.9 fps | 16.70 ms | 18.00 ms | 690 | 1,273,180 |
| turn (1920 × 1080) | 51.0 fps | 17.60 ms | 21.70 ms | 690 | 1,273,180 |
| close (3840 × 2160) | 23.1 fps | 44.30 ms | 46.90 ms | 1303 | 1,480,936 |

Device: ANGLE (Intel, Intel(R) Arc(TM) 140V GPU (16GB) (0x000064A0) Direct3D11 vs_5_0 ps_5_0, D3D11). Performance runs are isolated from capture and audit jobs.

## Visual gates

- **Assembly — Implemented.** Dimensioned front/rear/side/open diagrams, explicit capped layer section, measured envelopes and 51.280 mm body budget.
- **Craftsmanship sample — Reviewed; artistic refinement remains.** Clay and material corner/turn-in/spine-head captures. Improved corner tessellation, pressed tooling, tapered bonded repair and inner-board channels. No automatic craftsmanship score.
- **Mechanical sample — Covered checks pass.** Solid turning leaf, separate accumulated stacks, release sequence, raised catch, matched cradle posts and real feet.
- **Physical object — Implemented as proposed study.** Separate boards, skins, turn-ins, endpapers, 240 leaves, 120 folded returns, five supports, lining, endbands, caps, fittings and repair.
- **Viewer — Covered checks pass.** Orbit/dolly/pan/flight; touch; bookmarks; save/recall; JSON; isolation/explosion; reduced motion; fullscreen; narrow layouts.

## Remaining uncertainty

- The opening and page turn are controlled geometric illustrations. Gravity, friction, strain, adhesive behaviour and moisture response are not simulated.
- Default source solids and changed source geometry across sampled motion are checked. Closed boundaries and positive volume do not establish global self-intersection freedom, complete containment or visual craftsmanship.
- Paper placement uses actual-mesh 2D SAT witnesses at five longitudinal positions. It is not a full continuous 3D collision proof. Render-only paper blocks intentionally occupy the same volume as their hidden source leaves.
- Local inner-board channels and flattened lacing ends are modelled; complete concealed through-edge cord passages, glue distribution and every stitch interface remain schematic or proposed.
- The leather, wood, paper and wear are original procedural appearances. No material scan, timber species identification, museum facsimile or measured reflectance calibration is claimed.
- The manuscript content and ownership history are authored. System typography approximates written content; only six spreads receive authored reading artwork.
- Corner wrapping, endband construction and repairs are deliberate proposed interpretations, with finite geometric sampling visible at sufficiently extreme magnification. The visual result remains a review candidate.
- Local frame rates describe the measured Chrome/Intel device and settings. They do not guarantee performance on other hardware. Magical effects remain deferred.

## Corrections found during implementation

- Repeated clay switching overwrote original materials: restrict the leaf override and verify material restoration independently.
- Straps crossed the paper block: route closed straps around the fore-edge and pull clear before dropping; add actual-mesh strap/paper witnesses.

- Thin-edge moiré: separate edge normals and filtered closed distance representations; retain all inspectable leaf solids.
- Slow page turns: reuse resting geometry, move rigid thread loops and folds, update GPU attributes instead of rebuilding every component.
- Endpaper overlap: recalculate offsets and include 0.048 mm clearance in the budget.
- Tilted pad intersection and floating frame: shaped post tops and separate floor-contact feet.
- Inadequate clasp: replace a flat block with a closed bent hook, raised staple catch and staged pull-clear/release path.
- Hidden turn-in bookmark: explicitly isolate the complete cover rather than pointing through writing leaves.
- Repeated explosion offsets and a dangling attachment identifier: reset transforms from pose and verify the complete attachment registry.
