# Shader Profiles — v0.3

This is a renderer-independent **proposed specification**, not executable shader code. Numerical ranges are starting design values and require look-development review. Reference materials are not authenticated.

## Common conventions

- Palette hex values are authored sRGB swatches; interpret them through the chosen renderer's color-management system rather than treating them as linear-light values.
- Choose a consistent linear lighting workflow and final output transform/exposure before comparing variants.
- Keep material, geometry, light sources, bloom, and particles separable.
- Surface maps contain fine detail; substantial silhouette-changing ornament requires geometry.
- Visual relief is now allocated at 6/10/16 mm, model units are millimeters, and procedural maps are 128² texels. The implementation does not use displacement maps. Production relief and hardware limits remain open.
- Physical products and digital shader types are independent choices. A gold-painted resin ornament is not physically solid gold.

| Profile ID | Layer | Initial controls | Proposed defaults/ranges |
|---|---|---|---|
| cover-dielectric | Leather/cloth/coated-looking covering | Base color; roughness; grain; normal detail; creases; wear | Metalness 0; roughness 0.55–0.85; no emission |
| ornament-metal | Metal-looking rails/rays/bosses/chains | Metal color; roughness; edge polish; tarnish mask | Metalness 1 for depicted metal; roughness 0.20–0.50 |
| ornament-painted | Painted/molded physical interpretation | Paint color; roughness; coating variation | Metalness 0; roughness 0.30–0.70 |
| paper-edge | Main page-edge material | Warm base; fine layer lines; uneven tint; roughness | Metalness 0; roughness 0.80–1.00; no automatic emission |
| organic-relief | Roots/tendrils/mask/flowers | Base color; mottling; vein detail; roughness | Metalness 0 unless a specifically metallic version is chosen; roughness 0.45–0.85 |
| lens-node | Jewel/lens/diffuser-looking body | Tint; opacity or transmission; roughness; thickness representation | Optical mode unresolved; body separate from light/emission |
| ribbon-cloth | Flexible strip/bookmark | Color; pattern; weave; roughness; reverse-side appearance | Metalness 0; roughness 0.60–0.90 |
| emissive-line | Core/line/node overlay | Color; spatial mask; artist brightness; phase | Controlled mask; independent on/off; no scene-wide glow |
| wisp-particle | Airborne effect geometry | Tint; soft alpha; size; path; lifetime | Restrained opacity; additive vs ordinary blending chosen during renderer tests |
| scene-wood | Table/boards | Grain; seams; roughness; edge wear | Metalness 0; roughness 0.55–0.90 |
| scene-stone | Rocks/pedestal | Base color; roughness; surface variation | Metalness 0; roughness 0.65–1.00 |

## Ornament detail classification

| Detail | Representation |
|---|---|
| Fine engraved-looking scrolls/symbols | Editable vector path plus chosen surface treatment |
| Shallow border relief | Low relief geometry or surface representation after inspection |
| Projecting rays, corners, bosses, tendrils | Geometry with a readable side profile |
| Weathered scratches/soft grain | Surface maps; geometry only where silhouette is affected |
| Dense page layers | Main page block plus edge detail; no invented page count |
| Colored node | Lens/body material, setting material, luminous mask, and explicit local light as needed |

## Effect/material interaction

An emissive-looking material does not by itself define the surrounding light field in every renderer. Align explicit local sources with the visible luminous feature when needed. Bloom creates a screen-space halo; it is not a physical cover layer. Exposure should preserve relief around bright cores instead of washing it out.

Book-08 uses metallic reflections as its starting interpretation. Enabling emission changes that interpretation and must be labeled as a proposed alternate look.

## Later checks

Inspect each material under neutral and reference lighting; check dark recess readability, page-edge texture, metal highlights, transparency overlap, exposure consistency, and effects-off appearance. A render looking similar under one colored light is insufficient evidence that the underlying material matches the reference.

## Elemental profile extensions — v0.3

These twelve authored profiles extend the shared material families. No executable shader code is included. The element palette determines starting colors; lighting/exposure and real physical materials require later review.

| Profile ID | Base material family | Form | Animated/material treatment |
|---|---|---|---|
| element-fire | charred-cover | Flame-shaped relief around scorched-looking grain and copper rails | Static scorched-looking base; separate warm path mask and restrained heat-distortion overlay. Distortion avoids label/status zones. |
| element-water | water-inlay | Smooth pearl-like inlays and flowing cover curves | Smooth inlay base; low-amplitude ripple normals and directed flow mask; caustic-like overlay separately switchable. |
| element-earth | stratified-stone | Stratified stone-like relief and embedded mineral-line paths | Opaque stone-like base; fine strata detail; illuminated seam masks. Digital chips are separate scene effects. |
| element-air | air-filigree | Fine feather and spiral relief with generous negative space | Opaque pale base and fine relief; soft-edged translucent stream paths. Keep broad alpha layers out of label zones. |
| element-ice | frost-facet | Translucent-looking facets and crystalline edges with frost tracery | Frost-detail mask on solid facets; controlled translucent-looking inserts and independent haze; no assumed physical freezing. |
| element-lightning | conductor-inlay | Angular conductor-like relief and branching inset routes | Steady conductor base; slowly moving charge/arcs on a bounded path mask. No rapid flashes or full-scene intensity variation. |
| element-metal | ordered-metal | Ordered ridges and brushed or polished metal-looking plates | Reflective ordered plates with roughness variation and traveling highlights; emission optional; digital filings separate. |
| element-crystal | crystal-lattice | Faceted inserts and lattice relief with opal-like accents | Faceted geometry/material concept with localized node light; stylized spectral/refraction overlays independent of body transparency. |
| element-light | radial-ivory | Radial ivory and warm-gold ornament with clear central geometry | Readable ivory/gold base; radial luminous gradients with controlled exposure; corona is separate from solid ornament. |
| element-shadow | shadow-recess | Recessed carving and negative-space motifs with clear readable edges | Opaque readable recess base; limited translucent ink/veil overlays and contour light. Maintain stable label contrast. |
| element-nature | botanical-relief | Root and vine rails with leaf and flower relief | Stable root/leaf relief; vein and bud-light masks; growth overlays do not deform the solid cover. |
| element-decay | patinated-relief | Patinated rails and weathered relief around a structurally intact book | Stable patinated base; animated erosion/dissolve masks affect only a separate overlay. Never remove book geometry or imply deleted content. |

The rank's 1/3/5 channels select and coordinate masks, paths, highlights, and optional scene effects. They do not increase metalness, transparency, or brightness indiscriminately. Body and fixed relief fit the rank envelope; shader displacement cannot be used to exceed it unnoticed. Normal/surface-detail amplitude and texture resolution must be chosen after geometric scale exists.

Reflection-led Metal can animate with no emissive core. Crystal refraction-like effects are stylized proposals rather than guaranteed optical behavior. Shadow/Decay/Illusion overlays retain an opaque stable base and quiet label/status space. Fine-detail maps remain independent of body scaling.

[Element palette data](../palettes/element-palettes-v02.json) · [Material catalog](../material-catalog-v02.md) · [Thirty-six effect specifications](../../effects/presets/element-rank-presets-v02.json)

## v0.3 implementation status

The curated vocabulary above remains design guidance. Executable visual geometry, twelve shader families, rank-budgeted motion, inspection lighting, and export behavior are delivered in the local studio. The master PD sections 15–17 record exact implemented values and limitations; the runtime README documents interfaces. Physical construction and fuller optical simulation remain unverified. See `models/threejs/geometry.mjs`, `effects.mjs`, and `viewer.mjs` under the project root, and `checks/verification.md` for measured results.
