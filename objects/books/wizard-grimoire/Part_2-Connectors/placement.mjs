import * as T from 'three';
export const PAPER_TOLERANCE=.000005,RIGID_TOLERANCE=.00005;
export function sectionStrips(mesh,v=.5) {
  const g=mesh.geometry,{nu,nv}=g.userData,P=g.attributes.position,N=(nu+1)*(nv+1),j=Math.floor(nv*v),next=Math.min(nv,j+1),weight=nv*v-j,strips=[];
  for(let i=0;i<nu;i++){
    const ids=[i*(nv+1)+j,(i+1)*(nv+1)+j,(i+1)*(nv+1)+j+N,i*(nv+1)+j+N];
    const vertices=ids.map(k=>new T.Vector3().fromBufferAttribute(P,k).lerp(new T.Vector3().fromBufferAttribute(P,k+next-j),weight).applyMatrix4(mesh.matrixWorld)).map(p=>[p.x,p.y]);
    strips.push({vertices,minX:Math.min(...vertices.map(p=>p[0])),maxX:Math.max(...vertices.map(p=>p[0])),minY:Math.min(...vertices.map(p=>p[1])),maxY:Math.max(...vertices.map(p=>p[1]))});
  }return strips;
}
export function polygonPenetration(A,B,tolerance=PAPER_TOLERANCE) {
  let smallest=Infinity;
  for(const polygon of [A,B])for(let i=0;i<polygon.length;i++){
    const a=polygon[i],b=polygon[(i+1)%polygon.length],dx=b[0]-a[0],dy=b[1]-a[1],len=Math.hypot(dx,dy);if(len<1e-12)continue;
    const nx=-dy/len,ny=dx/len,pa=A.map(p=>p[0]*nx+p[1]*ny),pb=B.map(p=>p[0]*nx+p[1]*ny),overlap=Math.min(Math.max(...pa),Math.max(...pb))-Math.max(Math.min(...pa),Math.min(...pb));
    if(overlap<=tolerance)return 0;smallest=Math.min(smallest,overlap);
  }return smallest;
}
export function stripsPenetration(A,B,tolerance=PAPER_TOLERANCE) {
  let maximum=0;for(const a of A)for(const b of B){if(a.maxX<b.minX||b.maxX<a.minX||a.maxY<b.minY||b.maxY<a.minY)continue;maximum=Math.max(maximum,polygonPenetration(a.vertices,b.vertices,tolerance));}return maximum;
}
export function paperWitnesses(book,{activeOnly=false,slices=[0,.25,.5,.75,1]}={}) {
  book.root.updateMatrixWorld(true);const failures=[];let pairs=0,maximum=0;
  for(const v of slices){const sections=book.leaves.map(m=>sectionStrips(m,v));
    const candidates=activeOnly?book.leaves.map((_,i)=>[book.pose.leaf,i]).filter(([a,b])=>a!==b):book.leaves.slice(1).map((_,i)=>[i,i+1]);
    for(const [a,b]of candidates){pairs++;const penetration=stripsPenetration(sections[a],sections[b]);if(penetration>PAPER_TOLERANCE){maximum=Math.max(maximum,penetration);if(failures.length<12)failures.push({a,b,v,penetrationMm:penetration*1000});}}
  }
  return {passed:!failures.length,pairs,maximumMm:maximum*1000,failures};
}
export function coverClearances(book) {
  const failures=[],measurements=[];book.root.updateMatrixWorld(true);
  for(const name of ['rear','front']){
    const cover=book.parts.get(name+'.board').mesh,inv=cover.matrixWorld.clone().invert(),sign=name==='rear'?1:-1,ids=name==='rear'?['leaf.000','rear.flyleaf.0','rear.flyleaf.1']:['leaf.239','front.flyleaf.0','front.flyleaf.1'];
    for(const id of ids){const mesh=book.parts.get(id).mesh,matrix=inv.clone().multiply(mesh.matrixWorld),p=mesh.geometry.attributes.position;let clearance=Infinity;
      for(let i=0;i<p.count;i++){const point=new T.Vector3().fromBufferAttribute(p,i).applyMatrix4(matrix);if(point.x<0||point.x>.212)continue;clearance=Math.min(clearance,sign*point.y-.002);}
      measurements.push({id,board:name,clearanceMm:clearance*1000});if(clearance<-PAPER_TOLERANCE)failures.push({id,board:name,penetrationMm:-clearance*1000});
    }
  }
  const ground=book.parts.get('ground.slab').mesh;const supportBottom=new T.Box3();for(const p of book.parts.values())if(p.category==='support'&&p.mesh.visible)supportBottom.union(new T.Box3().setFromObject(p.mesh));
  if(supportBottom.min.y<-RIGID_TOLERANCE)failures.push({id:'support',floorPenetrationMm:-supportBottom.min.y*1000});
  if(supportBottom.min.y>RIGID_TOLERANCE)failures.push({id:'support',floorGapMm:supportBottom.min.y*1000});
  return {passed:!failures.length,measurements,failures};
}
