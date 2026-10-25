# Lighting Presets — v0.1

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
