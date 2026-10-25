# Effects Breakdown — v0.3

Date: 2026-10-06. Effect IDs link this catalog to the component inventory. Reference numbers correspond to `book-01` through `book-08`.

These are still-image appearances. Digital representations and physical translations are proposed; original render methods and animation are unknown. An effect may consist of several separately adjustable layers.

| ID | Effect / references | Visible or interpreted appearance | Digital layers | Physical interpretation |
|---|---|---|---|---|
| FX01 | Bright core / 01, 02, 03, 07 | Concentrated cyan or amber/yellow brightness; 02 source ambiguous | Core body, luminous mask, local source | Proposed illuminated insert/diffuser; reflection remains possible in 02 |
| FX02 | Bright linework / 01, 03, 04, 06 | Fine luminous-looking lines and borders | Editable paths, luminous overlay, optional local source | Illuminated or light-guiding decoration; uniformity must be developed |
| FX03 | Bright nodes / 04, 05, 06 | Small cyan/violet/pink/amber concentrations | Node body, setting, emitter, local source | Proposed individual lit inserts or passive colored details |
| FX04 | Chain light points / 03 | Amber bright spots associated with links | Chain material, localized luminous points, light spill | Proposed small lights associated with selected links; sources not observed |
| FX05 | Soft halo / 01, 03, 04, 05, 06, 07 | Soft light around bright features | Controlled bloom and/or translucent halo | Optical/photographic appearance, not a solid book component |
| FX06 | Branching energy / 01, 04, 06 | Fine irregular bright branches | Luminous paths and translucent layers | Etched/translucent static decoration or optional projection |
| FX07 | Flame-like wisps / 04, 06 | Blue/violet flame/leaf-like forms | Translucent shapes, soft edges, optional motion | Static translucent sculpture or scene approximation; detached wisps not guaranteed |
| FX08 | Motes / 03, 04, 05, 06; proposed sparse option 07 | Small isolated luminous specks | Bounded particle layer with deterministic distribution | Suspended details, projection, or photographic approximation |
| FX09 | Growth-like edge aura / 05 | Fine blue branching/granular fringe and haze | Growth geometry plus separately controlled haze/particles | Static textured fringe; material identity unresolved |
| FX10 | Page-edge illumination / especially 04, 05, 06 | Cool spill in 04; strong warm edges in 05/06 | Page material with adjacent local source; optional proposed emission | External/concealed light or diffused simulated edge; real paper system unresolved |
| FX11 | Warm ground pool / 05, 06, 07 | Warm brightness under/near book | Local source, ground response, contact shadow | Proposed base/external lighting; source not visible |
| FX12 | Colored surface reflection / 01, 04 | Colored marks/brightness on ground; 01 pale mark ambiguous | Ground roughness, reflection response, optional decal only if justified | Surface finish responding to real light; do not assume the pale mark is a spell |
| FX13 | Upward solar streaks / 07 | Orange/yellow lines extending upward | Transparent streaks or volumetric-looking effect | Staged optical/photographic effect; not a physical cover part |
| FX14 | Candlelight / 02 | Lit candle and warm nearby illumination | Candle body, flame representation, warm light, local variation | Scene candle or later simulated lighting arrangement; implementation unresolved |
| FX15 | Metallic highlights / especially 02, 07, 08 | Bright gold/copper highlights and dark recesses | Reflective material, environment/key light | Metallic-looking finish under appropriate light; not proof of emission |
| FX16 | Background blur / especially 02, 03, 08 | Distant objects soft compared with focal book | Camera/render depth-of-field presentation | Camera and staging choice |
| FX17 | Dark edge presentation / several references | Darkened image edges/background | Optional vignette/backdrop | Camera/staging/finish; not book geometry |
| FX18 | Contact and cast shadows / all | Dark regions under the book and relief | Scene lighting and shadows | Actual staging and support geometry |

## Source ownership and switches

