# Effect Presets — v0.2

Human-readable proposed presets; not executable configuration. Effect IDs refer to `planning/effects-breakdown.md`. Brightness is an artist control, not a physical lighting unit.

| Preset ID | Reference | Default magical layers | Presentation layers | Interpretation notes |
|---|---|---|---|---|
| effect-book-01 | book-01 | FX01 core; FX02 linework; FX05 halo; FX06 branches | FX12 restrained reflection; FX18 shadows | Pale ground mark remains ambiguous; no required projected symbol |
| effect-book-02 | book-02 | Optional restrained FX01 amber center | FX14 candle; FX15 highlights; FX16 blur; FX18 shadows | Center emission is proposed; include a reflected-only comparison |
| effect-book-03 | book-03 | FX01 core; FX02 border; FX04 chain points; FX05 halo; sparse FX08 motes | FX15 chain highlights; FX16 optional blur; FX18 shadows | Exact center symbol unknown |
| effect-book-04 | book-04 | FX02 paths; FX03 nodes; FX05 halo; FX06 branches; FX07 wisps; sparse FX08 motes | FX10 edge spill; FX12 reflection; FX18 shadows | Downward trail appearance is separate from optional upward wisp motion |
| effect-book-05 | book-05 | FX03 nodes; FX05 halo; sparse FX08 motes; subtle FX09 haze | FX10 warm page light; FX11 ground pool; FX18 shadows | Attached fringe geometry remains visible with effects disabled |
| effect-book-06 | book-06 | FX02/FX06 branches; FX03 nodes; FX05 halo; FX07 wisps; sparse FX08 motes | FX10 page light; FX11 ground pool; FX18 shadows | Static cover curl; no assumed deforming cover |
| effect-book-07 | book-07 | FX01 core; FX05 halo; FX13 streaks; proposed sparse FX08 sparks | FX11 warm pool; FX15 highlights; FX18 shadows | Keep medallion rings and rays readable |
| effect-book-08 | book-08 | Off | FX15 highlights; FX16 optional blur; FX18 shadows | Reflective default; emissive alternate must be labeled proposed |
| effect-inspection-off | all | Off | FX18 shadows; neutral reflective response | No bloom, blur, vignette, or particle layers |

Controls for later implementation: master magical-effects enable, per-layer enable, artist brightness, particle density, wisp/streak extent, bloom strength, and a distinct animation switch. Keep local scene lights linked to enabled luminous layers where they represent the same source. Preserve ordinary scene lights in inspection mode.

No particle counts, GPU budgets, or actual light-source powers are specified until the renderer/platform and physical targets are selected.

## Authored element/rank presets — v0.2

The eight reference-inspired presets above remain unchanged in identity and are not assigned a rank. New designs use [element-rank-presets-v02.json](element-rank-presets-v02.json): twelve elements × three ranks = 36 proposed specification records.

Each record carries rank dimensions, palette ID, shader profile, authored FX19–FX30 ID, and exactly 1/3/5 named elemental channels. These data are not executed by a current viewer. Shared FX31–FX35 handle routing and evidence-gated status meaning without adding persistent uncontrolled channels.

Primary-led motion and static ornament retain element identity. Accent elements occupy existing channels; motif/style routing modifies them. A custom recipe names one primary and up to two accents. Outcome requires an actual linked result; archive indication requires a saved-content reference. The demonstration has neither and stays Unlinked.

Resting/active, paused, effects-off, and reduced-motion controls must be specified consistently. Fixed-body size and rank do not change when effects are disabled. Physical illumination and scene-only approximations remain documented separately.
