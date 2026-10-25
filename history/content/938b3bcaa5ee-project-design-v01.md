# Project Design (PD) — Default Book Design Types

**Version:** 0.2 — customizable three-rank design system  
**Date:** 2026-10-06, Asia/Dubai  
**Status:** Design specification and curated catalogs; models, executable shaders, animations, and fabrication drawings remain subsequent deliverables  
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

Rank must be recognizable from front cover and spine in grayscale, neutral lighting, effects-off, paused, and reduced-motion views. Use marker count, frame structure, and topology as persistent cues. These are acceptance requirements for future visual drafts; no rendered proof is claimed in this delivery.

### Fixed-relief budget

Treat B as the entire closed thickness. Before geometry or fabrication, allocate it among pages or simulated block, front/rear boards, liners, fixed relief, and mounting clearance. Do not add a medallion on top of an already full-thickness body.

No board thickness, page count, tolerance, or binding method is selected yet. Real usable page dimensions are an open decision distinct from the now-resolved outer envelope. Curled or overhanging reference forms must be fitted or reinterpreted within the appropriate rank envelope.

## 4. Preserved reference inspiration

The complete image-by-image evidence remains in the [reference study](../../planning/reference-breakdown.md). Original names, images, markings, reference IDs, and v0.1 palette values are preserved.

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

The [curated aesthetic catalog](../../planning/aesthetic-catalog-v02.md) gives each element its palette, surface, form, lighting, physical translation, and three distinct animation treatments. The [design data](../../planning/design-system-v02.json) provides stable IDs and the corresponding thirty-six rank records.

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

The eight original swatch sets remain in [reference palette data](../../materials/palettes/book-palettes-v01.json). Twelve new five-color palettes are in [element palette data](../../materials/palettes/element-palettes-v02.json). All hex values are authored sRGB swatches, not authenticated physical samples.

Retain cover, metal-looking ornament, painted ornament, paper-edge, organic relief, node/lens, ribbon, and scene surface profiles. Extend them with twelve elemental profiles in the [shader specification](../../materials/shaders/shader-spec-v01.md).

Material appearance does not establish construction material. Gold-painted ornament remains distinct from a digital solid-metal interpretation. Refraction-like Crystal effects do not promise actual optical refraction in a physical prop.

For each element, specify base surface, fine detail, silhouette relief, animated overlay, explicit local lighting where needed, and optical/scene-only effects separately. The stable body remains opaque/readable underneath Shadow, Illusion, or Decay overlays.

Keep consistent linear-light rendering and agreed exposure/output transform in future look-development. Bloom must not erase ornament or status text. No executable shader, material map, displacement limit, or GPU budget is delivered yet.

## 7. Lighting and presentation

Retain the eight reference rigs and neutral inspection rig in the [lighting specification](../../lighting/presets/lighting-presets-v01.md). Add one authored elemental rig direction per starter element.

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

The [effects catalog](../../planning/effects-breakdown.md) preserves FX01–FX18 and adds authored elemental effects FX19–FX30 plus routing, phase, focus, outcome, and archive effects FX31–FX35.

Default simultaneous elemental layers are 1 / 3 / 5 for Initial / Advanced / Meistro. A layer means an independently described elemental appearance channel; it is not an automatic particle emitter. A reflective highlight can be a Metal layer without particles or emission.

Motif and wizardry routing modify these layers. Accents occupy them. State feedback replaces an emphasis treatment rather than silently increasing the persistent elemental layer count. Higher rank resting motion is quieter than its active sequence.

Separate geometry, surface masks, local light sources, airborne/translucent effects, and presentation processing. Magical effects can be disabled while rank and element remain recognizable through ornament and material.

Physical translations distinguish **attached parts**, **practical illumination**, and **scene/optical approximations**. Floating stone fragments, detached flames, suspended droplets, spectral lattices, and shadow veils are not ordinary fabrication parts.

## 9. Animation states and meaning

All motion is proposed. Existing reference loops remain legacy inspiration; the [animation specification](../../animations/presets/animation-presets-v01.md) now defines rank-based behavior and shared states.

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

## 10. Design data and future interfaces

[Design-system data](../../planning/design-system-v02.json) is a documentation catalog, not an executable application API. It supplies rank dimensions, thirty-six elemental treatments, motifs, wizardry styles, recipe relationships, defaults, and evidence policies.

