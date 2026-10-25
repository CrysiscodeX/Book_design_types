# Shader Profiles — v0.1

This is a renderer-independent **proposed specification**, not executable shader code. Numerical ranges are starting design values and require look-development review. Reference materials are not authenticated.

## Common conventions

- Palette hex values are authored sRGB swatches; interpret them through the chosen renderer's color-management system rather than treating them as linear-light values.
- Choose a consistent linear lighting workflow and final output transform/exposure before comparing variants.
- Keep material, geometry, light sources, bloom, and particles separable.
- Surface maps contain fine detail; substantial silhouette-changing ornament requires geometry.
- Relief depth, map resolution, displacement limits, and physical units remain unset pending model scale and renderer selection.
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
