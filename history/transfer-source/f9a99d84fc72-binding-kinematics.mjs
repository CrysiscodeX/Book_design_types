import {DEFAULT_SPEC,deriveDimensions} from './specification-v2.mjs';
export const clamp=(x,a,b)=>Math.max(a,Math.min(b,x)),smooth=x=>{x=clamp(x,0,1);return x*x*(3-2*x);};
export function makeBindingPose(s=DEFAULT_SPEC,p={}){for(const k of ['opening','leaf','turn','release'])if(p[k]!==undefined&&!Number.isFinite(p[k]))throw Error('Non-finite pose '+k);const opening=clamp(p.opening??130,0,130),turn=opening<110?((p.turn??0)<.5?0:1):clamp(p.turn??0,0,1);return{opening,a:opening*Math.PI/180,tilt:25*Math.PI/180*smooth(opening/130),leaf:Math.round(clamp(p.leaf??104,1,s.paper.leaves-2)),turn,release:opening>0?1:clamp(p.release??0,0,1),f:smooth(opening/130)};}
export function createBindingMath(s=DEFAULT_SPEC){const d=deriveDimensions(s),A=s.binding.roundArcDeg*Math.PI/360,R=d.spineRadius/1000,L=2*A*R,N=s.paper.leaves,W=s.paper.width/1000,H=s.paper.height/1000;
  const rawFor=i=>1-2*(i+.5)/N,mapRaw=r=>Math.asin(clamp(r*Math.sin(A),-.9999,.9999))/A;
  let cache=null;
  const fan=(r,p)=>p.tilt+p.a*smooth((r-rawFor(p.leaf))/.18+.5);
  const delta=r=>Math.asin(clamp(r*Math.sin(A),-.9999,.9999));
  function path(p){const key=p.opening+'/'+p.leaf;if(cache?.key===key)return cache;const steps=2048,points=[[0,0]],min=-1.012,max=1.012,dr=(max-min)/steps;
    for(let k=1;k<=steps;k++){const r=min+(k-.5)*dr,alpha=fan(r,p)-delta(r),ds=R*Math.sin(A)/Math.sqrt(1-(r*Math.sin(A))**2)*dr,last=points[k-1];points.push([last[0]-Math.sin(alpha)*ds,last[1]+Math.cos(alpha)*ds]);}
    const sample=r=>{const f=clamp((r-min)/dr,0,steps),j=Math.min(steps-1,Math.floor(f)),t=f-j;return[points[j][0]*(1-t)+points[j+1][0]*t,points[j][1]*(1-t)+points[j+1][1]*t];};
    const split=rawFor(p.leaf),origin=sample(split),q=mapRaw(split),closed=[R*(Math.cos(A)-Math.cos(q*A)),R*Math.sin(q*A)];return cache={key,sample,origin,base:[closed[0]*(1-p.f),.074+closed[1]*(1-p.f)+.012*p.f]};}
  function spine(q,p){const r=Math.sin(q*A)/Math.sin(A),c=path(p),v=c.sample(r);return[c.base[0]+v[0]-c.origin[0],c.base[1]+v[1]-c.origin[1],0];}
  function frame(q,p){const raw=Math.sin(q*A)/Math.sin(A),alpha=fan(raw,p)-delta(raw);return{point:spine(q,p),tangent:[-Math.sin(alpha),Math.cos(alpha),0],out:[-Math.cos(alpha),-Math.sin(alpha),0],phi:alpha+Math.PI/2};}
  function board(name,p){const sign=name==='front'?1:-1,angle=p.tilt+(sign===1?p.a:0),dir=[Math.cos(angle),Math.sin(angle),0],normal=[-dir[1],dir[0],0],root=spine(sign,p),shoulder=s.binding.shoulder/1000,clear=.00053-d.swelling/2000;return{sign,angle,dir,normal,pivot:[root[0]+dir[0]*shoulder+normal[0]*sign*clear,root[1]+dir[1]*shoulder+normal[1]*sign*clear,0]};}
  function boardPoint(name,x,y,z,p){const b=board(name,p);return[b.pivot[0]+x*b.dir[0]+y*b.normal[0],b.pivot[1]+x*b.dir[1]+y*b.normal[1],z];}
  const arcLength=(chord,sag)=>sag<1e-10?chord:.5*Math.hypot(chord,4*sag)+chord*chord/(8*sag)*Math.asinh(4*sag/chord);
  const closedChord=d.spine/1000+2*(.00053-d.swelling/2000+s.board.thickness/1000+.00035),caseNeutralLength=arcLength(closedChord,.0085);
  let caseCache=null;
  function caseShape(p){const key=p.opening+'/'+p.leaf;if(caseCache?.key===key)return caseCache;const ends=['rear','front'].map(name=>{const b=board(name,p);return[b.pivot[0]-b.dir[0]*s.binding.jointGap/1000+b.normal[0]*b.sign*(s.board.thickness/1000+.00035),b.pivot[1]-b.dir[1]*s.binding.jointGap/1000+b.normal[1]*b.sign*(s.board.thickness/1000+.00035)];}),[a,b]=ends,chord=Math.hypot(b[0]-a[0],b[1]-a[1]);if(chord>caseNeutralLength+1e-7)throw Error('Joint separation exceeds the available case stiffener length.');let lo=0,hi=caseNeutralLength;for(let k=0;k<44;k++){const m=(lo+hi)/2;if(arcLength(chord,m)>caseNeutralLength)hi=m;else lo=m;}return caseCache={key,a,b,sag:(lo+hi)/2,normal:[-(b[1]-a[1])/chord,(b[0]-a[0])/chord]};}
  function caseSpine(q,p){const c=caseShape(p),t=(q+1)/2,bow=4*c.sag*t*(1-t);return[c.a[0]+t*(c.b[0]-c.a[0])+c.normal[0]*bow,c.a[1]+t*(c.b[1]-c.a[1])+c.normal[1]*bow,0];}
  function caseFrame(q,p){const h=.0001,a=caseSpine(Math.max(-1,q-h),p),b=caseSpine(Math.min(1,q+h),p),len=Math.hypot(b[0]-a[0],b[1]-a[1]);return{point:caseSpine(q,p),out:[-(b[1]-a[1])/len,(b[0]-a[0])/len,0]};}
  const mapQ=q=>Math.asin(clamp(q*Math.sin(A),-.9999,.9999))/A;
  const qFor=i=>mapQ(1-2*(i+.5)/N);
  function leafSurface(i,p,{quality=64,endpaper=null}={}){const raw=endpaper===null?rawFor(i):endpaper,q=mapRaw(raw),root=spine(q,p),active=endpaper===null&&i===p.leaf,left=endpaper===null?i<p.leaf:endpaper>0,t=active?p.turn:(left?1:0),theta=p.tilt+p.a*t,near=fan(raw,p),xy=[root],lengths=[0],extra=active?Math.sin(Math.PI*p.turn)*.28:0;
    const grid=[...Array.from({length:257},(_,k)=>k/256*.020),...Array.from({length:129},(_,k)=>.020+k/128*(W-.020)).slice(1)];
    for(let k=1;k<grid.length;k++){const arc=(grid[k]+grid[k-1])/2,angle=theta-delta(raw)*Math.exp(-arc/.0015)+(near-theta)*Math.exp(-arc/.020)+extra*Math.sin(Math.PI*arc/W),ds=grid[k]-grid[k-1];xy.push([xy[k-1][0]+Math.cos(angle)*ds,xy[k-1][1]+Math.sin(angle)*ds,0]);lengths.push(grid[k]);}
    return(u,v)=>{const target=u*W;let lo=0,hi=lengths.length-1;while(hi-lo>1){const m=(lo+hi)>>1;if(lengths[m]<target)lo=m;else hi=m;}const t=(target-lengths[lo])/(lengths[hi]-lengths[lo]);return[xy[lo][0]*(1-t)+xy[hi][0]*t,xy[lo][1]*(1-t)+xy[hi][1]*t,(v-.5)*H];};
  }
  return{dimensions:d,spine,frame,board,boardPoint,caseSpine,caseFrame,leafSurface,qFor,neutralArcLength:L,caseNeutralLength};
}
