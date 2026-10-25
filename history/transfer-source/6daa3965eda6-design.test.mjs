import {verifyHistory} from '../../../../tools/history.mjs';
import {resourceURL} from '../../../../shared/Part_2-Connectors/resources.mjs';
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import crypto from 'node:crypto';
import * as THREE from 'three';
import {CATALOG,DEMO,DEFAULTS,buildDesign,normalizeConfig,evidenceState,applyRecipe} from '../Part_1-Engine-Root/design.mjs';
import {buildModel} from '../Part_1-Engine-Root/geometry.mjs';
import {buildEffects} from '../Part_3-Outer-Look-Shell/effects.mjs';
import {renderSVG} from '../Part_3-Outer-Look-Shell/svg.mjs';
const results=[];
function inspect(c){const m=buildModel(c),box=m.bounds(),{L,H,B}=m.design.dimensions;try{
 const expected=[H,L,B];const lo=box.min.toArray(),hi=box.max.toArray();for(let i=0;i<3;i++){assert.ok(lo[i]>=-expected[i]/2-.06,`${c.rank}/${c.primaryElement}: axis ${i} min ${lo[i]} exceeds envelope`);assert.ok(hi[i]<=expected[i]/2+.06,`${c.rank}/${c.primaryElement}: axis ${i} max ${hi[i]} exceeds envelope`);}
 let triangles=0;m.root.traverse(o=>{if(o.geometry){const a=o.geometry.attributes.position.array;assert.ok(a.every(Number.isFinite));if(o.isMesh)triangles+=(o.geometry.index?.count||a.length/3)/3;}});
 assert.equal(new Set(m.design.components.map(c=>c.id)).size,m.design.components.length);assert.equal(m.design.components.filter(c=>c.id.includes('.marker.')).length,m.design.rank.rankMarkers);
 const fx=buildEffects(m);assert.equal(fx.layerCount,m.design.rank.defaultElementalLayerCount);assert.equal(fx.materials.length,fx.layerCount);fx.dispose();
 const svg=renderSVG(m.design);for(const component of m.design.components.filter(c=>c.type!=='line3'&&c.parent!=='rear'&&c.id!=='body.spine'))assert.ok(svg.includes('data-component="'+component.id+'"'),component.id+' missing from SVG');assert.ok(!svg.includes('<image'));
 const before=box.clone();m.pose(1);assert.ok(m.bounds().getSize(new THREE.Vector3()).z>before.getSize(new THREE.Vector3()).z);m.pose(0);assert.deepEqual(m.bounds().min.toArray(),before.min.toArray());
 results.push({rank:c.rank,element:c.primaryElement,motif:c.fantasyMotif||'neutral',style:c.wizardryStyle||'neutral',dimensions:{L,H,B},triangles,components:m.design.components.length});
 }finally{m.dispose();}}
test('36 elemental rank masters fit closed envelopes and share editable IDs',()=>{for(const rank of CATALOG.ranks)for(const element of CATALOG.elements)inspect({...DEFAULTS,rank:rank.id,primaryElement:element.id});});
test('all motif and wizardry modules fit each rank',()=>{for(const rank of CATALOG.ranks){for(const motif of CATALOG.fantasyMotifs.filter(m=>m.id!=='neutral'))inspect({...DEMO,rank:rank.id,fantasyMotif:motif.id});for(const style of CATALOG.wizardryStyles.filter(m=>m.id!=='neutral'))inspect({...DEMO,rank:rank.id,wizardryStyle:style.id});}});
test('recipes and representative layered designs stay bounded',()=>{for(const rank of CATALOG.ranks)for(const recipe of CATALOG.recipes)inspect(applyRecipe({...DEMO,rank:rank.id},recipe.id));inspect({...DEMO,rank:'meistro',primaryElement:'shadow',accentElements:['light','crystal'],fantasyMotif:'draconic',wizardryStyle:'summoning-spatial'});});
test('optional bookmark stays inside every rank',()=>{for(const rank of CATALOG.ranks)inspect({...DEMO,rank:rank.id,bookmark:true});});
test('quality changes tessellation without changing dimension rules or source ornament',()=>{const a=buildModel({...DEMO,rank:'meistro'}),b=buildModel({...DEMO,rank:'meistro',quality:'preview'});assert.deepEqual(a.design.components,b.design.components);assert.deepEqual(a.design.dimensions,b.design.dimensions);a.dispose();b.dispose();});
test('evidence gates and unrestricted content labels',()=>{assert.equal(evidenceState(DEFAULTS).outcome,false);assert.equal(evidenceState(DEFAULTS).archived,false);assert.throws(()=>normalizeConfig({...DEFAULTS,evidence:{result:'success'}}));assert.throws(()=>normalizeConfig({...DEFAULTS,accentElements:['water']}));const c=normalizeConfig({...DEFAULTS,industry:'Gardening',projectArea:'Finance',developmentStage:'Custom stage',evidence:{sourceRef:'user-run-1',result:'failure',provenance:'Supplied fixture'}});assert.equal(c.primaryElement,'water');assert.equal(c.rank,'initial');assert.equal(evidenceState(c).label,'Provided failure');assert.equal(evidenceState({...c,evidence:{available:false,sourceRef:'x',result:'success'}}).outcome,false);});
test('SVG safely escapes label text and includes metadata for every preset',()=>{for(const view of ['front','back','spine','fore-edge','top','three-quarter','exploded']){const s=renderSVG({...DEMO,title:'<script>& " title'},{view});assert.ok(s.includes('<metadata>'));assert.ok(!s.includes('<script>'));assert.ok(!s.includes('NaN'));}});
test('portable solid JSON reloads with dimensions and components',()=>{const m=buildModel(DEMO);const json=m.solidJSON(),loaded=new THREE.ObjectLoader().parse(json);assert.deepEqual(loaded.userData.dimensions,m.design.dimensions);assert.equal(loaded.children.length,m.root.children.length);const a=new THREE.Box3().setFromObject(loaded),b=m.bounds();assert.ok(a.max.distanceTo(b.max)<.001);loaded.traverse(o=>{o.geometry?.dispose();o.material?.dispose();});m.dispose();});
test('originals and historical snapshots remain unchanged',()=>{assert.equal(verifyHistory('default-book-design-types/'),53);});

test.after(()=>{fs.writeFileSync(resourceURL('geometry-results.json',import.meta.url),JSON.stringify({version:'0.3',cases:results,coverage:'36 base masters; every motif/style at each rank; 15 recipes; mixed case; optional bookmark at every rank',limits:'Visual meshes; not fabrication tolerances'},null,2));});
