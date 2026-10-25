import fs from 'node:fs/promises';
import * as T from 'three';
import {createWizardBook} from '../Part_1-Engine-Root/book-v2.mjs';
import {auditGeometry} from './audit.mjs';
const b=createWizardBook(T),rows=[],solids=[],failures=[];
for(const p of b.parts.values()){const r=auditGeometry(p.mesh.geometry);solids.push({id:p.id,...r});if(!r.passed)failures.push({id:p.id,...r});}
console.log('Default solids',solids.length,'failed',failures.length,JSON.stringify(failures.slice(0,8)));
for(const opening of [0,15,30,60,90,110,130]){b.setPose({opening,turn:0});const gaps=Array.from({length:101},(_,i)=>{const q=-1+i*.02,a=b.math.spine(q,b.pose),c=b.math.caseSpine(q,b.pose);return Math.hypot(a[0]-c[0],a[1]-c[1])*1000;});const bad=[];for(const id of b.parts.keys()){const r=auditGeometry(b.parts.get(id).mesh.geometry);if(!r.passed)bad.push({id,...r});}let length=0,last=b.math.caseSpine(-1,b.pose);for(let i=1;i<=1024;i++){const p=b.math.caseSpine(i/512-1,b.pose);length+=Math.hypot(p[0]-last[0],p[1]-last[1]);last=p;}const caseLengthErrorMm=Math.abs(length-b.math.caseNeutralLength)*1000;if(caseLengthErrorMm>.001)bad.push({id:'case-stiffener-length',caseLengthErrorMm});const row={opening,minSpineGapMm:Math.min(...gaps),maxSpineGapMm:Math.max(...gaps),caseLengthMm:length*1000,caseLengthErrorMm,bad};rows.push(row);console.log(JSON.stringify(row));}
const ids=new Set(b.parts.keys()),dangling=b.registry().flatMap(p=>p.attachment.filter(id=>!ids.has(id)).map(id=>({part:p.id,id})));
await fs.writeFile(new URL('rebuild-results.json',import.meta.url),JSON.stringify({solids,rows,dangling,failed:failures.length},null,2));b.dispose();if(failures.length||rows.some(x=>x.bad.length)||dangling.length)process.exitCode=1;