| Effect group | Primary owner | Independent controls |
|---|---|---|
| Core | Core insert / medallion center | Enable, brightness, color, static/pulse |
| Lines/branching | Sigil, border, botanical paths | Enable, brightness, mask, shimmer |
| Nodes | Individual node component | Enable, brightness, phase |
| Chain points | Selected chain-link region | Enable, brightness, glint variation |
| Wisps/motes/streaks | Effect assembly, not solid body | Enable, density, extent, opacity, animation |
| Page light | Page-adjacent lighting assembly | Enable, color, brightness; material emission separate |
| Ground light/reflection | Scene ground and local sources | Light intensity, surface roughness, exposure |
| Bloom | Presentation pipeline | Enable and strength; core intensity remains separate |
| Blur/vignette | Camera/presentation | Enable and strength; inspection mode disables them |

`effectsEnabled` switches magical layers as a group. Normal scene lighting, reflective materials, and contact shadows remain available. Book-08 starts with magical layers off.

## Digital versus physical layer distinction

A visible bright jewel can require a solid jewel-shaped body, a setting, a luminous material, a light source, and a halo. Catalog these responsibilities separately. A physical approximation may use an insert and diffuser, but the electronics are proposed hidden components.

A rendered chain can have a metallic surface plus localized glow; it is not necessarily a physically luminous metal link. Strongly lit page edges may be externally illuminated. Do not automatically label the entire paper block emissive.

Airborne effects require scene-level representation. Keep them out of solid model/fabrication exports unless a physical approximation has explicitly been designed. A scene screenshot includes effects; an exported book mesh may not.

## Animation and review

Animation specifications live in `animations/presets/animation-presets-v01.md`. Still sources establish neither movement nor speed. Review static/effects-off, static/effects-on, paused animation, and reduced motion. Bright effects must retain surrounding ornament detail and plausible light spill. Inspect book-08 with emission off to ensure gold remains convincing through reflective lighting.

## Authored extensions — v0.3

New elemental assignments and motion are **proposed**. They do not reinterpret the original reference observations as verified effects.

| ID | Element/effect | Form and appearance | Physical attached/practical components | Scene-only or optical approximation |
|---|---|---|---|---|
| FX19 | Fire | Flame-shaped relief around scorched-looking grain and copper rails; Nested flame circulation; Phase-linked ember nodes; Peripheral sparks; Restrained heat shimmer; Low warm edge aura | Scorched-looking finish and flame relief; Diffused warm core and routed inserts | Detached flames; airborne sparks; heat distortion |
| FX20 | Water | Smooth pearl-like inlays and flowing cover curves; Interwoven cover currents; Phase-linked ripple nodes; Suspended digital droplets; Caustic-like light patterns; Peripheral liquid-light aura | Flowing relief and smooth colored inlays; Diffused cyan inserts and optional projected patterns | Floating droplets and moving caustic-like patterns require staging or optical approximation |
| FX21 | Earth | Stratified stone-like relief and embedded mineral-line paths; Nested fracture-path illumination; Phase-linked mineral nodes; Slow digital stone fragments; Strata-depth light gradients; Fine mineral dust halo | Stone-looking layers and mineral inlays; Small seam lights or external raking illumination | Floating chips and mineral dust |
| FX22 | Air | Fine feather and spiral relief with generous negative space; Layered ribbon vortices; Phase-linked stream crossings; Sparse edge motes; Soft moving feather highlights; Subtle surrounding air veil | Feather relief and open-looking scroll shapes; Subtle path lighting or external highlights | Suspended ribbons and atmospheric motes |
| FX23 | Ice | Translucent-looking facets and crystalline edges with frost tracery; Nested faceted halos; Phase-linked frost fronts; Fine digital snowfall; Shallow mist; Slow crystalline highlight drift | Faceted translucent-looking ornament and static frost texture; Cool diffused inserts and external rim light | Snowfall and mist |
| FX24 | Lightning | Angular conductor-like relief and branching inset routes; Staggered branching arcs; Phase-linked charge paths; Sparse slow charge motes; Steady conductor highlights; Subtle blue field halo | Angular rails and insulated-looking decorative channels; Diffused steady sources with slowly varying brightness | Detached electrical-looking arcs and motes |
| FX25 | Metal | Ordered ridges and brushed or polished metal-looking plates; Coordinated metallic sheen; Nested field-line patterns; Digital filings drift; Phase-linked ridge highlights; Subtle reflective perimeter response | Metal-looking plates and ridges; External reflective lighting and optional controlled path inserts | Floating filings and field-line visualization |
| FX26 | Crystal | Faceted inserts and lattice relief with opal-like accents; Layered refraction-like overlays; Nested spectral paths; Phase-linked crystal nodes; Luminous lattice gradients; Sparse prismatic motes | Faceted inserts and lattice ornament; Diffused node inserts and external highlights | Dynamic refraction overlays and floating spectral motes |
| FX27 | Light | Radial ivory and warm-gold ornament with clear central geometry; Nested coronas; Phase-linked rays; Coordinated constellations; Soft radial gradients; Subtle warm perimeter aura | Radial relief and ivory-colored insets; Warm diffused center and selected path lights | Detached coronas and airborne constellation points |
| FX28 | Shadow | Recessed carving and negative-space motifs with clear readable edges; Nested translucent veils; Phase-linked silhouette paths; Subtle contour light; Slow ink gradients; Sparse peripheral shadow motes | Recessed dark carving and matte inlays; External grazing light and restrained contour inserts | Moving shadow veils and ink overlays |
| FX29 | Nature | Root and vine rails with leaf and flower relief; Branching canopy overlays; Phase-linked vine routes; Pollen-like motes; Synchronized bud gradients; Subtle woodland perimeter aura | Roots leaves and flowers as fixed relief; Selected bud inserts or external highlights | Animated growth overlays and airborne pollen |
| FX30 | Decay | Patinated rails and weathered relief around a structurally intact book; Dissolving and reforming overlays; Nested patina routes; Slow ash-like digital motes; Phase-linked weathering gradients; Subtle verdigris edge aura | Applied patina and static weathered relief; External raking light and selected accent inserts | Dissolve overlays and airborne ash; solid book remains intact |

