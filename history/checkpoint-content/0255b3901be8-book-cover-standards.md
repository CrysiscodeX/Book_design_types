# 3D Book Cover Technical Standards & Constraints

This reference outlines the technical standards, physical envelopes, and compositional rules for 3D fantasy book covers established in the `default-book-design-types` design system (v0.3).

---

## 1. Canonical Dimensions & Envelopes

Dimensions are measured in millimeters for a closed-book volume:
- **$L$ (Spine length / Height):** Vertical axis ($Y$)
- **$H$ (Cover width):** Horizontal axis across the front cover ($X$)
- **$B$ (Thickness):** Depth axis through the closed book ($Z$)

| Rank | Purpose / Semantics | Dimensions ($L \times H \times B$) | Aspect Ratio ($H/L$) | Maximum Outer Relief Envelope |
|---|---|---:|---:|---|
| **Initial** | Individual standalone skill | $260 \times 160 \times 50\text{ mm}$ | $\approx 0.615$ | $260 \times 160 \times 50\text{ mm}$ |
| **Advanced** | Interconnected workflow | $310 \times 210 \times 80\text{ mm}$ | $\approx 0.677$ | $310 \times 210 \times 80\text{ mm}$ |
| **Meistro** | Multilayer evaluation codex | $380 \times 280 \times 120\text{ mm}$ | $\approx 0.737$ | $380 \times 280 \times 120\text{ mm}$ |

### Fixed-Relief $B$-Budget Allocation
Total closed thickness $B$ encompasses all physical elements. Relief ornaments must never exceed this envelope:
- Front & rear board thickness: $4\text{ mm}$ (Initial), $5\text{ mm}$ (Advanced), $6\text{ mm}$ (Meistro).
- Paper page block: Centered inside boards.
- Relief fittings, corner caps, and central medallions: Max allowable projection from board face is $6\text{ mm}$ (Initial), $10\text{ mm}$ (Advanced), $16\text{ mm}$ (Meistro).

---

## 2. Rank Anatomical Markers & Complexity Rules

| Anatomical Feature | Initial | Advanced | Meistro |
|---|---|---|---|
| **Spine Markers** | Exactly 1 marker | Exactly 2 markers | Exactly 3 markers |
| **Cover Composition** | 1 dominant central skill sigil | 1 central hub + connected subordinate sigils | Nested phase rings around central hub |
| **Framing Structure** | Single perimeter border, simple corners | Reinforced linked rails, corner brackets | Multi-layered relief frame, archive seal housing |
| **Spine Ribs** | Flat or single strap | 3 distinct raised bands | 5 heavy bound raised bands |
| **Elemental Motion Layers** | Exactly 1 resting layer | 3 coordinated motion layers | 5 nested motion layers |
| **Status Insert** | None (embedded in label band) | Optional inline status badge | Dedicated archive/evidence medallion |

---

## 3. Curated Elemental Palettes (sRGB)

Each element follows a strict 5-role palette:
`Cover Base` / `Primary Accent` / `Secondary Accent` / `Ornament Metal` / `Page Block`

| Element | Dominant Form & Surface | 5-Tone Color Palette |
|---|---|---|
| **Fire** | Scorched grain, flame-shaped relief, copper rails | `#332323` / `#E96B24` / `#FFC16A` / `#B8753C` / `#D9BE94` |
| **Water** | Smooth pearl inlays, flowing wave curves | `#173D54` / `#40C9D7` / `#C6E9E7` / `#789CA6` / `#DCCDAF` |
| **Earth** | Stratified stone relief, mineral line paths | `#534239` / `#C09651` / `#798387` / `#8C6B48` / `#D4BC94` |
| **Air** | Feather and spiral filigree, negative space | `#D4E1E5` / `#93C9E0` / `#F0EEE1` / `#A6ADB5` / `#E4D9C3` |
| **Ice** | Translucent facets, crystalline frost tracery | `#C8DFE6` / `#78CEF0` / `#F1FAFA` / `#9AACBE` / `#E4DDD0` |
| **Lightning** | Angular conductor plates, branching routes | `#242A50` / `#58A9FF` / `#CDE7FF` / `#B6985D` / `#D7C5A1` |
| **Metal** | Machined ridges, brushed steel, polished bronze | `#303840` / `#B7C1C9` / `#B88A52` / `#8C989F` / `#D1C4AE` |
| **Crystal** | Faceted jewel inserts, lattice relief | `#372F50` / `#B89AEA` / `#D9E8EA` / `#9C91B0` / `#DED1BD` |
| **Light** | Radial ivory rails, warm gold geometry | `#E4DBC3` / `#FFE2A0` / `#FFF5DA` / `#CDA757` / `#E7DBC0` |
| **Shadow** | Recessed carving, negative space, obsidian base | `#22212C` / `#79648F` / `#B6AAC7` / `#62616E` / `#C9BBA5` |
| **Nature** | Root and vine rails, carved leaf and floral relief | `#324C3B` / `#78B474` / `#C6CC91` / `#82684A` / `#D9C7A1` |
| **Decay** | Patinated verdigris rails, weathered antique grain | `#3D4541` / `#70A095` / `#C79D63` / `#867960` / `#C6B99E` |

---

## 4. Margins, Hinge Clearance & Quiet Zones

1. **Hinge Flex Zone:**
   - On the front and back cover, reserve a strip of $12\text{–}18\text{ mm}$ adjacent to the spine as a low-relief or zero-relief flex zone. Heavy metal plates or large bosses placed over the hinge line violate physical plausibility.
2. **Outer Border Clearance:**
   - Keep relief elements at least $10\text{ mm}$ inside the physical board edges (except for dedicated protective corner wraps).
3. **Typography Quiet Zone:**
   - Reserve a quiet, uncluttered horizontal band (minimum $20\text{ mm}$ height) for the book title and classification metadata.
   - Background contrast behind title text must maintain a minimum 4.5:1 WCAG contrast ratio.
   - No intersecting relief paths or high-frequency decorative textures may cross text baselines.

---

## 5. Evidence & Provenance Semantics

Visual animation and decoration must respect evidence integrity:
- **Unlinked:** Default state when no test fixture or execution evidence is supplied. Cover displays resting ambient motion only.
- **Available / Unavailable:** Indicates status of backing data. If unavailable, archive seal and outcome nodes must remain dormant.
- **Outcome (Success / Failure / Inconclusive):** Animated outcome pulses or chromatic shifts are strictly forbidden unless backed by explicit evidence metadata.
- **Archived:** Gold seal housing is unsealed/empty until an authentic saved-content reference is bound.
