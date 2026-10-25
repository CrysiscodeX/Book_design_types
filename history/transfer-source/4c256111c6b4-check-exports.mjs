import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import {workspaceRoot,resources} from '../shared/Part_2-Connectors/resources.mjs';
export function checkExports(){
 const counts={svgs:0,portableAssemblies:0};
 for(const id of ['default-table-design','default-book-design-types']){
  const o=resources.objects.find(o=>o.id===id),folder=path.join(workspaceRoot,o.path,'exports/svg'),svgs=fs.readdirSync(folder).filter(n=>n.endsWith('.svg'));
  assert.equal(svgs.length,id==='default-table-design'?7:24);
  for(const name of svgs){const text=fs.readFileSync(path.join(folder,name),'utf8');assert.ok(text.includes('<svg'));assert.ok(!text.includes('<image'));assert.ok(!text.includes('NaN'));const ids=[...text.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);assert.equal(new Set(ids).size,ids.length,name+': duplicate SVG IDs');counts.svgs++;}
  const models=path.join(workspaceRoot,o.path,'exports/threejs');
  for(const name of fs.readdirSync(models).filter(n=>n.endsWith('.json'))){const json=JSON.parse(fs.readFileSync(path.join(models,name),'utf8')),loaded=new THREE.ObjectLoader().parse(json),bounds=new THREE.Box3().setFromObject(loaded);assert.ok(!bounds.isEmpty());assert.ok([...bounds.min.toArray(),...bounds.max.toArray()].every(Number.isFinite));assert.equal(loaded.userData.units,'mm');loaded.traverse(object=>{object.geometry?.dispose();for(const m of Array.isArray(object.material)?object.material:[object.material])m?.dispose();});counts.portableAssemblies++;}
 }
 assert.equal(counts.portableAssemblies,4);return counts;
}
