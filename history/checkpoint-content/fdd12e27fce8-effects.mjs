import * as THREE from 'three';
import {CATALOG,evidenceState} from '../shared/design.mjs';
import {makeLabel} from './geometry.mjs';
const vertex=`varying vec2 vUv; void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}`;
const fragment=`precision highp float;
varying vec2 vUv; uniform float time,kind,layer,intensity,gray,activity; uniform vec3 tint;
float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
float noise(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(hash(i),hash(i+vec2(1,0)),f.x),mix(hash(i+vec2(0,1)),hash(i+vec2(1,1)),f.x),f.y);}
float line(float d,float w){return 1.-smoothstep(w,w*2.,abs(d));}
void main(){vec2 p=(vUv-.5)*vec2(1.,1.25);float r=length(p),a=atan(p.y,p.x),t=time*(.18+activity*.10)+layer*.67;float f=0.;
if(kind<.5){float flame=sin(a*6.+r*23.-t*3.)*.025;f=line(r-.16-layer*.015-flame,.006)*(0.6+0.4*noise(p*18.+vec2(0,-t)));}
else if(kind<1.5){f=line(sin(r*48.-t*2.+sin(a*4.+t)*.8),.06)*(1.-smoothstep(.08,.47,r));}
else if(kind<2.5){float strata=sin(p.y*63.+sin(p.x*18.)*1.8);f=line(strata,.055)*(.3+.7*noise(p*12.+t*.15));}
else if(kind<3.5){f=line(p.y-sin(p.x*9.+t)*.055-sin(p.x*4.-t)*.08+(layer-2.)*.06,.006);}
else if(kind<4.5){float branches=abs(sin(a*6.))*r;f=line(branches,.008)*(1.-smoothstep(.03,.40,r))*(0.65+.35*sin(r*25.-t));}
else if(kind<5.5){float zig=p.x+sin(floor(p.y*35.+t)*1.7)*.024;f=line(zig+(layer-2.)*.035,.003)*(0.65+.35*sin(t+p.y*6.));}
else if(kind<6.5){f=exp(-pow((p.x+.25*sin(t)+p.y*.2)*24.,2.))*.22+line(mod(p.y*18.+t*.2,1.)-.5,.025)*.08;}
else if(kind<7.5){float facet=abs(sin(a*6.))*r;f=line(facet-.10-layer*.011,.004)+line(r-.12-layer*.045,.005)*(.6+.4*sin(a*3.+t));}
else if(kind<8.5){f=line(r-.12-layer*.035,.004)+pow(max(0.,cos(a*12.+t*.3)),35.)*(1.-smoothstep(.08,.4,r))*.3;}
else if(kind<9.5){f=noise(p*9.+vec2(t*.15,-t*.1))*(1.-smoothstep(.07,.43,r))*.22+line(r-.18+sin(a*3.-t)*.025,.005)*.2;}
else if(kind<10.5){f=line(p.x-sin(p.y*9.+t)*.06,.005)+line(r-.13-layer*.025+sin(a*5.+t)*.01,.005)*.45;}
else{float patina=noise(p*27.);f=line(patina-.5-sin(t)*.09,.03)*(1.-smoothstep(.07,.44,r))*.5;}
float edge=smoothstep(0.,.1,vUv.x)*(1.-smoothstep(.9,1.,vUv.x))*smoothstep(0.,.08,vUv.y)*(1.-smoothstep(.92,1.,vUv.y));vec3 c=tint; c=mix(c,vec3(dot(c,vec3(.2126,.7152,.0722))),gray);gl_FragColor=vec4(c,clamp(f*edge*intensity,0.,.45));}`;
export function buildEffects(model){
 const d=model.design,root=new THREE.Group();root.name='Live elemental effects';const materials=[],layers=d.layerCount;
 for(let i=0;i<layers;i++){const id=i===0||!d.config.accentElements.length?d.element.id:d.config.accentElements[(i-1)%d.config.accentElements.length],element=CATALOG.elements.find(e=>e.id===id),uniforms={time:{value:0},kind:{value:CATALOG.elements.findIndex(e=>e.id===id)},layer:{value:i},intensity:{value:i===0?.58:.28},gray:{value:0},activity:{value:0},tint:{value:new THREE.Color(element.palette.primary)}};
  const material=new THREE.ShaderMaterial({vertexShader:vertex,fragmentShader:fragment,uniforms,transparent:true,depthWrite:false,side:THREE.DoubleSide,blending:id==='shadow'?THREE.NormalBlending:THREE.AdditiveBlending});materials.push(material);const plane=new THREE.Mesh(new THREE.PlaneGeometry(d.dimensions.H*.80,d.dimensions.L*.67),material);plane.position.set(0,d.coreY,d.frontZ+d.allocations.fixedRelief*.60+i*.10);plane.renderOrder=20+i;plane.userData={effectId:element.effectId,layer:i,elementId:id};root.add(plane);
 }
 const n=layers===1?24:layers===3?80:180,pos=new Float32Array(n*3),colors=new Float32Array(n*3),seeds=[];
 for(let i=0;i<n;i++){const s=((i*16807+13)%2147483647)/2147483647,angle=i*2.399963,r=d.radius*(.8+((i*73)%101)/101*.7);seeds.push([angle,r,(i*37)%113/113]);pos.set([Math.cos(angle)*r,d.coreY+Math.sin(angle)*r,d.frontZ+8],i*3);const color=new THREE.Color(i%4?d.palette.primary:d.palette.secondary);colors.set([color.r,color.g,color.b],i*3);}
 const geo=new THREE.BufferGeometry();geo.setAttribute('position',new THREE.BufferAttribute(pos,3));geo.setAttribute('color',new THREE.BufferAttribute(colors,3));const pm=new THREE.PointsMaterial({size:d.config.primaryElement==='earth'?1.6:1.0,vertexColors:true,transparent:true,opacity:.35,depthWrite:false,blending:THREE.AdditiveBlending});const particles=new THREE.Points(geo,pm);root.add(particles);
 const routeDots=d.routes.map(route=>{const m=new THREE.Mesh(new THREE.SphereGeometry(.7,10,6),new THREE.MeshBasicMaterial({color:d.palette.secondary}));root.add(m);return {mesh:m,route};});
 const light=new THREE.PointLight(d.palette.primary,.35,150,1);light.position.set(0,d.coreY,d.dimensions.B/2+15);root.add(light);
 const result=d.config.evidence?.result,ev=evidenceState(d.config),cue=new THREE.Group();cue.name='Supplied record cue';root.add(cue);
 const points=result==='success'?[[-5,0],[0,-4],[8,6]]:result==='failure'?[[-5,-5],[5,5],[-5,5],[5,-5]]:Array.from({length:23},(_,i)=>{const a=i/26*Math.PI*2;return[Math.cos(a)*6,Math.sin(a)*6];});
 const cueGeo=new THREE.BufferGeometry().setFromPoints(points.map(([x,y])=>new THREE.Vector3(x,y,d.dimensions.B/2+1))),cueMat=new THREE.LineBasicMaterial({color:result==='failure'?'#E8A187':result==='inconclusive'?'#D7C29A':'#A8D9B9'});cue.add(result==='failure'?new THREE.LineSegments(cueGeo,cueMat):new THREE.Line(cueGeo,cueMat));cue.position.set(0,-d.dimensions.L*.21,0);
 const label=new THREE.Mesh(new THREE.PlaneGeometry(d.dimensions.H*.64,6),new THREE.MeshBasicMaterial({map:makeLabel(result?'Provided '+result:'Saved reference',d.palette.ink,d.dimensions.H*.64,6),transparent:true,depthWrite:false}));label.position.set(0,-11,d.dimensions.B/2+1);cue.add(label);
 const archiveLabel=new THREE.Mesh(new THREE.PlaneGeometry(d.dimensions.H*.64,6),new THREE.MeshBasicMaterial({map:makeLabel('Saved reference',d.palette.ink,d.dimensions.H*.64,6),transparent:true,depthWrite:false}));archiveLabel.position.copy(label.position);cue.add(archiveLabel);
 function update(time,{enabled=true,intensity=1,reduced=false,grayscale=false,state='resting',explode=0}={}){
  root.visible=enabled&&explode===0;const t=reduced?0:time,active=state==='active'?1:state==='focused'?.6:0;
  cue.visible=state==='outcome'&&ev.outcome||state==='archived'&&ev.archived;cue.children[0].visible=state==='outcome';label.visible=state==='outcome';archiveLabel.visible=state==='archived';
  materials.forEach((m,i)=>{const phase=layers===5&&active?(.55+.45*(.5+.5*Math.sin(t*.9-i*.9))):1;m.uniforms.time.value=t;m.uniforms.intensity.value=intensity*(i===0?.58:.28)*(1+active*.7)*phase*(state==='archived'?.4:1);m.uniforms.gray.value=grayscale?1:0;m.uniforms.activity.value=active;});
  light.intensity=['metal','shadow'].includes(d.element.id)?0:intensity*.35;particles.visible=!reduced&&layers>1&&!['metal','shadow'].includes(d.element.id);pm.opacity=intensity*(active?.45:.22);
  for(let i=0;i<n;i++){const[a,r,s]=seeds[i],x=Math.cos(a+t*.035)*r,y=d.coreY+Math.sin(a+t*.035)*r+Math.sin(t*.25+s*6)*3,z=d.frontZ+7+s*15+Math.sin(t*.3+s*6)*3;pos.set([x,y,z],i*3);}geo.attributes.position.needsUpdate=true;
  routeDots.forEach(({mesh,route},i)=>{mesh.visible=state==='active'&&!reduced;let f=(t*.14+i*.2)%1;if(layers===5)f=1-f;const k=f*(route.length-1),a=route[Math.floor(k)],b=route[Math.min(route.length-1,Math.floor(k)+1)],u=k%1;mesh.position.set(...a.map((v,j)=>v*(1-u)+b[j]*u));});
 }
 return {root,layerCount:layers,materials,update,dispose(){root.traverse(o=>{o.geometry?.dispose();if(o.material){o.material.map?.dispose();o.material.dispose();}});}};
}
