# Project Design (PD) — Default Book Design Types

**Version:** 0.1 — first draft  
**Date:** 2026-10-06, Asia/Dubai  
**Status:** Reference-grounded design specification; digital and physical implementation not started  
**Project root:** `C:\Users\Andre.Olivier\dev\3d-design-drafts\default-book-design-types`

## 1. Intent and delivery boundary

Create a reusable design library of ornate fantasy books, preserving eight individual reference variants and documenting the shared forms, components, surface treatments, scenes, and effects. The library should support later SVG drafts, 3D visualization, and physical prop studies.

The physical study has two parallel tracks: a functional book that opens and contains usable pages, and a display prop that can use simulated page edges, a hollow shell, and concealed lighting. A construction choice valid for one track is not automatically valid for the other.

This PD establishes a first design direction. It includes the requested materials, effects, lighting, forms, styles, colors, shader concepts, animation concepts, and outstanding decisions. The supporting reference study and inventories hold the detailed evidence. No manufacturing tolerances, production geometry, electrical design, bill of purchased products, or final measurements are released by this draft.

### Evidence rules

| Status | Meaning | Example |
|---|---|---|
| Visible | Directly shown in an image | Gold-colored chain links in book-03 |
| Interpreted | Appearance has more than one plausible reading | Book-05 fringe could resemble frost, moss, or coral |
| Proposed | Added implementation or construction concept | A diffused light behind a central insert |
| Unknown | The reference cannot establish it | Actual cover material, internal joints, page count |

Design names and color values are authored descriptions. Still images cannot establish movement. A bright surface may be emitting light, reflecting a light source, or simply painted into the illustration; identify these possibilities before implementation.

## 2. Library organization and design vocabulary

Preserve one preset per reference, numbered `book-01` through `book-08`. Reuse components where their construction and appearance are compatible without flattening the differences between variants.

| Family | Members | Shared visual vocabulary |
|---|---|---|
| Geometric arcane | 01, 02, 03 | Angular or circular symbols, fine borders, dark or turquoise surfaces, localized light |
| Botanical / organic | 04, 05, 06 | Stems, leaves, curling tendrils, branching relief, multiple luminous nodes |
| Solar / ceremonial | 07, 08 | Concentric medallions, long and short rays, metallic frames, warm focal colors |

### Assembly layers

1. **Book body:** front cover, back cover, spine, joints, page block, and visible lining.
2. **Structural-looking decoration:** edge rails, corner pieces, bosses, and spine bands. Their load-bearing role is unconfirmed.
3. **Focal assembly:** sigil, angular emblem, botanical motif, organic center, animal-mask motif, or solar medallion.
4. **Secondary ornament:** fine tracery, vines, thorns, flowers, cracks, and decorative symbols.
5. **Accessories:** clasps, hooks, chains, ribbons, bookmarks, and tabs where shown.
6. **Visual effects:** luminous surfaces, halos, wisps, particles, streaks, and projected light.
7. **Scene:** support surface, surrounding props, backdrop, camera, and lighting.

Separate these layers for editing, isolation views, inventory, and later exploded diagrams. Hidden hardware and lighting internals belong in proposed physical assemblies rather than the visible reference inventory.

## 3. Forms, proportions, and size

The foundation is a thick rectangular codex with cover overhang beyond the page block. Variation comes from cover corner shape, spine curvature, page-edge profile, decorative projection, cover separation, and presentation pose.

| Form attribute | Observed range | First-draft treatment |
|---|---|---|
| Cover silhouette | Straight-edged, rounded, scalloped, ornamented corners | Separate silhouette from surface decoration |
| Cover profile | Flat-looking boards, heavy plaques, curled lower edge | Model profile explicitly where it affects silhouette |
| Spine | Rounded, banded, textured, wrapped-looking | Individual body, bands, panels, and cords |
| Page block | Dense fine layers, dark or cream edges, uneven outlines | Main volume plus edge detail; individual sheets reserved for functional motion |
| Relief depth | Fine lines through substantial projecting ornament | Classify as surface detail, shallow relief, or silhouette geometry |
| Pose | Flat, upright, leaning, slightly separated cover | Preserve per-reference presentation; do not infer an opening mechanism |
| Symmetry | Approximate central symmetry with irregular organic details | Keep intentional asymmetry and weathering |

