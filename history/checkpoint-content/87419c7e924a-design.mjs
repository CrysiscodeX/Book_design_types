import {CATALOG} from './catalog.mjs';
export {CATALOG};
export const DEFAULTS={rank:'initial',primaryElement:'water',accentElements:[],fantasyMotif:'neutral',wizardryStyle:'neutral',botanical:false,title:'Skill Codex',developmentStage:'',projectArea:'',industry:'',quality:'high',constructionTrack:'unspecified',bookmark:false,evidence:null};
export const DEMO={...DEFAULTS,botanical:true,wizardryStyle:'sigilcraft-warding',title:'Water Codex'};
const ids=key=>CATALOG[key].map(x=>x.id);
export function normalizeConfig(input={}){
 const c={...DEFAULTS,...input};
 for(const [key,list] of [['rank',ids('ranks')],['primaryElement',ids('elements')],['fantasyMotif',ids('fantasyMotifs')],['wizardryStyle',ids('wizardryStyles')],['quality',['high','preview']],['constructionTrack',['unspecified','functional-book','display-prop']]])if(!list.includes(c[key]))throw Error('Unknown '+key+': '+c[key]);
 if(!Array.isArray(c.accentElements)||c.accentElements.length>2||new Set(c.accentElements).size!==c.accentElements.length||c.accentElements.includes(c.primaryElement)||c.accentElements.some(x=>!ids('elements').includes(x)))throw Error('Choose up to two distinct accent elements, different from the primary.');
 for(const key of ['title','developmentStage','projectArea','industry']){if(typeof c[key]!=='string'||c[key].length>180)throw Error(key+' must be text of at most 180 characters.');}
 c.botanical=Boolean(c.botanical);c.bookmark=Boolean(c.bookmark);c.evidence=normalizeEvidence(c.evidence);return c;
}
export function normalizeEvidence(e){
 if(e==null)return null;if(typeof e!=='object'||Array.isArray(e))throw Error('Evidence must be an object.');
 const out={};for(const key of ['sourceRef','savedContentRef','provenance']){if(e[key]!=null){if(typeof e[key]!=='string'||!e[key].trim()||e[key].length>500)throw Error('Invalid evidence '+key);out[key]=e[key];}}
 if(e.result!=null){if(!['success','failure','inconclusive'].includes(e.result)||!out.sourceRef)throw Error('An outcome requires a sourceRef and a valid result.');out.result=e.result;}
 out.available=e.available!==false;return out;
}
export function evidenceState(c){const e=c.evidence;return {label:!e?'Unlinked':!e.available?'Unavailable':e.result?'Provided '+e.result:e.savedContentRef?'Provided saved content':'Unlinked',outcome:!!(e?.available&&e.result&&e.sourceRef),archived:!!(e?.available&&e.savedContentRef),provenance:e?.provenance||'User supplied; not independently verified'};}
export function applyRecipe(c,id){const r=CATALOG.recipes.find(x=>x.id===id);if(!r)throw Error('Unknown recipe');return normalizeConfig({...c,primaryElement:r.primary,accentElements:r.accents});}
export const circlePath=(cx,cy,r)=>[['M',cx+r,cy],['C',cx+r,cy+r*.552,cx+r*.552,cy+r,cx,cy+r],['C',cx-r*.552,cy+r,cx-r,cy+r*.552,cx-r,cy],['C',cx-r,cy-r*.552,cx-r*.552,cy-r,cx,cy-r],['C',cx+r*.552,cy-r,cx+r,cy-r*.552,cx+r,cy],['Z']];
export function roundedRect(w,h,r){const x=w/2,y=h/2,k=.552;return [['M',-x+r,-y],['L',x-r,-y],['C',x-r+k*r,-y,x,-y+r-k*r,x,-y+r],['L',x,y-r],['C',x,y-r+k*r,x-r+k*r,y,x-r,y],['L',-x+r,y],['C',-x+r-k*r,y,-x,y-r+k*r,-x,y-r],['L',-x,-y+r],['C',-x,-y+r-k*r,-x+r-k*r,-y,-x+r,-y],['Z']];}
export function transformPath(path,sx=1,sy=1,x=0,y=0,angle=0){const cos=Math.cos(angle),sin=Math.sin(angle);return path.map(([op,...v])=>[op,...v.map((_,i)=>{const a=v[i-i%2]*sx,b=v[i-i%2+1]*sy;return i%2?a*sin+b*cos+y:a*cos-b*sin+x;})]);}
export function samplePath(path,steps=32){let points=[],p=[0,0],start=p;for(const [op,...v]of path){if(op==='M'){p=v;start=v;points.push(p);}else if(op==='L'){p=v;points.push(p);}else if(op==='C'){const a=p;for(let i=1;i<=steps;i++){const t=i/steps,u=1-t;points.push([u*u*u*a[0]+3*u*u*t*v[0]+3*u*t*t*v[2]+t*t*t*v[4],u*u*u*a[1]+3*u*u*t*v[1]+3*u*t*t*v[3]+t*t*t*v[5]]);}p=v.slice(4);}else if(op==='Z'){points.push(start);p=start;}}return points;}
export function buildDesign(input={}){
 const config=normalizeConfig(input),rank=CATALOG.ranks.find(r=>r.id===config.rank),element=CATALOG.elements.find(e=>e.id===config.primaryElement);
 const {spineLengthL:L,coverWidthH:H,closedThicknessB:B}=rank.dimensionsMm,level=rank.rankMarkers,R=[6,10,16][level-1],board=[4,5,6][level-1],rear=.8,body=B-R,zBack=-B/2+rear,zFront=zBack+body,centreZ=(zBack+zFront)/2;
 const palette={...element.palette,lining:'#382C39',recess:'#172129',ink:'#DDD4BD'},components=[],routes=[];
 config.accentElements.forEach((id,i)=>{palette['accent'+i]=CATALOG.elements.find(e=>e.id===id).palette.primary;});
 const push=(id,type,props,parent='body')=>{const c={id,type,parent,status:'proposed',label:id.replaceAll('.',' · '),...props};components.push(c);return c;};
 const plate=(id,path,z,depth,tone,parent='ornament')=>push(id,'plate',{path,z,depth,tone},parent);
 const tube=(id,path,z,r,tone,parent='ornament')=>push(id,'tube',{path,z,r,tone},parent);
 const line=(id,points,r,tone,parent='body')=>push(id,'line3',{points,r,tone},parent);
 const sphere=(id,x,y,z,r,tone,parent='focal')=>push(id,'sphere',{x,y,z,r,tone},parent);
 const leaf=(id,x,y,s,angle,tone='ornament')=>plate(id,transformPath([['M',0,-1],['C',-.9,-.4,-.7,.6,0,1],['C',.7,.6,.9,-.4,0,-1],['Z']],s*.45,s,x,y,angle),zFront+R*.35,R*.16,tone,'botanical');
 plate('body.rear-cover',roundedRect(H,L,5+level),zBack,board,'cover','body');
 plate('body.front-cover',roundedRect(H,L,5+level),zFront-board,board,'cover','body');
 push('body.page-block','box',{x:4,y:0,z:centreZ,w:H-18,h:L-12,d:body-2*board,tone:'pages'},'body');
 push('body.spine','spine',{x:-H/2+7,y:0,z:centreZ,rx:7,rz:body/2,h:L-4,tone:'cover'},'body');
 for(let i=0;i<3+level;i++){const y=-L*.36+i*(L*.72/(2+level));line('body.spine-band.'+i,Array.from({length:41},(_,j)=>{const t=-Math.PI/2+j*Math.PI/40;return[-H/2+7-6.0*Math.cos(t),y,centreZ+body*.485*Math.sin(t)];}),.75,'ornament','spine');}
 const grooveCount=[32,48,68][level-1],pd=body-2*board;
 for(let i=1;i<grooveCount;i++){const z=zBack+board+pd*i/grooveCount;line('body.page-lines.'+i,[[H/2-5,-L/2+7,z],[H/2-5,L/2-7,z]],.10,'recess','pages');line('body.foot-lines.'+i,[[-H/2+14,-L/2+6.1,z],[H/2-5,-L/2+6.1,z]],.10,'recess','pages');}
 // Page-edge striations are visual detail, not asserted sheet counts.
 for(let j=0;j<level;j++)line('rank.'+config.rank+'.page-index.'+j,[[H/2-4.8,L*.28-j*9,zBack+board],[H/2-4.8,L*.28-j*9,zFront-board]],.30,j===0?'primary':'ornament','pages');
 const margin=10+level*2;
 for(let i=0;i<level;i++){tube('rank.'+config.rank+'.frame.'+i,roundedRect(H-2*(margin+i*3.5),L-2*(margin+i*3.5),8),zFront+1+i*.4,.6+i*.12,'ornament','frame');}
 tube('back.frame',roundedRect(H-20,L-20,9),zBack-.45,.3,'ornament','rear');
 plate('back.medallion',circlePath(0,0,Math.min(H,L)*.11),zBack-.65,.3,'ornament','rear');
 for(let i=0;i<level;i++){const y=L*.16-(level-1)*5+i*10;line('rank.'+config.rank+'.marker.'+i,[[-H/2+.65,y-3,centreZ-4],[-H/2+.65,y+3,centreZ],[-H/2+.65,y-3,centreZ+4]],.55,'secondary','rank-markers');}
 const radius=H*[.18,.20,.23][level-1],cy=L*.07,routeZ=zFront+R*.52;
 plate('rank.'+config.rank+'.plaque',circlePath(0,cy,radius),zFront+.5,R*.22,'ornament','focal');
 tube('focal.rim',circlePath(0,cy,radius*.87),zFront+R*.34,.65,'secondary','focal');
 const coreR=R*.22;sphere('focal.core',0,cy,B/2-coreR,coreR,'primary','focal');
 for(let i=0;i<level;i++)tube('focal.ring.'+i,circlePath(0,cy,radius*(.35+i*.16)),routeZ,.40,'ornament','focal');
 const nodeCount=level===1?0:level===2?3:4,nodes=[];
 for(let i=0;i<nodeCount;i++){const a=Math.PI/2+i*Math.PI*2/nodeCount,x=Math.cos(a)*H*.30,y=cy+Math.sin(a)*L*.21;nodes.push([x,y]);plate('workflow.node.'+i,circlePath(x,y,4+level),zFront+.7,R*.15,i%2&&config.accentElements.length?'accent0':'ornament','workflow');const path=[['M',0,cy],['C',x*.65,cy,x*.55,y,x,y]];tube('workflow.route.'+i,path,routeZ,.45,'primary','workflow');routes.push(samplePath(path).map(([a,b])=>[a,b,routeZ+.3]));}
 if(level===3)for(let i=0;i<2;i++)tube('evaluation.layer.'+i,roundedRect(H*(.58+i*.12),L*(.43+i*.10),20),zFront+R*.28,.45,'ornament','evaluation');
 // Twelve different solid emblems, kept inside a shared focal zone.
 const eid=config.primaryElement;
 for(let i=0;i<8+level*2;i++){
  const a=i*Math.PI*2/(8+level*2),x=Math.cos(a)*radius*.62,y=cy+Math.sin(a)*radius*.62;
  if(eid==='fire')leaf('element.fire.flame.'+i,x,y,radius*.21,a-.35,'secondary');
  else if(eid==='water'){const p=[['M',x,y],['C',x+Math.cos(a+1)*radius*.22,y+Math.sin(a+1)*radius*.22,x*.8,cy+(y-cy)*.8,Math.cos(a+.65)*radius*.75,cy+Math.sin(a+.65)*radius*.75]];tube('element.water.current.'+i,p,routeZ,.40,'secondary','element');}
  else if(eid==='earth'||eid==='decay'){tube('element.'+eid+'.seam.'+i,[['M',x*.45,cy+(y-cy)*.45],['L',x*.8+Math.sin(i)*2,cy+(y-cy)*.72],['L',x,y]],routeZ,.55,eid==='earth'?'secondary':'primary','element');}
  else if(eid==='air')tube('element.air.feather.'+i,[['M',x*.25,cy+(y-cy)*.25],['C',x*.8,y+3,x-4,y+5,x,y]],routeZ,.35,'secondary','element');
  else if(eid==='ice'||eid==='lightning'){const p=[['M',0,cy],['L',x*.4+3,cy+(y-cy)*.35],['L',x*.55-2,cy+(y-cy)*.58],['L',x,y]];tube('element.'+eid+'.branch.'+i,p,routeZ,.45,'primary','element');if(eid==='ice')leaf('element.ice.facet.'+i,x,y,3,a,'secondary');}
  else if(eid==='metal')plate('element.metal.ridge.'+i,transformPath(roundedRect(radius*.32,2,1),1,1,x,y,a),zFront+R*.32,R*.15,'ornament','element');
  else if(eid==='crystal')plate('element.crystal.facet.'+i,transformPath([['M',0,4],['L',3,0],['L',0,-4],['L',-3,0],['Z']],1,1,x,y,a),zFront+R*.25,R*.22,'secondary','element');
  else if(eid==='light')plate('element.light.ray.'+i,transformPath([['M',0,-2],['L',radius*.3,0],['L',0,2],['Z']],1,1,x,y,a),zFront+R*.24,R*.15,'ornament','element');
  else if(eid==='shadow')tube('element.shadow.veil.'+i,[['M',x,y],['C',-y*.15,x*.3+cy,-x*.5,cy-(y-cy)*.2,-x*.8,cy-(y-cy)*.8]],routeZ,.5,'secondary','element');
  else if(eid==='nature')leaf('element.nature.leaf.'+i,x,y,5,a,'primary');
 }
 const botanical=config.botanical||eid==='nature'||config.fantasyMotif==='fae';
 if(botanical)for(const side of [-1,1]){const x=side*(H/2-margin-8),p=[['M',x,-L*.30],['C',x-side*25,-L*.10,x+side*6,L*.07,x-side*12,L*.29]];tube('botanical.stem.'+side,p,zFront+1.7,.6,'ornament','botanical');for(let j=0;j<7+level;j++){const y=-L*.27+j*L*.065;leaf('botanical.leaf.'+side+'.'+j,x-side*(7+Math.sin(j)*6),y,3.5+level*.3,side*(.6+(j%2)*.5),'ornament');}}
 // Fantasy modules occupy four corner zones; their shape is independent of element.
 const motif=config.fantasyMotif;
 for(let i=0;i<4&&motif!=='neutral';i++){
  const side=i%2?1:-1,top=i<2?1:-1,x=side*(H/2-margin-9),y=top*(L/2-margin-11),s=8+level;
  const prefix='motif.'+motif+'.'+i;
  if(motif==='draconic'){plate(prefix+'.wing',transformPath([['M',-1,-1],['L',-.8,.8],['C',-.4,.5,.2,1,1,.9],['L',.5,.1],['L',.8,-.3],['L',.1,-.1],['Z']],s,s,x,y,i*Math.PI/2),zFront+1,R*.20,'ornament','motif');for(let j=0;j<3;j++)tube(prefix+'.vein.'+j,[['M',x-s*.5,y-s*.5],['L',x+(j-1)*s*.4,y+s*.5]],routeZ,.25,'secondary','motif');}
  else if(motif==='fae')for(let j=0;j<4;j++)leaf(prefix+'.petal.'+j,x+Math.cos(j*1.57)*3,y+Math.sin(j*1.57)*3,4,j*1.57,'secondary');
  else if(motif==='beast-guardian'){plate(prefix+'.mask',transformPath([['M',0,-1],['L',-.7,-.2],['L',-1,.6],['C',-.4,.3,.4,.3,1,.6],['L',.7,-.2],['Z']],s*.6,s*.6,x,y),zFront+1,R*.20,'ornament','motif');for(const q of [-1,1])tube(prefix+'.antler.'+q,[['M',x+q*3,y+3],['L',x+q*7,y+8],['L',x+q*5,y+11]],routeZ,.55,'secondary','motif');}
  else if(motif==='celestial'){const pts=Array.from({length:10},(_,j)=>[Math.cos(j*Math.PI/5)*s*(j%2?.35:.75)+x,Math.sin(j*Math.PI/5)*s*(j%2?.35:.75)+y]);plate(prefix+'.star',[['M',...pts[0]],...pts.slice(1).map(p=>['L',...p]),['Z']],zFront+1,R*.16,'ornament','motif');tube(prefix+'.orbit',circlePath(x,y,s*.85),routeZ,.35,'secondary','motif');}
  else if(motif==='underworld')plate(prefix+'.arch',transformPath([['M',-.7,-1],['L',-.7,.2],['C',-.7,1,.7,1,.7,.2],['L',.7,-1],['L',.4,-1],['L',.4,.2],['C',.4,.7,-.4,.7,-.4,.2],['L',-.4,-1],['Z']],s*.6,s*.7,x,y),zFront+1,R*.20,'secondary','motif');
  else {tube(prefix+'.memory',circlePath(x,y,s*.6),routeZ,.65,'ornament','motif');plate(prefix+'.insert',circlePath(x,y,s*.36),zFront+1,R*.14,'secondary','motif');}
 }
 // Wizardry changes inscription geometry and motion routing, not just color.
 const style=config.wizardryStyle,sy=-L*.28,sw=H*.24;
 if(style!=='neutral'){
  const path=style==='sigilcraft-warding'?roundedRect(sw*2,12,3):style==='evocation-channeling'?[['M',-sw,sy],['L',0,sy+8],['L',sw,sy],['M',0,sy+8],['L',0,sy-5]]:style==='alchemy-transformation'?[['M',-sw*.5,sy+7],['L',-sw*.5,sy],['C',-sw,sy-9,sw,sy-9,sw*.5,sy],['L',sw*.5,sy+7]]:style==='illusion-glamour'?roundedRect(sw*1.8,10,4):style==='enchantment-binding'?circlePath(-sw*.35,sy,7):style==='divination-temporal'?circlePath(0,sy,10):style==='summoning-spatial'?roundedRect(sw*1.4,19,7):circlePath(0,sy,8);
  const transformed=['sigilcraft-warding','illusion-glamour','summoning-spatial'].includes(style)?transformPath(path,1,1,0,sy):path;
  tube('style.'+style+'.emblem',transformed,routeZ,.45,'ornament','wizardry');routes.push(samplePath(transformed).map(([x,y])=>[x,y,routeZ+.4]));
  if(style==='enchantment-binding')tube('style.binding.loop',circlePath(sw*.35,sy,7),routeZ,.45,'secondary','wizardry');
  if(style==='illusion-glamour')tube('style.illusion.offset',transformPath(transformed,.82,1.1,2,2),routeZ+.3,.35,'secondary','wizardry');
  if(style==='divination-temporal')for(let j=0;j<12;j++){const a=j*Math.PI/6;tube('style.temporal.index.'+j,[['M',Math.cos(a)*8,sy+Math.sin(a)*8],['L',Math.cos(a)*10,sy+Math.sin(a)*10]],routeZ,.25,'secondary','wizardry');}
  if(style==='summoning-spatial')tube('style.spatial.inner',transformPath(transformed,.7,.7,0,sy*.3),routeZ,.35,'secondary','wizardry');
  if(style==='soulcraft-necromancy')tube('style.soul.memory',circlePath(0,sy,4),routeZ,.4,'secondary','wizardry');
 }
 const labelY=-L*.39,labelW=H*.70;
 plate('design.label-band',transformPath(roundedRect(labelW,18+level*2,3),1,1,0,labelY),zFront+.4,.45,'recess','labels');
 push('design.title','text',{x:0,y:labelY+2,z:zFront+1.1,w:labelW-6,h:7,text:config.title||'Untitled',tone:'ink'},'labels');
 push('design.rank-label','text',{x:0,y:labelY-6,z:zFront+1.1,w:labelW-6,h:4,text:rank.name.toUpperCase(),tone:'secondary'},'labels');
 if(config.bookmark)plate('accessory.bookmark',transformPath([['M',-3,12],['L',3,12],['L',3,-12],['L',0,-9],['L',-3,-12],['Z']],1,1,H/2-7,-L*.40),zFront+.7,.5,'primary','accessory');
 const ev=evidenceState(config);
 if(level===3){plate('design.archive-housing',circlePath(H*.30,-L*.28,9),zFront+.6,R*.16,'ornament','status');push('design.evidence-status','text',{x:H*.30,y:-L*.28,z:zFront+R*.3,w:16,h:4,text:ev.label,tone:'ink'},'status');}
 if(!routes.length)routes.push(samplePath(circlePath(0,cy,radius*.75)).map(([x,y])=>[x,y,routeZ+.6]));
 for(let i=0;i<config.accentElements.length;i++)tube('accent.'+config.accentElements[i],circlePath(0,cy,radius*(.93+i*.10)),routeZ,.35,'accent'+i,'accent');
 const design={version:'0.3',config,rank,element,palette,components,routes,dimensions:{L,H,B},allocations:{fixedRelief:R,rearRelief:rear,board,pageRegion:body-2*board,coveredBody:body},frontZ:zFront,coreY:cy,radius,layerCount:rank.defaultElementalLayerCount,evidence:ev};
 design.componentMap=new Map(components.map(c=>[c.id,c]));return design;
}
export function explosionOffset(c,design,value=0){if(!value)return [0,0,0];const parent=c.parent;if(parent==='rear')return[0,0,-35*value];if(c.id==='body.rear-cover')return[0,0,-25*value];if(c.id==='body.page-block'||parent==='pages')return[0,0,0];if(c.id==='body.spine'||parent==='spine'||parent==='rank-markers')return[-30*value,0,0];const factors={body:1,frame:2,ornament:3,focal:4,element:4,workflow:3,evaluation:3,botanical:3,motif:3,wizardry:3,labels:2,status:4,accent:4};return[0,0,(factors[parent]||2)*14*value];}
