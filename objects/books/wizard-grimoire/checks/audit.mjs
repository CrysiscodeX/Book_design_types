export function auditGeometry(geometry,{weldM=1e-8}={}) {
  const p=geometry.attributes.position,idx=geometry.index?.array,edges=new Map();let volume=0,degenerate=0,nonFinite=0;
  const key=i=>[p.getX(i),p.getY(i),p.getZ(i)].map(v=>Math.round(v/weldM)).join(',');
  for(const v of p.array)if(!Number.isFinite(v))nonFinite++;
  for(let i=0;i<(idx?.length||p.count);i+=3){const a=idx?idx[i]:i,b=idx?idx[i+1]:i+1,c=idx?idx[i+2]:i+2,ax=p.getX(a),ay=p.getY(a),az=p.getZ(a),bx=p.getX(b),by=p.getY(b),bz=p.getZ(b),cx=p.getX(c),cy=p.getY(c),cz=p.getZ(c);
    const nx=(by-ay)*(cz-az)-(bz-az)*(cy-ay),ny=(bz-az)*(cx-ax)-(bx-ax)*(cz-az),nz=(bx-ax)*(cy-ay)-(by-ay)*(cx-ax);if(Math.hypot(nx,ny,nz)<1e-18)degenerate++;
    volume+=(ax*(by*cz-bz*cy)+ay*(bz*cx-bx*cz)+az*(bx*cy-by*cx))/6;
    const ids=[key(a),key(b),key(c)];for(let j=0;j<3;j++){const x=ids[j],y=ids[(j+1)%3],e=x<y?x+'/'+y:y+'/'+x,v=edges.get(e)||[0,0];v[0]++;v[1]+=x<y?1:-1;edges.set(e,v);}
  }
  let boundary=0,nonManifold=0,inconsistent=0;for(const [count,direction]of edges.values()){if(count===1)boundary++;if(count>2)nonManifold++;if(count===2&&direction!==0)inconsistent++;}
  const normals=geometry.attributes.normal;let invalidNormals=0;if(normals)for(const x of normals.array)if(!Number.isFinite(x))invalidNormals++;
  return {passed:!nonFinite&&!degenerate&&!boundary&&!nonManifold&&!inconsistent&&!invalidNormals&&volume>0,vertices:p.count,triangles:(idx?.length||p.count)/3,volume,boundary,nonManifold,inconsistent,degenerate,nonFinite,invalidNormals};
}
