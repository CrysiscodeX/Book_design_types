# Blender physics hardcover: knowledge, lessons and notes

Notes for designers and agents who continue this model. The physics behind each rule is in [The Anatomy & Physics of the Book](references/document/anatomy-and-physics-of-the-book.md), especially Physics §3, §4 and §8 and the "Parametric setup for 3D modelling (Blender)" section.

## What not to forget, or else…

| Don't forget | Or else |
|---|---|
| Units are metres everywhere (`PARAMS`, bake, Blender). | Parts come out 1000× too big or small. |
| Change only the "Book" collection; ground, camera and light are re-aimed, not rebuilt. | You overwrite the user's own scene objects. |
| After any `PARAMS` change, set `REBAKE = True` and run `build_book.py`. Never hand-edit the baked meshes. | The next bake silently erases the edit, or the meshes no longer match the physics. |
| Set every keyframe to LINEAR explicitly (`linearize()` does this through `action_get_channelbag_for_slot`). Blender 5 ignores the new-key interpolation preference. | Bezier keys make the triangular shape-key weights stop summing to 1; mid-animation the board pokes through the cloth. |
| Keep the 0.3 mm clearance between board and cloth. | The two surfaces z-fight where they touch. |
| Pivot the boards in the joint grooves (ends of the case spine arc). | Fixed shoulders leave the spine strip nowhere to go, and it sags into a V. |
| Give every leaf the backing set arc (`set_radius`). | Pages stand in a vertical fin in the gutter instead of following the boards. |
| Anchor each leaf's touchdown with the analytic detachment length. | Free solves flip between a tight and a gentle branch from leaf to leaf, so neighbours cross. |
| Size `endpaper_gap` for turn-in + pastedown + flyleaf (0.66 mm here). | The stack is overfull and the two top pages overlap. |
| Sample leaves densely near the fold and sparsely on the stack (`resample_graded`). | Uniform spacing hides crossings and facets the gutter. |
| Solve the two halves independently, then run the contact pass (clamp to wall, rest on stack, restore length, rest again). | Leaves from one half push through the other. |
| Save the .blend after a rebake. The bake is written to Blender's temp folder, then copied into the `book_bake.json` Text block. | The new bake is lost when Blender closes. |

## Failures found and fixed

| Symptom | Cause | Fix |
|---|---|---|
| Leaves crossing, outliers | Coupled solve; free energy minima | Independent half solves, graph contact, analytic ℓ prior, monotone touchdown |
| Vertical fin of pages in the gutter | No backing set | Set arc of 1.5 mm, rotated with the local spine |
| Spine strip sagging into a V | Board pivot at the shoulder | Pivot at the case spine arc ends; clamped elastica strip |
| Top pages overlapping | Endpaper allowance too small | `endpaper_gap` raised to 0.66 mm |
| Board through the cloth mid-animation | Bezier keys; weights not summing to 1 | Forced LINEAR keys; 0.3 mm clearance |

## Known limits and open items

- The model is a 2D cross-section extruded along the height; it has no head-to-tail variation except the endbands, thread and ribbon.
- Paper modulus and closing pressure (`E_cd`, `p_close_q`) are approximate workshop-level values.
- No page-turn animation; only the opening to 90°.
- Two stale comments: the header of `build_book.py` names the Text blocks `book_mechanism.py` / `book_solvers.py`; they are `mechanism.py` / `solvers.py`. The `hinge_drop` line in `PARAMS` carries a comment ("shoulder bend set in by backing") that belongs to `set_radius`.
