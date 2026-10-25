export const clamp=(x,a,b)=>Math.max(a,Math.min(b,x));
export const smooth=x=>{x=clamp(x,0,1);return x*x*(3-2*x);};

export function createGeometryTools(T) {
  function shell(nu,nv,surface,thickness,options={}) {
    const N=(nu+1)*(nv+1),centres=new Float64Array(N*3),baseNormals=new Float32Array(N*3),p=[],uv=[],normals=[];
    for(let i=0;i<=nu;i++)for(let j=0;j<=nv;j++){const k=i*(nv+1)+j,c=surface(i/nu,j/nv);centres.set(c,k*3);}
    for(let i=0;i<=nu;i++)for(let j=0;j<=nv;j++){
      const k=i*(nv+1)+j,a=(Math.max(0,i-1)*(nv+1)+j)*3,b=(Math.min(nu,i+1)*(nv+1)+j)*3,c=(i*(nv+1)+Math.max(0,j-1))*3,d=(i*(nv+1)+Math.min(nv,j+1))*3;
      const ux=centres[b]-centres[a],uy=centres[b+1]-centres[a+1],uz=centres[b+2]-centres[a+2],vx=centres[d]-centres[c],vy=centres[d+1]-centres[c+1],vz=centres[d+2]-centres[c+2];
      const nx=vy*uz-vz*uy,ny=vz*ux-vx*uz,nz=vx*uy-vy*ux,len=Math.hypot(nx,ny,nz)||1;baseNormals.set([nx/len,ny/len,nz/len],k*3);
    }
    for(let side=0;side<2;side++)for(let i=0;i<=nu;i++)for(let j=0;j<=nv;j++){
      const k=(i*(nv+1)+j)*3,t=typeof thickness==='function'?thickness(i/nu,j/nv):thickness,sign=side?-1:1;
      for(let c=0;c<3;c++){p.push(centres[k+c]+sign*baseNormals[k+c]*t/2);normals.push(sign*baseNormals[k+c]);}uv.push(side?1-i/nu:i/nu,1-j/nv);
    }
    const front=[],back=[],edges=[],edgeSource=[];
    for(let i=0;i<nu;i++)for(let j=0;j<nv;j++){
      const a=i*(nv+1)+j,b=a+nv+1;
      front.push(a,a+1,b,a+1,b+1,b);back.push(a+N,b+N,a+1+N,a+1+N,b+N,b+1+N);
    }
    const rim=[];
    for(let j=0;j<=nv;j++)rim.push(j);
    for(let i=1;i<=nu;i++)rim.push(i*(nv+1)+nv);
    for(let j=nv-1;j>=0;j--)rim.push(nu*(nv+1)+j);
    for(let i=nu-1;i>0;i--)rim.push(i*(nv+1));
    for(let i=0;i<rim.length;i++){
      const a=rim[i],b=rim[(i+1)%rim.length],start=p.length/3,sources=[a,b,b+N,a+N];
      const ax=p[a*3],ay=p[a*3+1],az=p[a*3+2],ux=p[b*3]-ax,uy=p[b*3+1]-ay,uz=p[b*3+2]-az,vx=p[(a+N)*3]-ax,vy=p[(a+N)*3+1]-ay,vz=p[(a+N)*3+2]-az;
      const nx=vy*uz-vz*uy,ny=vz*ux-vx*uz,nz=vx*uy-vy*ux,len=Math.hypot(nx,ny,nz)||1;
      for(let j=0;j<sources.length;j++){const source=sources[j];p.push(p[source*3],p[source*3+1],p[source*3+2]);uv.push(i/rim.length,j<2?0:1);normals.push(nx/len,ny/len,nz/len);edgeSource.push(source);}
      edges.push(start,start+2,start+1,start,start+3,start+2);
    }
    const idx=front.concat(back,edges);
    const g=new T.BufferGeometry();g.setAttribute('position',new T.Float32BufferAttribute(p,3));g.setAttribute('uv',new T.Float32BufferAttribute(uv,2));g.setAttribute('normal',new T.Float32BufferAttribute(normals,3));g.setIndex(idx);g.clearGroups();g.addGroup(0,front.length,0);g.addGroup(front.length,back.length,1);g.addGroup(front.length+back.length,edges.length,2);g.userData={solid:true,method:'normal-offset closed parametric shell',nu,nv,thickness:typeof thickness==='number'?thickness:'variable',edgeSource,...options};
    return g;
  }
  function box(w,h,d,bevel=.0003){
    const r=Math.min(bevel,w*.2,h*.2,d*.2),s=new T.Shape(),x=w/2-r,z=d/2-r;
    s.moveTo(-x,-d/2);s.lineTo(x,-d/2);s.quadraticCurveTo(w/2,-d/2,w/2,-z);s.lineTo(w/2,z);s.quadraticCurveTo(w/2,d/2,x,d/2);s.lineTo(-x,d/2);s.quadraticCurveTo(-w/2,d/2,-w/2,z);s.lineTo(-w/2,-z);s.quadraticCurveTo(-w/2,-d/2,-x,-d/2);
    const g=new T.ExtrudeGeometry(s,{depth:Math.max(.000001,h-2*r),bevelEnabled:r>0,bevelThickness:r,bevelSize:r*.4,bevelSegments:3,curveSegments:6});
    g.rotateX(-Math.PI/2);g.translate(0,-h/2+r,0);const P=g.attributes.position,U=g.attributes.uv;for(let i=0;i<U.count;i++)U.setXY(i,(P.getX(i)+w/2)/w,(P.getZ(i)+d/2)/d);g.userData={solid:true,method:'bevelled solid'};return g;
  }
  function tube(points,radius,segments=48,sides=10){
    const curve=new T.CatmullRomCurve3(points.map(p=>new T.Vector3(...p))),variable=typeof radius==='function',g=new T.TubeGeometry(curve,segments,variable?1:radius,sides,false);
    // A stable reference prevents Frenet-frame flips between corrective poses.
    const reference=Math.abs(curve.getTangentAt(0).z)>.9?new T.Vector3(0,1,0):new T.Vector3(0,0,1),P=g.attributes.position;
    for(let i=0;i<=segments;i++){const t=i/segments,c=curve.getPointAt(t),tangent=curve.getTangentAt(t),n=reference.clone().addScaledVector(tangent,-reference.dot(tangent)).normalize(),b=new T.Vector3().crossVectors(tangent,n),r=variable?radius(t):radius;for(let j=0;j<=sides;j++){const a=j/sides*Math.PI*2,k=i*(sides+1)+j;P.setXYZ(k,c.x+r*(Math.cos(a)*n.x+Math.sin(a)*b.x),c.y+r*(Math.cos(a)*n.y+Math.sin(a)*b.y),c.z+r*(Math.cos(a)*n.z+Math.sin(a)*b.z));}}
    const p=Array.from(g.attributes.position.array),uv=Array.from(g.attributes.uv.array),idx=Array.from(g.index.array);
    for(const end of [0,1]){const point=curve.getPointAt(end),c=p.length/3;p.push(...point.toArray());uv.push(.5,.5);for(let j=0;j<sides;j++){const a=end*segments*(sides+1)+j,b=a+1;idx.push(...(end?[c,b,a]:[c,a,b]));}}
    g.setAttribute('position',new T.Float32BufferAttribute(p,3));g.setAttribute('uv',new T.Float32BufferAttribute(uv,2));g.setIndex(idx);g.computeVertexNormals();g.userData={solid:true,method:'capped swept solid'};return g;
  }
  function mirrorY(g){const p=g.attributes.position;for(let i=0;i<p.count;i++)p.setY(i,-p.getY(i));const idx=g.index?.array;if(idx)for(let i=0;i<idx.length;i+=3)[idx[i+1],idx[i+2]]=[idx[i+2],idx[i+1]];else{for(let i=0;i<p.count;i+=3)for(const a of Object.values(g.attributes)){const n=a.itemSize;for(let k=0;k<n;k++){const j=(i+1)*n+k,l=(i+2)*n+k,tmp=a.array[j];a.array[j]=a.array[l];a.array[l]=tmp;}}}g.computeVertexNormals();return g;}
  function updateShell(g,nu,nv,surface,t){const next=shell(nu,nv,surface,t,g.userData);g.attributes.position.array.set(next.attributes.position.array);g.attributes.position.needsUpdate=true;g.attributes.normal.array.set(next.attributes.normal.array);g.attributes.normal.needsUpdate=true;g.computeBoundingSphere();next.dispose();}
  function between(nu,nv,front,back,options={}) {
    const g=shell(nu,nv,front,.0001,options),p=g.attributes.position,N=(nu+1)*(nv+1);
    for(let i=0;i<=nu;i++)for(let j=0;j<=nv;j++){const k=i*(nv+1)+j;p.setXYZ(k,...front(i/nu,j/nv));p.setXYZ(k+N,...back(i/nu,j/nv));}
    for(let i=0;i<g.userData.edgeSource.length;i++){const source=g.userData.edgeSource[i];p.setXYZ(2*N+i,p.getX(source),p.getY(source),p.getZ(source));}
    p.needsUpdate=true;g.computeVertexNormals();g.userData={solid:true,method:'closed paired surfaces',...options};return g;
  }
  function sweepSection(contour,section,segments=128) {
    const p=[],uv=[],idx=[],N=section.length;
    for(let i=0;i<segments;i++)for(let j=0;j<N;j++){const [d,y]=section[j],[x,z]=contour(i/segments,d);p.push(x,y,z);uv.push(i/segments,j/N);}
    for(let i=0;i<segments;i++)for(let j=0;j<N;j++){const a=i*N+j,b=((i+1)%segments)*N+j,c=i*N+(j+1)%N,d=((i+1)%segments)*N+(j+1)%N;idx.push(a,c,b,b,c,d);}
    const g=new T.BufferGeometry();g.setAttribute('position',new T.Float32BufferAttribute(p,3));g.setAttribute('uv',new T.Float32BufferAttribute(uv,2));g.setIndex(idx);g.computeVertexNormals();g.userData={solid:true,method:'closed periodic profile sweep'};return g;
  }
  return {shell,between,sweepSection,box,tube,mirrorY,updateShell};
}

