import {resourceURL} from '../../../../shared/Part_2-Connectors/resources.mjs';
import * as T from 'three';
import fs from 'node:fs/promises';
import {createWizardBook} from '../Part_1-Engine-Root/book.mjs';
import {sectionStrips,polygonPenetration,stripsPenetration,RIGID_TOLERANCE,PAPER_TOLERANCE} from '../Part_2-Connectors/placement.mjs';
const b=createWizardBook(T),rows=[],strapChecks=[],failures=[];
function rectangle(mesh){mesh.geometry.computeBoundingBox();const q=mesh.geometry.boundingBox,z=0;return [[q.min.x,q.min.y,z],[q.max.x,q.min.y,z],[q.max.x,q.max.y,z],[q.min.x,q.max.y,z]].map(p=>{const v=new T.Vector3(...p).applyMatrix4(mesh.matrixWorld);return [v.x,v.y];});}
for(const pose of [...[0,.01,.025,.05,.1,.2,.25,.4,.6,.8,1].map(release=>({opening:0,turn:0,release})),...[15,30,60,90,110,130].map(opening=>({opening,turn:0,release:1}))]){
 b.setPose(pose);b.root.updateMatrixWorld(true);
 for(let i=0;i<2;i++){
  const hook=b.parts.get('clasp.'+i+'.hook').mesh,bar=b.parts.get('clasp.'+i+'.catch').mesh,B=rectangle(bar),A=sectionStrips(hook,.5);let maximum=0,unintended=0;
  for(let j=0;j<A.length;j++){const d=polygonPenetration(A[j].vertices,B,0);maximum=Math.max(maximum,d);if(d>RIGID_TOLERANCE){const legitimate=pose.opening===0&&pose.release<=.25&&j/A.length>=.88&&d<=.00015;if(!legitimate)unintended=Math.max(unintended,d);}}
  rows.push({pose,hook:'clasp.'+i+'.hook',maximumContactMm:maximum*1000,unintendedMm:unintended*1000});if(unintended)failures.push(rows.at(-1));
  const strap=b.parts.get('clasp.'+i+'.strap').mesh,section=sectionStrips(strap,.5),z=(i?1:-1)*.082;let paperPenetration=0,hit=null;
  for(let leaf=0;leaf<240;leaf++){const depth=stripsPenetration(section,sectionStrips(b.leaves[leaf],z/.292+.5),PAPER_TOLERANCE);if(depth>paperPenetration){paperPenetration=depth;hit=leaf;}}
  strapChecks.push({pose,strap:'clasp.'+i+'.strap',paperPenetrationMm:paperPenetration*1000,leaf:hit});if(paperPenetration>PAPER_TOLERANCE)failures.push(strapChecks.at(-1));
 }
}
// Compare the actual pad underside and post top at each corner of each support post.
const contacts=[];
for(const opening of [0,15,30,60,90,110,130]){
 b.setPose({opening,turn:0,release:opening?1:0});b.root.updateMatrixWorld(true);
 for(const p of b.parts.values())if(p.id.startsWith('support.')&&p.id.includes('.post.')&&p.mesh.visible){const pad=b.parts.get(p.id.replace('.post.','.pad.')).mesh,inv=pad.matrixWorld.clone().invert(),P=p.mesh.geometry.attributes.position;let maximum=0,count=0;
  for(let k=0;k<4;k++){const v=new T.Vector3().fromBufferAttribute(P,k).applyMatrix4(p.mesh.matrixWorld).applyMatrix4(inv);const normalSign=opening>=100&&p.id.includes('.front.')?1:-1;const gap=Math.abs(v.y-normalSign*.002);maximum=Math.max(maximum,gap);count++;}
  contacts.push({opening,part:p.id,maximumGapMm:maximum*1000});if(maximum>RIGID_TOLERANCE)failures.push(contacts.at(-1));
 }
}
const feet=[];for(const p of b.parts.values())if(p.id.startsWith('support.foot.')){const box=new T.Box3().setFromObject(p.mesh),gap=box.min.y;feet.push({id:p.id,gapMm:gap*1000});if(Math.abs(gap)>RIGID_TOLERANCE)failures.push(feet.at(-1));}
const report={generated:new Date().toISOString(),passed:!failures.length,rows,strapChecks,contacts,feet,failures,coverage:'Actual bent-hook cross-section against the catch bar envelope; both straps against all 240 writing leaves at the strap longitudinal station; exact pad-local post corner witnesses at seven opening angles; all four foot/floor contacts. Intended seated hook-tip contact is bounded by identifier, curve region and 0.15 mm maximum depth. Other unintended contacts use 0.05 mm; paper uses 0.005 mm.',limitations:'Does not establish every strap-to-plate or concealed sewing/adhesive interface.'};await fs.writeFile(resourceURL('fittings-results.json',import.meta.url),JSON.stringify(report,null,2));console.log(JSON.stringify({passed:report.passed,hookStates:rows.length,strapChecks:strapChecks.length,padContacts:contacts.length,feet,failures},null,2));b.dispose();if(!report.passed)process.exitCode=1;
