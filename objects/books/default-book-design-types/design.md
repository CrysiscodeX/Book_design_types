# Project Design (PD) — Default Book Design Types

**Version:** 0.3 — editable SVG and Three.js design library  
**Date:** 2026-10-06, Asia/Dubai  
**Status:** Implemented local visual design studio, editable SVGs, shader animation, and portable solid previews; physical fabrication and moving mechanisms remain subsequent work  
**Project root:** `C:\Users\Andre.Olivier\dev\3d-design-drafts\default-book-design-types`

## 1. Intent, assessment, and evidence

Develop a reusable fantasy-book design system for individual skills, tested skill workflows, and saved multilayer evaluation artifacts. Users choose elemental appearance, fantasy ornament, and wizardry style independently of their development stage, project area, or industry.

The v0.1 study provided detailed reference analysis and useful components, but its elemental coverage was concentrated on cyan energy, organic ornament, and solar fire. Motion was mostly pulses and particles; it did not define rank progression or customizable layers. This revision adds three rank anatomies, twelve elemental families with thirty-six rank treatments, six fantasy motifs plus neutral, eight wizardry styles plus neutral, and five authored combination recipes.

Preserve the eight reference looks as inspiration presets, rather than treating them as the whole library or assigning them unverified elemental lore. New designs are authored proposals.

| Evidence status | Meaning |
|---|---|
| visible | Directly discernible in the source image |
| interpreted | A visual reading with alternative explanations |
| proposed | An authored design, implementation, or construction choice |
| unknown | Not established by the sources |

The dimensions below are user-supplied specifications, not measurements of the references. The sources establish no movement, actual material identity, internal binding, hidden fastening, or electrical system.

## 2. Customization model

A design combines **rank + primary element + optional accent elements + fantasy motif + wizardry style + optional ornament choices + content labels**. These are independent settings.

| Choice | Starting rule |
|---|---|
| Rank | Explicitly selected: Initial, Advanced, or Meistro |
| Primary element | One; establishes dominant palette and motion |
| Accent elements | Zero to two distinct additional elements at every rank |
| Fantasy motif | Neutral or one of six starter families |
| Wizardry style | Neutral or one of eight starter disciplines |
| Ornament choices | Optional botanical or other compatible component modules |
| Content labels | Flexible development-stage, project-area, and industry labels |
| Motion preference | Ambient, static, or reduced motion |
| Construction track | Functional book or display prop; select before physical design |

Rank controls complexity, body dimensions, and the elemental-layer budget. It does not restrict aesthetic choices or derive automatically from labels. A software skill may use Nature, a gardening skill may use Metal, and either may use any motif.

**Defaults:** Initial rank; Water as an authored starter element matching the demonstration; no accents; neutral fantasy motif and wizardry style; restrained ambient resting state. The physical construction track remains unspecified until chosen.

Primary and accents share the rank's existing layer budget. Initial can include static accents in its ornament and palette while its one animated layer remains primary-led. Motifs and wizardry styles modify shapes and routes rather than adding uncontrolled extra effect layers.

Custom recipes and new element families can be added without enumerating every possible combination as a fixed book.

### Evidence is separate from appearance

Advanced and Meistro describe the user's declared artifact class and intended content semantics. A selected rank or decorative archive-seal housing is not proof that tests passed.

- A result animation requires an actual linked outcome event: success, failure, or inconclusive.
- An archive indication requires a saved-content reference; it does not imply a successful test.
- Without evidence, show **Unlinked**; for an unresolved or inaccessible reference, show **Unavailable**.
- Evidence labels and inserts are separate from permanent rank markers.
- Ordinary ambient animation must never simulate repeated successful tests or fabricated archived records.

## 3. Canonical dimensions and rank anatomy

L runs along the spine, H across the cover, and B through the closed book. Model axes are X = H, Y = L, and Z = B.

| Rank | Meaning | L | H | B | Millimeter envelope |
|---|---|---:|---:|---:|---|
| Initial | Normal individual skills | 26 cm | 16 cm | 5 cm | 260 × 160 × 50 mm |
| Advanced | Interconnected and tested skills forming a workflow | 31 cm | 21 cm | 8 cm | 310 × 210 × 80 mm |
| Meistro | Saved multilayer evaluations and expanded multiphase testing | 38 cm | 28 cm | 12 cm | 380 × 280 × 120 mm |

These are maximum outer closed-book envelopes including the covers, spine, corner pieces, fixed fittings, and permanently attached relief. Loose ribbons, separate supports, and magical auras are excluded. The temporary v0.1 normalized proxy is retired.

| Feature | Initial | Advanced | Meistro |
|---|---|---|---|
| Cover composition | One dominant skill sigil | One dominant hub with connected subordinate sigils | Nested phase compositions around one hub |
| Framing | Simple border; restrained corners | Linked rails; reinforced-looking corners | Layered frame; decorative archive-seal housing |
| Spine identification | One marker | Two markers | Three markers |
| Focal ornament | Compact plaque/inset | Connected multi-part assembly | Deep layered centerpiece inside B |
| Page treatment | One edge accent | Grouped section accents | Multiple indexed section accents |
| Default elemental layers | One quiet layer | Three coordinated layers | Five coordinated layers |
| Active motion meaning | A skill becomes active | Activity travels through connections | Nested evaluation phases coordinate |
| Label space | Clear quiet band | Clear quiet band | Clear quiet band plus separate status insert |

