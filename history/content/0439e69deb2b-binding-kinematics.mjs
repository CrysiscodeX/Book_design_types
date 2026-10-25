import {DEFAULT_SPEC,deriveDimensions} from './specification-v2.mjs';
export const clamp=(x,a,b)=>Math.max(a,Math.min(b,x)),smooth=x=>{x=clamp(x,0,1);return x*x*(3-2*x);};
export function makeBindingPose(s=DEFAULT_SPEC,p={}){for(const k of ['opening','leaf','turn','release'])if(p[k]!==undefined&&!Number.isFinite(p[k]))throw Error('Non-finite pose '+k);const opening=clamp(p.opening??130,0,130),turn=opening<110?((p.turn??0)<.5?0:1):clamp(p.turn??0,0,1);return{opening,a:opening*Math.PI/180,tilt:25*Math.PI/180*smooth(opening/130),leaf:Math.round(clamp(p.leaf??104,1,s.paper.leaves-2)),turn,release:opening>0?1:clamp(p.release??0,0,1),f:smooth(opening/130)};}
export function createBindingMath(s=DEFAULT_SPEC){const d=deriveDimensions(s),A=s.binding.roundArcDeg*Math.PI/360,R=d.spineRadius/1000,L=2*A*R,N=s.paper.leaves,W=s.paper.width/1000,H=s.paper.height/1000;
  function spine(q,p){const k=-A+(A+.61)*p.f,phi=Math.PI/2+p.tilt+p.a/2,cy=.074+.012*p.f,cx=-R*(1-Math.cos(A))*(1-p.f),scale=L/2;
    if(Math.abs(k)<1e-6)return[cx+scale*q*Math.cos(phi),cy+scale*q*Math.sin(phi),0];
    return[cx+scale/k*(Math.sin(phi+k*q)-Math.sin(phi)),cy-scale/k*(Math.cos(phi+k*q)-Math.cos(phi)),0];}
  function frame(q,p){const phi=Math.PI/2+p.tilt+p.a/2+(-A+(A+.61)*p.f)*q;return{point:spine(q,p),tangent:[Math.cos(phi),Math.sin(phi),0],out:[-Math.sin(phi),Math.cos(phi),0],phi};}
  function board(name,p){const sign=name==='front'?1:-1,angle=p.tilt+(sign===1?p.a:0),dir=[Math.cos(angle),Math.sin(angle),0],normal=[-dir[1],dir[0],0],root=spine(sign,p),shoulder=s.binding.shoulder/1000,clear=.00053;return{sign,angle,dir,normal,pivot:[root[0]+dir[0]*shoulder+normal[0]*sign*clear,root[1]+dir[1]*shoulder+normal[1]*sign*clear,0]};}
  function boardPoint(name,x,y,z,p){const b=board(name,p);return[b.pivot[0]+x*b.dir[0]+y*b.normal[0],b.pivot[1]+x*b.dir[1]+y*b.normal[1],z];}
  function caseSpine(q,p){const rear=board('rear',p),front=board('front',p),B=(b)=>[b.pivot[0]-b.dir[0]*s.binding.jointGap/1000+b.normal[0]*b.sign*(s.board.thickness/1000+.00035),b.pivot[1]-b.dir[1]*s.binding.jointGap/1000+b.normal[1]*b.sign*(s.board.thickness/1000+.00035)],a=B(rear),b=B(front),m=spine(0,p),mid=[m[0]-.002*(1-p.f),m[1]-.014*p.f],c=[2*mid[0]-(a[0]+b[0])/2,2*mid[1]-(a[1]+b[1])/2],t=(q+1)/2;return[(1-t)**2*a[0]+2*t*(1-t)*c[0]+t*t*b[0],(1-t)**2*a[1]+2*t*(1-t)*c[1]+t*t*b[1],0];}
  function caseFrame(q,p){const h=.0001,a=caseSpine(Math.max(-1,q-h),p),b=caseSpine(Math.min(1,q+h),p),len=Math.hypot(b[0]-a[0],b[1]-a[1]);return{point:caseSpine(q,p),out:[-(b[1]-a[1])/len,(b[0]-a[0])/len,0]};}
  const qFor=i=>1-2*(i+.5)/N;
  function leafSurface(i,p,{quality=64,endpaper=null}={}){const q=endpaper===null?qFor(i):endpaper,root=spine(q,p),active=endpaper===null&&i===p.leaf,left=endpaper===null?i<p.leaf:endpaper>0,t=active?p.turn:(left?1:0),theta=p.tilt+p.a*t,far=theta;
    const gammaClosed=-q*.43,phi=frame(q,p).phi,near=gammaClosed*(1-p.f)+(phi-Math.PI/2)*p.f,decay=.0045+.024*p.f,xy=[[root[0],root[1]]],steps=quality,extra=active?Math.sin(Math.PI*p.turn)*.36:0;
    for(let k=1;k<=steps;k++){const arc=(k-.5)*W/steps,angle=far+(near-far)*Math.exp(-arc/decay)+extra*Math.sin(Math.PI*arc/W);xy.push([xy[k-1][0]+Math.cos(angle)*W/steps,xy[k-1][1]+Math.sin(angle)*W/steps]);}
    return(u,v)=>{const j=Math.min(steps-1,Math.floor(u*steps)),t=u*steps-j,x=xy[j][0]*(1-t)+xy[j+1][0]*t,y=xy[j][1]*(1-t)+xy[j+1][1]*t,cockle=.000018*Math.sin(v*Math.PI*4+i*.31)*Math.sin(u*Math.PI)*p.f;return[x-Math.sin(theta)*cockle,y+Math.cos(theta)*cockle,(v-.5)*H];};}
  return{dimensions:d,spine,frame,board,boardPoint,caseSpine,caseFrame,leafSurface,qFor,neutralArcLength:L};
}
