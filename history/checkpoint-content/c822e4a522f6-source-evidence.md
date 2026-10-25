# Source evidence — line-numbered current implementations

Unedited sources; SHA-256 inventory records their inspected versions. Extracts are not complete context.

## wizard-grimoire/book.mjs

```text
53:       add(name+'.lacing.'+i,transform(kit.between(40,12,upper,lower)),m.linen,category,g,{material:'flattened linen support',attachment:[name+'.board','binding.cord.'+i],geometryDetail:'Solid flattened end in a physical inner-board channel; concealed through-edge route is proposed'});
64:   const patch=add('repair.lower-spine-patch',kit.between(56,38,(u,v)=>{const x=.003+u*.041,z=-.119+(v-.5)*.040,t=.00010+.00044*Math.sin(Math.PI*u)*Math.sin(Math.PI*v);return [x,half+L-relief(x,z)+t,z];},(u,v)=>{const x=.003+u*.041,z=-.119+(v-.5)*.040;return [x,half+L-relief(x,z),z];}),m.patch,'repair',groups['front-cover'],{material:'replacement leather',attachment:['front.leather-face'],geometryDetail:'Closed, tapered replacement patch bonded to the underlying tooled surface'});
65:   for(let i=0;i<17;i++){const x=.006+i*.00215,z=-.134,st=add('repair.stitch.'+i,kit.tube([[x,half+L+.00035,z],[x+.0006,half+L+.00065,z+.0012],[x+.0011,half+L+.00035,z+.0024]],.00014,8,8),m.linen,'repair',groups['front-cover'],{material:'linen',attachment:['repair.lower-spine-patch']});}
77:   const liner=add('binding.spine-lining',kit.shell(80,12,(u,v)=>[u*.045,.02,(v-.5)*.286],.00035),m.lining,'binding',groups.binding,{material:'textile lining',attachment:['binding.leather-spine',...Array.from({length:5},(_,i)=>'binding.cord.'+i)]});
82:     const mesh=add('binding.endband.'+(end<0?'tail':'head')+'.'+j,new T.TorusGeometry(.00065,.00016,8,16),j%3?m.linen:m.lining,'binding',groups.binding,{material:'linen',attachment:['binding.spine-lining'],role:'endband stitch loop'});headbands.push({mesh,end,j});
85:   const endbandCores=[-1,1].map(end=>({end,mesh:add('binding.endband-core.'+end,kit.tube([[0,0,0],[.01,0,0],[.02,0,0]],.00049,80,12),m.linen,'binding',groups.binding,{material:'linen core',attachment:['binding.spine-lining'],role:'continuous endband core'})}));
88:     const mesh=add('binding.sewing.'+g+'.'+c,kit.tube([[.0013,-.0011,-.0014],[.0020,0,0],[.0013,.0011,.0014]],.000175,8,8),m.linen,'binding',groups.binding,{material:'linen',attachment:['leaf.'+String(g*10).padStart(3,'0'),'binding.cord.'+c],role:'gathering stitch'});sewing.push({mesh,g,c});
124:   function spinePoint(u,v,p,outward=0){
161:     setGeometry(spine,kit.shell(100,54,(u,v)=>spinePoint(u,v,pose),.0009));
162:     setGeometry(liner,kit.shell(80,12,(u,v)=>{const p=spinePoint(u,v,pose);return [p[0]+.0007,p[1],p[2]*.956];},.00035));
163:     for(const c of cords){const pts=Array.from({length:13},(_,j)=>{const p=spinePoint(j/12,.5,pose);return [p[0]+.0015,p[1],c.z];});setGeometry(c.mesh,kit.tube(pts,.0012,48,12));}
164:     for(const e of headbands){const u=(e.j+.5)/36,p=spinePoint(u,.5,pose),a=spinePoint(Math.max(0,u-.002),.5,pose),b=spinePoint(Math.min(1,u+.002),.5,pose),tangent=new T.Vector3(b[0]-a[0],b[1]-a[1],0).normalize();e.mesh.position.set(p[0]+.0015,p[1],e.end*.146);e.mesh.quaternion.setFromUnitVectors(new T.Vector3(0,0,1),tangent);}
165:     for(const core of endbandCores)setGeometry(core.mesh,kit.tube(Array.from({length:25},(_,i)=>{const p=spinePoint(i/24,.5,pose);return [p[0]+.0015,p[1],core.end*.146];}),.00049,80,12));
166:     for(const c of caps)setGeometry(c.mesh,kit.shell(100,10,(u,v)=>{const p=spinePoint(u,.5,pose),roll=Math.sin(v*Math.PI);return [p[0]-.0003-roll*.0008,p[1],c.end*(.147+v*.003)];},.0008));
167:     for(const s of sewing){const u=(s.g+.5)/24,p=spinePoint(u,.5,pose),z=(s.c-2)*.055;s.mesh.position.set(p[0],p[1],z);}
182:     anchors.corner=local('front',.209,half+L,.141);anchors.turnin=local('front',.200,-half-.0002,.122);anchors.joint=new T.Vector3(...spinePoint(.72,.66,pose));anchors.head=new T.Vector3(...spinePoint(.5,1,pose));anchors.fold=new T.Box3().setFromObject(folds[Math.floor(pose.leaf/10)*5].mesh).getCenter(new T.Vector3());anchors.fold.z=.140;anchors.edge=new T.Vector3(...leafSurface(spec,pose,Math.max(0,pose.leaf-35))(.999,.60));anchors.clasp=clasps[1].hook.position.clone();anchors.repair=local('front',.024,half+L+.0004,-.118);anchors.gutter=new T.Vector3(0,pose.y,.01);anchors.underside=local('rear',.110,-half-L,0);
203:     sample:{leafSurface:(i)=>leafSurface(spec,pose,i,'high'),leafFrame:i=>leafFrame(spec,pose,i),spinePoint:(u,v)=>spinePoint(u,v,pose),coverPoint:local}};
```