export function makePose(spec,input={}) {
  if(!input||typeof input!=='object')throw Error('Pose must be an object.');
  for(const key of ['opening','leaf','turn','release'])if(input[key]!==undefined&&(typeof input[key]!=='number'||!Number.isFinite(input[key])))throw Error('Pose '+key+' must be a finite number.');
  const opening=clamp(Number.isFinite(input.opening)?input.opening:130,0,130);
  const leaf=Math.round(clamp(Number.isFinite(input.leaf)?input.leaf:104,1,spec.paper.leaves-2));
  const turn=opening<110?((input.turn||0)<.5?0:1):clamp(input.turn||0,0,1);
  const a=opening*Math.PI/180, tilt=25*Math.PI/180*smooth(opening/130);
  const pitch=(spec.paper.thickness+spec.paper.interleafAllowance)/1000;
  const total=pitch*spec.paper.leaves, split=(leaf+turn)/spec.paper.leaves;
  // The fixed-length spine needs room below the gutter, including near the first leaf.
  const y=.064+split*total*Math.cos(tilt)+.006;
  const gap=.0016*Math.sin(a/2);
  return {opening,leaf,turn,a,tilt,pitch,total,split,y,gap,release:opening>0?1:clamp(input.release??0,0,1)};
}

export function leafFrame(spec,pose,index,progress=null) {
  const {leaf,turn,a,tilt,pitch,total,y,gap}=pose;
  const active=index===leaf, t=progress??(active?turn:index<leaf?0:1);
  const angle=tilt+a*t;
  const side=t<.5?0:1, top=leaf+turn;
  const offset=(index+.5-top)*pitch;
  const normal=[-Math.sin(angle),Math.cos(angle)];
  const shift=(.5-t)*gap;
  const root=[shift+offset*normal[0],y+offset*normal[1]];
  return {angle,root,normal,active,t,side,offset,total};
}

