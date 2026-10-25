import * as T from 'three';
import {RoomEnvironment} from 'three/addons/environments/RoomEnvironment.js';
import {createWizardBook} from './book.mjs';
import {createPageArt} from './content.mjs';
import {DEFAULT_SPEC,SPREADS,REFERENCES,validateSpec} from './specification.mjs';
import {createStudyNavigation} from './navigation.mjs';
import {makePose} from './geometry.mjs';

const root=document.getElementById('study'),q=s=>root.querySelector(s),host=q('[data-viewport]');
if(new URLSearchParams(location.search).has('embed'))document.body.classList.add('embed');
const scene=new T.Scene(),camera=new T.PerspectiveCamera(45,1,.0005,10),renderer=new T.WebGLRenderer({antialias:true,preserveDrawingBuffer:true,powerPreference:'high-performance'});
renderer.setPixelRatio(Math.min(devicePixelRatio,1.5));renderer.outputColorSpace=T.SRGBColorSpace;renderer.toneMapping=T.ACESFilmicToneMapping;renderer.toneMappingExposure=1.02;renderer.setClearColor('#e5dfd2');renderer.shadowMap.enabled=true;renderer.shadowMap.type=T.PCFSoftShadowMap;renderer.shadowMap.autoUpdate=false;
host.append(renderer.domElement);renderer.domElement.setAttribute('aria-label','Solid wizard grimoire. Drag to orbit; wheel to approach.');renderer.domElement.tabIndex=0;
const pmrem=new T.PMREMGenerator(renderer),envScene=new RoomEnvironment(),environment=pmrem.fromScene(envScene,.04);scene.environment=environment.texture;scene.environmentIntensity=.35;envScene.dispose();pmrem.dispose();
const hemi=new T.HemisphereLight('#f5efdc','#76634f',.65),key=new T.DirectionalLight('#fff5dd',2.6),fill=new T.DirectionalLight('#e7edee',.7);key.position.set(-.4,.9,.55);key.target.position.set(0,.07,0);fill.position.set(.5,.35,-.5);key.castShadow=true;key.shadow.mapSize.set(2048,2048);Object.assign(key.shadow.camera,{left:-.52,right:.52,top:.5,bottom:-.3,near:.02,far:2});key.shadow.normalBias=.000025;key.shadow.bias=-.000002;scene.add(hemi,key,fill,key.target);
const art=createPageArt(T);let book=createWizardBook(T,DEFAULT_SPEC);book.setArt(art);scene.add(book.root);
const reducedMotion=matchMedia('(prefers-reduced-motion: reduce)');
let partFocus=null,selected='front-cover',assembly='assembled',surface='material',light='studio',support=true,saved={},slot='1',initializing=true,disposed=false,animation=null,paused=false,lastFrame=null;
const status=t=>q('[data-status]').textContent=t;
function render(){if(!disposed){book.updateLOD(camera.position,selected==='paper');const near=camera.position.distanceTo(new T.Vector3(.07,book.pose.y,0))<.26,ratio=near?2:Math.min(devicePixelRatio,1.5);if(renderer.getPixelRatio()!==ratio){renderer.setPixelRatio(ratio);renderer.shadowMap.needsUpdate=true;}renderer.render(scene,camera);}}
const nav=createStudyNavigation(T,{canvas:renderer.domElement,camera,render,collide:(_,p)=>p,onChange:save});nav.speed=.10;
function state(){return {version:1,spec:book.spec,pose:book.pose,camera:nav.snapshot(),selected,partFocus,assembly,surface,light,support,saved,slot};}
function save(){if(initializing)return;try{localStorage.setItem('wizard-grimoire-v1',JSON.stringify(state()));}catch{}}
function refresh(){
  q('[data-opening]').value=book.pose.opening;q('[data-opening-label]').textContent=Math.round(book.pose.opening)+'°';q('[data-turn]').value=book.pose.turn;q('[data-turn-label]').textContent=Math.round(book.pose.turn*100)+'%';q('[data-turn]').disabled=book.pose.opening<110;
  q('[data-reading]').textContent=book.pose.opening<110?'Release clasps and open above 110° to turn a leaf.':SPREADS.find(s=>s.leaf===book.pose.leaf)?.heading+' · leaf '+book.pose.leaf+' of 240';
  q('[data-envelope]').textContent=`300 × 220 mm boards · ${book.budget.body.toFixed(2)} mm layer budget`;
  renderer.shadowMap.needsUpdate=true;render();
}
function display(){book.setDisplay({appearance:surface,selected,inspectionPart:partFocus,isolate:assembly==='isolate'||assembly==='layers',exploded:assembly==='exploded',exposeLining:assembly==='layers'});book.groups.support.visible=book.groups.ground.visible=support;renderer.shadowMap.needsUpdate=true;render();}
function lighting(){const neutral=light!=='studio';key.color.set(neutral?'#ffffff':'#fff5dd');fill.color.set(neutral?'#ffffff':'#e7edee');hemi.color.set(neutral?'#ffffff':'#f5efdc');hemi.groundColor.set(neutral?'#737373':'#76634f');key.position.set(...(light==='grazing'?[-.65,.10,.30]:[-.4,.9,.55]));key.intensity=light==='grazing'?2.2:2.6;fill.intensity=light==='grazing'?.10:.55;hemi.intensity=light==='grazing'?.2:.6;scene.environmentIntensity=light==='grazing'?.12:.32;renderer.shadowMap.needsUpdate=true;render();}
function applyPose(p,write=true){book.setPose(p);display();refresh();if(write)save();}
function stop(){animation=null;q('[data-action="pause"]').textContent='Pause';paused=false;}
function animateSteps(steps){stop();if(reducedMotion.matches){for(const step of steps)applyPose(step.target);return;}const current=steps.shift();if(!current)return;animation={...current,steps,elapsed:0,from:{...book.pose}};}
function openTo(value){
  const steps=[];if(value<110&&book.pose.turn>0&&book.pose.turn<1)steps.push({target:{turn:book.pose.turn<.5?0:1},duration:300});
  if(value>0&&book.pose.opening===0&&book.pose.release<1)steps.push({target:{release:1},duration:340});
  steps.push({target:{opening:value},duration:650});if(value===0)steps.push({target:{release:0},duration:320});animateSteps(steps);
}
function tick(now){
  if(disposed)return;const dt=lastFrame===null?16:Math.min(60,now-lastFrame);lastFrame=now;
  if(animation&&!paused){animation.elapsed+=dt;const t=Math.min(1,animation.elapsed/animation.duration),s=t*t*(3-2*t),p={};for(const [k,v]of Object.entries(animation.target))p[k]=animation.from[k]+(v-animation.from[k])*s;applyPose(p,false);if(t===1){const remaining=animation.steps;animation=null;if(remaining.length)animateSteps(remaining);else save();}}
  requestAnimationFrame(tick);
}
requestAnimationFrame(tick);
function setView(name){
  partFocus=null;
  const open=book.pose.opening>60,centre=open?[0,.085,0]:[.10,.065,0];
  const views={hero:[open?[.37,.42,.47]:[.42,.32,.43],centre],front:[open?[0,.66,.001]:[.10,.62,.001],centre],side:[[.58,.09,.03],centre],rear:[[-.48,.18,.02],centre],underside:[[.09,-.30,.16],centre]};
  support=!['underside','rear'].includes(name);q('[data-support]').checked=support;display();if(name==='rear'){const target=new T.Vector3(...book.sample.spinePoint(.5,.5)),normal=book.sample.spineFrame(.5,.5).normal;nav.setPose(target.clone().addScaledVector(normal,.46).add(new T.Vector3(0,.04,.12)).toArray(),target.toArray(),'inspect');}else nav.setPose(...(views[name]||views.hero),'inspect');q('[data-navigation]').value='inspect';for(const b of root.querySelectorAll('[data-view]'))b.classList.toggle('active',b.dataset.view===name);save();
}
function bookmark(name){
  partFocus=null;stop();assembly='assembled';q('[data-assembly]').value=assembly;
  if(['corner','repair','clasp'].includes(name)&&book.pose.opening!==0)applyPose({opening:0,turn:0,release:0},false);
  if(['turnin','joint','head','fold','edge','gutter'].includes(name)&&book.pose.opening<110)applyPose({opening:130,turn:0},false);
  const categories={corner:'front-cover',turnin:'front-cover',joint:'binding',head:'binding',fold:'binding',edge:'paper',clasp:'clasps',repair:'repair',gutter:'paper',underside:'rear-cover'};selected=categories[name];if(name==='turnin')assembly='layers';if(name==='fold'){assembly='isolate';partFocus='gathering.'+String(Math.floor(book.pose.leaf/10)).padStart(2,'0');}q('[data-assembly]').value=assembly;q('[data-component]').value=selected;support=false;q('[data-support]').checked=false;display();
  const target=book.anchors[name];if(!target)return;
  let offset={corner:[.012,.068,.030],turnin:[.045,.055,.025],joint:[-.068,.035,.015],head:[-.025,.033,.070],fold:[-.055,.025,.045],edge:[.064,.036,.012],clasp:[.033,.043,.040],repair:[.012,.075,-.010],gutter:[.018,.075,.025],underside:[.015,-.075,.015]}[name];
  if(name==='repair')offset=book.sample.spineFrame(.5,-.119/.3+.5).normal.multiplyScalar(.078).toArray();
  if(name==='joint')offset=new T.Vector3(-.035,.065,.020).applyQuaternion(book.groups['front-cover'].quaternion).toArray();
  if(name==='head')offset=[.012,.025,.075];
  if(name==='fold')offset=[-.025,.035,.06];
  nav.setPose(target.clone().add(new T.Vector3(...offset)).toArray(),target.toArray(),'inspect');status(name==='fold'?'Isolated complete gathering return; other assemblies hidden for inspection.':name==='turnin'?'Inspection explosion · complete pastedown lifted 8 mm and moved aside.':`Close inspection · ${name} · ${(Math.hypot(...offset)*1000).toFixed(0)} mm to anchor`);save();
}
function focus(){const box=new T.Box3();book.root.updateMatrixWorld(true);for(const p of book.parts.values())if(p.category===selected)box.union(new T.Box3().setFromObject(p.mesh));nav.focus(box);save();}
function restore(s){
  if(!s||s.version!==1)throw Error('Expected version 1 inspection state.');const spec=validateSpec(s.spec);
  makePose(spec,s.pose||{});
  const validCamera=c=>c&&['walk','inspect','fly'].includes(c.mode)&&Array.isArray(c.position)&&Array.isArray(c.target)&&c.position.length===3&&c.target.length===3&&[...c.position,...c.target].every(Number.isFinite)&&(!('fov'in c)||(Number.isFinite(c.fov)&&c.fov>=30&&c.fov<=90))&&(!('speed'in c)||(Number.isFinite(c.speed)&&c.speed>=.05&&c.speed<=3));
  if(s.camera&&!validCamera(s.camera))throw Error('Invalid camera state.');
  if(s.saved&&Object.values(s.saved).some(c=>!validCamera(c)))throw Error('Invalid saved camera.');
  if(JSON.stringify(spec)!==JSON.stringify(book.spec)){const old=book;book=createWizardBook(T,spec);book.setArt(art);scene.add(book.root);scene.remove(old.root);old.dispose();}
  partFocus=typeof s.partFocus==='string'&&book.parts.has(s.partFocus)?s.partFocus:null;
  selected=book.groups[s.selected]?s.selected:'front-cover';assembly=['assembled','isolate','exploded','layers'].includes(s.assembly)?s.assembly:'assembled';surface=s.surface==='clay'?'clay':'material';light=['studio','neutral','grazing'].includes(s.light)?s.light:'studio';support=s.support!==false;
  saved=s.saved&&typeof s.saved==='object'?s.saved:{};slot=['1','2','3'].includes(s.slot)?s.slot:'1';applyPose(s.pose||{},false);
  q('[data-component]').value=selected;q('[data-assembly]').value=assembly;q('[data-surface]').value=surface;q('[data-light]').value=light;q('[data-support]').checked=support;q('[data-slot]').value=slot;q('[data-spread]').value=String(Math.max(0,SPREADS.findIndex(v=>v.leaf===book.pose.leaf)));
  if(s.camera)nav.restore(s.camera);q('[data-navigation]').value=nav.mode;q('[data-fov]').value=camera.fov;q('[data-fov-label]').textContent=camera.fov+'°';q('[data-speed]').value=nav.speed;display();lighting();save();
}
for(const [i,s]of SPREADS.entries()){const o=document.createElement('option');o.value=i;o.textContent=s.label;q('[data-spread]').append(o);}q('[data-spread]').value='2';
for(const [id,label]of Object.entries({'front-cover':'Front board & covering','rear-cover':'Rear board & furniture',paper:'240 writing leaves',binding:'Sewing, gatherings & spine',clasps:'Operating clasps',repair:'Replacement leather repair',support:'Reading cradle'})){const o=document.createElement('option');o.value=id;o.textContent=label;q('[data-component]').append(o);}
q('[data-component]').value=selected;
q('[data-budget]').innerHTML=Object.entries({Writing:book.budget.writing,'Interleaf allowance':book.budget.allowance,'Free endpapers':book.budget.endpapers,'Endpaper clearances':book.budget.endpaperClearance,'Two timber boards':book.budget.boards,'Outer leather':book.budget.outerLeather,Pastedowns:book.budget.pastedowns,'Nominal body':book.budget.body,'Maximum spine allowance':book.budget.spineMaximum}).map(([k,v])=>`<div><span>${k}</span><strong>${v.toFixed(2)} mm</strong></div>`).join('');
for(const r of REFERENCES){const a=document.createElement('a');a.className='textlink';a.href=r.url;a.target='_blank';a.rel='noreferrer';a.textContent=r.title+' ↗';q('[data-references]').append(a);}
for(const b of root.querySelectorAll('[data-tab]'))b.onclick=()=>{for(const t of root.querySelectorAll('[data-tab]'))t.classList.toggle('active',t===b);for(const p of root.querySelectorAll('[data-panel]'))p.hidden=p.dataset.panel!==b.dataset.tab;};
for(const b of root.querySelectorAll('[data-view]'))b.onclick=()=>setView(b.dataset.view);
q('[data-opening]').oninput=e=>{stop();applyPose({opening:+e.target.value,release:+e.target.value>0?1:0});};q('[data-turn]').oninput=e=>{stop();applyPose({turn:+e.target.value});};q('[data-spread]').onchange=e=>{stop();applyPose({leaf:SPREADS[+e.target.value].leaf,turn:0});status('Spread selected; stack positions recomputed from physical leaf count.');};
q('[data-surface]').onchange=e=>{surface=e.target.value;display();save();};q('[data-light]').onchange=e=>{light=e.target.value;lighting();save();};q('[data-component]').onchange=e=>{partFocus=null;selected=e.target.value;display();save();};q('[data-assembly]').onchange=e=>{partFocus=null;assembly=e.target.value;display();save();};q('[data-bookmark]').onchange=e=>{bookmark(e.target.value);e.target.value='';};q('[data-navigation]').onchange=e=>{nav.setMode(e.target.value);save();};q('[data-speed]').oninput=e=>{nav.speed=+e.target.value;save();};q('[data-fov]').oninput=e=>{camera.fov=+e.target.value;camera.updateProjectionMatrix();q('[data-fov-label]').textContent=camera.fov+'°';render();save();};q('[data-support]').onchange=e=>{support=e.target.checked;display();save();};q('[data-slot]').onchange=e=>{slot=e.target.value;save();};
const actions={open:()=>openTo(130),close:()=>openTo(0),turn:()=>{if(book.pose.opening<110){status('Open above 110° before turning a leaf.');return;}animateSteps([{target:{turn:book.pose.turn<.5?1:0},duration:1500}]);},pause:()=>{paused=!paused;q('[data-action="pause"]').textContent=paused?'Resume':'Pause';},reset:()=>setView('hero'),focus,fullscreen:()=>document.fullscreenElement?document.exitFullscreen():host.requestFullscreen(),save:()=>{saved[slot]=nav.snapshot();save();status('Camera '+slot+' saved.');},recall:()=>{if(saved[slot]){nav.restore(saved[slot]);save();status('Camera '+slot+' restored.');}},export:()=>{q('[data-json]').value=JSON.stringify(state(),null,2);status('Specification and inspection state ready to copy.');},import:()=>{try{const s=JSON.parse(q('[data-json]').value);restore(s);status('Specification and state restored.');}catch(e){status('Import rejected: '+e.message);}}};for(const b of root.querySelectorAll('[data-action]'))b.onclick=actions[b.dataset.action];
let down;renderer.domElement.addEventListener('pointerdown',e=>down=[e.clientX,e.clientY]);renderer.domElement.addEventListener('pointerup',e=>{
  if(!down||Math.hypot(e.clientX-down[0],e.clientY-down[1])>4)return;const r=renderer.domElement.getBoundingClientRect(),ray=new T.Raycaster();ray.setFromCamera(new T.Vector2((e.clientX-r.left)/r.width*2-1,1-(e.clientY-r.top)/r.height*2),camera);
  const meshes=[];book.root.traverseVisible(o=>{if(o.isMesh&&!['ground','support'].includes(o.userData.category))meshes.push(o);});const hit=ray.intersectObjects(meshes,false)[0];if(!hit)return;const p=book.parts.get(hit.object.userData.partId);if(!p)return;selected=p.category;q('[data-component]').value=selected;q('[data-selected]').textContent=p.id+' · '+p.material+' · '+p.method+' · '+p.evidence;status(p.id);save();
});
const ro=new ResizeObserver(()=>{const r=host.getBoundingClientRect();renderer.setSize(Math.max(1,r.width),Math.max(1,r.height));camera.aspect=r.width/Math.max(1,r.height);camera.updateProjectionMatrix();render();});ro.observe(host);
root.grimoire={scene,camera,renderer,nav,art,get book(){return book;},state,restore,render,setView,bookmark,focus,setPose:p=>{stop();applyPose(p);},setDisplay:(s,l=light)=>{surface=s;light=l;q('[data-surface]').value=s;q('[data-light]').value=l;display();lighting();save();},select:id=>{selected=id;q('[data-component]').value=id;display();},setAssembly:value=>{assembly=value;q('[data-assembly]').value=value;display();},stop,
  async benchmark(frames=120,mode='orbit'){
    stop();const previous=state(),samples=[];applyPose({opening:130,turn:0},false);
    const anchor=book.anchors.edge.clone();
    for(let i=0;i<frames;i++){const start=performance.now();if(mode==='turn')applyPose({turn:(i%(frames/2))/(frames/2)},false);else if(mode==='close'){selected='paper';const a=i*.008;nav.setPose(anchor.clone().add(new T.Vector3(.07*Math.cos(a),.035,.07*Math.sin(a))).toArray(),anchor.toArray());}else nav.setPose([Math.sin(i*.012)*.62,.38,Math.cos(i*.012)*.62],[0,.08,0]);render();await new Promise(requestAnimationFrame);samples.push(performance.now()-start);}
    const gl=renderer.getContext(),ext=gl.getExtension('WEBGL_debug_renderer_info');const report={mode,width:renderer.domElement.width,height:renderer.domElement.height,frames,fps:1000/(samples.reduce((a,b)=>a+b)/samples.length),medianMs:samples.toSorted((a,b)=>a-b)[Math.floor(samples.length/2)],p95Ms:samples.toSorted((a,b)=>a-b)[Math.floor(samples.length*.95)],drawCalls:renderer.info.render.calls,triangles:renderer.info.render.triangles,device:ext?gl.getParameter(ext.UNMASKED_RENDERER_WEBGL):gl.getParameter(gl.RENDERER)};restore(previous);return report;
  },dispose(){disposed=true;stop();ro.disconnect();nav.dispose();book.dispose();art.dispose();environment.dispose();renderer.dispose();}};
let previous;try{previous=JSON.parse(localStorage.getItem('wizard-grimoire-v1'));}catch{}
if(previous){try{restore(previous);}catch{applyPose({opening:0,turn:0,release:0},false);setView('hero');}}else{applyPose({opening:0,turn:0,release:0},false);setView('hero');}
lighting();initializing=false;q('[data-loading]').textContent='';status('Proposed construction study · six representative spreads · select a detail to inspect.');