**No absolute size is established.** Image pixel dimensions describe source resolution only. Perspective and framing prevent dependable size comparisons between the books.

For later digital previews, use a temporary normalized proxy with front-face height `1.0`, width `0.75`, and total closed thickness `0.24`. These are **proposed preview ratios**, not measurements or a claim of reference accuracy. Adjust each variant through visual review before exporting drawings. Preserve scale-independent ornament detail; scaling a book should not remove important features.

Physical dimensions remain unset until the intended use, page format, lighting volume, and handling requirements are chosen. Real-world dimensions and tolerances must not be derived from the normalized proxy.

## 4. Eight design presets

### book-01 — Turquoise arcane

**Visible form:** Closed horizontal book seen diagonally from above; textured turquoise front cover, projecting ornamental corners, thick cream pages, bronze-colored fitting assemblies, and fine gold-colored chains beside the spine.

**Style:** Weathered arcane instrument. A bright circular center sits inside curved loops, angular star-like lines, and small circular symbols. Fine branching tracery spreads into the surrounding cover.

**Material direction:** Mottled turquoise covering; darker recessed lines; aged bronze-looking fittings; muted gold-looking chains; warm page edges. Actual materials are unknown.

**Effect direction:** Cyan central light, bright fine lines near the emblem, soft halo, and cool spill on the cover and ground. Treat the pale ground mark as ambiguous rather than automatically making it a projected spell.

**Animation proposal:** Slow center pulse; a sparse, irregular tracing shimmer; almost stationary chains. Any chain motion requires an explicit anchor design.

### book-02 — Dark angular gold

**Visible form:** Thick horizontal book on a wooden tabletop; dark distressed surface, gold-colored corners and framing, rounded spine, tan page edges, and overlapping angular cover pieces.

**Style:** Aged scholarly artifact. The angular center is surrounded by a rough circular root-, thorn-, or metal-like formation. There is an amber luminous-looking opening within the assembly.

**Material direction:** Dark leather-like texture; aged brass/gold-looking ornament; rough dark central surround; tan pages; wood scene props. A small orange loop at the right edge remains an interpreted ribbon-like feature.

**Effect direction:** Restrained amber central light, candlelit warm/cool contrast, soft contact shadows, and background blur. The candle, holder, cup, open background book, closed background books, leaves, and small scattered pieces are separate scene objects.

**Animation proposal:** Small irregular variation in the candlelight and central amber light. No moving emblem or opening action is inferred.

### book-03 — Cyan chained

**Visible form:** Low-angle horizontal book; dark blue-gray cover, thin cyan border, repeated spine bands, dark page edges, and large gold-colored chains along the lower perimeter.

**Style:** Restrained cover design with strong color contrast and prominent chain hardware.

**Material direction:** Dark textured covering; cyan engraved-looking lines; aged reflective chain links; darkened paper edges; rough stone setting.

**Effect direction:** Cyan center plus localized amber chain points and sparse nearby motes. The center's exact pattern is indistinct, so the first draft must not claim an exact symbol reconstruction.

**Animation proposal:** Slow center pulse and asynchronous tiny chain-light flicker. Chain links remain still in the default presentation.

### book-04 — Purple botanical

**Visible form:** Upright book with a slightly separated front cover, dark plum surface, burgundy lining, bronze-looking corner filigree, and tall cream page block.

**Style:** Delicate luminous botanical ornament. Thin stems, curling branches, cyan loops, violet leaf/flame shapes, and warm pink nodes dominate the cover.

**Material direction:** Matte plum covering; thin aged-metal-looking ornament; bright cyan/purple decorative paths; warm page edges; subdued reflective ground.

**Effect direction:** Multiple light nodes, small motes, downward streaks, cover halo, cyan page-edge spill, and blue/pink ground reflections. Distinguish the solid ornament from a luminous overlay.

**Animation proposal:** Phase-offset node pulses, gentle motes, slow wisps, and restrained downward light trails.

