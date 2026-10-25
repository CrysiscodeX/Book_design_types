import * as T from 'three';
import fs from 'node:fs/promises';
import assert from 'node:assert/strict';
import {createWizardBook} from './book.mjs';
import {auditGeometry} from './audit.mjs';
import {paperWitnesses,coverClearances,polygonPenetration,PAPER_TOLERANCE} from './placement.mjs';
const rectangle=(bottom,top)=>[[0,bottom],[.01,bottom],[.01,top],[0,top]],A=rectangle(0,.00016);
const fixtures=[{name:'8 µm separation',passed:polygonPenetration(A,rectangle(.000168,.000328))===0},{name:'3 µm overlap allowed at 5 µm threshold',passed:polygonPenetration(A,rectangle(.000157,.000317))===0},{name:'7 µm overlap detected',passed:polygonPenetration(A,rectangle(.000153,.000313))>PAPER_TOLERANCE},{name:'50 µm rigid fixture',passed:polygonPenetration(rectangle(0,.004),rectangle(.00393,.00793),.00005)>.00005}];
fixtures.forEach(f=>assert.ok(f.passed,f.name));
const book=createWizardBook(T),rows=[],failures=[],solids=[],details=[],geometryMemo=new WeakMap();let geometryAudits=0;
const poses=process.argv.includes('--quick')?[{opening:0,leaf:120,turn:0},{opening:130,leaf:120,turn:0},{opening:130,leaf:120,turn:.5},{opening:130,leaf:120,turn:1}]:[
  ...[0,15,30,60,90,110,130].map(opening=>({opening,leaf:120,turn:0})),
  ...[1,120,238].flatMap(leaf=>[110,130].flatMap(opening=>Array.from({length:51},(_,i)=>({opening,leaf,turn:i/50}))))
];
let maxWidthError=0,minThickness=Infinity,maxThickness=0;
for(let k=0;k<poses.length;k++){
  const pose=poses[k];book.setPose(pose);const activeOnly=k>=7&&!process.argv.includes('--quick');
  const placement=paperWitnesses(book,{activeOnly}),covers=coverClearances(book);
  const leaf=book.leaves[book.pose.leaf],geometry=leaf.geometry,{nu,nv}=geometry.userData,p=geometry.attributes.position,N=(nu+1)*(nv+1);let length=0;
  const v=new T.Vector3(),w=new T.Vector3();for(let i=0;i<nu;i++){const a=i*(nv+1)+nv/2,b=(i+1)*(nv+1)+nv/2;v.fromBufferAttribute(p,a);w.fromBufferAttribute(p,b);length+=v.distanceTo(w);}maxWidthError=Math.max(maxWidthError,Math.abs(length-.212)/.212);
  for(let i=0;i<N;i+=Math.max(1,Math.floor(N/40))){v.fromBufferAttribute(p,i);w.fromBufferAttribute(p,i+N);const t=v.distanceTo(w);minThickness=Math.min(minThickness,t);maxThickness=Math.max(maxThickness,t);}
  const invalidSolids=[];let audited=0;
  for(const part of book.parts.values()){
    if(part.renderOnly)continue;const g=part.mesh.geometry,stamp=g.attributes.position.version+'/'+(g.index?.version??0);let memo=geometryMemo.get(g);
    if(!memo||memo.stamp!==stamp){memo={stamp,report:auditGeometry(g)};geometryMemo.set(g,memo);geometryAudits++;audited++;}
    if(!memo.report.passed||part.mesh.matrixWorld.determinant()<=0)invalidSolids.push(part.id);
  }
  const solid=geometryMemo.get(geometry).report;solids.push({pose,passed:!invalidSolids.length,activeVolume:solid.volume,changedGeometriesAudited:audited,invalidSolids});
  const good=placement.passed&&covers.passed&&!invalidSolids.length;rows.push({pose,passed:good,pairs:placement.pairs,maximumPenetrationMm:placement.maximumMm});
  if(!good){const finding={pose,paper:placement.failures,covers:covers.failures,invalidSolids};failures.push(finding);if(failures.length<=5)console.log('FAIL',JSON.stringify(finding));}
  if(k%25===0)console.log('Motion states',k+1,'/',poses.length);
  if(k<7)details.push({pose,covers});
}
const extra=[];
// Refine the first and last 2% where a moving sheet is closest to its resting stack.
if(!process.argv.includes('--quick'))for(const opening of [110,130])for(const leaf of [1,120,238])for(const turn of [.002,.005,.01,.99,.995,.998]){
  book.setPose({opening,leaf,turn});const witness=paperWitnesses(book,{activeOnly:true});extra.push({pose:{opening,leaf,turn},passed:witness.passed,failures:witness.failures});if(!witness.passed)failures.push({pose:{opening,leaf,turn},paper:witness.failures});
}
const report={generated:new Date().toISOString(),passed:!failures.length&&maxWidthError<.01&&Math.abs(minThickness-.00016)<.000005,fixtures,states:rows,refinements:extra,paperToleranceMm:.005,rigidToleranceMm:.05,maximumWidthErrorPercent:maxWidthError*100,thicknessMm:{min:minThickness*1000,max:maxThickness*1000},geometryAudits,solids,details,failures,
  coverage:'Independent actual-mesh cross-section SAT witnesses at five longitudinal positions: all adjacent leaves at seven opening angles; active leaf against every other writing leaf at 2% turn intervals, with endpoint refinement. Board-plane and floor witnesses are separate. This is sampled coverage, not continuous collision proof.',
  exclusions:'Render-only paper proxies intentionally replace the same volume at distance. Concealed adhesive, all decorative/sewing contacts, through-board lacing passages, and complete 3D self-intersection/containment are not certified by these witnesses.'};
await fs.writeFile(new URL('motion-results.json',import.meta.url),JSON.stringify(report,null,2));book.dispose();console.log(JSON.stringify({passed:report.passed,states:rows.length,refinements:extra.length,failures:failures.length,widthErrorPercent:report.maximumWidthErrorPercent,thicknessMm:report.thicknessMm},null,2));if(!report.passed)process.exitCode=1;
