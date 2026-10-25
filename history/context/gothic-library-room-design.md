# Gothic library room: description, construction and inspection audit

The first room study established the composition: wrapping dark timber shelves, pointed high windows, converging ribs, amber lamps, a patterned rug and a pale central book. It did not establish convincing construction at close range. The upgrade adds physical camera movement and actual component volumes so those missing descriptions can be tested from multiple directions.

## What changed, and why it matters to extraction

| Assembly | Previously | Current proposed construction | Information a source description still needs |
|---|---|---|---|
| Open book | Five curved sheets per side without a paper block | Six closed 4.6 mm signature volumes per side, shallow geometric page-edge steps, three 0.16 mm curled leaves per side, separate 6 mm boards, endpapers, hinge rolls, spine lining and headbands | Binding type; actual board and paper thickness; page count; gutter and spine curvature; cover overhang; sewing; condition; content |
| Low stand | Tubular legs and a solid apron box | Shaped closed legs, separate apron rails, joint blocks, pegs, support battens, three-board sloping top and retaining lip | Exact joint design; leg section; rail profiles; top angle; use and reading posture |
| Floor | Sharp thin boards with broad gaps | Around 20 mm body thickness, 0.6 mm bevels, approximately 2 mm joints, staggered ends and an entry threshold; separate end-grain surface treatment | Board sizes, direction, end arrangement, subfloor, perimeter cut and actual timber |
| Rug | Zero-thickness patterned plane | Approximately 7 mm layered body, binding, small undulations and solid fringe strands | Weave, pile, edge treatment, backing, compression and contact with furniture |
| Shelf books | One main box per book | Separate cover boards, rounded closed spine, recessed page block; nearby bindings gain hinge rolls, headcaps and finer bands | Individual binding families, cover lips, page offsets, spine profiles, titles and wear |
| Cabinets | Intersecting shelf and divider boxes | Shelves fitted between dividers, support cleats/pegs, profiled edges, rear framing and inset 12 mm panels | Joinery schedule, actual rebates, fixings, tolerances, corner construction and panel material |
| Cabinet backs | Undeveloped rear surfaces | Separate panels and supporting frames; explicit exposed-back and exploded inspection modes | Which backs are visible, service access and relationship to the building wall |
| Walls and ceiling | Basic wall shell and thin ceiling webs | Thick opening reveals, bevelled wall edges, mitred trim, closed 24 mm decorative webs, capped ribs, moulded rolls and springing blocks | Wall build-up, rib profile, ceiling construction, structural versus decorative role |
| Windows | Opaque glowing blue surfaces and line-based leading | Separate thick panes, solid leading, front/back retaining beads, frames and sill; thickness-aware transmissive glass | Glass manufacture, tint, thickness, clarity, waviness, frame profile, rebates and retention |
| Lamps and carving | Broad primitive suggestions | Backplates, fixing heads, shaped dishes, sockets, wick/wax details, collars and extruded leaf relief | Fixture manufacture, leaf motif, carving depth, joints and source intensity |

All these construction dimensions are **proposed study assumptions**, not measurements recovered from the original image. This remains a procedural interpretation rather than a fabrication model or historical attribution.

## Space and movement

The default plan remains an assumed regular octagon, 4.40 m across interior flats, approximately 4.76 m across corners, with a 3.85 m apex. Cabinet depth is 320 mm; opposing shelf fronts are nominally 3.76 m apart. The proposed front access opening is 900 mm wide. A hexagonal alternative and width/height/depth controls remain available.

Walk starts at an assumed 1.65 m eye height with a 60 degree vertical field of view. WASD/arrows translate the camera; dragging looks around; the wheel physically moves it. Walls, cabinetry and the central stand constrain walking. Free flight adds unrestricted translation and Q/E height. Inspect focuses an object or a batched construction part, then provides orbit, pan and real dolly. Field of view has a separate control. Pinch and two-finger pan work in inspection mode.

Camera position survives material and lighting changes. Save/Recall camera stores a bookmark; version 2 state also preserves the active pose, controls and window configuration between reloads. Version 1 study settings migrate to the new camera defaults.

The close-up target is 5-10 cm. That requires specifying multiple views, physical thickness and edge construction; adjectives such as "rich", "detailed" and "realistic" do not supply those facts. The geometry is not a promise to resolve microscopic paper fibres or individual rug fibres.

## Exterior boundary

There is no landscape, grass, courtyard, sky image or newly designed exterior roof. A neutral background and a generated studio reflection environment support material inspection.

Exterior inspection concerns cabinet backs, the upper wall band, opening reveals, frames, leading and glass. Cabinet-back modes explicitly hide obstructing walls. Exploded mode moves the separate back panels 220 mm away from their frames. This is an inspection operation, not an assertion that the finished room has exposed backs or missing walls.

Plan and side-section views remain diagnostic visual cuts; their clipped faces are not automatically capped solids. The separate **window construction section** is actual closed geometry, exposing a frame rebate, retaining beads, lead came and true pane thickness without relying on uncapped clipping.

## Glass reuse

