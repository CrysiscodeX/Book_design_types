# The Anatomy & Physics of the Book

Oct 24, 2026 · @Andre Olivier

## How to use this document

A bound book is a machine: a stack of folded paper sewn into one hinged block, wrapped in a stiff case that protects it and must also let it open. Every design choice trades protection against openability, and most binding failures come from ignoring paper grain, moisture or the spine's geometry.

Read it in order or jump by role:

| If you are a… | Start with | Then |
| --- | --- | --- |
| Bookbinder or student | Anatomy | Architecture, Design configurations |
| Conservator or collections carer | Physics | Failure modes |
| Book or product designer | Architecture | Design configurations, Expert panel |
| 3D artist (Blender, games, film) | Anatomy | Design configurations (the parametric Blender setup) |
| Engineer or materials student | Physics | Expert panel |
| AI agent or future designer | Before you build | Physics, Parametric setup for 3D modelling (Blender) |

**The mental model in one paragraph.** Paper is a fibre composite that is stiffer along its grain and swells across it. Folded sheets (signatures) are sewn through their folds, which adds thread at the spine and makes the spine thicker than the fore-edge (swell). Rounding turns that extra thickness into a curve; backing bends the outer folds over to form shoulders the boards sit against. Linings glue the folds into one flexible spine, and the case joins to the text block only through the linings and endpapers. When the book opens, the spine flexes: its outer face stretches (tension) and the inner folds crowd together (compression). A good binding chooses where that bending happens: in the text block (tight back), in a separate tube (hollow back), or in the hinge alone (case binding).

Terms in **bold** are defined in the Glossary at the end. Dimensions are metric; imperial equivalents are given where binders commonly use them.

## Before you build: notes for designers and agents

Read this table first if you will design, model or automate a book from this document. Each row is a rule that someone has already learned the hard way. The sections listed under *See* explain why, and each main section ends with its own **What not to forget, or else…** note.

| Don't forget | Or else | See |
| --- | --- | --- |
| Grain runs parallel to the spine in every layer: paper, board, cloth and endpapers. | Boards warp, pages ripple and the book will not close flat. | Physics §1 |
| Measure the sewn, rounded and backed block before you cut boards. | A case sized from a calculator is too tight or too loose, because swell varies with every signature. | Design configurations |
| Shoulder depth equals board thickness. | Boards sit proud of the spine or sink below it, and the joint cannot hinge cleanly. | Architecture, Design configurations |
| The board-to-block allowance holds turn-in, pastedown and flyleaf (about 0.66 mm each side in the model here). | Outer leaves are crushed; in a 3D model the facing pages pass through each other. | Design configurations |
| Boards pivot in the joint grooves, not at the shoulder or the spine centre. | The spine cannot throw up, so a hollow back stops opening and the hinge tears. | Physics §3 |
| Backing sets the shoulder bend permanently. | Pages fan the wrong way on opening; in a model the centre leaves form a flat vertical fin. | Physics §4 |
| An opened page stays lifted for a detachment length, then lies on the stack. Top pages near the fold may never lie down. | Pages look stuck to the stack, or float in mid-air. | Physics §8 |
| Size the mull flange to the weight of the text block. | The block drops in its case and the inner hinge splits. | Anatomy, Failure modes |
| Figures marked approximate are workshop values, not standards. | A design inherits false precision; check them against your materials. | Every section |
| For agents in Blender: units are metres; change only the "Book" collection; rebake after any parameter change; keep every key LINEAR; save the .blend. | The user's scene is damaged, the animation drifts through the cloth, or hours of work are lost. | Parametric setup for 3D modelling (Blender) |

## Anatomy

A hardcover book has two assemblies, the **case** (what you hold) and the **text block** (what you read), joined only at the spine by linings and endpapers. Learn the parts in that split and every diagram you meet reads the same way.

### Orientation words

| Term | Where it is | Also called |
| --- | --- | --- |
| Head | Top edge of the book | Top edge |
| Tail | Bottom edge | Foot |
| Spine | Bound edge, visible on the shelf | Back, backbone |
| Fore-edge | Edge opposite the spine | Front edge |
| Recto / verso | Right-hand page / left-hand page |  |
| Gutter | Inner margins where pages meet at the spine |  |

### The case (exterior)

