# Animation Presets — v0.1

All motion is **proposed**. The sources are still images and show no timings or working mechanisms. These human-readable presets describe future behavior; they are not running animations.

| Preset ID | Reference | Starting behavior |
|---|---|---|
| animation-book-01 | book-01 | Core pulse over 6 seconds, ±10% brightness; subtle line shimmer over 10 seconds; chains static |
| animation-book-02 | book-02 | Small irregular candle variation over 0.3–1.5 seconds; optional restrained amber-center variation; emblem static |
| animation-book-03 | book-03 | Core pulse over 7 seconds, ±10%; asynchronous chain glints over 3–6 seconds; sparse motes with 4–9 second lifetimes; chain geometry static |
| animation-book-04 | book-04 | Node loops over 4–7 seconds, ±12% with fixed phase offsets; 6–10 second slow wisp paths; sparse motes; restrained static/downward trails |
| animation-book-05 | book-05 | Node loops over 4–7 seconds, ±12%; sparse 4–9 second motes; all structural growth/tendrils static |
| animation-book-06 | book-06 | Node loops over 4–7 seconds, ±12%; slow upward wisps over 6–10 seconds; sparse rising motes; mask and cover curl static |
| animation-book-07 | book-07 | Core pulse over 5 seconds, ±10%; streak variation over 5–9 seconds; optional sparse rising sparks; medallion static |
| animation-book-08 | book-08 | Static by default; no magical intensity variation |
| animation-turntable | all | Optional 24 second revolution; presentation-only action |
| animation-static | all | Fixed designed illuminated appearance; no time-varying effects |

Timing ranges are design starting points. Irregular effects use fixed seeds and bounded parameters for repeatable reviews. Intensity remains above zero during a breathing loop; these are gentle pulses, not flashes. Exact node positions and particle counts are deferred to modeling.

## Playback controls

- Play/pause: pause freezes the selected frame.
- Reset: return to the same deterministic starting state.
- Disable animation: evaluate the designed static state rather than an arbitrary paused frame.
- Reduced motion: disable turntable, changing intensity, moving wisps, motes, and streaks; retain stable illumination.
- Still export: capture a chosen frame with the effect state recorded for repeatability.

Independent timelines separate artifact lighting, airborne effects, accessory movement, and presentation motion. Cover opening, page turning, moving chains/ribbons, medallion rotation, and actual growth/deformation are **deferred**, pending mechanical/attachment design or a new requested effect.

Physical translation is separate: dynamic lighting requires a chosen control/power system, and moving parts require engineered mechanisms. None is specified or implied by the digital timing proposals.
