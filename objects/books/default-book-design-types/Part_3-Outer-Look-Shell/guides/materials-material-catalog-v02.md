# Material Families — v0.3

Authored appearance and construction options; no actual source materials are authenticated. The catalog complements shared cover, paper, ribbon, metal-looking, lens, and scene profiles. Numerical roughness/metalness values in the shader specification are proposed rendering starts, not physical measurements.

| Family ID | Element | Surface/form | Shader | Possible physical attached interpretation | Practical lighting versus scene effects |
|---|---|---|---|---|---|
| charred-cover | Fire | Flame-shaped relief around scorched-looking grain and copper rails | element-fire | Scorched-looking finish and flame relief | Diffused warm core and routed inserts; scene-only: Detached flames; airborne sparks; heat distortion |
| water-inlay | Water | Smooth pearl-like inlays and flowing cover curves | element-water | Flowing relief and smooth colored inlays | Diffused cyan inserts and optional projected patterns; scene-only: Floating droplets and moving caustic-like patterns require staging or optical approximation |
| stratified-stone | Earth | Stratified stone-like relief and embedded mineral-line paths | element-earth | Stone-looking layers and mineral inlays | Small seam lights or external raking illumination; scene-only: Floating chips and mineral dust |
| air-filigree | Air | Fine feather and spiral relief with generous negative space | element-air | Feather relief and open-looking scroll shapes | Subtle path lighting or external highlights; scene-only: Suspended ribbons and atmospheric motes |
| frost-facet | Ice | Translucent-looking facets and crystalline edges with frost tracery | element-ice | Faceted translucent-looking ornament and static frost texture | Cool diffused inserts and external rim light; scene-only: Snowfall and mist |
| conductor-inlay | Lightning | Angular conductor-like relief and branching inset routes | element-lightning | Angular rails and insulated-looking decorative channels | Diffused steady sources with slowly varying brightness; scene-only: Detached electrical-looking arcs and motes |
| ordered-metal | Metal | Ordered ridges and brushed or polished metal-looking plates | element-metal | Metal-looking plates and ridges | External reflective lighting and optional controlled path inserts; scene-only: Floating filings and field-line visualization |
| crystal-lattice | Crystal | Faceted inserts and lattice relief with opal-like accents | element-crystal | Faceted inserts and lattice ornament | Diffused node inserts and external highlights; scene-only: Dynamic refraction overlays and floating spectral motes |
| radial-ivory | Light | Radial ivory and warm-gold ornament with clear central geometry | element-light | Radial relief and ivory-colored insets | Warm diffused center and selected path lights; scene-only: Detached coronas and airborne constellation points |
| shadow-recess | Shadow | Recessed carving and negative-space motifs with clear readable edges | element-shadow | Recessed dark carving and matte inlays | External grazing light and restrained contour inserts; scene-only: Moving shadow veils and ink overlays |
| botanical-relief | Nature | Root and vine rails with leaf and flower relief | element-nature | Roots leaves and flowers as fixed relief | Selected bud inserts or external highlights; scene-only: Animated growth overlays and airborne pollen |
| patinated-relief | Decay | Patinated rails and weathered relief around a structurally intact book | element-decay | Applied patina and static weathered relief | External raking light and selected accent inserts; scene-only: Dissolve overlays and airborne ash; solid book remains intact |

## Construction choices

Cover/core options remain bookbinding board and a selected covering for functional books, or a formed/built shell for props. Ornament can be actual metal or a finished molded/printed/carved component; neither appearance nor digital metalness proves the physical choice. Facets can be opaque decorative pieces or translucent inserts. Water does not require actual liquid, Fire no actual flame, and Ice no refrigerated material.

Scene wood/stone and backgrounds remain separate. Keep source-inspired covering grain, weathering, papers, and accessory finishes available across ranks. Do not make every higher rank gold: element-specific materials remain dominant while frame topology and marker count express rank.

All fixed layers fit the canonical outer thickness. Final substrate, coating, attachment, page format, finish samples, and tolerances are open production decisions.

[Shader specification](./materials-shaders-shader-spec-v01.md) · [Element palettes](../palettes/element-palettes-v02.json) · [Physical study](../../Part_1-Engine-Root/planning/physical-construction-options.md)

## v0.3 implementation status

The curated vocabulary above remains design guidance. Executable visual geometry, twelve shader families, rank-budgeted motion, inspection lighting, and export behavior are delivered in the local studio. The master PD sections 15–17 record exact implemented values and limitations; the runtime README documents interfaces. Physical construction and fuller optical simulation remain unverified. See `models/threejs/geometry.mjs`, `effects.mjs`, and `viewer.mjs` under the project root, and `checks/verification.md` for measured results.