| Part | What it is | What it does |
| --- | --- | --- |
| Boards | Rigid panels, usually greyboard (binder's board) 2–3 mm thick; front board and rear board | Protect the text block, carry the cover design |
| Covering material | Cloth, paper, leather or vellum glued over the boards | Wear surface; holds the boards together across the spine |
| Spine stiffener | Thin card in the case spine (the "spine piece" or inlay) | Keeps the case spine flat or rounded to match the text block |
| Turn-ins | Covering folded over the board edges onto the inside, roughly 15 mm | Locks the covering, protects corners and edges |
| Joint | Exterior groove where the board meets the spine | Lets the board swing; the main wear point |
| Hinge | Interior line where the endpaper bends at the joint | Carries the text block's weight from the case |
| Squares | Board overhang past the text block at head, tail and fore-edge; a "medium" square equals the board thickness | Protects the page edges on the shelf |
| Raised bands, label, tooling | Ridges over the sewing supports; a title label; stamped or gilt decoration | Decoration and identification; raised bands also show the sewing structure |

### The text block (interior)

| Part | What it is | What it does |
| --- | --- | --- |
| Leaf | One piece of paper, two pages (recto and verso) | Carries the content |
| Signature (section, gathering) | One printed sheet folded into 8, 16 or 32 pages | The unit that is sewn |
| Sewing | Thread through the fold of every signature; the **kettle stitch** links each section to the next near head and tail | Makes the signatures one block |
| Sewing supports | Tapes or cords the thread wraps around | Spread load across the spine; often laced into or glued to the boards |
| Endpapers | Folded sheets at front and back; the half glued to the board is the **pastedown**, the free half is the **flyleaf** | Attach the text block to the case and cover the board's raw inside |
| Endbands (headband, tailband) | Thread worked over a core at head and tail of the spine | Structural when tied down into each signature; decorative when stuck on |
| Spine linings | Layers glued to the spine: mull ("super", an open-weave cloth) wide enough to extend onto the boards, then kraft paper | Consolidate the folds, spread flexing, and give the mull flanges that help hold the case on |
| Hollow (tube) | Flattened paper tube between text-block spine and case spine, in hollow-back books | Lets the case spine bow outward while the text-block spine flexes on its own |

&#91;embedded content: anatomy · cross-section from the head\]

The boards rest against the shoulders, the squares overhang the fore-edge, and the mull and endpapers are the only things tying the text block to the case. Endbands sit at head and tail, so they do not appear in this slice.

**What not to forget, or else…** The case and the text block meet only through the linings and the endpapers. Leave out the mull, or skimp on its flanges, and the block hangs from one fold of paper; the hinge starts within months. The squares are not decoration either. Without them the page edges carry the book's weight on the shelf and get crushed.

## Architecture: binding structures compared

Every binding structure answers one question: where does the spine bend when the book opens? The answer sets durability, how flat the book lies, and where it will eventually fail.

&#91;embedded content: case binding · two build tracks, one join\]

Because the two tracks only meet at casing in, the case can be made by machine in bulk while the text block gets the careful work. The same split is why the hinge is the weak point.

### Case binding, step by step

Case binding (the modern hardcover) builds the text block and the case separately and marries them at the end. That is why it dominates edition binding: cases can be made by machine in bulk.

1. Fold printed sheets into signatures, grain parallel to the spine.
2. Tip or wrap endpapers onto the first and last signatures.
3. Sew through the folds (on tapes, or machine-sewn without supports); the kettle stitch joins each section to the next.
4. Glue up the spine with a flexible adhesive and let it set slightly.
5. Round the spine into an arc of about one third of a circle, then back it to form shoulders as wide as the board is thick.
6. Attach endbands, then line the spine: mull extending 25–40 mm onto each side, then kraft paper (and a hollow tube if hollow-backed).
7. Make the case: two boards and a spine stiffener on the covering, with a joint gap each side, turn-ins folded over.
8. Case in: paste the endpaper and mull flanges and set the text block into the case, then form the joints with a hot iron or bone folder and press between boards with brass-edged joint rods until dry.

### Structure comparison

| Structure | How the spine works | Opens flat? | Strength | Typical use |
| --- | --- | --- | --- | --- |
| Case binding, hollow back | Text block spine flexes in a tube or free space; the case spine stays rigid and bows away | Good | Good; joints are the weak point | Trade and library hardcovers |
| Tight back | Covering glued directly to the lined spine; spine and covering flex together | Moderate; covering creases | Very strong; restores its shape | Fine leather bindings, older books |
| Flexible (sewn on raised cords, tight back) | Spine fully flexible, cords laced into boards | Moderate | Strongest traditional structure | Fine binding, conservation |
| Laced-in boards ("in boards") | Sewing supports laced through holes in the boards before covering | Moderate | Very strong board attachment | Historical and fine binding |
| Limp (vellum or paper) | No boards; flexible covering, supports laced through the cover | Excellent | Good for light volumes | Conservation, notebooks |
| Perfect binding (adhesive) | Folds cut off; single leaves held by glue alone | Poor with EVA hot melt; better with PUR | Depends on adhesive and grain | Paperbacks, magazines |
| Exposed spine / Coptic | No spine covering; chain-stitch sewing is visible | Fully flat (180 degrees) | Moderate | Journals, sketchbooks, art books |

Rule of thumb: choose the structure by how the book will be used. A reference book opened daily wants a hollow back or flexible sewing. A heavy book shelved for decades wants laced-in boards. A notebook that must lie flat wants an exposed spine or a limp binding.

**What not to forget, or else…** Decide where the spine bends before you choose materials. Otherwise the hinge or the covering takes a bend it was not built for, and that is where the book fails. Never put a tight back under a gilt-tooled spine: the covering creases on every opening and the tooling cracks.

## Physics

Three forces govern a book's life: bending at the spine every time it opens, moisture moving paper and board, and gravity pulling the text block out of its case. Good binding manages all three; most failures are one of them left unmanaged.

### 1. Paper is a directional material (grain)

Machine-made paper has its fibres aligned in the **machine direction** (the grain). Along the grain, paper is stiffer, folds more cleanly and changes size less with humidity. Across the grain (the **cross direction**) it swells and shrinks several times more; figures of roughly 1.5 to 4 times are commonly quoted (approximate, it varies by furnish).

The binder's rule follows directly: **grain of every layer (text paper, endpapers, boards, covering, linings) runs parallel to the spine.** Then each layer swells across the book's width, where nothing restrains it. Cross-grained paper swells along the spine, where the sewing pins it; the pages ripple at the gutter, resist turning and will not lie flat.

Quick grain tests: bend a sheet both ways (it bends more easily along the grain); tear it (a cleaner, straighter tear along the grain); dampen a strip (it curls into a tube whose axis is parallel to the grain).

### 2. Bending: tension, compression and the neutral axis

When anything bends, its outer face stretches (**tension**) and its inner face crushes (**compression**). Between them lies a **neutral axis** that changes length not at all. In a book this happens at the spine each time it opens: on a tight-back book the spine flips from convex to concave, so the sewn folds fan apart in tension while the covering on the outside is squeezed into compression and creases. The linings sit near the neutral axis between them. Leather spines crack along the same line for the same reason.

A sheet's resistance to bending rises with the cube of its thickness, which explains why heavy paper will not drape open:

```latex
D = \frac{E\,t^{3}}{12\,(1-\nu^{2})}
```

Here D is bending stiffness per unit width, E is the paper's elastic modulus (higher along the grain), t is caliper and ν is Poisson's ratio. Doubling caliper makes a page about 8 times stiffer. Running the grain parallel to the spine puts the bend across the grain, where paper is most compliant, so the pages fall open.

### 3. Opening action: throw-up and drape

**Throw-up** is how the spine of the text block moves when the book opens. In a well-balanced tight back the spine arches up into a smooth curve and every leaf drops open toward the gutter. If the spine is over-lined or too stiff, it resists, forms a sharp peak, and the pages spring back. If it is under-lined or the adhesive is brittle, the spine goes flat or concave, sections pull apart and leaves crack at the fold. **Drape** is how freely each leaf falls once the spine has opened; it depends on paper stiffness and grain.

A hollow back throws up differently, because the boards pivot in the joint grooves. The grooves lie outside and slightly below the shoulders. As the boards swing open they carry the shoulders apart, so the text-block spine can flatten while the case spine keeps its round. In the Blender model below, the shoulders move about 2 mm apart at 90°. The hollow between the two spines grows from 0.96 mm closed to 2.69 mm open.

### 4. Swell, rounding and backing

Sewing puts one thickness of thread in every fold, so the spine edge of the text block ends up thicker than the fore-edge. That excess is **swell**. Rounding hammers the spine into an arc of roughly one third of a circle, which spreads the swell across the curve and makes the fore-edge concave. Backing then fans the outermost signatures over at about 45 degrees to form **shoulders**, ridges as deep as the board is thick, for the boards to sit against. The finished profile looks like a mushroom.

Too little swell gives weak shoulders, and the boards have nothing to rest on. Too much makes the spine over-round, and the middle sections can later collapse forward, toward the fore-edge, so the spine goes concave (a "slipped" or "sprung" text block). Binders control swell with thread thickness, by sewing two sections on at a time ("two on"), and by how hard they knock down each section.

Backing also leaves a permanent set. The fanned outer folds stay bent, so each leaf's resting shape already turns from its fold toward the stack. When the book opens, the leaves near each shoulder follow their board, and only the centre leaves stand up. Without that set, every leaf would rise straight from the spine.

### 5. Hollow back versus tight back

In a **tight back** the covering is glued straight to the lined spine, so the spine of the book and its covering bend as one. That gives strength and makes the book spring back to shape, at the cost of a creased spine. In a **hollow back** a flattened paper tube separates the two: when the book opens, the text-block spine throws up while the case spine bows away, leaving a gap. Your close-up photographs show exactly this. The striped endband follows the text-block spine (A) while the leather case spine (B) curves down separately beneath it.

### 6. Moisture and board warp

Anything wet glued to one face of a board pulls that face concave as it dries and shrinks. Covering material pulls the boards outward; the pastedown pulls them inward. Balanced, the board stays flat. Unbalanced, it warps. The classic case is a new book whose pastedown dries last and pulls both boards inward toward the text block. Binders counter warp by lining the inside of the board first (a "pulling" or lining paper of the same weight), matching grain directions, using minimal water in the adhesive, and drying the book under weight between boards with blotters.

### 7. Gravity, shelving and the joints

Shelved upright, the text block hangs from the case at the hinges, held only by the endpapers and the mull. The squares let the boards, not the page edges, carry the book's weight on the shelf. Over time a heavy text block sags: the fore-edge drops to the shelf, the spine pulls away at head, and the hinges split ("starting"). Pulling a book off the shelf by the headcap levers the case spine away from the text block and is the most common cause of a torn head. Books leaning at an angle skew into a parallelogram. Large or heavy volumes (folios, atlases) belong flat.

### 8. How a page falls: detachment length

A leaf is too floppy to stand under its own weight beyond a short length. That length is the gravity length, l\_g = (D/q)^(1/3), where D is the leaf's bending stiffness and q its weight per area. For 80 g/m² paper (D ≈ 4.3 × 10⁻⁴ N·m, q ≈ 0.785 N/m²), l\_g is about 82 mm.

A leaf leaving its fold at angle θ stays lifted for a detachment length ℓ, then lies on the leaf below. Under a pressure p, with a step h₀ at the fold, beam theory gives:

```latex
\frac{p\,\ell^{4}}{24D} - \theta\,\ell - 3h_0 = 0 \qquad (h_0 = 0:\ \ell = (24D\theta/p)^{1/3})
```

Closed under the case's pressure, ℓ is about 23 mm, so the leaves lie tight. Opened to a 90° V, the pressure on the top leaf is only its own weight, and ℓ exceeds the leaf. The top pages never lie down, which is why an open book's pages arch. Each leaf rests on the one below, so leaves can touch but never cross.

The diagrams for this section follow.

&#91;embedded content: bending · tight-back spine when open\]

The dashed line is the neutral axis. Everything above it stretches as the leaves fan open; everything below it, including the covering and any spine lettering, is squeezed, which is why tight-back spines crease and tooled spines crack.

&#91;embedded content: rounding and backing · three stages\]

The swell from the thread in every fold is not a defect; rounding spreads it over an arc and backing turns it into the ridges the boards sit on.

&#91;embedded content: tight back vs hollow back · open, from the head\]

The gap on the right is what your hollow-back photographs show: the endband rides on the text-block spine while the case spine curves away beneath it.

**What not to forget, or else…** Balance every board: covering on one face, pastedown on the other, or the board warps as the glue dries. Shelve heavy books flat, or gravity starts the hinges. Bending stiffness grows with the cube of caliper, so a slightly heavier paper is far stiffer; choose it and the pages will not drape.

## Design configurations

Size everything from the text block outward: measure the sewn, rounded block first, then derive the boards, squares, joint and spine from it. The numbers below are workshop starting points, not standards; adjust to board thickness and book size.

### Reference dimensions (hand case binding)

| Parameter | Starting value | Rule behind it |
| --- | --- | --- |
| Board thickness | 2 mm (small books) to 3 mm (large, heavy) | Thicker board for larger and heavier text blocks |
| Squares (head, tail, fore-edge) | About 3 mm; a "medium" square equals board thickness | Fore-edge square is often slightly wider than head and tail |
| Board height | Text block height + 2 squares (e.g. + 6 mm) | Gives equal head and tail squares |
| Board width | Text block width − shoulder allowance + fore-edge square (e.g. − 2 mm net) | The board starts at the shoulder, not the spine |
| Board-to-block allowance (each side) | Turn-in + pastedown + flyleaf (≈ 0.66 mm with 0.4 mm cloth and 0.127 mm paper) | Too little crushes the outer leaves; in a 3D model the facing pages overlap |
| Joint gap (case, each side) | About 5 mm + board thickness + 1 mm (= 8 mm with 2 mm board) | Room for the board to swing over the shoulder |
| Case spine stiffener width | Text block thickness + 2 board thicknesses, measured gently squeezed | Rounded spines: measure around the curve with a paper strip |
| Shoulder depth (backing) | Equal to board thickness | Board sits flush with the shoulder |
| Rounding | Arc of about one third of a circle | Flatter for thin books, fuller for thick ones |
| Mull (super) flanges | 25–40 mm onto each board; stops short of head and tail by about 3 mm | Wider flanges for heavier books |
| Turn-ins | About 15 mm (5/8 in) | Enough to anchor without lumps under the pastedown |
| Grain | Parallel to spine in every layer | See Physics, section 1 |

### Text block thickness

```latex
T_{block} = \frac{P}{2}\,c \;+\; s, \qquad c = \frac{1}{\text{PPI}/2}\ \text{(inches)}
```

P is the page count, c is paper caliper per leaf, and s is the swell added by sewing (roughly one thread diameter per signature for all-along sewing). Printers quote paper bulk as PPI (pages per inch); a 400-page book on 400 PPI paper is about 1 inch (25 mm) thick before swell and endpapers.

### Signature sizes

| Fold | Leaves | Pages | Notes |
| --- | --- | --- | --- |
| Folio (1 fold) | 2 | 4 | Heavy paper, large plates |
| Quarto (2 folds) | 4 | 8 | Stiff paper |
| Octavo (3 folds) | 8 | 16 | The most common signature |
| 32-page (4 folds) | 16 | 32 | Thin paper only; bulky folds increase swell |

Thinner signatures mean more folds and more thread, which means more swell. Very thick signatures do not open well near their centre.

**What not to forget, or else…** Size the case from the measured block, sewn, rounded and backed, never from a calculator. Swell grows with the number of signatures, so two books with the same page count can differ by millimetres. Cut boards first and the case will be too tight to close or too loose to hold the block.

### Parametric setup for 3D modelling (Blender)

Solve the book as a 2D cross-section mechanism at 31 opening angles, extrude it along the spine, and play the solved poses back as shape keys. Nothing is hand-posed: every curve comes from the physics above. The companion Blender scene stores the solver, the bake and the build script as Text blocks.

```python
PARAMS = {
    "block_w": 0.150, "block_h": 0.230, "pages": 320, "pages_per_sig": 16, "ppi": 400,
    "grammage": 0.080, "E_cd": 2.5e9,           # paper: kg/m², cross-direction modulus (approx.)
    "board_t": 0.0025, "square": 0.003, "cover_t": 0.0004,
    "endpaper_gap": 0.00066,                     # turn-in + pastedown + flyleaf
    "round_arc_deg": 120, "case_gap": 0.001,     # hollow back: case spine clear of the block
    "set_radius": 0.0015,                        # shoulder bend set in by backing
    "open_at_page": 168, "open_total_deg": 90,
    "p_close_q": 1000,                           # case squeeze when closed, x leaf weight
    "frame_end": 120, "sample_every": 4,         # 31 solved poses
}
# Derived: caliper t = 0.127 mm, D = E t^3/12 = 4.3e-4 N·m, q = 0.785 N/m²,
# l_g = (D/q)^(1/3) = 82 mm, spine strip S = R * arc = 32.2 mm, 160 leaves + 2 flyleaves
```

The solve runs in this order for each opening angle α:

1. **Case spine:** a rigid arc (block radius + 1 mm case gap). Its two ends are the joint-groove pivots.
2. **Boards:** each turns β = α/2 about its pivot. The pivot sits outside and below the shoulder, so opening swings the shoulders about 2 mm apart at 90°.
3. **Spine strip** (folds + linings): an inextensible elastica clamped between the shoulders, end tangents fixed to the boards, solved by Newton on its segment angles. Closed, it reproduces the 120° arc; open, it flattens (throw-up).
4. **Folds:** 20 signatures at equal arc length along the strip, 4 nested sheets each. Every leaf carries a 1.5 mm set arc from its fold to the closed stack direction, turned with its piece of spine. That is the permanent bend from backing.
5. **Leaves:** one heavy elastica per leaf at minimum energy: bending + own weight + weight of the leaves above + the case squeeze (released by 30°). Touchdown is anchored by the detachment length below.
6. **Contact,** bottom-up per half: each leaf stays one caliper above the leaf below in the half's shared frame. The two facing top pages meet at the opened fold.
7. **Case and details:** one continuous cloth profile (turn-in, board, joint, spine), the hollow-back tube as a lens between strip and case spine, endbands on the folds, thread in the open fold, ribbon on the right page.
8. **Ground:** lift the root so the lowest point of the case touches z = 0.

A plate pressed by p onto its stack leaves the fold at angle θ, a height h0 off its support, and lies down after a detachment length ℓ:

```latex
\frac{p\,\ell^{4}}{24D} - \theta\,\ell - 3h_0 = 0 \qquad (h_0 = 0:\ \ell = (24D\theta/p)^{1/3})
```

Closed (p = 1000q), ℓ is about 23 mm. For the top page at 90°, ℓ exceeds the leaf length, so the exposed pages arch across the V instead of lying flat.

| Object | Built from | Moves by |
| --- | --- | --- |
| Book\_Leaves | 162 leaf cross-sections (fold, set arc, free curve, lying part), Solidify 0.92t with a rim material for page edges | Shape keys |
| Book\_Case | One continuous cloth profile, Solidify cover\_t | Shape keys |
| Book\_Board\_L/R, Book\_Pastedown\_L/R | Rigid boxes with 0.3 mm clearance under the cloth | Hinge empties at the joint grooves |
| Book\_Tube, Book\_Linings | Lens between strip and case spine; mull and kraft over the strip with flanges onto the boards | Shape keys |
| Book\_Endband\_Head/Tail, Book\_Thread, Book\_Ribbon | Tube meshes on the folds; thread runs between kettle stitches and tapes; ribbon on the page, then hanging | Shape keys |
| Book\_CaseSpine\_Stiffener | Rigid arc | Static |
| Book\_Root | Empty holding everything | Keyed Z for ground contact |

**Baking.** Each deforming mesh gets one shape key per sample with a triangular weight (1 at its frame, 0 at its neighbours), so poses crossfade linearly. Set every key to LINEAR explicitly: Blender 5 ignores the new-key interpolation preference, and eased keys leak the closed-book Basis into every in-between frame. The baked scene passes: no leaf crossings, separation exactly one caliper, every leaf 150.00 mm, hollow-back gap 0.96 mm closed to 2.69 mm open, case on the ground at every frame.

**Modelling notes.**

- Pivot the boards in the joint grooves, not at the shoulder tips. Fixed shoulders leave the spine strip nowhere to go, and it sags into a V.
- Give every leaf the backing set. Without it the pages stand in a fin in the gutter instead of following the boards.
- Anchor each leaf's touchdown with the detachment length. Free solves flip between a tight and a gentle branch from leaf to leaf.
- Size the endpaper gap for turn-in + pastedown + flyleaf, or the two top pages overlap.
- Sample leaves densely near the fold and sparsely on the stack; uniform spacing hides crossings and facets the gutter.

**What not to forget, or else…** For agents working in someone's Blender scene:

- Change only the "Book" collection. Other objects belong to the user.
- After any parameter change, set `REBAKE = True` and rebake (about 4 min). Never edit the baked meshes by hand, or the next bake erases the edit.
- Set every key to LINEAR. Bezier keys make the shape-key weights stop summing to 1, and the board pokes through the cloth mid-animation.
- Keep the 0.3 mm clearance between board and cloth, or the two surfaces flicker where they touch.
- Save the .blend. The scratch bake file is temporary; the Text blocks inside the .blend keep the solver and bake.

## Expert panel

Seven practitioners look at the same book and each sees a different system. These are composite personas built from published practice, not real individuals. Where they agree is the safest guidance; where they disagree, the trade-off is real.

### The Book Conservator

*"Every repair must be reversible, and the binding should fail in the place that is cheapest to fix."*

- Use wheat-starch paste and Japanese tissue for repairs; both can be undone with moisture years later.
- Design a hierarchy of failure: hinges and linings should give way before the paper does. A spine lining is replaceable; a torn fold in a 300-year-old signature is not.
- Sewn endbands with a tie-down in every gathering strengthen the head and tail; stuck-on endbands are decoration only.
- Store at stable humidity (roughly 40–50% RH) and moderate temperature; cycling moisture does more damage than a steady value. Shelve heavy books flat and pull books out by the middle of the spine, never the headcap.

### The Hand Bookbinder

*"Backing is where a binding is made or lost."*

- Check grain on every material before cutting anything, including the board and the covering.
- Control swell as you sew: thread weight to suit the paper, sewing two sections on when the swell builds too fast, and knocking each section down evenly.
- Back to a shoulder exactly as deep as the board; boards that sit above the shoulder show a step and strain the joint.
- Press with joint rods after casing in, with blotters and boards, until fully dry. Most warped boards were rushed out of the press.

### The Paper Scientist

*"Paper is a hygroscopic fibre network that never stops moving."*

- Expect much more dimensional change across the grain than along it; design so that change happens across the book's width.
- Bending stiffness scales with caliper cubed, so a small jump in paper weight changes how a book opens far more than the weight suggests.
- Acid-free, lignin-free paper and alkaline-buffered boards prevent yellowing and embrittlement; groundwood paper fails fastest at the fold, which is exactly where a book flexes.
- Condition paper and board in the binding room for a day before use so they start at the same moisture content.

### The Print Production Engineer (edition binding)

*"At 5,000 books an hour, the structure has to tolerate machine variation."*

- Impose and order paper so the grain runs parallel to the spine in the finished format; specify this on the purchase order.
- Thread-sewn (Smyth-sewn) or PUR-bound text blocks for anything meant to last or lie open; EVA hot-melt for low-cost, short-life work.
- Specify squares, board weight, spine width and joint allowance from a bound dummy, not from the calculator alone.
- Let PUR cure fully before trimming or stress testing; page-pull tests verify the adhesive bond.

### The Book Designer

*"The reader experiences the binding through the gutter margin."*

- Set the inner (gutter) margin for the binding: adhesive bindings and tight backs lose more of the page to the curve than a lay-flat structure.
- Never run critical content across a spread in a perfect-bound book; it disappears into the gutter.
- Choose paper by opacity, bulk and drape together; a bulky, stiff stock may produce a handsome spine and a book that will not stay open.
- Treat endpapers, endbands and the spine as design surfaces; they are the first details a reader handles.

### The Structural Engineer

*"A book is a hinged sandwich panel with a flexible joint and a sagging payload."*

- The hinge (endpaper plus mull) is a tension member carrying the text block's weight; size the mull flange to the load, wider for heavier books.
- The squares turn the boards into a shelf frame, so the edges of the text block never take load.
- A tight back acts like a beam whose outer face goes into compression on opening; a hollow back decouples the two layers so neither is overstressed.
- Repeated flexing fatigues the material at one fold line; spreading the bend over a wider area (rounding, flexible linings) extends life.

### The 3D Technical Artist

*"If the parts do not exist, the animation will cheat and the viewer will feel it."*

- Build separate objects for text block, boards, case spine and endbands, all driven by one set of parameters.
- Pivot boards on the joint line, offset from the spine by the joint gap; never on the spine centre.
- Fake the thousands of leaves with an edge texture except in close-ups or page turns; keep a concave fore-edge to sell the rounding. When leaves are seen, solve them as elastic sheets resting on each other rather than posing them, or they float, cross and look weightless.
- Reference real books under raking light: squares, shoulders, endband stripes and the bowed hollow spine are the details that read as real.

### Where they disagree

| Question | Position A | Position B | Resolution |
| --- | --- | --- | --- |
| Tight back or hollow back? | Conservator and fine binder: tight back with flexible linings lasts and recovers its shape | Engineer and production: hollow back protects the cover and suits machine casing | Use tight back for leather and heavy-use fine work; use hollow back for cloth cases and editions |
| Adhesive binding for lasting books? | Production engineer: PUR performs well in page-pull tests | Conservator: adhesive alone cannot be repaired the way sewing can | Sew anything intended to last generations; PUR suits durable everyday books |
| How round should the spine be? | Binder: full round for good shoulders and swell control | Designer: flatter for better opening and a crisp spine | Match the round to the swell and thickness; thin books stay nearly flat |

## Failure modes and diagnosis

Most failures trace back to grain, moisture, or a joint asked to carry more than it was built for. Read the symptom, find the cause, then fix the cause, not just the symptom.

| Symptom | Likely cause | Prevention or fix |
| --- | --- | --- |
| Boards bow inward toward the text block | Pastedown shrank on drying; no balancing lining on the board | Line boards first; dry under weight; match grain directions |
| Pages ripple at the gutter, book will not close flat | Text paper or endpapers cross-grained | Grain parallel to spine; for an existing book, store under light weight |
| Pages spring shut, book will not stay open | Stiff or heavy paper, over-lined spine, or cross grain | Lighter stock, grain parallel, fewer or thinner linings |
| Spine goes concave, fore-edge pushes out | Too much swell, or sections collapse with use (sprung text block) | Control swell when sewing; round and back properly; tight-back or firmer linings |
| Hinge splits inside the front cover ("starting") | Heavy text block, narrow mull flange, weak endpaper | Wider mull flanges, cloth-jointed or reinforced endpapers, shelve heavy books flat |
| Joint cracks on the outside | Leather dried out or too thin at the joint; repeated flexing | Pare leather evenly; consolidate; open new leather bindings gently at first |
| Headcap torn | Book pulled from shelf by the top of the spine | Pull by the middle of the spine; push neighbours back first |
| Pages fall out of a paperback | EVA hot melt cracked with age or cold, or coated paper without notching | Use PUR or sew; notch or mill the spine for coated stocks |
| Text block skewed into a parallelogram | Book stored leaning | Shelve upright and supported, or flat |
| Spine lettering cracked | Tight back flexes the decorated surface | Use hollow back for gilt-tooled spines that will be opened often |

## Glossary

| Term | Meaning |
| --- | --- |
| Backing | Fanning the outer signatures over to form shoulders after rounding |
| Caliper | Thickness of one leaf (0.127 mm for the paper in the Blender model) |
| Case | The cover assembly of boards, spine stiffener and covering, made separately from the text block |
| Detachment length | How far a pressed leaf stays lifted from its fold before it lies on the stack |
| Drape | How freely a leaf falls once the book is open |
| Elastica | The curve a thin bendable strip takes under end loads and its own weight |
| Endband | Thread worked over a core at head (headband) or tail (tailband) of the spine |
| Endpaper | Folded sheet joining text block to case: pastedown plus flyleaf |
| Grain | The direction most fibres lie in; stiffer and more stable along it |
| Hinge | Inside bend line between board and text block |
| Hollow (tube) | Paper tube between text-block spine and case spine in a hollow back |
| Joint | Outside groove between board and spine |
| Kettle stitch | Link stitch near head and tail joining each section to the previous one |
| Mull (super) | Open-weave cloth spine lining with flanges glued to the boards |
| Neutral axis | Line inside a bent layer that is neither stretched nor compressed |
| PPI | Pages per inch; a measure of paper bulk |
| Rounding | Shaping the spine into an arc, giving a concave fore-edge |
| Set | A bend made permanent, as backing does to the outer folds |
| Shoulder | Ridge formed by backing for the board to sit against |
| Signature | One folded printed sheet; the unit that is sewn (also section, gathering) |
| Squares | Board overhang beyond the text block |
| Swell | Extra spine thickness from sewing thread |
| Throw-up | Movement of the spine when the book opens |
| Tie-down | Endband stitch that passes into a gathering to anchor the band |
| Turn-in | Covering material folded onto the inside of the board |

### Sources

- Etherington & Roberts, Bookbinding and the Conservation of Books (via CoOL): [Rounding](https://cool.culturalheritage.org/don/dt/dt2916.html), [Backing](https://cool.culturalheritage.org/don/dt/dt0198.html), [Hollow back](https://cool.culturalheritage.org/don/dt/dt1763.html), [Kettle stitch](https://cool.culturalheritage.org/don/dt/dt1945.html), [Cross direction](https://cool.culturalheritage.org/don/dt/dt0907.html)
- [Swell (bookbinding)](<https://en.wikipedia.org/wiki/Swell_(bookbinding)>), Wikipedia
- [Squares (boards)](https://lob.is.ed.ac.uk/concept/1631), Language of Bindings thesaurus
- [Endbands](https://conservation-wiki.com/wiki/Endbands), AIC Book and Paper Group Wiki
- [Hard cover for multi-section](https://blogs.brighton.ac.uk/viscommtech/bookarts/worksheets-for-bookbinders/hard-cover-for-multi-section), University of Brighton book arts worksheets
- Reference images supplied by the user (anatomy diagrams, swell and hollow-back photographs).

Figures without a source above (hygroexpansion ratio, mull flange width, turn-in size, storage humidity) are common workshop values and should be treated as approximate.