The H/L ratios are approximately 0.615, 0.677, and 0.737. Thickness increases proportionally as well. Design each rank's page block, frame, and ornament placement separately; uniform enlargement does not produce these envelopes.

The Initial central plaque must remain visually dominant even with accents. Advanced routes establish hierarchy and direction rather than an all-over mesh of connections. Meistro uses nested phase layers with quiet space around the archive/status area rather than covering the face with competing medallions.

Rank must be recognizable from front cover and spine in grayscale, neutral lighting, effects-off, paused, and reduced-motion views. Use marker count, frame structure, and topology as persistent cues. These requirements are checked in the delivered front/spine geometry and neutral/grayscale captures. See the v0.3 verification record for the limits of the visual review.

### Fixed-relief budget

Treat B as the entire closed thickness. Before geometry or fabrication, allocate it among pages or simulated block, front/rear boards, liners, fixed relief, and mounting clearance. Do not add a medallion on top of an already full-thickness body.

Visual model board depths of 4/5/6 mm are now allocated; these are proposed modeling values, not production gauges. No physical page count, tolerance, or binding method is selected. Real usable page dimensions are an open decision distinct from the now-resolved outer envelope. Curled or overhanging reference forms must be fitted or reinterpreted within the appropriate rank envelope.

## 4. Preserved reference inspiration

The complete image-by-image evidence remains in the [reference study](./Part_1-Engine-Root/planning/reference-breakdown.md). Original names, images, markings, reference IDs, and v0.1 palette values are preserved.

| Reference | Visual inspiration | Preserved limitations |
|---|---|---|
| book-01 — Turquoise arcane | Fine geometric sigil; turquoise grain; two fitting-like assemblies; trailing chains | Fitting operation, symbol meaning, materials, and ground mark unknown |
| book-02 — Dark angular gold | Layered angular centerpiece; aged cover; rough circular surround; candlelit tabletop | Surround identity and central light source ambiguous |
| book-03 — Cyan chained | Thin border; banded spine; gold chain; cyan/amber contrast | Exact center symbol and chain anchors unknown |
| book-04 — Purple botanical | Delicate corner filigree; curling luminous plant-like paths; multicolor nodes | Material, joints, node count, and physical relief uncertain |
| book-05 — Organic growth | Dense root-like frame; pointed central shapes; fine fringe | Frost/moss/coral interpretation unresolved |
| book-06 — Antler flame | Animal-mask-like centerpiece; branches; flowers; curled cover | Motif identity, support, and working cover curl unknown |
| book-07 — Fiery solar | Heavy solar rings/rays; copper-gold rails; red ribbons | Actual construction and tab function unknown |
| book-08 — Blue ceremonial solar | Fine gold frame; corner bosses; green accents; bookmark | Reflective center remains non-emissive in the reference preset |

Legacy reference presets do not have an assigned rank. New rank adaptations of them are proposed designs, not discoveries about the source books. Book-08's authored Light or Celestial derivatives may add light effects, but the reference preset keeps its reflective interpretation.

## 5. Elemental, fantasy, and wizardry vocabulary

The [curated aesthetic catalog](./Part_1-Engine-Root/planning/aesthetic-catalog-v02.md) gives each element its palette, surface, form, lighting, physical translation, and three distinct animation treatments. The [design data](./Part_1-Engine-Root/planning/design-system-v02.json) provides stable IDs and the corresponding thirty-six rank records.

| Element | Surface and form direction | Initial signature | Advanced signature | Meistro signature |
|---|---|---|---|---|
| Fire | Copper and charcoal; scorched grain; flame relief | Ember movement | Directed flame channels | Circulation, sparks, heat shimmer |
| Water | Blue/turquoise/pearl; smooth inlays; flowing curves | Surface ripple | Connected rivulets | Interwoven currents, droplets, caustic-like light |
| Earth | Umber/slate/ochre; stone-like strata | Mineral-line illumination | Sequential strata routes | Fracture paths, stone fragments, mineral dust |
| Air | Pale blue/ivory/silver; feather and spiral forms | Line drift | Directed streams | Ribbon vortices and edge motes |
| Ice | Frost white/glacial blue; translucent-looking facets | Frost shimmer | Frost-traced routes | Faceted halos, snow, shallow mist |
| Lightning | Indigo/electric blue/brass; angular channels | Moving charge point | Controlled arcs | Staggered branches and field halo |
| Metal | Iron/bronze/silver; ordered reflective ridges | Moving highlight | Linked field-line patterns | Coordinated sheen and digital filings |
| Crystal | Amethyst/quartz/opal; facets and lattices | Facet glint | Light between nodes | Refraction-like overlays and spectral paths |
| Light | Ivory/warm gold; radial geometry | Central glimmer | Connected rays | Nested coronas and constellations |
| Shadow | Ink/violet/charcoal; recesses and negative space | Ink-like motion | Silhouette routes | Layered veils and contour light |
| Nature | Moss/jade/bark; roots/leaves/flowers | Bud glow | Vine routes | Canopies, pollen-like motes, growth overlays |
| Decay | Verdigris/ash/amber; patinated intact relief | Patina shimmer | Erosion-like light routes | Dissolve/reform overlays around a stable body |

