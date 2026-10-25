// Positional weld for topology checks; UV and shading seams must not count as holes.
export function auditSolidGeometry(geometry){
  const p=geometry.getAttribute('position'),index=geometry.index?.array,edges=new Map();let volume=0,degenerate=0,nonFinite=0;
  const key=i=>[p.getX(i),p.getY(i),p.getZ(i)].map(v=>Math.round(v*1e7)).join(',');
  for(let i=0;i<p.array.length;i++)if(!Number.isFinite(p.array[i]))nonFinite++;
  for(let j=0;j<(index?.length||p.count);j+=3){
    const a=index?index[j]:j,b=index?index[j+1]:j+1,c=index?index[j+2]:j+2;
    const ax=p.getX(a),ay=p.getY(a),az=p.getZ(a),bx=p.getX(b),by=p.getY(b),bz=p.getZ(b),cx=p.getX(c),cy=p.getY(c),cz=p.getZ(c);
    const nx=(by-ay)*(cz-az)-(bz-az)*(cy-ay),ny=(bz-az)*(cx-ax)-(bx-ax)*(cz-az),nz=(bx-ax)*(cy-ay)-(by-ay)*(cx-ax);
    if(Math.hypot(nx,ny,nz)<1e-17){degenerate++;continue;}
    volume+=(ax*(by*cz-bz*cy)+ay*(bz*cx-bx*cz)+az*(bx*cy-by*cx))/6;
    const ids=[key(a),key(b),key(c)];for(let k=0;k<3;k++){const x=ids[k],y=ids[(k+1)%3],e=x<y?x+'/'+y:y+'/'+x,v=edges.get(e)||[0,0];v[0]++;v[1]+=x<y?1:-1;edges.set(e,v);}
  }
  let boundaryEdges=0,nonManifoldEdges=0,inconsistentEdges=0;
  for(const [count,direction]of edges.values()){if(count===1)boundaryEdges++;if(count>2)nonManifoldEdges++;if(count===2&&direction!==0)inconsistentEdges++;}
  return {vertices:p.count,triangles:(index?.length||p.count)/3,volume,boundaryEdges,nonManifoldEdges,inconsistentEdges,degenerate,nonFinite};
}