## wizard-grimoire/geometry.mjs

```text
67: export function makePose(spec,input={}) {
74:   const y=.034+split*total*Math.cos(tilt)+.006;
79: export function leafFrame(spec,pose,index,progress=null) {
92:   const f=leafFrame(spec,pose,index),width=spec.paper.width/1000,height=spec.paper.height/1000;
93:   const turnBend=f.active?Math.sin(Math.PI*pose.turn)*.68:0;
100:     const slope=turnBend*Math.sin(Math.PI*s)*(.65+.35*s)+handed*(pose.a/Math.PI)*.055*Math.exp(-s*width/bendLength);
```

## wizard-grimoire/viewer.mjs

```text
50: function bookmark(name){
55:   const target=book.anchors[name];if(!target)return;
60: function restore(s){
64:   saved=s.saved&&typeof s.saved==='object'?s.saved:{};slot=['1','2','3'].includes(s.slot)?s.slot:'1';applyPose(s.pose||{},false);
```

## wizard-grimoire/inline-template.html

```text
18: import * as T from 'https://esm.sh/three@0.186.1';
19: import { OrbitControls } from 'https://esm.sh/three@0.186.1/examples/jsm/controls/OrbitControls.js';
20: import { RoomEnvironment } from 'https://esm.sh/three@0.186.1/examples/jsm/environments/RoomEnvironment.js';
31: function apply(p={},remember=true){book.setPose(p);book.setDisplay({appearance:clay?'clay':'material'});book.groups.ground.visible=false;q('[data-turn]').disabled=!opened;q('[data-turn]').value=book.pose.turn;q('[data-progress]').textContent=Math.round(book.pose.turn*100)+'%';q('[data-status]').textContent=opened?'240 leaves · 0.16 mm paper · drag to orbit, wheel to approach':'Closed binding · drag to orbit, wheel to approach';render();if(remember)window.openai?.setWidgetState?.({modelContent:{study:'wizard-grimoire',opening:book.pose.opening,leaf:book.pose.leaf,turn:book.pose.turn,clay},privateContent:{spread,camera:camera.position.toArray(),target:controls.target.toArray()}}).catch(()=>{});}
35: function restore(s){if(!s?.modelContent||s.modelContent.study!=='wizard-grimoire')return;opened=s.modelContent.opening>=110;clay=!!s.modelContent.clay;spread=Number.isInteger(s.privateContent?.spread)?Math.max(0,Math.min(5,s.privateContent.spread)):2;q('[data-spread]').value=spread;q('[data-clay]').checked=clay;for(const b of container.querySelectorAll('[data-pose]'))b.setAttribute('aria-pressed',String((b.dataset.pose==='open')===opened));apply({opening:opened?130:0,leaf:SPREADS[spread].leaf,turn:s.modelContent.turn||0},false);fit();}
```

## wizard-grimoire/browser-qa.mjs

```text
15: await page.locator('[data-turn]').evaluate(e=>{e.value='.5';e.dispatchEvent(new Event('input',{bubbles:true}));});check('Half-turn is a thick closed shell',await api(()=>{const b=document.getElementById('study').grimoire.book,g=b.leaves[b.pose.leaf].geometry;return b.pose.turn===.5&&g.userData.thickness===.00016&&g.groups.length===3;}));
24: for(const name of ['corner','turnin','joint','head','fold','edge','clasp','repair','gutter','underside']){await page.locator('[data-bookmark]').selectOption(name);const s=await snap(),distance=Math.hypot(...s.position.map((x,i)=>x-s.target[i]));check(name+' bookmark at 50–100 mm',distance>=.05&&distance<=.1&&await api(()=>document.getElementById('study').grimoire.camera.near<=.001));}
27: await api(()=>{const a=document.getElementById('study').grimoire;a.setAssembly('assembled');a.select('front-cover');a.setView('hero');});check('Distant paper proxy retains closed mass',await api(()=>{const a=document.getElementById('study').grimoire;return a.book.parts.get('render.paper-block.0').mesh.visible&&a.book.leaves.every(m=>m.geometry.userData.solid);}));
```

