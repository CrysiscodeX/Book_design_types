# Effects Breakdown — v0.1

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