### book-05 — Organic growth

**Visible form:** Upright rounded book, heavily sculpted dark cover, thick curling border tendrils, pointed organic central shapes, fine branching fringe, and a warm right page edge.

**Style:** Dense organic fantasy relief. It combines root-like framing, petal or leaf shapes, circular recesses, and jewel-like luminous nodes.

**Material direction:** Dark blue-black base; oxidized-metal- or carved-material-looking relief; cool fringe; luminous colored inserts; amber page edge. The fringe's material identity is unresolved.

**Effect direction:** Cyan and violet nodes, occasional amber points, growth-like edge haze, fine floating particles, and warm underlight.

**Animation proposal:** Staggered slow node pulses and light particle drift. Keep structural tendrils static; any apparent growth motion is a later optional fantasy effect.

### book-06 — Antler flame

**Visible form:** Backward-leaning book; dark ornamental cover, curled lower edge, cream/gold page block, external tendrils, and purple floral details. A pointed lower motif resembles an animal mask or skull.

**Style:** Woodland artifact with branching antler-, flame-, or foliage-like forms above the central mask.

**Material direction:** Worn brown-gray covering; bronze-like scrolls; purple flower details; dark mask relief; blue/violet luminous overlays; warm page edges.

**Effect direction:** Upward blue/purple wisps, orange nodes, faint sparks, strong warm page-edge light, and a woodland ground scene with fern-like foliage, grass/moss, and stones.

**Animation proposal:** Slow upward wisp motion, gentle particle rise, and independent node pulses. The cover curl is initially a static form, not a deforming mechanism.

### book-07 — Fiery solar

**Visible form:** Closed horizontal book; reddish-brown covering, broad curved metallic framing, layered solar medallion, rounded cord-banded spine, cream pages, loose red ribbons, and a worn hanging tab.

**Style:** Heavy elemental sun artifact. Hollow-looking ray details and broad rails distinguish it from the finer ceremonial ornament in book-08.

**Material direction:** Rough red-brown cover; copper/gold-looking medallion and rails; cream pages; red textile-looking ribbons; brown worn tab; wood scene surface.

**Effect direction:** Brilliant yellow-orange center, warm spill across the entire cover, upward light streaks, and restrained airborne sparks.

**Animation proposal:** Slow brightening/relaxation of the core, softly varying streaks, and sparse rising sparks. Medallion rotation is not part of the default design.

### book-08 — Blue ceremonial solar

**Visible form:** Blue book with extensive gold-colored framing, corner plates and round bosses, repeated spine bands, a layered sunburst center, green botanical accents, tan pages, and a blue/gold hanging bookmark.

**Style:** Polished ceremonial book. Nested framing and fine engraved-looking details are more important than luminous effects.

**Material direction:** Textured blue covering; reflective gold-looking relief; subdued green vines/leaves; tan paper; woven-looking blue/gold bookmark; pale carved stone display.

**Effect direction:** Warm environmental highlights and reflected gold light. Core emission, particles, and magical wisps are **off by default** because the reference does not clearly establish them.

**Animation proposal:** Static artifact by default. An optional presentation turntable can reveal changing highlights; it is a presentation action rather than observed artifact behavior.

## 5. Colors and surface materials

The palette file in `materials/palettes/book-palettes-v01.json` supplies authored starting swatches. Hex colors are sRGB design values; they are not pixel samples or verified material colors. Lighting and tone mapping will change their rendered appearance.

| Variant | Cover | Metal/ornament | Pages | Main light/accent |
|---|---|---|---|---|
| 01 | `#087F87` turquoise | `#876036` bronze | `#CBBB91` cream | `#45FFF0` cyan |
| 02 | `#2A2327` charcoal brown | `#B68B50` aged gold | `#B99B71` tan | `#FFD37C` amber |
| 03 | `#142D38` blue-gray | `#BD842B` gold | `#74624B` dark paper | `#38E8FF` cyan / `#FFC04A` amber |
| 04 | `#221127` plum | `#735037` bronze | `#DBC396` cream | `#46D8FF` blue / `#B75AFF` violet |
| 05 | `#101E2B` blue-black | `#536B71` cool relief | `#D6B37D` warm paper | `#53ECFF` cyan / `#CD7DFF` violet |
| 06 | `#302B31` brown-gray | `#7E5B43` bronze | `#E7BF7E` warm cream | `#79D7FF` blue / `#A678FF` violet |
| 07 | `#743325` red-brown | `#D2852D` copper-gold | `#D2B387` cream | `#FFAA24` orange / `#FFF1A3` core |
| 08 | `#36718B` blue | `#D8AE4C` gold | `#C7AC82` tan | `#5B8F73` green; warm reflected highlights |

