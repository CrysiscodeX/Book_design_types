import fs from 'node:fs/promises';
import * as T from 'three';
import {createWizardBook} from '../Part_1-Engine-Root/book-v2.mjs';
import {paperWitnesses,polygonPenetration,PAPER_TOLERANCE,sectionStrips} from '../Part_2-Connectors/placement.mjs';
import {auditGeometry} from './audit.mjs';
const b=createWizardBook(T),states=[],failures=[],fixtures=[],refinements=[];
const rect=(a,z)=>[[0,a],[.01,a],[.01,z],[0,z]];
fixtures.push({name:'8 micrometre paper gap',pass:polygonPenetration(rect(0,.00016),rect(.000168,.000328))===0},{name:'7 micrometre paper penetration',pass:polygonPenetration(rect(0,.00016),rect(.000153,.000313))>PAPER_TOLERANCE},{name:'70 micrometre rigid penetration',pass:polygonPenetration(rect(0,.004),rect(.00393,.00793),.00005)>.00005});
const poses=[...[0,15,30,60,90,110,130].map(opening=>({opening,leaf:120,turn:0})),...[1,120,238].flatMap(leaf=>[110,130].flatMap(opening=>Array.from({length:51},(_,k)=>({opening,leaf,turn:k/50}))))];
let minThickness=Infinity,maxThickness=0,maxWidthError=0;
for(let k=0;k<poses.length;k++){const pose=poses[k];b.setPose(pose);const r=paperWitnesses(b,{activeOnly:k>=7,slices:[.5]}),m=b.leaves[b.pose.leaf],g=m.geometry,{nu,nv}=g.userData,P=g.attributes.position,N=(nu+1)*(nv+1),a=new T.Vector3(),z=new T.Vector3();let len=0;
  for(let j=0;j<nu;j++)len+=a.fromBufferAttribute(P,j*(nv+1)+nv/2).distanceTo(z.fromBufferAttribute(P,(j+1)*(nv+1)+nv/2));maxWidthError=Math.max(maxWidthError,Math.abs(len-.212)/.212);
  for(let j=0;j<N;j+=Math.max(1,Math.floor(N/30))){const t=a.fromBufferAttribute(P,j).distanceTo(z.fromBufferAttribute(P,j+N));minThickness=Math.min(minThickness,t);maxThickness=Math.max(maxThickness,t);}
  const solid=auditGeometry(g);states.push({pose,passed:r.passed&&solid.passed,maximumPaperPenetrationMm:r.maximumMm});if(!r.passed||!solid.passed)failures.push({pose,paper:r.failures,solid:solid.passed});if(k%75===0)console.log('Motion',k+1,'/',poses.length,'failures',failures.length);
}
for(const opening of [110,130])for(const leaf of [1,120,238])for(const turn of [.002,.005,.01,.99,.995,.998]){b.setPose({opening,leaf,turn});const r=paperWitnesses(b,{activeOnly:true,slices:[.5]});refinements.push({opening,leaf,turn,passed:r.passed});if(!r.passed)failures.push({opening,leaf,turn,paper:r.failures});}
// All paper mid-surfaces are extruded along Z; compare head/centre/tail vertices to establish that reduction explicitly.
let extrusionError=0;for(const m of b.leaves){const P=m.geometry.attributes.position,{nu,nv}=m.geometry.userData;for(let i=0;i<=nu;i++)for(const side of [0,1]){const N=(nu+1)*(nv+1),a=i*(nv+1)+side*N,c=a+nv;extrusionError=Math.max(extrusionError,Math.abs(P.getX(a)-P.getX(c)),Math.abs(P.getY(a)-P.getY(c)));}}
const result={version:2,passed:!failures.length&&fixtures.every(f=>f.pass)&&extrusionError<1e-8,fixtures,states,refinements,failures,thicknessMm:{min:minThickness*1000,max:maxThickness*1000},maximumWidthErrorPercent:maxWidthError*100,extrusionErrorMm:extrusionError*1000,coverage:'313 sampled poses plus 36 endpoint refinements. Actual closed-mesh XY SAT: all adjacent leaves at seven opening angles, active leaf versus every other leaf at 2% turn intervals. Head/tail XY equality establishes the extrusion reduction for these writing leaves. Not continuous-in-time or whole-book 3D collision proof.',limits:'Board, adhesive, mull, endpaper and fitting contacts require independent checks. Source topology does not prove self-intersection freedom.'};
await fs.writeFile(new URL('anatomy-motion-results.json',import.meta.url),JSON.stringify(result,null,2));console.log(JSON.stringify({passed:result.passed,failures:failures.length,thicknessMm:result.thicknessMm,maximumWidthErrorPercent:result.maximumWidthErrorPercent}));b.dispose();if(!result.passed)process.exitCode=1;