## wizard-grimoire/inline-qa.mjs

```text
6: await frame.locator('[data-pose="open"]').click();await frame.locator('[data-turn]').fill('0.5');await frame.locator('[data-turn]').dispatchEvent('input');const half=await frame.evaluate(()=>document.getElementById('wizard-grimoire-inline').grimoire.book.pose.turn===.5);await frame.locator('[data-clay]').check();const clay=await frame.evaluate(()=>document.getElementById('wizard-grimoire-inline').grimoire.book.leaves[104].material.type==='MeshStandardMaterial');
```

## default-book-design-types/models/threejs/geometry.mjs

```text
12: function tubeGeometry(points,r,quality){const curve=new THREE.CatmullRomCurve3(points.map(p=>new THREE.Vector3(...p)),false,'centripetal');return new THREE.TubeGeometry(curve,Math.max(8,quality==='high'?points.length*2:points.length),r,quality==='high'?8:5,false);}
13: function spineGeometry(c,quality){const n=quality==='high'?80:32,pos=[],idx=[];for(let y of [-c.h/2,c.h/2])for(let i=0;i<=n;i++){const a=i/n*Math.PI*2;pos.push(c.x+c.rx*Math.cos(a),y,c.z+c.rz*Math.sin(a));}for(let i=0;i<n;i++){idx.push(i,i+1,n+1+i,i+1,n+2+i,n+1+i);}const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(pos,3));g.setIndex(idx);g.computeVertexNormals();return g;}
```

## default-book-design-types/models/shared/svg.mjs

```text
19:   else if(c.type==='spine'){const poly=[];for(const y of [-c.h/2,c.h/2])for(let i=0;i<=24;i++){const a=i/24*Math.PI*2;poly.push(proj([c.x+c.rx*Math.cos(a)+off[0],y,c.z+c.rz*Math.sin(a)]));}points.push(...poly);const xs=poly.map(p=>p[0]),ys=poly.map(p=>p[1]);record(c,dot([c.x,0,c.z],basis[2]),`<rect x="${n(Math.min(...xs))}" y="${n(Math.min(...ys))}" width="${n(Math.max(...xs)-Math.min(...xs))}" height="${n(Math.max(...ys)-Math.min(...ys))}" rx="3" fill="${color}" stroke="#172A32" stroke-width=".3"/>`);}
```

## gothic-library-room/physical-assets.mjs

```text
10:       const g=kit.surfaceSolid(.360+offset,.508-k*.00016,top,bottom,44,28,24,.000035),o=add(g,[k===5?pageMat:paper,paper],side*(.010+offset),0,0);o.scale.x=side;o.name='Closed sewn signature '+(k+1);o.userData.signature=true;
13:       const top=(u,v)=>curve(u,v)+.0278+k*.00035+(.005+k*.006)*u*u*(.7+.3*Math.sin(v*Math.PI)),g=kit.surfaceSolid(.36,.506,top,(u,v)=>top(u,v)-.00016,44,28),o=add(g,[pageMat,paper],side*.010,0,0);o.scale.x=side;o.name='Individual 0.16 mm curled leaf';o.userData.leafThickness=.00016;
16:     const hinge=add(new THREE.CylinderGeometry(.004,.004,.522,16),cover,side*.008,.003,0);hinge.rotation.x=Math.PI/2;
21:   const spine=add(kit.roundedBox(.024,.009,.538,.003),cover,0,-.004,0);spine.name='Flexible spine lining';
```

## gothic-library-room/model.mjs