### Material catalog — proposed implementations

| Material family | Visual features | Digital treatment | Physical options to evaluate |
|---|---|---|---|
| Leather-like covering | Grain, creases, rubbed edges, mottling | Dielectric surface; roughness and fine normal detail | Leather, faux leather, coated fabric, or textured painted surface |
| Cloth-like covering | Fine weave and subdued highlights | Dielectric weave normal and roughness variation | Woven covering or painted texture for a display shell |
| Board/shell core | Rigid body beneath the surface | Solid shell geometry; edges where exposed | Bookbinding board for a functional book; board, wood, or formed shell for a prop |
| Metallic-looking ornament | Reflective crests, dark recesses, worn highlights | Metallic material when depicting metal; separate tarnish masks | Real metal, metallized surface, or painted molded/printed ornament |
| Nonmetal relief | Roots, tendrils, mask, coarse surround | Matte or satin dielectric; geometry at silhouette | Sculpted, molded, carved, or printed decorative parts |
| Paper | Warm layers, fine striations, uneven edges | Matte paper and edge detail | Bound sheets or a simulated page block |
| Jewel/lens | Colored bright nodes, dome or teardrop form | Transparent/translucent body with separate light source | Colored resin/glass-like insert or diffuser; exact material to be chosen |
| Ribbons/bookmarks | Soft loops, hanging strips, decorated surfaces | Cloth-like strip geometry with directional surface detail | Fabric or flexible strip with applied decoration |
| Organic growth | Fine branching, granular fringe | Separate mesh or clustered surface detail | Static textured ornament; identity and material remain open |
| Scene wood | Board seams, grain, worn table surface | Rough dielectric material and seam geometry | Existing or built wooden support |
| Scene stone | Rough rocks or carved pale support | Rough dielectric surface and sculpted edges | Stone-looking formed or carved display elements |

Digital metallic appearance does not prove that a physical component is solid metal. Likewise, apparent gems may be painted or illustrated features. Record the selected physical material only after it is chosen.

## 6. Shader specification

Use renderer-independent PBR concepts as the initial specification. `materials/shaders/shader-spec-v01.md` holds the detailed profiles. No shader code has been authored yet.

| Profile | Proposed controls | Starting behavior |
|---|---|---|
| `cover-dielectric` | Base color, grain, roughness, wear mask, normal depth | Metalness 0; roughness 0.55–0.85; fine detail without changing major shape |
| `ornament-metal` | Metal color, roughness, tarnish, exposed-edge highlights | Metalness 1 for a depicted metal; roughness 0.20–0.50; separate nonmetal tarnish where needed |
| `ornament-painted` | Paint color, roughness, coating wear | Metalness 0; avoid claiming painted resin behaves as solid metal |
| `paper-edge` | Paper color, edge lines, discoloration, roughness | Matte, metalness 0; edge layers finer than the main shape |
| `organic-relief` | Base color, roughness, veins, mottling | Dielectric relief with geometry for projecting tendrils |
| `lens-node` | Tint, opacity/transmission choice, roughness, light mask | Node body remains separable from its emitter and halo |
| `ribbon-cloth` | Color, pattern, roughness, weave, two-sided appearance | Soft dielectric surface; no metalness merely because a pattern looks gold |
| `emissive-line` | Color, mask, brightness, phase, edge softness | Bright controlled paths; avoid making the entire cover luminous |
| `wisp-particle` | Tint, opacity, soft edge, path, lifetime | Transparent effect layer, limited overlap and restrained brightness |

