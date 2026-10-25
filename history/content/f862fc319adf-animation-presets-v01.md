# Animation Presets — v0.2

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

## Three-rank animation system — v0.2

The reference loops above are legacy inspiration presets with no assigned rank. Authored designs use the following system and the thirty-six records in [element-rank-presets-v02.json](../../effects/presets/element-rank-presets-v02.json).

| Rank | Default simultaneous elemental channels | Active visual meaning | Persistent static cue |
|---|---:|---|---|
| Initial | 1 | One skill sigil becomes active | Compact plaque; simple frame; one spine marker |
| Advanced | 3 | Ordered activity travels through connected sigils | Linked frame and nodes; two spine markers |
| Meistro | 5 | Nested phases coordinate around one hub | Layered frame and phase relief; three markers; separate status insert |

One primary element and up to two accents are allowed at every rank. Accents share these channels; in Initial they may appear only in static ornament/palette. Motif/style modifiers change routes rather than adding permanent channels. Focus/outcome replaces emphasis within the budget. Higher-rank resting animation remains quieter than its active sequence.

### Shared states and proposed preview timings

| State | Entry | Starting timing | Exit | Evidence rule |
|---|---|---|---|---|
| Resting | Default or return | 6–12 second low-amplitude loops | Focus/active request or linked status event | No success/archive claim |
| Focused | Selection request | 0.8-second gentle emphasis | Return to resting unless explicitly activated | Appearance-only |
| Active | Explicit preview or activity request | Preview routing: 1 second per selected node/phase | Completion/stop; actual outcome if available | Preview labeled; timing not execution evidence |
| Outcome | Actual linked result event | 1.5-second non-looping response | Return to resting; archive only through separate saved-content linkage | Result and evidence association required |
| Archived | Saved-content reference | Stable status; subdued/static element appearance | Selection/activity request or removal of saved linkage | Saving is not a successful-test claim |

Success: closed check-shaped cue + **Success** label. Failure: interrupted route/cross cue + **Failure** label. Inconclusive: open ring/question cue + **Inconclusive** label. Color is supplementary. Missing evidence shows **Unlinked**; inaccessible linked records show **Unavailable**. Appearance rank never creates a result event.

### Per-element motion families

- **Fire:** Initial — Quiet ember movement. Advanced — Directed flame channels; Ember-node echoes; Soft edge heat drift. Meistro — Nested flame circulation; Phase-linked ember nodes; Peripheral sparks; Restrained heat shimmer; Low warm edge aura.
- **Water:** Initial — Small surface ripple. Advanced — Rivulet workflow paths; Ripple-node echoes; Soft edge reflections. Meistro — Interwoven cover currents; Phase-linked ripple nodes; Suspended digital droplets; Caustic-like light patterns; Peripheral liquid-light aura.
- **Earth:** Initial — Slow mineral-line illumination. Advanced — Sequential strata routes; Mineral-node echoes; Soft granular edge drift. Meistro — Nested fracture-path illumination; Phase-linked mineral nodes; Slow digital stone fragments; Strata-depth light gradients; Fine mineral dust halo.
- **Air:** Initial — Gentle line drift. Advanced — Directed stream paths; Breeze-node echoes; Light edge ribbons. Meistro — Layered ribbon vortices; Phase-linked stream crossings; Sparse edge motes; Soft moving feather highlights; Subtle surrounding air veil.
- **Ice:** Initial — Localized frost shimmer. Advanced — Frost-traced workflow routes; Facet-node echoes; Shallow cool edge haze. Meistro — Nested faceted halos; Phase-linked frost fronts; Fine digital snowfall; Shallow mist; Slow crystalline highlight drift.
- **Lightning:** Initial — Small charge-point movement. Advanced — Controlled arc routes; Charge-node echoes; Steady conductor edge light. Meistro — Staggered branching arcs; Phase-linked charge paths; Sparse slow charge motes; Steady conductor highlights; Subtle blue field halo.
- **Metal:** Initial — Moving reflective highlight. Advanced — Linked field-line patterns; Ordered node sheen; Ridge highlight travel. Meistro — Coordinated metallic sheen; Nested field-line patterns; Digital filings drift; Phase-linked ridge highlights; Subtle reflective perimeter response.
- **Crystal:** Initial — Single facet glint. Advanced — Light paths between facets; Crystal-node echoes; Subtle lattice highlights. Meistro — Layered refraction-like overlays; Nested spectral paths; Phase-linked crystal nodes; Luminous lattice gradients; Sparse prismatic motes.
- **Light:** Initial — Soft central glimmer. Advanced — Ray connections between sigils; Warm node echoes; Quiet radial edge glow. Meistro — Nested coronas; Phase-linked rays; Coordinated constellations; Soft radial gradients; Subtle warm perimeter aura.
- **Shadow:** Initial — Slow ink-like movement. Advanced — Silhouette workflow traces; Muted node echoes; Soft recess gradients. Meistro — Nested translucent veils; Phase-linked silhouette paths; Subtle contour light; Slow ink gradients; Sparse peripheral shadow motes.
- **Nature:** Initial — Small leaf or bud glow. Advanced — Vine-like workflow routes; Bud-node echoes; Gentle leaf highlights. Meistro — Branching canopy overlays; Phase-linked vine routes; Pollen-like motes; Synchronized bud gradients; Subtle woodland perimeter aura.
- **Decay:** Initial — Restrained patina shimmer. Advanced — Erosion-like light routes; Patina-node echoes; Fine weathering highlight travel. Meistro — Dissolving and reforming overlays; Nested patina routes; Slow ash-like digital motes; Phase-linked weathering gradients; Subtle verdigris edge aura.

### Static, pause, and reduced motion

Pause freezes the current deterministic frame. Disable animation evaluates a designed static pose. Reset restores the same seeded start. Reduced motion disables drifting paths/particles, wisps, turntable, and varying intensity; retain static material, elemental ornament, rank markers, and text/status cues. No state requires sound.

Lightning avoids rapid flashing/full-scene flicker. Shadow preserves contrast. Decay animates only an overlay; actual content and solid geometry stay intact. Archive decoration stays neutral without saved linkage. Book-08's reference loop remains static/non-emissive; new derivatives may have proposed effects.

Cover opening, page turning, hardware movement, mechanical rotations, and physical lighting controllers remain unimplemented and require separate design. This file describes behavior only.
