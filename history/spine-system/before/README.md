# Spine system audit — 23 October 2026

Open `index.html` for the illustrated report or `report.md` for the complete text. `findings.json` is the machine-readable register. No original model or verification file was edited; `source-preservation.json` records 272 matching source hashes.

From `C:/Users/Andre.Olivier/dev/3d-design-drafts`, with the grimoire server already running on port 4194:

```powershell
node audits/spine-system-review/run-audit.mjs
node audits/spine-system-review/extra-checks.mjs
node audits/spine-system-review/browser-audit.mjs
node audits/spine-system-review/followup-checks.mjs
node audits/spine-system-review/performance-reproduce.mjs
node audits/spine-system-review/build-report.mjs
node audits/spine-system-review/finalize.mjs
node audits/spine-system-review/server.mjs
```

Open http://127.0.0.1:4195/. Use the existing installed Three.js and Playwright dependencies from `wizard-grimoire`; Chrome and Edge paths are recorded in `browser-audit.mjs`. The report server binds only to loopback. Browser contexts are isolated and do not modify the user's saved inspection state.

`performance.json` is a separately measured isolated run. Its 1080p close measurement pins renderer pixel ratio to 1 in memory, because production uses 2× supersampling. `measurements.json` preserves the previous 4K result. The performance runner command and limits are in `performance-reproduce.mjs`. Run performance separately from all capture and geometry jobs.

The geometry helper implements broad-phase AABB hierarchy filtering and segment/triangle witnesses plus ray containment. It is not a robust CAD kernel: coplanar intersection, tangent classification and complete continuous collision checking are explicitly unestablished. Counts are triangle-pair witnesses, not penetration depths. Report unknowns are part of the audit result, never passing certifications.

The 100 UI cycles use reduced motion. They do not substitute for fully animated endurance or prove material behaviour. References, methods, prior claim corrections and remediation acceptance tests appear in the report.
