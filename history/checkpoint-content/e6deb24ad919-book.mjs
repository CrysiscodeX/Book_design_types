import {DEFAULT_SPEC,SPREADS,validateSpec,thicknessBudget} from './specification.mjs';
import {createGeometryTools,makePose,leafFrame,leafSurface,smooth} from './geometry.mjs';
import {createMaterials} from './materials.mjs';

export function createWizardBook(T,input=DEFAULT_SPEC) {
  const spec=validateSpec(input),kit=createGeometryTools(T),root=new T.Group(),parts=new Map(),groups={},leaves=[],dynamic=[],anchors={};
  root.name='Working grimoire · proposed physical construction';
  const browser=typeof document!=='undefined',m=browser?createMaterials(T,spec):Object.fromEntries(['leather','patch','wood','paper','paperEdge','endpaper','linen','brass','darkBrass','lining','cradle','pad','stone','clay'].map(k=>[k,new T.MeshStandardMaterial()]));
  m.paperVariants??=Array(7).fill(m.paper);m.cover??=m.leather;m.proxyEdges??=[m.paperEdge,m.paperEdge];
  const group=id=>{const g=new T.Group();g.name=id;groups[id]=g;root.add(g);return g;};
  for(const id of ['rear-cover','front-cover','paper','binding','clasps','repair','support','ground'])group(id);
  function orient(g){const p=g.attributes.position,idx=g.index?.array;let v=0;for(let i=0;i<(idx?.length||p.count);i+=3){const a=idx?idx[i]:i,b=idx?idx[i+1]:i+1,c=idx?idx[i+2]:i+2;v+=p.getX(a)*(p.getY(b)*p.getZ(c)-p.getZ(b)*p.getY(c))+p.getY(a)*(p.getZ(b)*p.getX(c)-p.getX(b)*p.getZ(c))+p.getZ(a)*(p.getX(b)*p.getY(c)-p.getY(b)*p.getX(c));}if(v<0&&idx){for(let i=0;i<idx.length;i+=3)[idx[i+1],idx[i+2]]=[idx[i+2],idx[i+1]];g.computeVertexNormals();}return g;}
  const add=(id,g,material,category,parent=groups[category],details={})=>{
    orient(g);const mesh=new T.Mesh(g,material);mesh.name=id;mesh.castShadow=true;mesh.receiveShadow=true;mesh.userData={partId:id,category,evidence:'proposed',...details};parent.add(mesh);
    parts.set(id,{id,mesh,category,evidence:'proposed',material:details.material||category,attachment:details.attachment||[],method:g.userData.method||'closed solid',dimensions:'metres in mesh; source specification in millimetres',surfaceDetail:'Original authored grain and wear maps; no scanned-material claim',...details});return mesh;
  };
  const box=(id,w,h,d,mat,category,parent,details)=>add(id,kit.box(w,h,d),mat,category,parent,details);
  function setGeometry(mesh,g){orient(g);const old=mesh.geometry;if(!old.userData.shared&&!g.userData.shared&&old.attributes.position.count===g.attributes.position.count&&old.index?.count===g.index?.count){old.attributes.position.array.set(g.attributes.position.array);old.attributes.normal.array.set(g.attributes.normal.array);old.attributes.position.needsUpdate=true;old.attributes.normal.needsUpdate=true;old.index.array.set(g.index.array);old.index.needsUpdate=true;old.boundingSphere=null;old.boundingBox=null;g.dispose();return;}if(!old.userData.shared)old.dispose();mesh.geometry=g;}
  const W=spec.board.width/1000,H=spec.board.height/1000,half=spec.board.thickness/2000,L=spec.leather.thickness/1000;
  function plan(u,v){const x=u*W-.004,r=.003,xx=Math.abs(x-(W/2-.004));let zmax=H/2;if(xx>W/2-r)zmax=H/2-r+Math.sqrt(Math.max(0,r*r-(xx-W/2+r)**2));return [x,(v-.5)*2*zmax];}
  function edgeDistance(x,z){return Math.min(x+.004,W-.004-x,H/2-Math.abs(z));}
  function boardInner(x,z){const d=edgeDistance(x,z),recess=.0009*(1-smooth((d-.014)/.004));let channel=0;for(let i=0;i<5;i++)channel=Math.max(channel,.0012*Math.exp(-Math.pow((z-(i-2)*.055)/.0013,4))*smooth((x-.0005)/.002)*(1-smooth((x-.022)/.002)));return -half+Math.max(recess,channel);}
  function relief(x,z){
    const d=edgeDistance(x,z),border=Math.exp(-Math.pow((d-.009)/.00085,2))+.62*Math.exp(-Math.pow((d-.013)/.00058,2));
    const cx=x-(W/2-.004),cz=z+.004,rad=Math.hypot(cx,cz),circle=Math.exp(-Math.pow((rad-.031)/.0008,2))*.8;
    const stem=Math.abs(cx-.003*Math.sin(cz*90)),plant=Math.exp(-Math.pow(stem/.0007,2))*(1-smooth((Math.abs(cz)-.020)/.004));
    const moon=Math.exp(-Math.pow((Math.hypot(cx+.008,cz-.003)-.012)/.00075,2))*smooth((cx+.014)/.007)*(1-smooth((cz-.014)/.003));
    return spec.leather.toolingDepth/1000*Math.min(1.1,border+circle+plant*.7+moon*.7);
  }
  function contour(t,d=0){
    const w=W+2*d,h=H+2*d,r=Math.max(.0002,.003+d),cx=W/2-.004;
    const corner=Math.floor(t*4),f=t*4-corner,a=corner*Math.PI/2+f*Math.PI/2;
    const centres=[[cx+w/2-r,h/2-r],[cx-w/2+r,h/2-r],[cx-w/2+r,-h/2+r],[cx+w/2-r,-h/2+r]];
    const c=centres[corner%4];return [c[0]+Math.cos(a)*r,c[1]+Math.sin(a)*r];
  }
  // Rounded rectangle perimeter with straight runs, unlike a four-arc ellipse approximation.
  function perimeter(t,d=0){const w=W+2*d,h=H+2*d,r=Math.max(.0001,.003+d),cx=W/2-.004,k=Math.min(7,Math.floor(t*8)),f=t*8-k,left=cx-w/2,right=cx+w/2,top=h/2,bottom=-h/2;
    if(k===0)return [left+r+f*(w-2*r),top];if(k===1){const a=Math.PI/2-f*Math.PI/2;return [right-r+Math.cos(a)*r,top-r+Math.sin(a)*r];}if(k===2)return [right,top-r-f*(h-2*r)];if(k===3){const a=-f*Math.PI/2;return [right-r+Math.cos(a)*r,bottom+r+Math.sin(a)*r];}if(k===4)return [right-r-f*(w-2*r),bottom];if(k===5){const a=-Math.PI/2-f*Math.PI/2;return [left+r+Math.cos(a)*r,bottom+r+Math.sin(a)*r];}if(k===6)return [left,bottom+r+f*(h-2*r)];const a=Math.PI-f*Math.PI/2;return [left+r+Math.cos(a)*r,top-r+Math.sin(a)*r];
  }
  const covers={};
  for(const [name,sign] of [['rear',-1],['front',1]]){
    const category=name+'-cover',g=groups[category],transform=g=>sign<0?kit.mirrorY(g):g;
    const board=kit.between(124,220,(u,v)=>{const [x,z]=plan(u,v),d=edgeDistance(x,z),b=.00035*(1-smooth(d/.0008));return [x,half-b,z];},(u,v)=>{const [x,z]=plan(u,v);return [x,boardInner(x,z),z];},{material:'timber',construction:'rebated inner perimeter and five recessed lacing channels'});
    add(name+'.board',transform(board),m.wood,category,g,{material:'proposed timber',attachment:[name+'.leather-face']});
    const leather=kit.between(240,328,(u,v)=>{const [x,z]=plan(u,v),d=edgeDistance(x,z),crease=.000035*Math.sin(x*520+Math.sin(z*40))*Math.exp(-d/.004);return [x,half+L-relief(x,z)+crease,z];},(u,v)=>{const [x,z]=plan(u,v);return [x,half,z];},{material:'leather',minimumThicknessM:L-spec.leather.toolingDepth/1000*1.1,construction:'compressed blind-tool recesses over a flat bonding face'});
    add(name+'.leather-face',transform(leather),m.cover,category,g,{material:'calfskin appearance',attachment:[name+'.board'],geometryDetail:'Actual recessed border and ownership emblem; grain uses maps'});
    const profile=[[0,half+L],[.00055,half+.00075],[.00085,half+.0003],[.00095,.0015],[.00095,-.00065],[.00075,-.00125],[.0001,-.0019],[-.0155,-.002],[-.016,-.00195],[-.016,-.00185],[-.014,-.0011],[0,-.0011],[.00005,.0017],[0,half]];
    add(name+'.wrapped-edge-and-turnins',transform(kit.sweepSection(perimeter,profile,384)),m.leather,category,g,{material:'leather',attachment:[name+'.board',name+'.leather-face'],geometryDetail:'Continuous closed edge wrap and tapered inner turn-in; corner folding interpretation is proposed'});
    const pastedown=box(name+'.pastedown',W-.008,.0002,H-.008,m.endpaper,category,g,{material:'rag paper',attachment:[name+'.board',name+'.wrapped-edge-and-turnins']});pastedown.position.set(W/2-.004,sign*(-half-.0001),0);
    covers[name]={group:g,sign};
    for(let i=0;i<5;i++){
      const upper=(u,v)=>{const x=.003+u*.018,z=(i-2)*.055+(v-.5)*.0024;return [x,boardInner(x,z)-.00001,z];},lower=(u,v)=>{const p=upper(u,v);p[1]-=.00008+.00072*Math.sin(Math.PI*v);return p;};
      add(name+'.lacing.'+i,transform(kit.between(40,12,upper,lower)),m.linen,category,g,{material:'flattened linen support',attachment:[name+'.board','binding.cord.'+i],geometryDetail:'Solid flattened end in a physical inner-board channel; concealed through-edge route is proposed'});
    }
    for(let j=0;j<2;j++){
      const leaf=add(name+'.flyleaf.'+j,kit.shell(32,8,(u,v)=>[u*.212,0,(v-.5)*.292],.00018),[m.endpaper,m.endpaper,m.paperEdge],'binding',groups.binding,{material:'rag paper',attachment:[name+'.pastedown','binding.sewing'],role:'free endpaper'});
      parts.get(name+'.flyleaf.'+j).attachment=[name+'.pastedown','binding.spine-lining'];dynamic.push({kind:'endpaper',mesh:leaf,name,j});
    }
    if(name==='rear')for(const [j,p] of [[0,[.025,.115]],[1,[.185,.115]],[2,[.025,-.115]],[3,[.185,-.115]]]){
      const g=new T.CylinderGeometry(.0042,.005,.0024,28,1);g.translate(0,0,0);const boss=add('rear.boss.'+j,g,m.brass,category,covers.rear.group,{material:'brass',attachment:['rear.board'],role:'protective foot'});boss.position.set(p[0],-half-L-.0012,p[1]);
      const plate=box('rear.boss-pad.'+j,.013,.00065,.013,m.darkBrass,category,covers.rear.group,{material:'brass',attachment:['rear.board','rear.boss.'+j]});plate.position.set(p[0],-half-L-.000325,p[1]);
    }
  }
  const patch=add('repair.lower-spine-patch',kit.box(.01,.001,.04),m.patch,'repair',groups.repair,{material:'replacement leather',attachment:['binding.leather-spine'],geometryDetail:'Tapered lower-spine repair following the spine material frame'});
  // The bonded 80–520 µm overlay is below the studio shadow-map precision.
  // Keep its cast contact shadow and geometric shading; avoid self-shadow striping.
  patch.receiveShadow=false;
  const repairStitches=[];for(let i=0;i<17;i++)repairStitches.push(add('repair.stitch.'+i,kit.tube([[0,0,0],[.001,0,0],[.002,0,0]],.00014,8,8),m.linen,'repair',groups.repair,{material:'linen',attachment:['repair.lower-spine-patch']}));
  const poseDefault=makePose(spec);
  for(let i=0;i<spec.paper.leaves;i++){
    const mesh=add('leaf.'+String(i).padStart(3,'0'),kit.shell(14,4,leafSurface(spec,poseDefault,i),spec.paper.thickness/1000),[m.paperVariants[i%7],m.paperVariants[i%7],m.paperEdge],'paper',groups.paper,{material:'rag paper',attachment:['gathering.'+String(Math.floor(i/10)).padStart(2,'0')],leaf:i,gathering:Math.floor(i/10),minimumThicknessM:spec.paper.thickness/1000});leaves.push(mesh);
  }
  const folds=[],foldTemplates=[];
  for(let j=0;j<5;j++){const diameter=(9-2*j)*(spec.paper.thickness+spec.paper.interleafAllowance)/1000,r=diameter/2;foldTemplates.push(kit.shell(24,4,(u,v)=>[-r*Math.sin(u*Math.PI),r-r*Math.cos(u*Math.PI),(v-.5)*.292],.00016,{shared:true}));}
  for(let g=0;g<24;g++)for(let j=0;j<5;j++){
    const id='gathering.'+String(g).padStart(2,'0')+(j?'.fold.'+j:''),mesh=add(id,kit.shell(16,4,(u,v)=>[u*.001,0,(v-.5)*.292],.00016),[m.paper,m.paper,m.paperEdge],'binding',groups.binding,{material:'folded rag paper',attachment:['leaf.'+String(g*10+j).padStart(3,'0'),'leaf.'+String(g*10+9-j).padStart(3,'0')],role:'closed bifolium return',minimumThicknessM:.00016});folds.push({mesh,g,j});
  }
  const proxies=[0,1].map(side=>{const mesh=add('render.paper-block.'+side,kit.shell(28,8,(u,v)=>[u*.212,0,(v-.5)*.292],.02),[m.paper,m.paper,m.proxyEdges[side]],'paper',groups.paper,{material:'rag paper',role:'render-only closed distance proxy',renderOnly:true,attachment:[]});return mesh;});
  const spine=add('binding.leather-spine',kit.shell(100,54,(u,v)=>[u*.05,.02,(v-.5)*.300],.0009),m.leather,'binding',groups.binding,{material:'leather',attachment:['front.wrapped-edge-and-turnins','rear.wrapped-edge-and-turnins'],geometryDetail:'Closed curved skin; coordinated with cover roots'});
  const liner=add('binding.spine-lining',kit.shell(80,12,(u,v)=>[u*.045,.02,(v-.5)*.286],.00035),m.lining,'binding',groups.binding,{material:'textile lining',attachment:['binding.leather-spine',...Array.from({length:5},(_,i)=>'binding.cord.'+i)]});
  const adhesive=add('binding.spine-adhesive',kit.box(.01,.00005,.286),m.lining,'binding',groups.binding,{material:'proposed 0.05 mm adhesive film',attachment:['binding.leather-spine','binding.spine-lining'],geometryDetail:'Explicit bonded layer between covering and lining; material behaviour remains proposed'});
  const cords=[];
  for(let i=0;i<5;i++){const z=(i-2)*.055,cord=add('binding.cord.'+i,kit.tube([[0,.03,z],[0,.04,z],[0,.05,z]],.0012,36,12),m.linen,'binding',groups.binding,{material:'linen cord',attachment:['front.board','rear.board'],role:'supported sewing cord'});cords.push({mesh:cord,z});}
  const headbands=[];
  for(const end of [-1,1])for(let j=0;j<36;j++){
    const mesh=add('binding.endband.'+(end<0?'tail':'head')+'.'+j,new T.TorusGeometry(.00065,.00016,8,16),j%3?m.linen:m.lining,'binding',groups.binding,{material:'linen',attachment:['binding.spine-lining'],role:'endband stitch loop'});headbands.push({mesh,end,j});
  }
  const caps=[];for(const end of [-1,1]){const mesh=add('binding.'+(end<0?'tailcap':'headcap'),kit.shell(80,8,(u,v)=>[u*.05,0,v*.003],.0009),m.leather,'binding',groups.binding,{material:'leather',attachment:['binding.leather-spine'],role:'rolled spine end'});caps.push({mesh,end});}
  const endbandCores=[-1,1].map(end=>({end,mesh:add('binding.endband-core.'+end,kit.tube([[0,0,0],[.01,0,0],[.02,0,0]],.00049,80,12),m.linen,'binding',groups.binding,{material:'linen core',attachment:['binding.spine-lining'],role:'continuous endband core'})}));
  const sewing=[];
  for(let g=0;g<24;g++)for(let c=0;c<5;c++){
    const mesh=add('binding.sewing.'+g+'.'+c,kit.tube([[.0013,-.0011,-.0014],[.0020,0,0],[.0013,.0011,.0014]],.000175,8,8),m.linen,'binding',groups.binding,{material:'linen',attachment:['leaf.'+String(g*10).padStart(3,'0'),'binding.cord.'+c],role:'gathering stitch'});sewing.push({mesh,g,c});
  }
  const clasps=[];
  for(let c=0;c<2;c++){
    const z=(c?1:-1)*.082;
    for(const name of ['front','rear']){
      const sign=covers[name].sign,g=covers[name].group;
      const plate=box('clasp.'+c+'.'+name+'.plate',.020,.0008,.016,m.brass,name+'-cover',g,{material:'brass',attachment:[name+'.board']});plate.position.set(.203,sign*(half+L+.0004),z);
      for(let j=0;j<2;j++){const rivet=add('clasp.'+c+'.'+name+'.rivet.'+j,new T.SphereGeometry(.0011,16,10),m.darkBrass,name+'-cover',g,{material:'brass',attachment:['clasp.'+c+'.'+name+'.plate']});rivet.scale.y=.35;rivet.position.set(.198+j*.010,sign*(half+L+.0009),z);}
    }
    const strap=add('clasp.'+c+'.strap',kit.shell(40,4,(u,v)=>[0,u*.05,(v-.5)*.014],.0012),m.patch,'clasps',groups.clasps,{material:'leather strap',attachment:['clasp.'+c+'.rear.plate'],role:'operating strap'});
    const hookPath=new T.CatmullRomCurve3([[0,0,0],[.0075,0,0],[.0125,0,0],[.014,.002,0],[.0125,.003,0],[.010,.00228,0]].map(p=>new T.Vector3(...p)),false,'centripetal');
    const hook=add('clasp.'+c+'.hook',kit.shell(64,4,(u,v)=>{const p=hookPath.getPoint(u);return [p.x,p.y,(v-.5)*.005];},.0007),m.brass,'clasps',groups.clasps,{material:'bent brass',attachment:['clasp.'+c+'.strap','clasp.'+c+'.catch'],role:'closed curved hook with an actual open throat'});
    const clampPart=box('clasp.'+c+'.strap-clamp',.006,.0006,.016,m.brass,'clasps',groups.clasps,{material:'brass',attachment:['clasp.'+c+'.strap','clasp.'+c+'.hook'],role:'strap end clamp'});
    const catchPart=box('clasp.'+c+'.catch',.002,.001,.012,m.brass,'front-cover',covers.front.group,{material:'brass',attachment:['clasp.'+c+'.catch-leg.0','clasp.'+c+'.catch-leg.1'],role:'raised catch crossbar'});catchPart.position.set(.210,half+L+.0033,z);
    for(let j=0;j<2;j++){const leg=box('clasp.'+c+'.catch-leg.'+j,.002,.002,.0015,m.brass,'front-cover',covers.front.group,{material:'brass',attachment:['clasp.'+c+'.front.plate','clasp.'+c+'.catch']});leg.position.set(.210,half+L+.0018,z+(j?1:-1)*.00525);}
    clasps.push({strap,hook,clamp:clampPart,z});
  }
  const base=box('support.base',.36,.012,.032,m.cradle,'support',groups.support,{material:'timber',role:'cradle cross rail'});base.position.set(0,.014,-.105);
  const otherRail=box('support.front-rail',.36,.012,.032,m.cradle,'support',groups.support,{material:'timber',attachment:['support.base'],role:'cradle cross rail'});otherRail.position.set(0,.014,.105);
  for(const sign of [-1,1]){const rail=box('support.tie.'+sign,.018,.012,.178,m.cradle,'support',groups.support,{material:'timber',attachment:['support.base','support.front-rail'],role:'cradle connecting rail'});rail.position.set(sign*.150,.014,0);}
  for(const sign of [-1,1])for(const end of [-1,1]){const foot=box('support.foot.'+sign+'.'+end,.022,.008,.026,m.cradle,'support',groups.support,{material:'timber',attachment:[end<0?'support.base':'support.front-rail','ground.slab'],role:'floor-contact foot'});foot.position.set(sign*.150,.004,end*.105);}
  const pads=[];for(const name of ['rear','front'])for(const [j,x]of [[0,.045],[1,.165]])for(const [k,z]of [[0,-.105],[1,.105]]){
    const pad=box('support.'+name+'.pad.'+j+k,.028,.004,.026,m.pad,'support',groups.support,{material:'felt',attachment:[name+'.board'],role:'cradle contact'}),post=box('support.'+name+'.post.'+j+k,.014,.010,.016,m.cradle,'support',groups.support,{material:'timber',attachment:['support.base','support.'+name+'.pad.'+j+k]});pads.push({name,x,z,pad,post});
  }
  const slab=box('ground.slab',.92,.014,.70,m.stone,'ground',groups.ground,{material:'studio slab'});slab.position.y=-.007;
  let pose=poseDefault,art=null,appearance='material',selected='front-cover',exploded=false,isolate=false,exposeLining=false,inspectionPart=null,disposed=false,restCache=null;
  const local=(name,x,y,z)=>new T.Vector3(x,y,z).applyMatrix4(covers[name].group.matrixWorld);
  for(const p of parts.values()){
    p.attachmentRegions=[];
    if(/^(front|rear)\.lacing\./.test(p.id)){const name=p.id.split('.')[0],i=+p.id.split('.')[2],sign=name==='front'?1:-1;p.attachmentRegions.push({to:name+'.board',space:name+'-cover local',min:[.003,Math.min(sign*-.002,sign*-.0006),(i-2)*.055-.0013],max:[.021,Math.max(sign*-.002,sign*-.0006),(i-2)*.055+.0013],role:'proposed flattened support in a recessed inner-board channel',toleranceMm:.05});}
    if(/^leaf\./.test(p.id))p.attachmentRegions.push({to:p.attachment[0],space:'leaf local across-width coordinate',rangeMm:[0,.25],role:'closed bifolium return meets writing leaf; capped interface',toleranceMm:.005});
    if(/^clasp\.\d\.hook$/.test(p.id))p.attachmentRegions.push({to:p.attachment[1],space:'hook local',min:[.009,.0019,-.0026],max:[.0115,.0031,.0026],role:'deliberate seating of bent hook tip on raised catch',maximumContactDepthMm:.15});
  }
  function coverPose(name,p){const sign=covers[name].sign,angle=name==='rear'?p.tilt:p.tilt+p.a,n=[-Math.sin(angle),Math.cos(angle)],offset=name==='rear'?-(p.leaf+p.turn)*p.pitch:(spec.paper.leaves-p.leaf-p.turn)*p.pitch,extra=sign*.002580;const shift=name==='rear'?p.gap/2:-p.gap/2;const g=covers[name].group;g.rotation.z=angle;g.position.set(shift+(offset+extra)*n[0],p.y+(offset+extra)*n[1],0);g.updateMatrixWorld(true);}
  const bandCache=new Map();let profilePose=null,profileShape;
  function rawSpinePoint(u,v,p){
    if(profilePose!==p){const r=local('rear',-.004,-half-L/2,0),f=local('front',-.004,half+L/2,0),d=r.distanceTo(f),S=spec.binding.neutralSpineLength/1000,e=f.clone().sub(r).divideScalar(d),n=new T.Vector3(-e.y,e.x,0);if(d>S)throw Error('Spine endpoints exceed the material length.');let angle=0;if(d>=2*S/Math.PI){let lo=0,hi=Math.PI;for(let k=0;k<36;k++){const a=(lo+hi)/2;if(2*Math.sin(a/2)/a>d/S)lo=a;else hi=a;}angle=(lo+hi)/2;}profileShape={r,f,d,S,e,n,angle};profilePose=p;}
    const {r,f,d,S,e,n,angle}=profileShape,s=u*S;let along,away,normalE,normalN;
    if(angle){const R=S/angle,t=(u-.5)*angle;along=d/2+R*Math.sin(t);away=R*(Math.cos(t)-Math.cos(angle/2));normalE=Math.sin(t);normalN=Math.cos(t);}
    else{const R=d/2,arm=(S-Math.PI*R)/2;if(s<arm){along=0;away=s;normalE=-1;normalN=0;}else if(s>arm+Math.PI*R){along=d;away=S-s;normalE=1;normalN=0;}else{const a=(s-arm)/R;along=R-R*Math.cos(a);away=arm+R*Math.sin(a);normalE=-Math.cos(a);normalN=Math.sin(a);}}
    const z=(v-.5)*.300;let bands=bandCache.get(v);if(bands===undefined){bands=0;for(let i=0;i<5;i++)bands+=Math.exp(-Math.pow((z-(i-2)*.055)/.0024,2))*.0006;bandCache.set(v,bands);}
    const relief=bands*Math.sin(Math.PI*u);return [r.x+e.x*along+n.x*away+(e.x*normalE+n.x*normalN)*relief,r.y+e.y*along+n.y*away+(e.y*normalE+n.y*normalN)*relief,z];
  }
  const frameCache=new Map();let framePose=null;
  function spineFrame(u,v,p){if(framePose!==p){frameCache.clear();framePose=p;}const key=Math.round(u*1e8)+':'+Math.round(v*1e8);if(frameCache.has(key))return frameCache.get(key);const point=rawSpinePoint(u,v,p),a=rawSpinePoint(Math.max(0,u-.01),v,p),b=rawSpinePoint(Math.min(1,u+.01),v,p),c=rawSpinePoint(u,Math.max(0,v-1/150),p),d=rawSpinePoint(u,Math.min(1,v+1/150),p),tangent=new T.Vector3(b[0]-a[0],b[1]-a[1],b[2]-a[2]).normalize(),normal=new T.Vector3(d[0]-c[0],d[1]-c[1],d[2]-c[2]).cross(tangent).normalize();const frame={point,tangent,normal};frameCache.set(key,frame);return frame;}
  function spinePoint(u,v,p,outward=0){if(!outward)return rawSpinePoint(u,v,p);const f=spineFrame(u,v,p);return f.point.map((n,i)=>n+f.normal.getComponent(i)*outward);}
  function applyArtwork(){
    const selectedIndex=Math.max(0,SPREADS.findIndex(s=>s.leaf===pose.leaf));
    for(let i=0;i<leaves.length;i++)leaves[i].material=[m.paperVariants[i%7],m.paperVariants[i%7],m.paperEdge];
    if(art){const a=art.spreads[selectedIndex];leaves[pose.leaf].material=[a.right,a.left,m.paperEdge];leaves[pose.leaf+1].material=[m.paper,a.left,m.paperEdge];leaves[pose.leaf-1].material=[a.right,m.paper,m.paperEdge];}
    if(appearance==='clay')for(const leaf of leaves)leaf.material=m.clay;
  }
  // Half-turn corrective poses retain the assembled solids while avoiding repeated lofts.
  let bindingCacheKey='',bindingFrames=null;
  const bindingNodes=()=>[...parts.values()].filter(p=>/^(binding\.(leather-spine|spine-lining|spine-adhesive|cord\.|endband|headcap|tailcap|sewing\.)|repair\.)/.test(p.id));
  function buildBinding(target){const original=pose;pose=target;for(const name of ['rear','front'])coverPose(name,pose);
    setGeometry(spine,kit.shell(100,150,(u,v)=>spinePoint(u,v,pose),.0009));
    setGeometry(liner,kit.shell(100,144,(u,v)=>spinePoint(u,.02+v*.96,pose,-.000675),.00035));
    setGeometry(adhesive,kit.shell(100,144,(u,v)=>spinePoint(u,.02+v*.96,pose,-.000475),.00005));
    for(const c of cords){const v=c.z/.300+.5,pts=[local('rear',.006,-(boardInner(.006,c.z)-.0004),c.z).toArray(),...Array.from({length:25},(_,j)=>spinePoint(.025+.95*j/24,v,pose,-.002)),local('front',.006,boardInner(.006,c.z)-.0004,c.z).toArray()];setGeometry(c.mesh,kit.tube(pts,t=>.00030+.0009*smooth(Math.min(t/.12,(1-t)/.12)),72,12));}
    const repairSurface=(u,v,extra=0)=>spinePoint(.15+.70*u,(-.140+v*.040)/.300+.5,pose,L/2+extra);
    setGeometry(patch,kit.between(70,20,(u,v)=>repairSurface(u,v,.00008+.00044*Math.sin(Math.PI*u)*Math.sin(Math.PI*v)),(u,v)=>repairSurface(u,v)));
    for(let i=0;i<repairStitches.length;i++){const u=.05+i*.9/16;setGeometry(repairStitches[i],kit.tube([repairSurface(u,.08,.00022),repairSurface(u+.008,.12,.0006),repairSurface(u+.016,.16,.00022)],.00014,8,8));}
    for(const e of headbands){const u=(e.j+.5)/36,p=spinePoint(u,.5,pose),a=spinePoint(Math.max(0,u-.002),.5,pose),b=spinePoint(Math.min(1,u+.002),.5,pose),tangent=new T.Vector3(b[0]-a[0],b[1]-a[1],0).normalize();e.mesh.position.set(...spinePoint(u,e.end*.146/.3+.5,pose,-.00145));e.mesh.quaternion.setFromUnitVectors(new T.Vector3(0,0,1),tangent);}
    for(const core of endbandCores)setGeometry(core.mesh,kit.tube(Array.from({length:25},(_,i)=>{const p=spinePoint(i/24,.5,pose);return spinePoint(i/24,core.end*.146/.3+.5,pose,-.00145);}),.00049,80,12));
    for(const c of caps)setGeometry(c.mesh,kit.shell(100,10,(u,v)=>{const roll=Math.sin(v*Math.PI);return spinePoint(u,c.end*(.147+v*.003)/.3+.5,pose,.00035+roll*.0008);},.0008));
    for(const s of sewing){const u=(s.g+.5)/24,v=((s.c-2)*.055)/.3+.5,f=spineFrame(u,v,pose),x=f.normal.clone().negate(),y=f.tangent,z=new T.Vector3().crossVectors(x,y).normalize();s.mesh.position.set(...spinePoint(u,v,pose,-.0007));s.mesh.quaternion.setFromRotationMatrix(new T.Matrix4().makeBasis(x,y,z));}

    pose=original;
  }
  function bindingSnapshot(nodes){return nodes.map(p=>{const mesh=p.mesh,g=mesh.geometry,dynamic=/leather-spine|spine-lining|spine-adhesive|binding\.cord|endband-core|headcap|tailcap|repair\./.test(p.id);return {position:mesh.position.clone(),quaternion:mesh.quaternion.clone(),vertices:dynamic?g.attributes.position.array.slice():null,normals:dynamic?g.attributes.normal.array.slice():null};});}
  function updateBinding(current,previous){
    const key=current.opening+':'+current.leaf;
    if(key!==bindingCacheKey){bindingFrames=null;bindingCacheKey=key;}
    const turning=current.opening>=110&&previous.opening===current.opening&&previous.leaf===current.leaf&&previous.turn!==current.turn;
    if(!turning&&!bindingFrames){buildBinding(current);return;}
    const nodes=bindingNodes();
    if(!bindingFrames){bindingFrames=[0,.5,1].map(turn=>{buildBinding(makePose(spec,{...current,turn}));return bindingSnapshot(nodes);});}
    const x=current.turn*2,index=Math.min(1,Math.floor(x)),weight=x-index;
    for(let i=0;i<nodes.length;i++){const mesh=nodes[i].mesh,a=bindingFrames[index][i],b=bindingFrames[index+1][i];mesh.position.lerpVectors(a.position,b.position,weight);mesh.quaternion.slerpQuaternions(a.quaternion,b.quaternion,weight);if(a.vertices){const g=mesh.geometry;for(const [name,A,B]of [['position',a.vertices,b.vertices],['normal',a.normals,b.normals]]){const attribute=g.attributes[name],buffer=attribute.array;for(let j=0;j<buffer.length;j++)buffer[j]=A[j]+(B[j]-A[j])*weight;attribute.needsUpdate=true;}g.boundingBox=null;g.boundingSphere=null;}}
    for(const name of ['rear','front'])coverPose(name,current);
  }
  function setPose(input={},options={}){
    if(disposed)return;
    const previousPose=pose;pose=makePose(spec,{...pose,...input});
    for(const name of ['rear','front'])coverPose(name,pose);
    if(!restCache || restCache.opening!==pose.opening){
      if(restCache){for(const k of ['right','left','rightHigh','leftHigh'])restCache[k].dispose();}
      const build=(side,high=false)=>{const index=side?239:0,f=leafFrame(spec,pose,index),s=leafSurface(spec,pose,index),co=Math.cos(f.angle),si=Math.sin(f.angle);return kit.shell(high?96:28,high?20:8,(u,v)=>{const p=s(u,v),x=p[0]-f.root[0],y=p[1]-f.root[1];return [x*co+y*si,-x*si+y*co,p[2]];},spec.paper.thickness/1000,{shared:true});};
      restCache={opening:pose.opening,right:build(0),left:build(1),rightHigh:build(0,true),leftHigh:build(1,true)};
    }
    for(let i=0;i<leaves.length;i++){
      const high=Math.abs(i-pose.leaf)<=2,mesh=leaves[i];
      mesh.castShadow=i===pose.leaf;mesh.receiveShadow=false;
      if(i===pose.leaf){setGeometry(mesh,kit.shell(96,20,leafSurface(spec,pose,i,'high'),spec.paper.thickness/1000,{leaf:i,inspection:true}));mesh.position.set(0,0,0);mesh.rotation.z=0;}
      else {const f=leafFrame(spec,pose,i),g=restCache[(f.side?'left':'right')+(high?'High':'')];if(mesh.geometry!==g)setGeometry(mesh,g);mesh.rotation.z=f.angle;mesh.position.set(f.root[0],f.root[1],0);}
    }
    for(let side=0;side<2;side++){const start=side?pose.leaf+3:0,end=side?239:pose.leaf-3,count=end-start+1,mesh=proxies[side];mesh.userData.hasVolume=count>0;if(count>0){const mid=(start+end)/2;setGeometry(mesh,kit.shell(28,8,leafSurface(spec,pose,mid),count*pose.pitch-.000008,{renderOnly:true}));if(m.proxyEdges[side].map)m.proxyEdges[side].map.repeat.y=count/240;}mesh.castShadow=false;mesh.receiveShadow=false;}
    for(const e of dynamic){const sign=e.name==='rear'?-1:1,ix=e.name==='rear'?0:239,frame=leafFrame(spec,pose,ix),angle=frame.angle,n=frame.normal;
      const offset=sign*(.000178+e.j*.000188);setGeometry(e.mesh,kit.shell(40,8,(u,v)=>[frame.root[0]+Math.cos(angle)*u*.212+n[0]*offset,frame.root[1]+Math.sin(angle)*u*.212+n[1]*offset,(v-.5)*.292],.00018));
    }
    for(const fold of folds){const a=leafFrame(spec,pose,fold.g*10+fold.j),b=leafFrame(spec,pose,fold.g*10+9-fold.j);
      if(a.t===b.t){const g=foldTemplates[fold.j];if(fold.mesh.geometry!==g)setGeometry(fold.mesh,g);fold.mesh.position.set(a.root[0],a.root[1],0);fold.mesh.rotation.z=a.angle;continue;}
      fold.mesh.position.set(0,0,0);fold.mesh.rotation.z=0;const cx=(a.root[0]+b.root[0])/2,cy=(a.root[1]+b.root[1])/2,dx=(b.root[0]-a.root[0])/2,dy=(b.root[1]-a.root[1])/2;
      const tangent=[Math.cos((a.angle+b.angle)/2),Math.sin((a.angle+b.angle)/2)],radius=Math.max(.000084,Math.hypot(dx,dy));
      setGeometry(fold.mesh,kit.shell(24,4,(u,v)=>{const theta=Math.PI*u;return [cx-dx*Math.cos(theta)-tangent[0]*radius*Math.sin(theta),cy-dy*Math.cos(theta)-tangent[1]*radius*Math.sin(theta),(v-.5)*.292];},.00016));
    }
    updateBinding(pose,previousPose);
    root.updateMatrixWorld(true);
    for(const c of clasps){const released=pose.release;const a=local('rear',.204,-half-L-.001,c.z),b=local('front',.200,half+L+.0018,c.z);
      const closeAngle=pose.tilt+pose.a,clearPoint=b.clone().add(new T.Vector3(Math.cos(closeAngle)*.022,Math.sin(closeAngle)*.022,0)),pull=smooth(released/.25),drop=smooth((released-.25)/.75);
      const end=released<=.25?b.clone().lerp(clearPoint,pull):clearPoint.clone().lerp(a.clone().add(new T.Vector3(.031,-.025,0)),drop);
      const clearance=.036*(1-released)+.020*released;
      const curve=new T.CubicBezierCurve3(a,a.clone().add(new T.Vector3(clearance,0,0)),end.clone().add(new T.Vector3(clearance,0,0)),end);
      setGeometry(c.strap,kit.shell(52,4,(u,v)=>{const p=curve.getPoint(u);return [p.x,p.y,p.z+(v-.5)*.014];},.0012));c.hook.position.copy(end);c.hook.rotation.z=closeAngle*(1-drop)+.35*drop;c.clamp.position.copy(end).add(new T.Vector3(.002,.0002,0).applyAxisAngle(new T.Vector3(0,0,1),c.hook.rotation.z));c.clamp.rotation.z=c.hook.rotation.z;
    }
    for(const p of pads){const sign=covers[p.name].sign,angle=p.name==='rear'?pose.tilt:pose.tilt+pose.a,pos=local(p.name,p.x,sign*(half+L+.002),p.z);p.pad.visible=p.post.visible=p.name==='rear'||pose.opening>=100;
      p.pad.position.copy(pos);p.pad.rotation.z=angle;
      if(p.name==='rear'||pose.opening>=100){p.post.position.set(0,0,0);p.post.scale.set(1,1,1);setGeometry(p.post,kit.between(1,1,(u,v)=>{const x=(u-.5)*.014;return [pos.x+x,Math.max(.0205,pos.y+sign*.002/Math.cos(angle)+Math.tan(angle)*x),pos.z+(v-.5)*.016];},(u,v)=>[pos.x+(u-.5)*.014,.020,pos.z+(v-.5)*.016]));}
    }
    const openness=smooth(pose.opening/130),frameWidth=.26+.10*openness,frameCentre=.10*(1-openness);base.scale.x=otherRail.scale.x=frameWidth/.36;base.position.x=otherRail.position.x=frameCentre;for(const sign of [-1,1]){parts.get('support.tie.'+sign).mesh.position.x=frameCentre+sign*(frameWidth/2-.025);for(const end of [-1,1])parts.get('support.foot.'+sign+'.'+end).mesh.position.x=frameCentre+sign*(frameWidth/2-.025);}
    root.updateMatrixWorld(true);
    anchors.corner=local('front',.209,half+L,.141);anchors.turnin=local('front',.200,-half-.0002,.122);anchors.joint=local('front',-.004,half+L/2,.048);anchors.head=new T.Vector3(...spinePoint(.5,1,pose));anchors.fold=new T.Box3().setFromObject(folds[Math.floor(pose.leaf/10)*5].mesh).getCenter(new T.Vector3());anchors.fold.z=.140;anchors.edge=new T.Vector3(...leafSurface(spec,pose,Math.max(0,pose.leaf-35))(.999,.60));anchors.clasp=clasps[1].hook.position.clone();anchors.repair=new T.Vector3(...spinePoint(.5,-.119/.3+.5,pose,.0007));anchors.gutter=new T.Vector3(0,pose.y,.01);anchors.underside=local('rear',.110,-half-L,0);
    setDisplay({appearance,selected,exploded,isolate,exposeLining});return pose;
  }
  function setDisplay(value={}){
    inspectionPart=value.inspectionPart??null;appearance=value.appearance??appearance;selected=value.selected??selected;exploded=value.exploded??exploded;isolate=value.isolate??isolate;exposeLining=value.exposeLining??exposeLining;
    for(const name of ['rear','front'])coverPose(name,pose);
    for(const name of ['rear','front']){const lifted=exposeLining&&selected===name+'-cover',p=parts.get(name+'.pastedown').mesh;p.position.set(W/2-.004-(lifted?.045:0),covers[name].sign*(-half-.0001-(lifted?.008:0)),0);}
    for(const [id,g]of Object.entries(groups)){g.visible=true;if(id==='ground')continue;
      g.userData.basePosition??=new T.Vector3();
      if(!['rear-cover','front-cover'].includes(id))g.position.set(0,0,0);
      if(exploded){const offsets={'front-cover':[-.055,.05,0],'rear-cover':[.045,-.012,0],binding:[-.055,0,0],paper:[0,.025,0],clasps:[.055,0,0],repair:[0,0,0],support:[0,-.025,0]};const o=offsets[id];if(o)g.position.add(new T.Vector3(...o));}
    }
    root.traverse(o=>{if(!o.isMesh)return;const id=o.userData.partId;o.visible=(!inspectionPart||id===inspectionPart)&&(!isolate||o.userData.category===selected||o.userData.category==='ground');if(id?.startsWith('support.front.'))o.visible&&=pose.opening>=100;if(id?.startsWith('leaf.'))return;o.userData.originalMaterial??=o.material;o.material=appearance==='clay'&&o.userData.category!=='ground'?m.clay:o.userData.originalMaterial;});
    applyArtwork();root.updateMatrixWorld(true);
  }
  function dispose(){disposed=true;const gs=new Set(foldTemplates);if(restCache)for(const k of ['right','left','rightHigh','leftHigh'])gs.add(restCache[k]);root.traverse(o=>{if(o.geometry)gs.add(o.geometry);});gs.forEach(g=>g.dispose());if(m.dispose)m.dispose();else new Set(Object.values(m).flat()).forEach(v=>v?.dispose?.());}
  setPose(poseDefault);
  return {root,parts,groups,leaves,anchors,materials:m,spec,budget:thicknessBudget(spec),get pose(){return pose;},setPose,setDisplay,setArt(value){art=value;applyArtwork();},dispose,
    bounds(){root.updateMatrixWorld(true);const box=new T.Box3();for(const p of parts.values())if(!['support','ground'].includes(p.category))box.union(new T.Box3().setFromObject(p.mesh));return box;},
    registry(){return [...parts.values()].map(({mesh,...r})=>r);},
    updateLOD(cameraPosition,pinned=false){const distance=cameraPosition.distanceTo(new T.Vector3(.07,pose.y,0)),detail=pinned||distance<.26||isolate||exploded;for(let i=0;i<leaves.length;i++)leaves[i].visible=(!inspectionPart||leaves[i].name===inspectionPart)&&(!isolate||selected==='paper')&&(detail||Math.abs(i-pose.leaf)<=2);for(const p of proxies)p.visible=!inspectionPart&&(!isolate||selected==='paper')&&!detail&&p.userData.hasVolume;return detail;},
    sample:{leafSurface:(i)=>leafSurface(spec,pose,i,'high'),leafFrame:i=>leafFrame(spec,pose,i),spinePoint:(u,v,d=0)=>spinePoint(u,v,pose,d),spineFrame:(u,v)=>{const f=spineFrame(u,v,pose);return {point:[...f.point],normal:f.normal.clone(),tangent:f.tangent.clone()};},coverPoint:local}};
}
