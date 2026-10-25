# Studio source and interfaces — v0.3

Serve from the project root with npm.cmd run start; open http://127.0.0.1:4174. index.html uses project-local import maps. geometry.mjs builds identifiable solid components, effects.mjs adds removable live overlays, and viewer.mjs manages controls, scene, evidence gates, playback, and export. No skill execution exists.

## Shared configuration

Configuration JSON accepts either a plain config or {version, config, presentation}. Config fields: rank; primaryElement; accentElements (0–2 distinct IDs, different from primary); fantasyMotif; wizardryStyle; botanical; bookmark; title; developmentStage; projectArea; industry; constructionTrack (unspecified/functional-book/display-prop); quality (high/preview); evidence (null or a supplied record). Names/IDs are in [the catalog](../../planning/design-system-v02.json). Text fields are limited to 180 characters; evidence strings to 500; imports to 2 MiB.

Presentation fields: display (single/comparison), view, lighting (reference/neutral/grayscale), explode (0–1), state, effectsEnabled, intensity (0–1.5), reduced, time, playing. Missing values use defaults. Unknown choice IDs and invalid accents are rejected with a visible message. A primary change conflicting with an accent requires removing that accent first.

Supplied evidence example (a schema illustration, not a real test result):

```json
{"sourceRef":"your-record-reference","result":"inconclusive","savedContentRef":"your-saved-content-reference","provenance":"Your supplied source","available":true}
```

Outcome requires available sourceRef/result; Archived requires available savedContentRef. The label says Provided, not independently verified. Decorative rank/archive housings are authored geometry even when linkage is absent. The adapter never fetches or validates source URLs. Selecting Outcome requests one short display response; it returns to Resting after 1.5 animation seconds. Paused/reduced motion holds the displayed state.

## Programmatic use

```javascript
import { buildDesign, DEMO } from '../shared/design.mjs';
import { renderSVG } from '../shared/svg.mjs';
import { buildModel } from './geometry.mjs';
const config = { ...DEMO, rank: 'advanced', primaryElement: 'water' };
const design = buildDesign(config);
const svg = renderSVG(design, { view: 'exploded', effects: true });
const model = buildModel(config);
model.pose(0.6); // offsets only; canonical dimensions do not change
const portable = model.solidJSON(); // temporarily closes, then restores pose
model.dispose();
```

Load a portable assembly with Three.js ObjectLoader.parse(json); embedded browser canvas textures finish loading asynchronously. [ObjectLoader documentation](https://threejs.org/docs/#ObjectLoader) and [Object3D serialization documentation](https://threejs.org/docs/#Object3D) describe these native interfaces. Exported assemblies include millimeter units and metadata. Offline pixel-font labels support Latin letters/digits; studio canvas labels support installed font glyphs. External scenes supply their own lighting/environment.

window.bookStudio exposes setConfig/restore, setDisplay, setView, setExplode, select, setState, setLighting, setTime, setPlaying, setReduced, configuration, solidJSON, renderSVG, and read-only config/state/models/effects/metrics. This interface supports visual tests and future integration. It is a local preview API, not an evidence verifier.

## Rendering and resource boundaries

MeshPhysicalMaterial foundations provide metalness, family-specific roughness, and restrained water clearcoat or ice/crystal transmission. Procedural cover textures are embedded. Local room reflections, hemisphere/key/fill lights, and capped bloom are scene-only. Twelve spatial shader formulas share 1/3/5 rank channels. Accents reuse those channels. Meistro active channels are phase-staggered and route dots converge toward the hub; Advanced travels outward to connected nodes. Optical effects approximate fantasy appearances rather than simulate fluid dynamics or physical refraction.

Each rebuild disposes replaced geometry, textures, materials, and effect meshes. Comparison contains three same-scale envelopes. Exploded offsets are separate from dimensions and effects hide during explosion. Selection helpers are separate from exported solids. Controls support orbit/zoom, preset cameras, labels, recipes, module choice, inspection lighting, intensity, preview tessellation, deterministic reset, and reduced motion.

Axes: X=H, Y=L, Z=B. Pure shared models center on the origin. The studio raises books onto the floor and spaces comparison books by 50 mm; its solid exports retain those object transforms. Fixed ornament always remains inside canonical closed bounds. All back/inner/attachment constructions are proposed.
