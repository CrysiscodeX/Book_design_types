import fs from 'node:fs';
import {buildDesign,CATALOG,DEMO,DEFAULTS} from '../models/shared/design.mjs';
const write=(p,s)=>fs.writeFileSync(p,s.endsWith('\n')?s:s+'\n');
const csv=x=>'"'+String(x??'').replaceAll('"','""')+'"';
const rows=[['rank','component_id','assembly','type','evidence_status','source','closed_envelope_mm']];
for(const r of CATALOG.ranks){const d=buildDesign({...DEMO,rank:r.id});for(const c of d.components)rows.push([r.id,c.id,c.parent,c.type,c.status,'models/shared/design.mjs',Object.values(d.dimensions).join('/')]);}
write('planning/model-component-inventory-v03.csv',rows.map(r=>r.map(csv).join(',')).join('\n'));
fs.mkdirSync('exports/configurations',{recursive:true});
for(const r of CATALOG.ranks)write('exports/configurations/water-'+r.id+'.json',JSON.stringify({version:'0.3',config:{...DEMO,rank:r.id},presentation:{view:'three-quarter',lighting:'reference',state:'resting',playing:true,reduced:false,effectsEnabled:true,intensity:1,display:'single',explode:0,time:0}},null,2));
write('exports/configurations/defaults.json',JSON.stringify({version:'0.3',config:DEFAULTS},null,2));
write('README.md',`# Default Book Design Types — v0.3

Local, editable SVG and Three.js design studio for Initial, Advanced, and Meistro. All work belongs in this folder. This is a visual design release; binding, opening, page turning, and fabrication remain subsequent work.

## Launch

In PowerShell, from this folder:

\`\`\`powershell
npm.cmd ci --cache .\\.cache\\npm
npm.cmd run start
\`\`\`

Open [the local studio](http://127.0.0.1:4174). Dependencies are already present in this workspace; installation is only needed after a clean checkout. Three.js is pinned to 0.186.1 and Playwright to 1.63.0 in the local lockfile. No CDN or remote textures are used. The server binds to loopback 127.0.0.1:4174, separate from the table viewer. Stop it with Ctrl+C. A modern WebGL2 browser is required.

Opening demonstration: Initial / Water / botanical ornament / sigilcraft and warding / Unlinked. **Reset defaults** selects Initial / Water / neutral motif and style / no accents or botanical module / resting ambient motion. The demonstration button preserves the current rank.

## Delivered files

- [Master project design](drafts/documents/project-design-v01.md), updated in place to v0.3; historical filename retained.
- [Rank comparison SVG](exports/svg/rank-comparison.svg), [elemental sheet](exports/svg/elemental-reference.svg), and [motif/style study](exports/svg/motif-style-study.svg).
- [SVG directory](exports/svg/README.md): seven editable views per demonstration rank, plus the three sheets, 24 drawings total. Working copies are in drafts/svg.
- [Three.js source and interfaces](models/threejs/README.md), [shared definitions](models/shared/design.mjs), and [shader effects](models/threejs/effects.mjs).
- Three closed portable solid assemblies: [Initial](exports/threejs/book-initial.json), [Advanced](exports/threejs/book-advanced.json), [Meistro](exports/threejs/book-meistro.json).
- Restorable demonstration configurations: [Initial](exports/configurations/water-initial.json), [Advanced](exports/configurations/water-advanced.json), [Meistro](exports/configurations/water-meistro.json), [defaults](exports/configurations/defaults.json).
- [Screenshots](exports/screenshots/README.md), [verification results](checks/verification.md), [design catalog](planning/design-system-v02.json), [runtime component inventory](planning/model-component-inventory-v03.csv), and [reference/component catalog](planning/component-inventory.csv).
- [Reference analysis](planning/reference-breakdown.md), [original index](references/reference-index.csv), [aesthetic catalog](planning/aesthetic-catalog-v02.md), [physical options](planning/physical-construction-options.md), and [decision log](planning/outstanding-decisions.md).
- Immutable [v0.1 snapshot manifest](exports/documents/v0.1-snapshot/snapshot-manifest.json) and [v0.2 snapshot manifest](exports/documents/v0.2-snapshot/snapshot-manifest.json). Both retain their original document versions.

## Editing and regenerating

Edit catalog choices in planning/design-system-v02.json (version 0.3; stable filename). Edit ornament curves, dimensions, allocations, and placements in models/shared/design.mjs. SVG and Three.js consume these same definitions. A quality change alters tessellation, while the master curves remain editable. Label, stage, area, industry, and construction intention do not choose an element or rank.

\`\`\`powershell
npm.cmd run sync:catalog
npm.cmd run drawings
npm.cmd run export:model
npm.cmd run check
npm.cmd run check:browser
node scripts/check-documents.mjs
\`\`\`

The studio regenerates any of the seven SVG views for the current customization. Export PNG for the current camera, configuration JSON for restoration, or Three.js JSON for a closed solid assembly. The supplied offline JSON models use an embedded pixel font; studio exports retain canvas typography. Long titles are fitted/truncated visually, but their complete text remains in configuration metadata.

Evidence JSON is separate from appearance. Import a supplied sourceRef plus result (success/failure/inconclusive) to enable Outcome; import savedContentRef to enable Archived. Optional provenance is displayed as supplied; available:false disables both states. The studio does not fetch links, execute skills, run tests, or independently verify evidence. Ambient animation never fabricates an outcome.

Portable solid exports contain geometry, PBR settings, embedded textures, and component metadata. Ground, scene lights/environment, airborne effects, selection helpers, and live shaders are excluded. Restore a configuration in the supplied source studio to run animation. These assemblies are visual meshes, not watertight manufacturing solids or fabrication drawings.

Date: 2026-10-06, Asia/Dubai.
`);
write('models/threejs/README.md',`# Studio source and interfaces — v0.3

Serve from the project root with npm.cmd run start; open http://127.0.0.1:4174. index.html uses project-local import maps. geometry.mjs builds identifiable solid components, effects.mjs adds removable live overlays, and viewer.mjs manages controls, scene, evidence gates, playback, and export. No skill execution exists.

## Shared configuration

Configuration JSON accepts either a plain config or {version, config, presentation}. Config fields: rank; primaryElement; accentElements (0–2 distinct IDs, different from primary); fantasyMotif; wizardryStyle; botanical; bookmark; title; developmentStage; projectArea; industry; constructionTrack (unspecified/functional-book/display-prop); quality (high/preview); evidence (null or a supplied record). Names/IDs are in [the catalog](../../planning/design-system-v02.json). Text fields are limited to 180 characters; evidence strings to 500; imports to 2 MiB.

Presentation fields: display (single/comparison), view, lighting (reference/neutral/grayscale), explode (0–1), state, effectsEnabled, intensity (0–1.5), reduced, time, playing. Missing values use defaults. Unknown choice IDs and invalid accents are rejected with a visible message. A primary change conflicting with an accent requires removing that accent first.

Supplied evidence example (a schema illustration, not a real test result):

\`\`\`json
{"sourceRef":"your-record-reference","result":"inconclusive","savedContentRef":"your-saved-content-reference","provenance":"Your supplied source","available":true}
\`\`\`

Outcome requires available sourceRef/result; Archived requires available savedContentRef. The label says Provided, not independently verified. Decorative rank/archive housings are authored geometry even when linkage is absent. The adapter never fetches or validates source URLs. Selecting Outcome requests one short display response; it returns to Resting after 1.5 animation seconds. Paused/reduced motion holds the displayed state.

## Programmatic use

\`\`\`javascript
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
\`\`\`

Load a portable assembly with Three.js ObjectLoader.parse(json); embedded browser canvas textures finish loading asynchronously. [ObjectLoader documentation](https://threejs.org/docs/#ObjectLoader) and [Object3D serialization documentation](https://threejs.org/docs/#Object3D) describe these native interfaces. Exported assemblies include millimeter units and metadata. Offline pixel-font labels support Latin letters/digits; studio canvas labels support installed font glyphs. External scenes supply their own lighting/environment.

window.bookStudio exposes setConfig/restore, setDisplay, setView, setExplode, select, setState, setLighting, setTime, setPlaying, setReduced, configuration, solidJSON, renderSVG, and read-only config/state/models/effects/metrics. This interface supports visual tests and future integration. It is a local preview API, not an evidence verifier.

## Rendering and resource boundaries

MeshPhysicalMaterial foundations provide metalness, family-specific roughness, and restrained water clearcoat or ice/crystal transmission. Procedural cover textures are embedded. Local room reflections, hemisphere/key/fill lights, and capped bloom are scene-only. Twelve spatial shader formulas share 1/3/5 rank channels. Accents reuse those channels. Meistro active channels are phase-staggered and route dots converge toward the hub; Advanced travels outward to connected nodes. Optical effects approximate fantasy appearances rather than simulate fluid dynamics or physical refraction.

Each rebuild disposes replaced geometry, textures, materials, and effect meshes. Comparison contains three same-scale envelopes. Exploded offsets are separate from dimensions and effects hide during explosion. Selection helpers are separate from exported solids. Controls support orbit/zoom, preset cameras, labels, recipes, module choice, inspection lighting, intensity, preview tessellation, deterministic reset, and reduced motion.

Axes: X=H, Y=L, Z=B. Pure shared models center on the origin. The studio raises books onto the floor and spaces comparison books by 50 mm; its solid exports retain those object transforms. Fixed ornament always remains inside canonical closed bounds. All back/inner/attachment constructions are proposed.
`);
write('exports/svg/README.md',`# Editable SVG collection — v0.3

For each of initial, advanced, and meistro, seven files: front, back, spine, fore-edge, top, three-quarter, exploded. [Same-scale comparison](rank-comparison.svg), [twelve-element sheet](elemental-reference.svg), and [motif/style sheet](motif-style-study.svg) complete the 24 drawings.

SVG contains editable paths, shapes, text, a core gradient, stable component IDs/data-component attributes, and configuration metadata. Side faces use suffixed IDs; study-cell IDs are prefixed to remain unique. Fine ornament retains editable Bezier paths. No embedded screenshots are used. Dimension text specifies canonical L/H/B; exploded views state the closed dimensions rather than treating displaced bounds as size.

Three-quarter and exploded projections are vector diagrams. Curved spine depiction and visible face sorting are illustrative approximations; use 3D inspection for occlusion and relief review. Shader optics are static vector approximations. Hidden construction and attachment choices are proposed. These are visual drawings, not tolerance-controlled shop drawings.

Regenerate from the project root with npm.cmd run drawings. Use the studio SVG preset/export controls to regenerate equivalent views for any supported customization.
`);
write('exports/screenshots/README.md',`# Visual review evidence — v0.3

- [Water / three ranks](three-rank-water-studio.png)
- [Neutral inspection](three-rank-neutral.png)
- [Grayscale inspection](three-rank-grayscale.png)
- [Meistro front](meistro-water-front.png)
- [Meistro exploded](meistro-exploded.png)
- [Twelve-element vector contact sheet](elemental-reference-sheet.png)
- [Responsive mobile studio](mobile-studio.png)

Captured by checks/studio.spec.mjs in installed Chrome. The elemental sheet is a browser rasterization of the editable SVG, not a replacement for that source. Demonstration screenshots start Unlinked. Dimensions and component topology remain authoritative in shared definitions. These images establish visual preview behavior; they do not establish fabrication, evidence verification, or reference reconstruction accuracy.
`);
let p='drafts/documents/project-design-v01.md',pd=fs.readFileSync(p,'utf8');
pd=pd.replace('**Version:** 0.2 — customizable three-rank design system','**Version:** 0.3 — editable SVG and Three.js design library').replace('**Status:** Design specification and curated catalogs; models, executable shaders, animations, and fabrication drawings remain subsequent deliverables','**Status:** Implemented local visual design studio, editable SVGs, shader animation, and portable solid previews; physical fabrication and moving mechanisms remain subsequent work');
pd=pd.replace('These are acceptance requirements for future visual drafts; no rendered proof is claimed in this delivery.','These requirements are checked in the delivered front/spine geometry and neutral/grayscale captures. See the v0.3 verification record for the limits of the visual review.');
pd=pd.replace('No board thickness, page count, tolerance, or binding method is selected yet.','Visual model board depths of 4/5/6 mm are now allocated; these are proposed modeling values, not production gauges. No physical page count, tolerance, or binding method is selected.');
pd=pd.replace('All motion is proposed. Existing reference loops remain legacy inspiration;','The delivered motion is authored preview behavior. Existing reference loops remain legacy inspiration;');
pd=pd.replace(/## 10\. Design data and future interfaces[\s\S]*?## 11\./,`## 10. Shared design data and delivered interfaces

[Design-system data](../../planning/design-system-v02.json) is version 0.3 at its stable path. [Shared definitions](../../models/shared/design.mjs) generate both vector drawings and Three.js component geometry; [runtime interfaces](../../models/threejs/README.md) document configuration, evidence import, exports, and programmatic use. Stable component IDs and editable Bezier paths connect the two representations.

Configurations preserve rank, exact dimensions through the rank ID, primary/accent elements, motif, wizardry style, botanical and inset-bookmark choices, title, independent content labels, construction intention, quality, and separate optional evidence. Presentation preferences record camera preset, lighting, state, intensity, effects, exploded offset, reduced motion, playback, and time. The studio performs no skill execution or testing.

Neutral/grayscale inspection suppresses magical effects. Component selection identifies proposed geometry. Outcome and Archived options are disabled without supplied linkage. Imported provenance is displayed as provided, never independently verified. The studio does not resolve remote references; available:false is a supplied unavailable-record flag.

Exports: editable SVG of any named view; current-camera PNG; restorable configuration JSON; closed portable Three.js solid JSON. Solid exports exclude scene environment, lights, ground, airborne effects, and selection helpers. PBR parameters, embedded textures, and component metadata persist. Live shader motion requires the supplied project source and configuration. Offline solid regeneration uses an embedded Latin pixel font; studio exports preserve canvas typography. These meshes are not manufacturing solids.

## 11.`);
pd=pd.replace('It is a textual design demonstration, not a generated image or running model.','It is now implemented in the running studio, 21 editable preset views, three portable assemblies, and captured screenshots. The demonstration remains Unlinked.');
pd=pd.replace('Page format, binding, back-cover reconstruction, production materials, power/access, fabrication methods/tolerances, and runtime budgets remain unresolved until implementation requires them.','Page format, binding, actual back fastening, production materials, power/access, fabrication methods/tolerances, and target-device performance acceptance remain open. Proposed backs are modeled and resource behavior has been measured locally.');
pd=pd.replace('advance to 0.2.','advance to 0.3. The pre-implementation v0.2 documentation/data is preserved in [its hash manifest](../../exports/documents/v0.2-snapshot/snapshot-manifest.json).');
pd=pd.replace('Future visual/functional acceptance:','Visual and future physical acceptance:');
pd=pd.replace('Passing document checks does not establish model fit, rendering quality, animation behavior, physical feasibility, or electrical performance. Those checks belong to later implemented drafts.','Document checks and executed geometry/browser checks are recorded separately. The delivered visual models are tested; physical feasibility, electrical performance, binding, real material choice, and production tolerances remain unverified.');
const addendum=`
## 15. Implemented geometry allocations and preview controls

All allocations below are authored visual dimensions in millimeters. Every fixed module uses the same rank allocation, including optional motifs, styles, accents, and the inset bookmark. No fixed component increases the outer envelope.

| Allocation | Initial | Advanced | Meistro |
|---|---:|---:|---:|
| Canonical L/H/B | 260/160/50 | 310/210/80 | 380/280/120 |
| Combined front/rear relief allowance | 6 | 10 | 16 |
| Reserved rear relief | 0.8 | 0.8 | 0.8 |
| Covered body region | 44 | 70 | 104 |
| Front and rear board depth, each | 4 | 5 | 6 |
| Visual page-block depth | 36 | 60 | 92 |
| Rank markers / elemental layers | 1/1 | 2/3 | 3/5 |

Pages are inset 6 mm from spine ends and 5 mm from fore-edge; the spine is an elliptical shell and boards are rounded shapes. Page-edge striations represent paper texture, not a declared page count. Rear relief sits inside B; the central core reaches the front maximum B/2. Fixed fronts, backs, internal parts, and attachments are proposed. Exploded displacement is a separate assembly illustration, not an opening or construction simulation.

Initial has a compact focal plaque and one frame; Advanced has three linked subordinate nodes and two frames; Meistro has four nodes, nested evaluation rails, three frames, and an independent archive housing. The [generated component inventory](../../planning/model-component-inventory-v03.csv) records the three demonstration assemblies by rank and component ID. The [reference inventory](../../planning/component-inventory.csv) remains the source evidence catalog.

The studio provides all twelve elements, six motifs plus neutral, eight styles plus neutral, five recipes, up to two accents, optional botanical/inset-bookmark ornament, editable title and independent labels, and declared construction intention. Orbit/zoom, six camera presets, component picking, exploded slider, same-scale comparison, neutral/grayscale inspection, intensity, preview/master tessellation, play/pause/reset, and reduced motion are implemented. All remains inside the project folder, with local pinned dependencies and loopback service at 127.0.0.1:4174.

## 16. Implemented materials, shaders, lighting, and motion

Shared PBR foundations use family-specific roughness (Fire .78; Water .32; Earth .93; Air .58; Ice .20; Lightning .48; Metal .22; Crystal .26; Light .42; Shadow .89; Nature .75; Decay .92 for covers), metallic ornament, warm matte paper, procedural cover maps, Water clearcoat, and shallow Ice/Crystal transmission. Actual physical materials are not selected. Scene-only room reflections make Metal reflection-led; a hemisphere, warm key, cool fill, and local elemental point lights support the reference-style presentation. Bloom is restrained and disabled in inspection/reduced-motion views.

| Element | Persistent ornament | Implemented optical/motion approximation |
|---|---|---|
| Fire | Flame-like relief petals | Noisy ember/flame ring with warm circulation |
| Water | Editable curling current tracery | Moving radial ripple/current lines |
| Earth | Mineral seam routes and stratified map | Slowly shifting strata illumination |
| Air | Feather curves | Directed sinuous ribbon streams |
| Ice | Branched lines and facet leaves | Sixfold crystalline spokes and shimmer |
| Lightning | Angular conductor branches | Slowly varying zigzag charge routes; no flash loop |
| Metal | Ordered projecting ridges; brushed map | Moving reflective sheen and field lines; no emissive point light |
| Crystal | Raised diamond inserts | Facet/lattice glints and spectral-colored rings |
| Light | Raised radial rays | Nested corona rings and narrow ray patterns |
| Shadow | Curling veil curves; matte cover | Low-opacity ink/contour veil, with stable body |
| Nature | Leaves and botanical stems | Vine/current overlays and sparse motes |
| Decay | Weathered seams and patina map | Dissolving/reforming patina overlay; body never disappears |

These are controlled artistic shader approximations, not volumetric fluid/heat simulation, physical caustics, snow physics, or optical ray tracing. The richer v0.2 catalog remains an expandable look-development vocabulary. Particles are rank-budgeted and deterministic. One/three/five shader channels remain the rank budget; primary occupies the first channel and accents reuse later ones. Optional outcome glyphs are evidence indicators, not extra elemental layers.

Advanced Active moves along connected paths; Meistro reverses route flow toward the hub and phase-staggers its five channels. Focus lasts 0.8 animation seconds, Outcome 1.5 then returns to Resting; Archived subdues elemental activity. Supplied success uses a check, failure a cross, and inconclusive an open ring alongside a Provided result label. Missing linkage never enables these states. Pause freezes time; Reset time is deterministic. Reduced motion holds shader time at zero and disables particles/path travel.

Physical translations remain in the [construction options](../../planning/physical-construction-options.md): attachable relief/inlays differ from practical illuminated channels and scene-only airborne effects. Lighting hardware, translucent diffusion, relief mass, binding clearance, and real material tests must be designed for the chosen functional-book/display-prop track.

## 17. Delivered visuals and measured verification

![Three-rank Water demonstration](../../exports/screenshots/three-rank-water-studio.png)

[Neutral](../../exports/screenshots/three-rank-neutral.png), [grayscale](../../exports/screenshots/three-rank-grayscale.png), [Meistro front](../../exports/screenshots/meistro-water-front.png), [exploded](../../exports/screenshots/meistro-exploded.png), and [elemental sheet](../../exports/screenshots/elemental-reference-sheet.png) provide the visual review record. Rank dimensions, frame count, node topology, markers, and readable labels persist with effects disabled. Lighting and bloom are separate from solid appearance.

The [verification record](../../checks/verification.md) reports actual geometry, browser, portability, documentation, hash, and resource checks separately. Screenshots demonstrate this draft's visual identity; they do not certify physical manufacture or authenticated reference reconstruction. Launch/regeneration instructions are in the [project README](../../README.md).
`;
if(!pd.includes('## 15. Implemented geometry'))pd+=addendum;write(p,pd);
write('exports/documents/project-design-v03.md',pd);
for(const p of ['materials/material-catalog-v02.md','materials/shaders/shader-spec-v01.md','effects/presets/effect-presets-v01.md','lighting/presets/lighting-presets-v01.md','animations/presets/animation-presets-v01.md','planning/effects-breakdown.md']){let s=fs.readFileSync(p,'utf8').replace(/v0\.2/g,'v0.3');if(!s.includes('## v0.3 implementation status'))s+='\n## v0.3 implementation status\n\nThe curated vocabulary above remains design guidance. Executable visual geometry, twelve shader families, rank-budgeted motion, inspection lighting, and export behavior are delivered in the local studio. The master PD sections 15–17 record exact implemented values and limitations; the runtime README documents interfaces. Physical construction and fuller optical simulation remain unverified. See `models/threejs/geometry.mjs`, `effects.mjs`, and `viewer.mjs` under the project root, and `checks/verification.md` for measured results.\n';write(p,s);}
let decisions=fs.readFileSync('planning/outstanding-decisions.md','utf8').replace('— v0.2','— v0.3');
decisions=decisions.replace('Open; original designs unknown; new reconstructions must be proposed','Proposed backs and internal geometry implemented; original concealed construction remains unknown');
decisions=decisions.replace('Rank complexity resolved to 1/3/5; exposure and rendered look still open','Implemented 1/3/5 channels; controlled exposure/bloom; authored look captured, further art review open');
decisions=decisions.replace('Catalog fields documented; executable API still open','Implemented configuration/evidence adapter, SVG/PNG/config/solid export; source interfaces documented');
decisions=decisions.replace('Open; no measured renderer performance','Local repeated-rebuild/resource and render-submission measurements recorded; target-device budget still open');
decisions=decisions.replace('Later status behavior','Implemented gated status behavior');
decisions=decisions.replace('Acceptance specified; rendered proof pending','Neutral/grayscale/effects-off review captured; proportions, labels, and topology persist');
decisions=decisions.replace('Before geometry, establish per-rank body/ornament allocation and inspect reference adaptations.','Per-rank body/ornament visual allocations are implemented and tested.');
decisions=decisions.replace('Before runtime delivery, implement and validate motion/evidence gates, exports, and performance.','Runtime gates, exports, motion, and resource behavior are checked in this release; physical tests remain open.');
write('planning/outstanding-decisions.md',decisions);
let demo=fs.readFileSync('drafts/documents/water-botanical-sigilcraft-demo-v02.md','utf8');if(!demo.includes('## v0.3 delivered demonstration'))demo+='\n## v0.3 delivered demonstration\n\nThis proposed design is implemented in the local studio and seven editable SVG views per rank. Combined fixed-relief allowances are 6/10/16 mm, visual boards 4/5/6 mm each, and page regions 36/60/92 mm. All fixed geometry fits the supplied closed envelopes. Studio defaults open this demonstration Unlinked; Reset defaults selects neutral ornament/style. See the master PD sections 15–17 and the verification record for rendered evidence and runtime limits.\n';write('drafts/documents/water-botanical-sigilcraft-demo-v02.md',demo);
write('exports/documents/water-botanical-sigilcraft-demo-v02.md',demo.replace('(project-design-v01.md)','(project-design-v03.md)'));
console.log('Updated v0.3 handoff, component registry, configurations, and master PD.');