No starter list can exhaust every fantasy tradition. This is an extensible authored vocabulary. Lightning avoids rapid flashing and full-scene flicker. Shadow retains readable edges and labels. Decay does not dissolve the solid book or imply deletion of saved content.

Fantasy families: **Draconic; Fae; Beast and guardian; Celestial; Underworld; Ancestral and spirit**, plus neutral. They alter silhouette and ornament without forcing an element.

Wizardry disciplines: **Sigilcraft and warding; Evocation and channeling; Alchemy and transformation; Illusion and glamour; Enchantment and binding; Divination and temporal magic; Summoning and spatial magic; Soulcraft and necromancy**, plus neutral. Each has specified emblem construction, inscription treatment, material accents, and motion modifiers.

### Combination hierarchy

One primary element establishes the dominant palette and motion; up to two accents occupy subordinate ornament or existing effect channels. Use one focal motif and clear label/inscription space. A useful composition target is roughly 70% primary, 20% first accent, and 10% second accent where both are present; it is an art-direction guide rather than a renderer formula.

| Recipe | Primary | Accents | Composition |
|---|---|---|---|
| Steam | Water | Fire | Warm crossings in cool flowing routes; restrained vapor |
| Molten stone | Fire | Earth | Hot seams within readable rigid strata |
| Sandstorm | Earth | Air | Stable grain and strata with sparse directed motes |
| Thunderstorm | Air | Lightning; Water | Air circulation leads; ordered arcs and small droplets support |
| Frost-bound nature | Nature | Ice | Visible vine relief with selective frost tracing |

Custom combinations use these same hierarchy and layer-budget rules. They do not create a new rank or industry category.

## 6. Materials, shaders, and colors

The eight original swatch sets remain in [reference palette data](Part_3-Outer-Look-Shell/palettes/book-palettes-v01.json). Twelve new five-color palettes are in [element palette data](Part_3-Outer-Look-Shell/palettes/element-palettes-v02.json). All hex values are authored sRGB swatches, not authenticated physical samples.

Retain cover, metal-looking ornament, painted ornament, paper-edge, organic relief, node/lens, ribbon, and scene surface profiles. Extend them with twelve elemental profiles in the [shader specification](./Part_3-Outer-Look-Shell/guides/materials-shaders-shader-spec-v01.md).

Material appearance does not establish construction material. Gold-painted ornament remains distinct from a digital solid-metal interpretation. Refraction-like Crystal effects do not promise actual optical refraction in a physical prop.

For each element, specify base surface, fine detail, silhouette relief, animated overlay, explicit local lighting where needed, and optical/scene-only effects separately. The stable body remains opaque/readable underneath Shadow, Illusion, or Decay overlays.

The implementation uses ACES tone mapping, family-specific PBR materials, embedded procedural maps, capped bloom, and twelve live shader families. The richer catalog remains look-development guidance; see sections 15–17 for actual geometry, values, optical approximations, and measured resource checks. No physical material or target GPU budget is certified.

## 7. Lighting and presentation

Retain the eight reference rigs and neutral inspection rig in the [lighting specification](./Part_3-Outer-Look-Shell/guides/lighting-presets-lighting-presets-v01.md). Add one authored elemental rig direction per starter element.

- Fire and Light emphasize restrained warm local sources.
- Water and Ice use cool accents with readable neutral fill.
- Earth and Decay use raking light to reveal relief and patina.
- Air uses broad soft highlights and restrained effect opacity.
- Lightning uses small steady local sources with slowly varying activity.
- Metal derives its primary identity from reflection; emission is optional.
- Crystal uses controlled facet highlights and localized node light.
- Shadow keeps neutral fill and subtle contour light.
- Nature balances warm surface tones with selected green accents.

Higher rank expands coordinated light/effect coverage without raising the whole scene exposure. Scene surface response follows its material: rough stone and wood do not become mirrors merely because Water is selected.

Inspection views disable magical layers, blur, and vignette while preserving ordinary light, reflective material response, and contact shadows. Future review views include front, spine, fore-edge, top, three-quarter, and exploded assemblies.

## 8. Effects and layers

The [effects catalog](./Part_1-Engine-Root/planning/effects-breakdown.md) preserves FX01–FX18 and adds authored elemental effects FX19–FX30 plus routing, phase, focus, outcome, and archive effects FX31–FX35.

Default simultaneous elemental layers are 1 / 3 / 5 for Initial / Advanced / Meistro. A layer means an independently described elemental appearance channel; it is not an automatic particle emitter. A reflective highlight can be a Metal layer without particles or emission.

