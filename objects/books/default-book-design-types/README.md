# default-book-design-types

Read [the design record](design.md) for intent, evidence, decisions, methodology, limitations, and future work.

From the workspace root:

```powershell
npm.cmd run start --workspace=default-book-design-types
```

Open http://127.0.0.1:4174/. Stop the server with Ctrl+C.
Run `npm.cmd run verify` at the workspace root for builds and applicable geometry/browser checks.
Use `npm.cmd run build` to regenerate previews and canonical exports.

The three parts separate construction/state, attachment/integration, and appearance. References and checks belong to this object. Shared dependencies are installed once at the workspace root with `npm.cmd ci`.
