# Workspace maintenance

- Organize by independently useful objects. Keep small parts with their owner and preserve meaningful variants until replacement coverage is demonstrated.
- Respect the three parts: construction/state, attachments/integration, and appearance. Preserve existing coupled factories until a tested extraction is justified.
- Preserve source evidence, dimensions, component identities, confidence, methodology, lessons, unresolved decisions, and future requirements. No-mention or old-age status does not establish dispensability.
- Use `tools/resources.json` for stable resource identities after moves. Update direct module imports and documentation links with each relocation.
- Historical bytes are immutable. Before editing an active file referenced by `history/snapshots.json`, run `node tools/history.mjs protect <workspace-relative-file>`. Root build and verification commands protect borrowed historical assets before writing outputs.
- Run `npm run check` after structural/document changes and applicable stages of `node tools/verify.mjs` after executable changes. Stage selection is `static`, `build`, `geometry`, `browser`, or `extra`; `--only=<workspace-name>` limits object checks.
- Keep generated exports canonical. Use ignored cache folders for temporary downloads and logs. Do not regenerate removed draft copies or overwrite maintained design prose.
- Existing desk Git history and the external recovery checkpoint must remain intact. Delete the checkpoint only after the user explicitly confirms its removal.