A future design description identifies:
- Rank and its canonical dimensions.
- Primary element and zero to two accent elements.
- Fantasy motif, wizardry style, and optional ornament modules.
- Flexible content labels for development stage, project area, and industry.
- Motion preference, presentation state, and physical construction track.
- Optional linked outcome evidence and saved-content references in a separate evidence record.

Stable component IDs connect inventory, future geometry, SVG annotations, and effects. Preserve the reference IDs and their palette file; do not repurpose them as rank IDs. Exact runtime/export schemas and implementation are subsequent work.

Geometry must fit fixed ornament inside the closed envelope. Use real geometry for silhouette relief and editable paths/surface treatments for fine tracery. Rank bodies need separate parametric layouts. Model exports, scene exports, and rendered screenshots have different effect content and must be described accordingly.

## 11. Physical tracks and the first demonstration

The [construction study](../../planning/physical-construction-options.md) retains functional-book and display-prop alternatives and adds rank/element considerations.

Functional books require usable page formats, binding, flexible joints, realistic ornament mass, handling clearance, and compatible lighting. Display props can use simulated page edges, cavities, service panels, and fixed decorative hardware. Neither track is certified or dimensioned for fabrication by this document.

Envelope arithmetic must include fixed relief. A thick Meistro body does not establish a real page count or require its entire interior to be solid paper. Supports and loose accessories are separate.

### Demonstration: Water + botanical ornament + sigilcraft

[Demonstration specification](../../drafts/documents/water-botanical-sigilcraft-demo-v02.md) documents three proposed compositions:
- Initial: one ripple sigil, compact botanical ornament, one spine marker, one quiet Water layer.
- Advanced: connected flowing ward circuits, subordinate botanical nodes, two spine markers, three coordinated Water layers.
- Meistro: nested current/phase layers, decorative archive-seal housing with a separate **Unlinked** status, three spine markers, five Water layers.

Botanical ornament is a component choice; it does not automatically select the Nature element or Fae motif. The demonstration has no linked outcome evidence and no saved archive; outcome/archive behavior is described but not shown as a real result. It is a textual design demonstration, not a generated image or running model.

## 12. Decisions, revisions, and remaining work

The [decision log](../../planning/outstanding-decisions.md) closes the outer-size and axis/envelope decisions, selects the first design demonstration, and records the new default behavior. Page format, binding, back-cover reconstruction, production materials, power/access, fabrication methods/tolerances, and runtime budgets remain unresolved until implementation requires them.

The prior complete v0.1 documentation, data, eight original images, and verification record are preserved in [the snapshot](../../exports/documents/v0.1-snapshot/README.md), with a hash manifest. The master remains in this same file; its historical filename is retained for existing links. Supporting v01-named working specifications also retain stable paths while their document versions advance to 0.2.

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

Future visual/functional acceptance:
- Rank readable in grayscale and neutral/effects-off views.
- Fixed relief fits each outer envelope and body layouts match changing proportions.
- Primary/accent hierarchy and readable quiet label space in combined designs.
- Element identity and rank retained in static/reduced-motion modes.
- No rapid Lightning flashing; Shadow and Decay keep stable readable bodies.
- No outcome or archive assertion without linked supporting information.
- Physical attached, illuminated, and scene-only effects clearly separated.

Passing document checks does not establish model fit, rendering quality, animation behavior, physical feasibility, or electrical performance. Those checks belong to later implemented drafts.

## 14. Supporting catalogs

- [Reference study](../../planning/reference-breakdown.md)
- [Component inventory](../../planning/component-inventory.csv)
- [Aesthetic and rank-treatment catalog](../../planning/aesthetic-catalog-v02.md)
- [Design data](../../planning/design-system-v02.json)
- [Effects catalog](../../planning/effects-breakdown.md)
- [Physical construction study](../../planning/physical-construction-options.md)
- [Decision log](../../planning/outstanding-decisions.md)
- [Element palettes](../../materials/palettes/element-palettes-v02.json)
- [Shader specification](../../materials/shaders/shader-spec-v01.md)
- [Effect presets](../../effects/presets/effect-presets-v01.md)
- [Lighting presets](../../lighting/presets/lighting-presets-v01.md)
- [Animation states and presets](../../animations/presets/animation-presets-v01.md)
- [Demonstration](water-botanical-sigilcraft-demo-v02.md)
- [Verification record](../../checks/verification.md)