export function leafSurface(spec,pose,index,quality='rest') {
  const f=leafFrame(spec,pose,index),width=spec.paper.width/1000,height=spec.paper.height/1000;
  const turnBend=f.active?Math.sin(Math.PI*pose.turn)*.68:0;
  const edgeShift=(Math.sin(index*2.176)*.00016),bendLength=.043;
  const steps=quality==='high'?96:28;
  const xy=[[f.root[0],f.root[1]]];
  const handed=f.t<.5?1:-1;
  for(let i=1;i<=steps;i++){
    const s=(i-.5)/steps;
    const slope=turnBend*Math.sin(Math.PI*s)*(.65+.35*s)+handed*(pose.a/Math.PI)*.055*Math.exp(-s*width/bendLength);
    const theta=f.angle+slope,ds=width/steps;
    xy.push([xy[i-1][0]+Math.cos(theta)*ds,xy[i-1][1]+Math.sin(theta)*ds]);
  }
  return (u,v)=>{
    const q=u*steps,k=Math.min(steps-1,Math.floor(q)),r=q-k;
    const x=xy[k][0]*(1-r)+xy[k+1][0]*r,y=xy[k][1]*(1-r)+xy[k+1][1]*r;
    const cockle=.00007*Math.sin(v*Math.PI*4+.35)*Math.sin(u*Math.PI)*Math.sin(pose.a/2);
    return [x+f.normal[0]*cockle,y+f.normal[1]*cockle,(v-.5)*height+edgeShift*u];
  };
}
