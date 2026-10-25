# Book design types

Fantasy book design studies, editable drawings, Three.js sources, binding research, reference images, and their public conversation records. This repository preserves the initial GitHub commit and imports the Books family from the reorganized 3d-design-drafts workspace.

## Objects and entry points

| Object | Purpose | Read | Launch |
|---|---|---|---|
| Ranked covers | Initial / Advanced / Meistro; twelve elements; independent fantasy/wizardry styles | [Design](objects/books/default-book-design-types/design.md), [knowledge and lessons](objects/books/default-book-design-types/knowledge.md) | npm run start — 127.0.0.1:4174 |
| Working wizard grimoire | Current anatomy-v2 sewn-on-tapes hollow-back case, 240 leaves, controlled opening and page turn | [Design](objects/books/wizard-grimoire/design.md), [knowledge and corrections](objects/books/wizard-grimoire/knowledge.md) | npm run start:grimoire — 127.0.0.1:4194 |
| Bound open book | Static reusable multi-part open-book factory, retained separately from the moving grimoire | [Design](objects/books/bound-open-book/design.md), [integration knowledge](objects/books/bound-open-book/knowledge.md) | Import the factory; no standalone viewer |

## Install, run, and verify

```powershell
npm.cmd ci
npm.cmd run start
# In another terminal:
npm.cmd run start:grimoire
npm.cmd run check
npm.cmd run check:migration
node tools/verify.mjs static
node tools/verify.mjs build
node tools/verify.mjs geometry
node tools/verify.mjs browser
```

Three.js 0.186.1 and Playwright 1.63.0 are pinned locally. Existing browser checks use installed Chrome/Edge on Windows; other hosts need an available Playwright Chromium and corresponding executable-path configuration. The native studios use local dependencies; historical sandbox previews retain their documented CDN dependency. The spine history viewer uses port 4195 via npm run audit:serve.

## Conversation, evidence, and interpretation

- [Conversation index](history/conversations/README.md): original ranked-cover prompts/responses/plans, relevant grimoire research/implementation/anatomy discussion, and open-book creation/upgrade context.
- [Additional cross-topic transcript](conversation/transcript.md) and [object/message index](docs/objects.md): the other chat’s recovered public session segments, including full research responses, expert viewpoints, spine audits, disagreements, and later corrections.
- [Personas and review lenses](knowledge/personas.md): identified expert/design perspectives with their source and limitations.
- [Design decisions and rationale](knowledge/decisions-and-lessons.md): public rationale, failure findings, lessons, methodology, superseded claims, unresolved decisions, and future requirements. Private internal reasoning is not exported or reconstructed.
- [Image and capture index](knowledge/images.md): eight original ranked-cover images, grimoire failure screenshot, artwork, and book-specific integration captures.
- [Transfer and provenance](history/transfer.md): scope, source-byte manifest, snapshot reconstruction, dependency ownership, checkpoint retention, and local integration copies.
- [Migration verification](checks/repository-transfer.md): fresh checks separated from inherited reports.

Historical source paragraphs and transcript messages are preserved even when later corrected. In particular, the ranked-cover size envelopes are visual-design requirements, while the working grimoire derives physical-looking dimensions from its text block. The current anatomy-v2 design supersedes mixed V1 binding assumptions; V1 evidence remains history, not proof for v2. None of the studies certifies fabrication or continuous material physics.

## Ownership and editing

Objects retain Part_1-Engine-Root (construction/state), Part_2-Connectors (attachments/integration), and Part_3-Outer-Look-Shell (appearance). Shared binding knowledge, navigation, server/resource adapters, and sandbox assets are included. Keep coupled factories intact until a tested extraction is justified. The [resource registry](tools/resources.json) preserves logical identities across the previous path changes; maintain direct imports and document links together.

Generated SVG/JSON/HTML have one canonical export location. Maintained design prose is not generated. The [book evaluation skill](.agents/skills/svg-book-design-evaluation/SKILL.md), rubrics, and scripts are included as project tools, not a claim that every aesthetic criterion has been independently certified.

All 135 historical snapshot entries remain verifiable. The full original external recovery checkpoint and desk Git history remain in the source workspace and were not deleted or uploaded as unrelated content. Source integration copies remain available for the room/bookcase consumers pending their versioned handoff; this repository is the Books publication and independent working checkout.
