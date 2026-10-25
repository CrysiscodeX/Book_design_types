import {resourceURL} from '../../../../shared/Part_2-Connectors/resources.mjs';
import fs from 'node:fs/promises';
import {CATALOG,DEMO,DEFAULTS} from '../Part_1-Engine-Root/design.mjs';
import {renderSVG,sheet} from '../Part_3-Outer-Look-Shell/svg.mjs';
const root=resourceURL('../../',import.meta.url),folders=['exports/svg/'];
const variants=CATALOG.ranks.map(r=>({...DEMO,rank:r.id,title:r.name+' Water Codex'}));
const outputs=[];
for(const c of variants)for(const view of ['front','back','spine','fore-edge','top','three-quarter','exploded'])outputs.push([c.rank+'-'+view+'.svg',renderSVG(c,{view})]);
outputs.push(['rank-comparison.svg',sheet(variants,{title:'Water Â· Botanical Â· Sigilcraft â€” same-scale rank comparison',sameScale:true})]);
outputs.push(['elemental-reference.svg',sheet(CATALOG.elements.map(e=>({...DEFAULTS,rank:'advanced',primaryElement:e.id,title:e.name+' Codex'})),{title:'Twelve elemental identities â€” Advanced rank',columns:4})]);
outputs.push(['motif-style-study.svg',sheet([...CATALOG.fantasyMotifs.filter(x=>x.id!=='neutral').map(m=>({...DEFAULTS,rank:'advanced',fantasyMotif:m.id,title:m.name})),...CATALOG.wizardryStyles.filter(x=>x.id!=='neutral').map(w=>({...DEFAULTS,rank:'advanced',wizardryStyle:w.id,title:w.name}))],{title:'Independent fantasy motifs & wizardry styles',columns:4})]);
for(const folder of folders){await fs.mkdir(resourceURL(folder,root),{recursive:true});for(const [name,svg]of outputs)await fs.writeFile(resourceURL(folder+name,root),svg);}
await fs.writeFile(resourceURL('planning/dimensions-v03.json',root),JSON.stringify({version:'0.3',units:'mm',ranks:CATALOG.ranks.map(r=>({id:r.id,...r.dimensionsMm})),included:'Closed body and fixed ornament',excluded:'Loose accessories; supports; optical effects'},null,2));
console.log(`Generated ${outputs.length} editable SVG drawings in each SVG folder.`);
