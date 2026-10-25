# Bound open book — knowledge and integration record

Owner: bound-open-book. [The maintained design](design.md) and Part_1-Engine-Root/bound-book.mjs retain the extracted static factory unchanged. The [room/open-book conversation context](../../../history/conversations/related-books.md) and [original room design record](../../../history/context/gothic-library-room-design.md) preserve its origin and limitations.

Public interface: buildBoundBook(THREE, kit, materials, large=true). The caller provides Three.js, kit.roundedBox / kit.surfaceSolid, and wood/paper/pageMat/gold/cover materials. The existing coupled caller is not moved or refactored as part of this export. Units are meters in this static scene factory, unlike the ranked-cover studio’s millimeters; do not scale by assumption.

Distinct parts include six closed 4.6 mm signature masses per side, three 0.16 mm curled leaves per side, separate 6 mm boards, endpapers, hinge rolls, spine treatment, and headbands. These are authored visual assumptions, not source-measured binding dimensions or a page count. The factory has no articulated opening model or standalone viewer; do not substitute it for wizard-grimoire.

Book-specific integration captures are in references/context. The source room keeps its local copy while a versioned downstream component handoff is prepared. Future extraction or packaging must preserve geometry, scale, material injection, details, and caller behavior with tested coverage. See [lessons](../../../knowledge/decisions-and-lessons.md) and [review lenses](../../../knowledge/personas.md).