Motif and wizardry routing modify these layers. Accents occupy them. State feedback replaces an emphasis treatment rather than silently increasing the persistent elemental layer count. Higher rank resting motion is quieter than its active sequence.

Separate geometry, surface masks, local light sources, airborne/translucent effects, and presentation processing. Magical effects can be disabled while rank and element remain recognizable through ornament and material.

Physical translations distinguish **attached parts**, **practical illumination**, and **scene/optical approximations**. Floating stone fragments, detached flames, suspended droplets, spectral lattices, and shadow veils are not ordinary fabrication parts.

## 9. Animation states and meaning

The delivered motion is authored preview behavior. Existing reference loops remain legacy inspiration; the [animation specification](./Part_3-Outer-Look-Shell/guides/animations-presets-animation-presets-v01.md) now defines rank-based behavior and shared states.

| State | Entry/context | Behavior | Evidence boundary |
|---|---|---|---|
| Resting | Default or return from another state | Quiet rank-appropriate ambient layers | No result/archive assertions |
| Focused | Selection/focus request | Brief emphasis on selected component | Appearance-only interaction |
| Active | Explicit activity request | Single-sigil, routed-workflow, or nested-phase motion | Preview activity is labeled as a preview |
| Outcome | Actual linked result event | Brief success/failure/inconclusive response | Requires result evidence; never an idle loop |
| Archived | Saved-content reference | Stable archive indication and subdued element activity | Saved content does not prove successful testing |

Proposed starting behavior: resting loops 6–12 seconds at low amplitude; focus emphasis 0.8 seconds; illustrative active routing 1 second per selected node or phase; outcome response 1.5 seconds then return to resting; archive status remains static. These are preview timing choices, not measured execution duration.

Success uses a closed check-shaped cue and **Success** label; failure an interrupted route/cross cue and **Failure** label; inconclusive an open ring/question cue and **Inconclusive** label. Color is supplementary. Missing or unavailable evidence gets a neutral status rather than a fabricated outcome.

Pause freezes the chosen frame. Reset returns to a deterministic start. Animation disabled evaluates a designed static state. Reduced motion disables moving paths, particles, wisps, turntable, and intensity variation while retaining material, rank markers, static elemental ornament, and text/status cues.

Cover opening, page turning, moving hardware, and physical mechanisms remain deferred until binding, attachment, and clearance are designed. Layered evaluation motion does not imply mechanical rotation of a medallion.

## 10. Shared design data and delivered interfaces

[Design-system data](./Part_1-Engine-Root/planning/design-system-v02.json) is version 0.3 at its stable path. [Shared definitions](./Part_1-Engine-Root/design.mjs) generate both vector drawings and Three.js component geometry; [runtime interfaces](./Part_3-Outer-Look-Shell/guides/models-threejs-README.md) document configuration, evidence import, exports, and programmatic use. Stable component IDs and editable Bezier paths connect the two representations.

Configurations preserve rank, exact dimensions through the rank ID, primary/accent elements, motif, wizardry style, botanical and inset-bookmark choices, title, independent content labels, construction intention, quality, and separate optional evidence. Presentation preferences record camera preset, lighting, state, intensity, effects, exploded offset, reduced motion, playback, and time. The studio performs no skill execution or testing.

Neutral/grayscale inspection suppresses magical effects. Component selection identifies proposed geometry. Outcome and Archived options are disabled without supplied linkage. Imported provenance is displayed as provided, never independently verified. The studio does not resolve remote references; available:false is a supplied unavailable-record flag.

Exports: editable SVG of any named view; current-camera PNG; restorable configuration JSON; closed portable Three.js solid JSON. Solid exports exclude scene environment, lights, ground, airborne effects, and selection helpers. PBR parameters, embedded textures, and component metadata persist. Live shader motion requires the supplied project source and configuration. Offline solid regeneration uses an embedded Latin pixel font; studio exports preserve canvas typography. These meshes are not manufacturing solids.

## 11. Physical tracks and the first demonstration

The [construction study](./Part_1-Engine-Root/planning/physical-construction-options.md) retains functional-book and display-prop alternatives and adds rank/element considerations.

Functional books require usable page formats, binding, flexible joints, realistic ornament mass, handling clearance, and compatible lighting. Display props can use simulated page edges, cavities, service panels, and fixed decorative hardware. Neither track is certified or dimensioned for fabrication by this document.

Envelope arithmetic must include fixed relief. A thick Meistro body does not establish a real page count or require its entire interior to be solid paper. Supports and loose accessories are separate.

### Demonstration: Water + botanical ornament + sigilcraft

[Demonstration specification](./Part_1-Engine-Root/documents/water-botanical-sigilcraft-demo-v02.md) documents three proposed compositions:
- Initial: one ripple sigil, compact botanical ornament, one spine marker, one quiet Water layer.
- Advanced: connected flowing ward circuits, subordinate botanical nodes, two spine markers, three coordinated Water layers.
- Meistro: nested current/phase layers, decorative archive-seal housing with a separate **Unlinked** status, three spine markers, five Water layers.