`window-assembly.mjs` exports `createWindowAssembly(THREE, spec)`, `normalizeWindowSpec`, and `GLASS_PRESETS`. Geometry and optical settings are separate. The same glass specification drives pointed and rectangular laboratory samples. JSON Export/Import transfers both configuration sections; import validates and clamps numeric fields rather than evaluating code.

Geometry settings include opening profile, width/height, arch-rise fraction, frame width/depth, pane thickness, mullion width and leading width/depth. Optical settings include tint, transmission, roughness, refractive index, absorption distance and surface waviness.

The default pane is 4 mm thick with IOR 1.5. Blue glass uses absorption rather than self-emission. Clear and frosted presets let the user compare the visibility and distortion of reference stripes and a solid sphere. Reference objects can be hidden for unobstructed reverse inspection. Studio reflections and the background are not outdoor scenery. Real-time transmission is a rendering approximation; this is not a calibrated optical or daylight simulation.

See `window-reuse.md` for component use and disposal.

## Replacement extraction prompt

> Describe this Gothic library as an environment that can be reconstructed and inspected from 5-10 cm away. Separate observed, estimated, unknown and proposed information. Preserve uncertainty about hidden construction instead of silently completing it.
>
> Establish units, axes, plan hypotheses, dimension reference planes, wall count and angles, entry, clear routes, cabinet projection, and a dimensioned vertical section. Distinguish across-flats, across-corners, and clear-after-joinery dimensions. Describe each wall as an elevation schedule with windows, cabinets, piers and lighting.
>
> For every major object, describe its front, sides, back, underside, thickness, edge profile, component layers, connections, and contact with neighbouring objects. State the closest intended inspection distance. Distinguish geometry from surface detail, and label unseen construction as proposed rather than observed.
>
> For the central book, specify cover boards, spine and hinges, open gutter, curved accumulated paper blocks, signature boundaries, fore-edge/head/tail, free leaves, cover overhang and headbands. Explain which elements have measurable thickness and which marks are printed. Do not substitute curved sheets for the mass of accumulated paper.
>
> For the stand, describe leg sections, apron rails, joints, support under the top, board seams, edge profiles, slope, retaining lip, feet and contact with the floor. Describe the underside as carefully as the visible top. Keep reading posture and seating separate from decorative appearance.
>
> For cabinets, specify per-bay shelf widths, thicknesses and supports; dividers; backing thickness and rebates; rear rails; cornice and skirting profiles; mitres and corner terminations. Describe the cabinet backside separately from the building wall. Specify how panels and shelves fit together.
>
> For windows, describe the opening and reveal, interior and exterior frame profiles, sill, tracery/mullions, solid leading, individual pane boundaries, glass thickness and retention. Separate geometry settings from optical settings. Specify tint, transmission/clarity, roughness, refraction, absorption and surface waviness as measured values if available or proposed ranges if not. Request front, reverse, oblique edge and a construction section. Do not infer stained-glass manufacture from blue colour alone.
>
> For floors and rugs, specify board dimensions, joints, bevels, end grain, perimeter cuts and threshold; textile thickness, backing, bound edge, fringe and compression. For walls and ceilings, specify lining thickness, reveals, springing connections, rib sections and boss joints. Identify decorative construction separately from structural claims.
>
> Define an inspection camera and neutral/grazing light in addition to the atmospheric composition. Require physical movement, object-centred orbit, dolly and underside access. Specify the exterior inspection boundary explicitly: cabinet backs and upper wall/window assemblies only, with a neutral background and no outdoor scenery.
>
> Return a rich visual description, dimensioned component schedule, exploded-layer relationships, material settings, camera/inspection requirements, source-confidence labels and unresolved questions ranked by their effect on geometry and use.

## Generation and validation contract

Use closed solids for intended solid components. Curved paper blocks and individual leaves need joined edge surfaces. Sweep ends need caps. Check positional-weld topology so UV/shading seams do not appear as false holes. Validate face winding, finite coordinates and positive signed volume. Preserve thickness in clay mode; avoid using double-sided materials to conceal missing backs.

Keep all shelf books as physical multi-part objects at every distance. Use instancing and batched opaque geometry for repeated parts, retain per-part picking bounds, and add nearby binding details within 650 mm. Selected binding detail remains pinned. Update static shadows when geometry/visibility changes rather than recomputing them during every camera move. Balanced rendering uses a half-resolution transmission pass for distant glass and restores full resolution for nearby glass and the inspection specimens.

Automated checks cover keyboard travel, actual dolly with unchanged lens, a route around the stand, collision/tunnelling, camera preservation, saved-state reload, two-touch gestures, glass preset transfer and JSON error handling, room alternatives, plan/section, narrow screens, local/CDN/embedded loading, and shader/runtime errors. Topology checks cover constituent geometry before opaque batching.

The recorded run in `verification.json` checked **1,447 unique solid geometries**, with zero open boundary edges, inconsistent edges, non-manifold edges, or non-finite coordinates. A 60-frame navigation sample at **1920 x 1080** on the available Intel Arc 140V measured approximately **35.4 fps**; some frames exceeded the average, so this is a measured run rather than a universal performance guarantee.