Starting numerical values are authored ranges, not measurements. Treat color swatches as sRGB input and use a consistent linear lighting workflow in the eventual renderer. Select the actual output transform and exposure together during rendering tests; do not silently change them between variant comparisons.

A luminous material, bloom halo, and actual illumination of nearby surfaces are separate responsibilities. If the renderer does not derive scene lighting from a luminous surface, add an explicit light source aligned to that surface. Keep gold reflections readable in book-08 without an emissive shortcut.

## 7. Lighting and cameras

Provide two lighting categories in the future library: **reference presentation** for mood and **inspection presentation** for assessing shape and material. Inspection lighting disables magical effects and uses broad neutral illumination so fine ornament remains visible.

| Rig | Variants | Proposed light arrangement | Camera/scene direction |
|---|---|---|---|
| `cyan-dark` | 01 | Soft cool key, restrained fill, cyan local source | Elevated diagonal view, dark surface |
| `candle-study` | 02 | Warm candle-associated source, soft neutral/cool fill, subtle amber core | Elevated diagonal view, tabletop props, background blur |
| `cyan-amber-chain` | 03 | Cyan local source, amber lights near selected links, cool fill | Low angle emphasizing page block and spine |
| `violet-botanical` | 04 | Cyan/violet cover sources, warm page/top illumination, gentle fill | Upright front/right view, reflective ground |
| `organic-cool-warm` | 05 | Cool node sources, subtle cool rim, warm page/base source | Upright front/right view, dark backdrop |
| `woodland-wisp` | 06 | Cool motif light, warm page/base light, low ambient fill | Backward lean, botanical scene accents |
| `solar-fire` | 07 | Warm center source, broad warm key, restrained fill | Elevated diagonal view on wood |
| `ceremonial-gold` | 08 | Broad warm key, neutral fill, reflective environment | Elevated view on carved pale stone |
| `inspection-neutral` | All | Broad neutral key and fill; effects disabled | Front, spine, fore-edge, top, and three-quarter views |

Preserve contact shadows to show weight and attachment. Light effects should illuminate nearby plausible surfaces rather than indiscriminately tinting the entire image. Ground reflections vary by surface roughness; stone and rough wood should not behave like mirrors.

Camera position, exposure, blur, vignette, and light placement are presentation properties, not physical book components. Use the same inspection camera and exposure when comparing variants. A front view alone is insufficient for checking projecting medallions and tendrils.

## 8. Effects and visual layer order

The detailed effects catalog is in `planning/effects-breakdown.md`. Use the following layer order as the conceptual starting point:

1. Render book geometry, scene objects, and base materials.
2. Apply luminous material masks on selected cores, nodes, and paths.
3. Add local light sources for cover, page, chain, and ground spill.
4. Add separate translucent wisps, energy paths, motes, and light streaks where appropriate.
5. Apply controlled bloom and the agreed output transform.
6. Apply presentation blur/vignette only after inspection views have been checked.

Some renderers reorder these operations internally; preserve the separation of responsibilities rather than relying on a specific pipeline implementation.

### Effect controls

Use a master `effectsEnabled` switch and independent enable/brightness controls for core, lines, nodes, chain lights, wisps, particles, streaks, and underlight. Each effect carries an owning reference ID and source component ID. Presentation blur and vignette have separate controls.

`brightness` and animation amplitudes are artist controls, not physical light units. No absolute electrical power or luminous flux is assigned by this draft. Book-08 defaults to effects disabled, with reflective lighting retained.

Physical translations can approximate a luminous insert, lit line, illuminated page edge, or warm underlight. Floating particles, detached wisps, halos, and airborne light streaks are not ordinary solid parts. Document projection, suspended decoration, or photographic treatment as optional approximations rather than promising an identical in-air effect.

## 9. Animation specification

All animation is **proposed**. There is no evidence of motion, timing, or mechanism in the source images. The default motion direction is calm and restrained rather than continual dramatic transformation.