```text
107:       const pools=covers.map(()=>[]),bands=[],pages=[];const bandProfile=new THREE.Shape();bandProfile.moveTo(-.51,0);bandProfile.absellipse(0,0,.51,.53,Math.PI,0,true);bandProfile.lineTo(.5,0);bandProfile.absellipse(0,0,.5,.5,0,Math.PI,false);bandProfile.closePath();const bandGeometry=new THREE.ExtrudeGeometry(bandProfile,{depth:1,bevelEnabled:false,curveSegments:8});bandGeometry.rotateX(Math.PI/2);bandGeometry.translate(0,.5,0);bandGeometry.userData={solid:true,construction:'closed curved spine band'};const spineProfile=new THREE.Shape();spineProfile.moveTo(-.5,0);spineProfile.absellipse(0,0,.5,.5,Math.PI,0,true);spineProfile.closePath();const spineGeometry=new THREE.ExtrudeGeometry(spineProfile,{depth:1,bevelEnabled:false,curveSegments:8});spineGeometry.rotateX(Math.PI/2);spineGeometry.translate(0,.5,0);spineGeometry.userData={solid:true,construction:'closed rounded book spine'};
134:         for(const p of list){const [w,h,d]=p.s,[x,y,z]=p.p;for(const sign of [-1,1])boardParts.push({p:[x+sign*(w/2-.0016),y,z],s:[.0032,h,d]});spineParts.push({p:[x,y,z+d/2-.008],s:[w-.003,h,.016]});paperParts.push({p:[x,y-.001,z-.004],s:[Math.max(.008,w-.008),h-.009,d-.013]});}
```

## gothic-miniature-library/model.mjs

```text
208:   function buildOpenBook(){
215:         for(let i=0;i<=rows;i++)for(let j=0;j<=cols;j++){const u=i/rows,v=j/cols;pos.push(s*(.002+u*.054),.002+layer*.0011+.007*Math.sin(u*Math.PI*.68),-.034+v*.068);uv.push(s===1?u:1-u,1-v);if(i<rows&&j<cols){const a=i*(cols+1)+j,b=a+cols+1;indices.push(a,a+1,b,a+1,b+1,b);}}
219:     rod(g,[0,.003,-.035],[0,.003,.035],.0015,darkWood);
```

## hollow-tree-library/model.mjs

```text
121:       pools[ci].push({p:[x+w/2,y+h/2,z],s:[w,h,d],turn,lean});bookCount++;
122:       // Fine spine bands remain separate geometry; page blocks are visible at top.
```

## woodland-library-portal/model.mjs

```text
172:     coverPools.forEach((list,i)=>instanced(books,new THREE.BoxGeometry(1,1,1),bookMats[i],list));
173:     instanced(books,new THREE.BoxGeometry(1,1,1),page,pages);instanced(books,new THREE.BoxGeometry(1,1,1),gold,bands);
```

## dragon-wing-bookcase/builders.mjs

```text
124:   const spineShape=new THREE.Shape();spineShape.moveTo(-.5,0);spineShape.absellipse(0,0,.5,.5,Math.PI,0,true);spineShape.closePath();const spineGeometry=cached('closed-spine',()=>{const g=new THREE.ExtrudeGeometry(spineShape,{depth:1,bevelEnabled:false,curveSegments:48});g.rotateX(Math.PI/2);g.translate(0,.5,0);return smoothSpine(g);});
128:    for(const sign of [-1,1])box('books',id+'-endpaper-'+sign,.0005,h-.011,d-.014,sign*(w/2-.00325),-.001,-.004,materials.paper,options);box('books',id+'-spine-lining',w-.008,h-.012,.003,0,-.001,d/2-.009,colour,options);const spine=add('books',id+'-spine',spineGeometry,colour,[0,0,d/2-.008],options);spine.scale.set(w-.002,h,.016);
```

## dragon-carving-exemplar/assembly.mjs

```text
91:   function book(id,w,h,d,centre,angle=0){const g=new T.Group();g.matrixAutoUpdate=false;g.matrix.makeScale(1/sx,1/sy,1).multiply(new T.Matrix4().makeRotationZ(angle));g.matrix.setPosition(...centre);groups.books.add(g);const m=M.bindings[Math.floor(rand()*M.bindings.length)],o={parent:g,owner:id};for(const sign of [-1,1])box('books',id+'-board-'+sign,.003,h,d,[sign*(w/2-.0015),0,0],m,o);box('books',id+'-paper',w-.007,h-.010,d-.013,[0,-.001,-.004],M.paper,o);const sp=add('books',id+'-rounded-spine',spine,m,[0,0,d/2-.008],o);sp.scale.set(w-.001,h,.016);for(const sign of [-1,1]){box('books',id+'-endpaper-'+sign,.00045,h-.011,d-.014,[sign*(w/2-.00325),-.001,-.004],M.paper,o);box('books',id+'-headband-'+sign,w-.008,.0015,.007,[0,sign*(h/2-.006),d/2-.008],M.brass,o);}for(const y of [-h*.31,h*.31]){const p=[];for(let j=0;j<=32;j++){const a=Math.PI-j/32*Math.PI;p.push([Math.cos(a)*(w-.001)/2,y,d/2-.008+Math.sin(a)*.0082]);}sweep('books',id+'-binding-band-'+y,p,p.map(()=>.0018),p.map(()=>.0012),M.brass,{parent:g,owner:id,steps:40,sides:10});}bookEnvelopes.push({id,group:g,size:[w,h,d],centre,angle});return g;}
```