Botanical ornament is a component choice; it does not automatically select the Nature element or Fae motif. The demonstration has no linked outcome evidence and no saved archive; outcome/archive behavior is described but not shown as a real result. It is now implemented in the running studio, 21 editable preset views, three portable assemblies, and captured screenshots. The demonstration remains Unlinked.

## 12. Decisions, revisions, and remaining work

The [decision log](design.md#decisions-and-outstanding-work--v03) closes the outer-size and axis/envelope decisions, selects the first design demonstration, and records the new default behavior. Page format, binding, actual back fastening, production materials, power/access, fabrication methods/tolerances, and target-device performance acceptance remain open. Proposed backs are modeled and resource behavior has been measured locally.

The prior complete v0.1 documentation, data, eight original images, and verification record are preserved in [the snapshot](../../../history/content/eaabc1b58094-README.md), with a hash manifest. The master remains in this same file; its historical filename is retained for existing links. Supporting v01-named working specifications also retain stable paths while their document versions advance to 0.3. The pre-implementation v0.2 documentation/data is preserved in [its hash manifest](../../../history/book-ranks/v0.2-manifest.json).

All project planning, data, documents, models, effects, materials, scripts, caches, and exports remain under this project root. The separate table project is not part of this revision.

## 13. Acceptance criteria and practical limits

Documentation acceptance:
- Three exact user-supplied envelopes and unambiguous included/excluded components.
- Twelve distinct elements with material, form, lighting, physical translation, and thirty-six 1/3/5-layer treatments.
- Six fantasy motifs and eight wizardry styles, each with neutral and authored shape/material/motion direction.
- Five explicit recipes, independent labels, and a three-rank demonstration.
- Updated component/effect IDs with consistent links and evidence statuses.
- Preserved reference hashes and verified v0.1 snapshot.
- No remaining active normalized-proxy sizing rule.

Visual and future physical acceptance:
- Rank readable in grayscale and neutral/effects-off views.
- Fixed relief fits each outer envelope and body layouts match changing proportions.
- Primary/accent hierarchy and readable quiet label space in combined designs.
- Element identity and rank retained in static/reduced-motion modes.
- No rapid Lightning flashing; Shadow and Decay keep stable readable bodies.
- No outcome or archive assertion without linked supporting information.
- Physical attached, illuminated, and scene-only effects clearly separated.

Document checks and executed geometry/browser checks are recorded separately. The delivered visual models are tested; physical feasibility, electrical performance, binding, real material choice, and production tolerances remain unverified.

## 14. Supporting catalogs

- [Reference study](./Part_1-Engine-Root/planning/reference-breakdown.md)
- [Component inventory](./Part_1-Engine-Root/planning/component-inventory.csv)
- [Aesthetic and rank-treatment catalog](./Part_1-Engine-Root/planning/aesthetic-catalog-v02.md)
- [Design data](./Part_1-Engine-Root/planning/design-system-v02.json)
- [Effects catalog](./Part_1-Engine-Root/planning/effects-breakdown.md)
- [Physical construction study](./Part_1-Engine-Root/planning/physical-construction-options.md)
- [Decision log](design.md#decisions-and-outstanding-work--v03)
- [Element palettes](Part_3-Outer-Look-Shell/palettes/element-palettes-v02.json)
- [Shader specification](./Part_3-Outer-Look-Shell/guides/materials-shaders-shader-spec-v01.md)
- [Effect presets](./Part_3-Outer-Look-Shell/guides/effects-presets-effect-presets-v01.md)
- [Lighting presets](./Part_3-Outer-Look-Shell/guides/lighting-presets-lighting-presets-v01.md)
- [Animation states and presets](./Part_3-Outer-Look-Shell/guides/animations-presets-animation-presets-v01.md)
- [Demonstration](./Part_1-Engine-Root/documents/water-botanical-sigilcraft-demo-v02.md)
- [Verification record](./checks/verification.md)

## 15. Implemented geometry allocations and preview controls

All allocations below are authored visual dimensions in millimeters. Every fixed module uses the same rank allocation, including optional motifs, styles, accents, and the inset bookmark. No fixed component increases the outer envelope.

| Allocation | Initial | Advanced | Meistro |
|---|---:|---:|---:|
| Canonical L/H/B | 260/160/50 | 310/210/80 | 380/280/120 |
| Combined front/rear relief allowance | 6 | 10 | 16 |
| Reserved rear relief | 0.8 | 0.8 | 0.8 |
| Covered body region | 44 | 70 | 104 |
| Front and rear board depth, each | 4 | 5 | 6 |
| Visual page-block depth | 36 | 60 | 92 |
| Rank markers / elemental layers | 1/1 | 2/3 | 3/5 |

Pages are inset 6 mm from spine ends and 5 mm from fore-edge; the spine is an elliptical shell and boards are rounded shapes. Page-edge striations represent paper texture, not a declared page count. Rear relief sits inside B; the central core reaches the front maximum B/2. Fixed fronts, backs, internal parts, and attachments are proposed. Exploded displacement is a separate assembly illustration, not an opening or construction simulation.

Initial has a compact focal plaque and one frame; Advanced has three linked subordinate nodes and two frames; Meistro has four nodes, nested evaluation rails, three frames, and an independent archive housing. The [generated component inventory](./Part_1-Engine-Root/planning/model-component-inventory-v03.csv) records the three demonstration assemblies by rank and component ID. The [reference inventory](./Part_1-Engine-Root/planning/component-inventory.csv) remains the source evidence catalog.

The studio provides all twelve elements, six motifs plus neutral, eight styles plus neutral, five recipes, up to two accents, optional botanical/inset-bookmark ornament, editable title and independent labels, and declared construction intention. Orbit/zoom, six camera presets, component picking, exploded slider, same-scale comparison, neutral/grayscale inspection, intensity, preview/master tessellation, play/pause/reset, and reduced motion are implemented. All remains inside the project folder, with local pinned dependencies and loopback service at 127.0.0.1:4174.

## 16. Implemented materials, shaders, lighting, and motion

Shared PBR foundations use family-specific roughness (Fire .78; Water .32; Earth .93; Air .58; Ice .20; Lightning .48; Metal .22; Crystal .26; Light .42; Shadow .89; Nature .75; Decay .92 for covers), metallic ornament, warm matte paper, procedural cover maps, Water clearcoat, and shallow Ice/Crystal transmission. Actual physical materials are not selected. Scene-only room reflections make Metal reflection-led; a hemisphere, warm key, cool fill, and local elemental point lights support the reference-style presentation. Bloom is restrained and disabled in inspection/reduced-motion views.

| Element | Persistent ornament | Implemented optical/motion approximation |
|---|---|---|
| Fire | Flame-like relief petals | Noisy ember/flame ring with warm circulation |
| Water | Editable curling current tracery | Moving radial ripple/current lines |
| Earth | Mineral seam routes and stratified map | Slowly shifting strata illumination |
| Air | Feather curves | Directed sinuous ribbon streams |
| Ice | Branched lines and facet leaves | Sixfold crystalline spokes and shimmer |
| Lightning | Angular conductor branches | Slowly varying zigzag charge routes; no flash loop |
| Metal | Ordered projecting ridges; brushed map | Moving reflective sheen and field lines; no emissive point light |
| Crystal | Raised diamond inserts | Facet/lattice glints and spectral-colored rings |
| Light | Raised radial rays | Nested corona rings and narrow ray patterns |
| Shadow | Curling veil curves; matte cover | Low-opacity ink/contour veil, with stable body |
| Nature | Leaves and botanical stems | Vine/current overlays and sparse motes |
| Decay | Weathered seams and patina map | Dissolving/reforming patina overlay; body never disappears |

These are controlled artistic shader approximations, not volumetric fluid/heat simulation, physical caustics, snow physics, or optical ray tracing. The richer v0.2 catalog remains an expandable look-development vocabulary. Particles are rank-budgeted and deterministic. One/three/five shader channels remain the rank budget; primary occupies the first channel and accents reuse later ones. Optional outcome glyphs are evidence indicators, not extra elemental layers.

Advanced Active moves along connected paths; Meistro reverses route flow toward the hub and phase-staggers its five channels. Focus lasts 0.8 animation seconds, Outcome 1.5 then returns to Resting; Archived subdues elemental activity. Supplied success uses a check, failure a cross, and inconclusive an open ring alongside a Provided result label. Missing linkage never enables these states. Pause freezes time; Reset time is deterministic. Reduced motion holds shader time at zero and disables particles/path travel.

Physical translations remain in the [construction options](./Part_1-Engine-Root/planning/physical-construction-options.md): attachable relief/inlays differ from practical illuminated channels and scene-only airborne effects. Lighting hardware, translucent diffusion, relief mass, binding clearance, and real material tests must be designed for the chosen functional-book/display-prop track.

## 17. Delivered visuals and measured verification

![Three-rank Water demonstration](./exports/screenshots/three-rank-water-studio.png)

[Neutral](./exports/screenshots/three-rank-neutral.png), [grayscale](./exports/screenshots/three-rank-grayscale.png), [Meistro front](./exports/screenshots/meistro-water-front.png), [exploded](./exports/screenshots/meistro-exploded.png), and [elemental sheet](./exports/screenshots/elemental-reference-sheet.png) provide the visual review record. Rank dimensions, frame count, node topology, markers, and readable labels persist with effects disabled. Lighting and bloom are separate from solid appearance.

The [verification record](./checks/verification.md) reports actual geometry, browser, portability, documentation, hash, and resource checks separately. Screenshots demonstrate this draft's visual identity; they do not certify physical manufacture or authenticated reference reconstruction. Launch/regeneration instructions are in the [project README](./README.md).

## 18. Measured release results

Nine geometry tests pass over 97 configurations; four browser tests pass. Twenty-four editable drawings and three portable assemblies pass file checks. All eight original images and the v0.1/v0.2 snapshots retain their hashes. Detailed evidence and limitations are in the [verification record](./checks/verification.md).

Meistro demonstration: 100,122 master triangles versus 25,646 preview triangles. In an 80-frame live sample on the reported Intel Arc/ANGLE renderer, mean render submission was 2.67 ms (master) and 2.87 ms (preview). These measure submission calls rather than GPU frame completion. Twelve alternating rebuilds returned to stable resource counts. Target-device performance and all physical feasibility remain open.


## Operating details and source handoff

Local, editable SVG and Three.js design studio for Initial, Advanced, and Meistro. All work belongs in this folder. This is a visual design release; binding, opening, page turning, and fabrication remain subsequent work.

Spine remediation (23 October 2026): the three ranks now use closed elliptical cylinders and capped decorative sweeps, including regenerated current JSON exports. This corrects the measured open boundaries; it does not add binding mechanics or certify fabrication. Historical snapshots remain unchanged. See the separate spine-audit repair evidence on http://127.0.0.1:4195/repairs/index.html.

## Launch

In PowerShell, from this folder:

See [current build and verification commands](README.md).

Open [the local studio](http://127.0.0.1:4174). Dependencies are already present in this workspace; installation is only needed after a clean checkout. Three.js is pinned to 0.186.1 and Playwright to 1.63.0 in the local lockfile. No CDN or remote textures are used. The server binds to loopback 127.0.0.1:4174, separate from the table viewer. Stop it with Ctrl+C. A modern WebGL2 browser is required.

Opening demonstration: Initial / Water / botanical ornament / sigilcraft and warding / Unlinked. **Reset defaults** selects Initial / Water / neutral motif and style / no accents or botanical module / resting ambient motion. The demonstration button preserves the current rank.

## Delivered files

- [Master project design](design.md), updated in place to v0.3; historical filename retained.
- [Rank comparison SVG](exports/svg/rank-comparison.svg), [elemental sheet](exports/svg/elemental-reference.svg), and [motif/style study](exports/svg/motif-style-study.svg).
- [SVG directory](exports/svg/README.md): seven editable views per demonstration rank, plus the three sheets, 24 drawings total. Working copies are in drafts/svg.
- [Three.js source and interfaces](Part_3-Outer-Look-Shell/guides/models-threejs-README.md), [shared definitions](Part_1-Engine-Root/design.mjs), and [shader effects](Part_3-Outer-Look-Shell/effects.mjs).
- Three closed portable solid assemblies: [Initial](exports/threejs/book-initial.json), [Advanced](exports/threejs/book-advanced.json), [Meistro](exports/threejs/book-meistro.json).
- Restorable demonstration configurations: [Initial](exports/configurations/water-initial.json), [Advanced](exports/configurations/water-advanced.json), [Meistro](exports/configurations/water-meistro.json), [defaults](exports/configurations/defaults.json).
- [Screenshots](exports/screenshots/README.md), [verification results](checks/verification.md), [design catalog](Part_1-Engine-Root/planning/design-system-v02.json), [runtime component inventory](Part_1-Engine-Root/planning/model-component-inventory-v03.csv), and [reference/component catalog](Part_1-Engine-Root/planning/component-inventory.csv).
- [Reference analysis](Part_1-Engine-Root/planning/reference-breakdown.md), [original index](references/reference-index.csv), [aesthetic catalog](Part_1-Engine-Root/planning/aesthetic-catalog-v02.md), [physical options](Part_1-Engine-Root/planning/physical-construction-options.md), and [decision log](design.md#decisions-and-outstanding-work--v03).
- Immutable [v0.1 snapshot manifest](../../../history/book-ranks/v0.1-manifest.json) and [v0.2 snapshot manifest](../../../history/book-ranks/v0.2-manifest.json). Both retain their original document versions.

## Editing and regenerating

Edit catalog choices in planning/design-system-v02.json (version 0.3; stable filename). Edit ornament curves, dimensions, allocations, and placements in models/shared/design.mjs. SVG and Three.js consume these same definitions. A quality change alters tessellation, while the master curves remain editable. Label, stage, area, industry, and construction intention do not choose an element or rank.

The studio regenerates any of the seven SVG views for the current customization. Export PNG for the current camera, configuration JSON for restoration, or Three.js JSON for a closed solid assembly. The supplied offline JSON models use an embedded pixel font; studio exports retain canvas typography. Long titles are fitted/truncated visually, but their complete text remains in configuration metadata.

Evidence JSON is separate from appearance. Import a supplied sourceRef plus result (success/failure/inconclusive) to enable Outcome; import savedContentRef to enable Archived. Optional provenance is displayed as supplied; available:false disables both states. The studio does not fetch links, execute skills, run tests, or independently verify evidence. Ambient animation never fabricates an outcome.

Portable solid exports contain geometry, PBR settings, embedded textures, and component metadata. Ground, scene lights/environment, airborne effects, selection helpers, and live shaders are excluded. Restore a configuration in the supplied source studio to run animation. These assemblies are visual meshes, not watertight manufacturing solids or fabrication drawings.

Date: 2026-10-06, Asia/Dubai.



# Decisions and Outstanding Work — v0.3

Date: 2026-10-06. Decisions distinguish user-supplied specifications from authored defaults and unresolved production choices. Outer rank dimensions are resolved; usable page format and concealed construction are not.

| ID | Decision | Status / current choice | Needed for |
|---|---|---|---|
| D01 | Outer book dimensions | Resolved by user: Initial 260/160/50; Advanced 310/210/80; Meistro 380/280/120 mm | Rank layouts and eventual dimensioned geometry |
| D02 | First design demonstration | Resolved specification: Water + separate botanical ornament + sigilcraft across all ranks | First visual/model demonstration; no fabrication priority claimed |
| D03 | Functional binding and opening range | Open; no mechanism or angle selected | Moving cover/pages and fit checks |
| D04 | Actual covering/core/ornament materials | Open; authored appearance and physical options documented | Fabrication and assembly |
| D05 | Hidden back and concealed sides | Proposed backs and internal geometry implemented; original concealed construction remains unknown | Complete model |
| D06 | Book-01 fittings and chain anchors | Open; observed shapes do not establish operation | Working closures |
| D07 | Book-02 surround construction | Open; root/thorn/metal-like interpretations preserved | Detailed sculpture |
| D08 | Book-03 exact center symbol | Open; source obscured | Reference-specific linework |
| D09 | Book-05 fringe identity | Open; growth-like designation | Physical material and silhouette |
| D10 | Book-06 motif and cover curl | Open; mask/antler/flame reading; static reference form | Functional reinterpretation and sculpture |
| D11 | Power/routing/control/access/thermal requirements | Open; no electrical specification | Practical lighting |
| D12 | Magical intensity and grading | Implemented 1/3/5 channels; controlled exposure/bloom; authored look captured, further art review open | Look development |
| D13 | Fabrication method/fasteners/tolerances | Open | Production geometry and BOM |
| D14 | Runtime and export interface | Implemented configuration/evidence adapter, SVG/PNG/config/solid export; source interfaces documented | Viewer/export implementation |
| D15 | Device/performance budget | Local repeated-rebuild/resource and render-submission measurements recorded; target-device budget still open | Mesh and effect budgets |
| D16 | Publication/reuse scope | Open; markings preserved; no publishing license inferred | Public sharing |
| D17 | Exact scene-object identities | Some remain unknown | Detailed scene modeling |
| D18 | Physical airborne-effect representation | Options only; no detached-effect construction promised | Display staging |
| D19 | Final swatches/material samples/output transform | Authored palettes supplied; physical/render approval open | Look development |
| D20 | Chain/ribbon/page/cover movement | Deferred pending anchors and binding | Motion implementation |
| D21 | Usable page format and count | Open; outer size does not determine internal paper format | Functional page block and BOM |
| D22 | Dimension axes and inclusion boundary | Resolved by user: L along spine; H across cover; B closed thickness including fixed relief | All rank layouts |
| D23 | Theme organization | Resolved by user: layered elemental/fantasy/wizardry choices | Customization specification |
| D24 | Stage/area/industry labels | Resolved: flexible labels independent of rank and aesthetics | Content description |
| D25 | Element/accent choices and budgets | Resolved specification: one primary; up to two accents at every rank; 1/3/5 default channels | Curated combinations |
| D26 | Evidence/outcome/archive semantics | Resolved specification: appearance separate; actual outcomes and saved linkage required | Implemented gated status behavior |
| D27 | Visual rank recognition | Neutral/grayscale/effects-off review captured; proportions, labels, and topology persist | Grayscale/neutral/effects-off review |
| D28 | Default appearance | Authored: Initial; Water; no accents; neutral motif/style; resting ambient | Starter design |
| D29 | Botanical demonstration ornament | Authored separate module; does not force Nature or Fae | Demonstration coherence |
| D30 | Demonstration relief allowance | Authored visual limits: combined fixed relief ≤6/10/16 mm; not board gauges or tolerances | First modeled layout |

## Decision provenance

D01 and D22 come from the supplied rank sizes and confirmed axis/envelope interpretation. D23 follows the confirmed layered-theme preference. The rank meanings and spelling **Meistro** follow the user's specification. Other resolved appearance/behavior choices implement the accepted plan; Water as the default and the demonstration relief allowances are authored defaults, not source measurements.

The twelve-element list is an extensible starter vocabulary. Six motifs and eight styles are compositional modules rather than fixed complete-book catalogs. Saved-content status is independent of passing tests. Selected Advanced/Meistro rank is the declared content class; do not invent evidence to support it.

## Next-stage release boundaries

Per-rank body/ornament visual allocations are implemented and tested. Before fabrication, choose construction track, usable pages/binding, actual materials, attachments, tolerances, support, and lighting hardware/access. Runtime gates, exports, motion, and resource behavior are checked in this release; physical tests remain open.

Record chosen values, dates, evidence/authorship, and affected files when resolving open items. Update the master PD, catalogs, and inventories together. The preserved v0.1 snapshot is historical and must not be rewritten to match this revision.

