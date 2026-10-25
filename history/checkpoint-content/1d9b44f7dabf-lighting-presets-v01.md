# Lighting Presets — v0.3

Proposed rig descriptions, not executable light configurations. Source position, intensity, and exposure require model-scale and renderer review. Light color names refer to the palette direction rather than physical spectral measurements.

| Preset ID | Reference | Key and fill | Local/source lighting | Camera and support |
|---|---|---|---|---|
| cyan-dark | book-01 | Soft cool key; restrained neutral fill | Cyan center and optional sigil-associated spill | Elevated diagonal; dark ground |
| candle-study | book-02 | Warm candle-associated key; soft cool/neutral fill | Restrained amber center optional | Elevated diagonal; wooden tabletop and scene props |
| cyan-amber-chain | book-03 | Low cool key and fill | Cyan center; localized amber sources near chosen links | Low three-quarter; rough stone |
| violet-botanical | book-04 | Gentle fill and warm top/page lighting | Cyan/violet paths and pink/amber nodes | Upright front/right; slightly reflective smooth ground |
| organic-cool-warm | book-05 | Low neutral/cool fill; cool edge light | Cyan/violet nodes; warm page/base sources | Upright front/right; dark background |
| woodland-wisp | book-06 | Subdued fill | Cool motif sources; amber page/base lighting | Backward lean; woodland scene accents |
| solar-fire | book-07 | Broad warm key; restrained fill | Yellow/orange center source | Elevated diagonal; wooden boards |
| ceremonial-gold | book-08 | Broad warm key; neutral fill; reflective environment | No default magical source | Elevated diagonal; carved pale stone support |
| inspection-neutral | all | Broad neutral key and fill; consistent exposure | Magical sources disabled | Standard front/spine/fore-edge/top/three-quarter views |

## Common rules

- Contact shadows establish weight and prevent a book from appearing to float accidentally.
- Local lights follow the visual source component and illuminate plausible nearby surfaces.
- Keep scene wood and rough stone reflections appropriately subdued; book-04's smooth ground can carry clearer colored reflections.
- Preserve dark recesses and bright metal crests simultaneously. Reduce bloom/exposure if bright centers erase ornament.
- Use matching inspection camera/exposure for comparisons. Reference-camera presets are for presentation only.
- Keep camera blur and vignette separate from the rig, with both disabled for inspection.
- Physical rig design is not established by these digital descriptions; concealed emitters, power, access, and support must be separately specified.

## Authored elemental rigs — v0.3

Each element has a lighting direction rather than a measured source-power configuration. Apply it across all three rank bodies; larger ranks expand coordinated local coverage without changing comparison exposure.

| Rig ID | Element | Proposed arrangement |
|---|---|---|
| lighting-element-fire | Fire | Warm local ember sources with neutral fill; preserve dark relief |
| lighting-element-water | Water | Cool local highlights and soft reflected ground response; avoid a mirror-like paper block |
| lighting-element-earth | Earth | Broad neutral raking light reveals strata; small ochre path lights |
| lighting-element-air | Air | Broad soft key and fine silver highlights; low-opacity cool effect light |
| lighting-element-ice | Ice | Cool rim and diffuse fill; translucent-looking surfaces remain readable |
| lighting-element-lightning | Lightning | Small blue local sources with steady neutral fill; no full-scene flashing |
| lighting-element-metal | Metal | Broad reflective environment and raking highlights; emission not required |
| lighting-element-crystal | Crystal | Facet highlights and restrained tinted local nodes; limit spectral wash |
| lighting-element-light | Light | Broad warm key and restrained luminous center; preserve gold relief |
| lighting-element-shadow | Shadow | Soft neutral fill and subtle violet contour light; never black out labels |
| lighting-element-nature | Nature | Soft green accents with warm neutral fill; preserve natural-looking surface tones |
| lighting-element-decay | Decay | Raking neutral key reveals patina; restrained amber and verdigris accents |

Neutral inspection lighting keeps effects disabled and matching camera/exposure for comparisons. Rank and element must remain readable from solid ornament and material. Restore only the selected magical sources in presentation mode; preserve ordinary scene light and contact shadows.

Physical emitter location, power, wiring, access, and supports remain separate decisions. Metal's reflective direction does not require a concealed light; Shadow does not require an unreadably dark scene. A selected recipe combines the primary rig with restrained accents rather than adding three competing key lights.

[Elemental catalog](../../planning/aesthetic-catalog-v02.md) · [Rank dimensions and design data](../../planning/design-system-v02.json)

## v0.3 implementation status

The curated vocabulary above remains design guidance. Executable visual geometry, twelve shader families, rank-budgeted motion, inspection lighting, and export behavior are delivered in the local studio. The master PD sections 15–17 record exact implemented values and limitations; the runtime README documents interfaces. Physical construction and fuller optical simulation remain unverified. See `models/threejs/geometry.mjs`, `effects.mjs`, and `viewer.mjs` under the project root, and `checks/verification.md` for measured results.