| Animation | Proposed starting timing | Applicable variants | Behavior and boundary |
|---|---|---|---|
| Core breathing | 5–8 second loop; brightness varies ±10% | 01, 03, 07; subtle option for 02 | Changes light intensity only; retain visible core detail |
| Node breathing | 4–7 second loops with fixed phase offsets; ±12% | 04, 05, 06 | Independent nodes; avoid all nodes peaking together |
| Line shimmer | 8–12 second sweep; low contrast | 01, 04 | Changes a luminous overlay, not the engraved geometry |
| Chain glints | 3–6 second irregular low-amplitude variation | 03 | Local luminous points; no implied chain movement |
| Wisp drift | 6–10 second repeating path | 04, 06 | Gentle upward motion; book-04 may also retain static downward light trails |
| Mote drift | 4–9 second lifetimes with staggered births | 03, 04, 05, 06, 07 | Sparse particles; bounded to a small scene volume |
| Solar streaks | 5–9 second low-amplitude variation | 07 | Slowly varying upward streaks; avoid obscuring medallion rays |
| Candle variation | Small irregular variation over 0.3–1.5 seconds | 02 scene | Local flame/light effect; not full-scene flicker |
| Presentation turntable | Optional 24 second revolution | All | Rotates the displayed artifact or camera; not source-observed motion |
| Cover opening | Deferred pending joint/page design | Functional track | No angular limits or collision behavior assumed yet |
| Ribbon/chain movement | Deferred pending attachment and clearance | Selected variants | Default accessories are static |

Later animation controls should support play/pause, time reset, still-frame export, and a reduced-motion state. Reduced motion disables changing intensity, drifting particles, wisps, streaks, and turntable motion while retaining a stable illuminated appearance. Pausing freezes the selected frame; disabling animation evaluates the designed static state.

Use deterministic seeds for irregular effects so review images are repeatable. Separate core, accessory, particle, and presentation timelines. Animation must not be used to conceal unresolved geometry.

## 10. Digital modeling and drawing direction

The initial digital direction follows the workspace's SVG/Three.js drafting pattern, with all implementation confined to this project. No viewer or mesh is included in this first document delivery.

- Keep common book-body definitions separate from variant ornaments and scene props.
- Use geometry for silhouette-changing features: cover curl, medallion layers, rays, bands, corner pieces, chains, tendrils, and substantial mask relief.
- Use SVG paths and/or surface detail for fine tracery that does not affect silhouette. Preserve important paths as editable sources rather than baking all ornament into one texture.
- Separate page-block edge detail from real page geometry. A display prop can use a single detailed block; a functional opening demonstration requires a suitable page/binding model.
- Preserve variant identity through editable shape and material differences, not just recoloring one mesh.
- Reserve exploded views for attachment and assembly review. Proposed hidden components must carry their evidence label.
- Separate model exports from scene lights, particles, and camera effects; an exported solid book does not automatically reproduce a rendered magical scene.

### Minimal future interfaces

Preset configuration uses `referenceId`, `variantId`, `paletteId`, `lightingPresetId`, `effectPresetId`, `animationPresetId`, and `constructionTrack`. Stable component IDs link geometry, inventory, SVG annotations, and effects. Exact runtime API and export schemas are deferred until implementation begins.

The existing palette JSON is design data; other preset files are human-readable specifications at this stage. There is no current runtime contract or executable public API.

## 11. Physical construction concepts

The companion study in `planning/physical-construction-options.md` describes options, not fabrication instructions.

| Assembly | Functional book concept | Display prop concept |
|---|---|---|
| Core | Bound page block, cover boards, flexible joints | Formed or built shell with simulated page edges |
| Spine | Accommodates opening and page movement | Static shaped spine unless opening is explicitly designed |
| Ornament | Distributed with consideration for handling and board flex | Deep relief and internal mounting space can be considered |
| Closures | Actual attachment points and opening clearance required | Decorative hardware can remain fixed |
| Chains | Anchors and page/cover clearance required | Fixed decorative chain paths possible |
| Bookmark/ribbon | Flexible and compatible with real pages | Fixed posed strip or actual flexible accessory |
| Lighting | Must coexist with usable pages and cover motion | Cavity, diffuser, cable routing, and access panel may be proposed |
| Upright pose | Separate stand or stable presentation support | Stand or concealed support can be incorporated |
| Page-edge glow | Effect may need external or narrowly concealed light | Simulated edge can incorporate a diffused light feature |

