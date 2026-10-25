# Spine remediation record

Read `index.html` or `report.md`. The original audit is one directory above and remains the before-state evidence. `repair-status.json` records the measured repairs without declaring the whole binding validated.

From the workspace root:

```powershell
node audits/spine-system-review/repairs/check.mjs
node audits/spine-system-review/repairs/gathering-check.mjs
node audits/spine-system-review/repairs/interpolation-check.mjs
node wizard-grimoire/checks.mjs
node wizard-grimoire/motion-checks.mjs
node wizard-grimoire/fittings-checks.mjs
node wizard-grimoire/build-inline.mjs
node audits/spine-system-review/repairs/browser-check.mjs
node wizard-grimoire/browser-qa.mjs
node wizard-grimoire/inline-qa.mjs
npm --prefix default-book-design-types run check
```

For current exports, run `node default-book-design-types/exports/threejs/export-model.mjs`. After final source edits, regenerate `wizard-grimoire/documents.mjs` and the inline bundle.

Run `benchmark.mjs` in this folder **alone**, after checks and captures finish. It preserves separate 1080p, production supersampled, and diagnostic native-inspection measurements. Then run this folder's `build-report.mjs`.

Tests use the existing installed Three.js and Playwright dependencies. Browser tests require the study on port 4194; report serving uses the existing loopback audit server on port 4195. No new dependencies are required.

`changed-files.json` compares current project files against the audit's before-state SHA-256 inventory. Changes are limited to the grimoire and current book-studio implementation/derived files. The library and dragon study sources and historical studio snapshots are unchanged.

Do not present scoped checks as whole-binding certification. Gathering endpoint coincidence is not proof of sewing-hole construction. Cord-root containment is not complete support routing validation. A fixed-length geometric skin is not a measured constitutive material model. The report keeps these distinctions explicit.