| ID | Shared behavior | Appearance | Digital representation | Physical interpretation | Evidence boundary |
|---|---|---|---|---|---|
| FX31 | Workflow routing | Directed activity along authored skill connections | Editable paths and node emphasis within the rank layer budget | Static connected inlays; proposed sequenced practical lights | Active preview or actual activity; connections are not evidence of passed tests |
| FX32 | Nested evaluation phases | Coordinated nested layers around one focal hub | Phase-routed paths and ordered emphasis | Static nested relief; optional controlled lighting | Preview labeled; no fabricated test duration or results |
| FX33 | Focus emphasis | Brief emphasis of a selected book/component | Short controlled highlight within existing budget | Optional local lighting emphasis | Selection-only cue; not a result |
| FX34 | Outcome response | Success check; failure interrupted route/cross; inconclusive open ring/question | 1.5-second labeled evidence-gated response | Optional labeled status insert and lighting after controls are designed | Actual linked outcome event required; no idle successes |
| FX35 | Archive indication | Stable subdued indication next to a decorative housing | Saved-content-linked status and static element appearance | Decorative housing with replaceable status insert | Saved-content reference required; does not imply successful testing |

## Rank budgets and state composition

Initial/Advanced/Meistro use 1/3/5 simultaneous elemental channels. A channel is an appearance layer, not necessarily a particle emitter. Primary motion leads; up to two accents reuse selected channels or remain static. Motif and wizardry paths alter topology without adding unlimited layers.

Resting is restrained; focus and outcome replace an emphasis treatment. Active follows single-sigil, connected-node, or nested-phase routes. Outcome requires an actual linked result event. Archived requires saved-content linkage; a decorative archive housing alone displays Unlinked. Do not treat a failed or inconclusive outcome as a change of elemental identity or rank.

Grayscale, effects-off, and reduced-motion views retain body material, static elemental ornament, and one/two/three rank markers. Lightning avoids rapid flashing; Shadow remains readable; Decay leaves the solid book intact. Legacy book-08 stays reflective and non-emissive.

[Curated rank treatments](aesthetic-catalog-v02.md) · [Design data](design-system-v02.json)

## v0.3 implementation status

The curated vocabulary above remains design guidance. Executable visual geometry, twelve shader families, rank-budgeted motion, inspection lighting, and export behavior are delivered in the local studio. The master PD sections 15–17 record exact implemented values and limitations; the runtime README documents interfaces. Physical construction and fuller optical simulation remain unverified. See `models/threejs/geometry.mjs`, `effects.mjs`, and `viewer.mjs` under the project root, and `checks/verification.md` for measured results.