Construction materials remain options until size, handling, finish, tools, and lighting are selected. Power source, electrical ratings, thermal behavior, access, and fastening are unresolved. This draft does not specify a battery, mains connection, or real flame construction system.

## 12. Outstanding decisions

| Decision | Why it matters | Current default |
|---|---|---|
| Real-world dimensions and page format | Controls body, ornament, weight, and lighting space | Unset; normalized proxy for later previews only |
| First variant to model/build | Determines the initial implementation effort | Preserve all eight in the catalog; no fabrication priority selected |
| Final cover and ornament materials | Determines finish and assembly | Material appearance specified; physical material options remain open |
| Functional binding and opening range | Controls joints and moving clearances | Unspecified; no opening animation yet |
| Back-cover and hidden-side design | Most hidden surfaces are not shown | Mark unknown; any reconstruction is proposed |
| Book-01 fitting mechanisms and chain anchors | Controls actual operation | Decorative interpretation until mechanically designed |
| Book-02 central surround and amber source | Controls relief and lighting | Preserve ambiguous root/thorn/metal reading |
| Book-03 exact central symbol | Brightness and resolution obscure it | Descriptive approximation only |
| Book-05 fringe identity | Affects material, silhouette, and effects | Neutral "growth-like fringe" designation |
| Book-06 mask and branching motif identity | Affects sculpture and lore | Animal-mask / antler-flame interpretation |
| Lighting hardware and power | Controls cavities, wiring, access, and brightness | No product or electrical specification selected |
| Desired magical intensity | Controls exposure and ornament readability | Restrained, independently switchable effects |
| Fabrication method, tools, and tolerances | Controls part breakdown and details | Unspecified; no production drawings |
| Final renderer/output formats | Controls shader and export implementation | SVG and Three.js direction; exact export contract deferred |
| Asset reuse/publishing scope | Controls downstream use of source-derived imagery | Preserve sources and markings; no publication license inferred |
| Final performance target | Controls effect density and model detail | Unset until viewer/platform requirements exist |

Keep the decision log current. Resolve production-impacting items before fabrication or final runtime implementation. Missing information should remain explicit instead of becoming undocumented assumptions.

## 13. Review and acceptance criteria

For this first draft:

- Eight originals copied unchanged and indexed with dimensions and hashes.
- Every variant has a form, style, material, palette, lighting, effect, and animation direction.
- Book parts, accessories, scene props, visual effects, and concealed proposals are distinguished.
- Both functional-book and display-prop construction concepts are documented.
- Unknown dimensions, mechanisms, identities, and materials remain labeled.
- Required folders exist and all project-specific work remains inside the project root.

For later drawings and models:

- Review neutral front, spine, fore-edge, top, three-quarter, and exploded views.
- Check distinct silhouettes, ornament depth, attachment plausibility, and cover/page clearance.
- Compare effects-on and effects-off views; fine detail must remain readable.
- Review paused and reduced-motion states as well as animated presentation.
- Verify component IDs, palette/preset references, export contents, and consistent scale handling.
- Conduct physical fit, handling, lighting-access, and finish checks only after target dimensions and construction systems are specified.

## 14. Supporting documents and project continuity

- [Reference study](../../planning/reference-breakdown.md)
- [Component inventory](../../planning/component-inventory.csv)
- [Effects catalog](../../planning/effects-breakdown.md)
- [Physical construction options](../../planning/physical-construction-options.md)
- [Outstanding decision log](../../planning/outstanding-decisions.md)
- [Palette data](../../materials/palettes/book-palettes-v01.json)
- [Shader profiles](../../materials/shaders/shader-spec-v01.md)
- [Effect presets](../../effects/presets/effect-presets-v01.md)
- [Lighting presets](../../lighting/presets/lighting-presets-v01.md)
- [Animation presets](../../animations/presets/animation-presets-v01.md)
- [Verification](../../checks/verification.md)

Update this same PD as decisions are resolved, retaining version history in the project. Reserve copied exports for review; the editable master remains in `drafts/documents/`.
