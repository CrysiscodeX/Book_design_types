# Extraction brief — inspectable working wizard grimoire

Describe an old working grimoire as a physical bound object whose parts must remain convincing at 50–100 mm inspection distance, from any direction and through its permitted movement. Keep construction, material appearance, narrative, movement and evidence separate.

For every component provide:

1. Identity and purpose; stable part ID; source-confidence label: text-derived, image-derived, estimated, unknown or proposed.
2. Dimensions, units, reference axes and inclusion boundary. Distinguish board dimensions, text-block dimensions, nominal layer stack and overall envelope including fittings.
3. Front, side, back, underside and hidden surfaces; minimum physical thickness; edge profile, bevel and corner construction.
4. Component layers and the exact order in which they meet. Explain covering turn-ins, pastedowns, board recesses, sewing supports, folded gatherings, endbands, headcaps and repairs.
5. Attachment and support: named mating parts, local contact region, engagement depth, clearance, fasteners or adhesive, and what is proposed because it is concealed. Do not exempt an entire material or component category from intersection checking.
6. Movement: rigid parts, flexible parts, pivot/attachment regions, minimum bend radius, permitted opening, release order, intermediate positions, stack redistribution and contact with a cradle or table.
7. What must be geometry because it affects silhouette, thickness, separation, contact or a recess. Reserve maps for fine grain, fibres, ink, subtle surface wear and appropriate distance detail.
8. Wear cause, location and chronology. Relate polishing, abrasion, stains, repairs and annotations to handling, stress, storage or ownership. Avoid uniform random dirt.
9. Verification method, acceptance distance, tolerance, required views and remaining uncertainty. Separate topology, placement, movement, materials, performance and visual judgment.

## Book-specific requirements

- Count leaves, pages, sheets and gatherings explicitly. One leaf has two pages. Explain sewing swell, interleaf allowance and endpaper clearance rather than forcing a decorative external size.
- Select a binding family. Describe how the covering spine relates to the text-block spine and how boards, endpapers and supports move together. Do not mix incompatible historic mechanisms without labelling a fantasy reconstruction.
- Explain whether a page is paper or animal parchment. Describe caliper, grain direction, stiffness, rest curvature, opacity and matching front/back features. State whether these properties are measured or proposed.
- Preserve accumulated paper volume while turning. Provide front and back UV orientation, edge closure, fold continuity and consistent leaf identity. Demonstrate beginning, middle and end openings.
- Describe actual cavities: catch throats, board channels, compressed tooling and damaged layers. A dark mark is insufficient evidence of depth.
- Describe clasp release before opening, including the path by which a hook clears its catch. Include the released resting position and root attachment.
- Explain the back of each fitting, roots of stitches, repair bonding, exposed underside and real support contacts. Do not leave decorative pieces floating.
- State which leaves have authored reading content and which are construction-only. Distinguish simulated handwriting from a historical facsimile.

## Findings from this build

The brief needed additional precision about endpaper spacing: copying the writing-leaf pitch left overlapping free leaves. The final layer budget explicitly includes 0.048 mm of endpaper clearances.

Paper needs its own tolerance. The 0.2 mm tolerance used in the cabinet studies exceeds this study's 0.16 mm leaf thickness. Here the starting paper tolerance is 0.005 mm; rigid hardware uses 0.05 mm, with separately bounded intended attachment contacts.

Rendering and construction need separate specifications. Subpixel paper edges can create moiré even when the leaves have mass. Closed distance representations preserve the outer volume while source leaf solids and identities remain available for inspection.

Height fields cannot represent the complete turning surface. A closed parametric shell, an arc-length-controlled middle surface and separate edge normals are required here. Rebuilding every resting fold for every frame was also unnecessary; repeated rigid geometry is reused while the active leaf deforms.

A bent hook requires a raised catch with a real throat. It must pull clear before it descends. Flat plates and an immediate rotation did not adequately explain operation.

Cradle posts must meet tilted pad undersides, and the frame needs actual feet against the slab. Preventing floor penetration alone does not detect floating support.

Local board channels and flattened support ends are modelled. Complete concealed through-edge passages, glue distribution, every stitch contact and calibrated physical deformation remain proposed. Future extraction should state them explicitly if those regions must be certified.

No wizard-book image was supplied for this study. The historical references establish anatomy and terminology; all dimensions, materials, repair history, ownership emblem, page content and exact hidden construction are proposed. Dragon bookshelf geometry is not an aesthetic standard for this book.