Run `node build-preview.mjs`, `node server.mjs`, and `node check-preview.mjs` from this directory. The viewer is at `http://127.0.0.1:4190/`. Both local and inline builds use Three.js 0.186.1. The checks create close-up screenshots and refresh `verification.json`.

## Corner-interference correction

The earlier topology audit established closed meshes, but did not establish clearance between different objects. The previous fixed 75 mm cabinet end setback allowed deep cabinet runs and books to enter neighbouring runs at the polygon corners. The baseline placement audit recorded 40 overlapping book-envelope pairs, 508 book/cabinet interference records, 28 book/pier records and 57 book/lamp records; multiple records may concern the same book.

Cabinet end setbacks now depend on actual depth and corner angle: (depth + 60 mm) * tan(pi / wallCount) + 80 mm. The default 320 mm-deep octagonal room reserves approximately 237 mm at each end. Finished side panels terminate before the solid corner pier. Capacity is now 1,006 books at default dimensions; reducing the storage count avoids packing books into intersecting corner volumes. Cornices and skirting use mitred closed profiles, including the entry-wall returns. Lamps project far enough forward to clear the actual bookshelf front. Spine bands follow the curved binding rather than floating in front of it.

Floorboards are rectangular before polygon clipping, with consistent joints and bevel allowance; the subfloor ends at their underside instead of occupying the same space. Books rest 0.2 mm above their shelf tops.

Run node check-placement.mjs separately from node check-preview.mjs. The placement test uses oriented book envelopes, transformed triangle/box intersection, containment checks and corner-bisector limits. Tolerance is 0.2 mm. The default room and all 16 endpoint combinations of 6/8 sides, width 3.5/5.0 m, height 3.2/4.2 m and depth 250/450 mm pass without the tested unwanted intersections. placement-before.json records the baseline and placement-verification.json records the corrected configurations and solid audit. Normal assembled joints and textile binding layers are distinct from books penetrating neighbouring furniture.

Add this instruction to extraction/generation prompts: define the corner junction and the clearance envelope of each cabinet run before distributing books. Recompute available shelf length when depth, room angle or pier size changes. Validate neighbouring object placement separately from solid topology.

---

# Reusing the window assembly

The component is procedural and needs only the supplied Three.js namespace. It does not load images, models or outdoor scenery.

```js
import * as THREE from '/vendor/three.module.js';
import {createWindowAssembly, GLASS_PRESETS} from './window-assembly.mjs';

const spec = {
  geometry: {
    profile: 'pointed', // or 'rectangular'
    width: .92, height: .93, archRise: .55,
    frameWidth: .043, frameDepth: .10,
    paneThickness: .004,
    leadingWidth: .006, leadingDepth: .009,
    mullionWidth: .024
  },
  glass: {...GLASS_PRESETS.blue}
};
const gothic = createWindowAssembly(THREE, spec);
scene.add(gothic);

const rectangular = createWindowAssembly(THREE, {
  geometry: {...spec.geometry, profile: 'rectangular'},
  glass: {...spec.glass}
});
rectangular.position.x = 1.2;
scene.add(rectangular);

// Change optical properties without reconstructing the assembly.
gothic.userData.setGlass(GLASS_PRESETS.clear);
rectangular.userData.setGlass(GLASS_PRESETS.clear);

// A closed construction-section specimen shares this assembly's material.
const section = gothic.userData.createSection();
section.position.x = 2.2;
scene.add(section);

// Serialise only the configuration, never functions or scene objects.
const json = JSON.stringify(gothic.userData.spec, null, 2);
const anotherWindow = createWindowAssembly(THREE, JSON.parse(json));
```

Coordinates: metres, Y up; opening bottom at Y=0, horizontal centre X=0, glass centre Z=0. Front is +Z. Frame depth extends in both Z directions. Pointed openings use a two-centred arch; `archRise` controls the fraction of opening height above the springing line. It is independent of the glass.

`glass.tint` is absorption colour, not self-emission. `absorptionDistance` is in metres. Roughness, refractive index, transmission and surface waviness can be copied to a different opening shape. Pane thickness is geometry and must be transferred deliberately; changing it requires rebuilding the assembly. A useful comparison needs visible objects behind the glass and lighting/reflections around it. This renderer approximates transmission; it does not simulate caustics or spectral dispersion.

`normalizeWindowSpec(input)` returns a validated, bounded specification. Unspecified fields use study defaults. Export the resulting specification after editing; the viewer also provides JSON Export and Import. A JSON import does not execute source code.

The returned group contains a solid frame, front/back retaining beads, sill, individual closed panes merged for rendering, solid cames and a central mullion. Metadata includes `spec`, `panes`, `paneCount`, `setGlass`, `createSection` and `dispose`. The section specimen shares its owner's materials and follows optical changes. Position and orient the returned group normally.

Remove the assembly and any section specimens from the scene, then call `window.userData.dispose()` when they are no longer used. Do not dispose the owner while its section is still displayed. The factory owns its generated geometries, normal map and materials.

The pane pattern, frame details, colours and dimensions are proposed prototype construction. Adapting the component to a measured window requires supplying its actual profile, dimensions and glass specification.
