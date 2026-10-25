# Curated history and recovery

Historical snapshots preserve original bytes. `snapshots.json` maps original paths to canonical assets or unique historical content. `npm run check:history` verifies every SHA-256. `node tools/history.mjs restore <new-external-directory>` reconstructs the original snapshot trees; it refuses to overwrite an existing destination or the active workspace.

The spine audit preserves the original before-state reports, measurements, findings, source excerpts, and their stated limitations. V1 repair reports and their methods now remain here as historical evidence; current grimoire anatomy checks use v2. Historical source line numbers and findings describe the recorded state, not the relocated implementation. The migration checkpoint captures the later migration baseline, not an invented reconstruction of pre-repair source.

One-off book release scripts have been removed because they embedded complete document copies and overwrote maintained prose. Their useful method survives in current generators: source catalogs generate runtime data; editable definitions generate SVG and solid exports; measured checks produce evidence. Maintained design records retain assumptions, decisions, limits, and next work.

The migration register records every original file, disposition, SHA-256, and surviving location. The knowledge map identifies consolidated documents. Duplicate source paragraphs were merged only when identical; differing evidence, methods, and unresolved interpretations remain.

One external compressed recovery checkpoint remains until the user explicitly confirms its removal. Its path and SHA-256 are recorded in the migration register. Installation caches and test scratch files are reproducible and are not permanent historical evidence.

Before editing a historically referenced active asset, run `node tools/history.mjs protect <workspace-relative-file>`. Root build and verification commands protect these assets automatically before writes; historical bytes stay immutable while active outputs can change.
