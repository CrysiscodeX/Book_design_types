import fs from 'node:fs/promises';
import path from 'node:path';
import {spawn} from 'node:child_process';
import {workspaceRoot,resources} from '../shared/Part_2-Connectors/resources.mjs';
import {validateWorkspace} from './validate-workspace.mjs';
import {buildAll} from './build.mjs';
import {protectActiveHistory,compactHistory} from './history.mjs';
const only=process.argv.find(a=>a.startsWith('--only='))?.slice(7).split(',');
const excluded=[...process.argv.filter(a=>a.startsWith('--exclude=')).map(a=>a.slice(10)),...(only?resources.objects.filter(o=>!only.includes(o.id)).map(o=>o.id):[])],stage=process.argv.find((a,i)=>i>1&&!a.startsWith('--'))||'all';
const output=path.join(workspaceRoot,'checks'),scratch=path.join(workspaceRoot,'.cache/verification');await fs.mkdir(output,{recursive:true});await fs.mkdir(scratch,{recursive:true});
const report={stage,excluded,checks:[],limits:'Scoped software checks and historical preservation; no fabrication or continuous collision certification.'};
const reportFile=path.join(output,'workspace-verification.json');
let previous={};try{previous=JSON.parse(await fs.readFile(reportFile,'utf8'));}catch{}
const latest=new Map((stage==='all'?[]:previous.checks||[]).map(row=>[row.id,row]));
async function saveReport(complete=false){
 for(const row of report.checks)latest.set(row.id,row);
 const merged={...previous,...report,checks:[...latest.values()],status:complete?'complete':'running',lastRun:{stage,excluded,passed:report.passed??false},passed:complete&&!report.error&&[...latest.values()].every(row=>row.code===0)};
 if(!report.error)delete merged.error;
 await fs.writeFile(reportFile,JSON.stringify(merged,null,2));
}
const currentBinding=resources.objects.find(o=>o.id==='wizard-grimoire')?.validation?.binding;
async function run(id,args,cwd=workspaceRoot){
 const file=path.join(scratch,id+'.log'),handle=await fs.open(file,'w'),start=performance.now();
 const child=spawn(process.execPath,args,{cwd,windowsHide:true,stdio:['ignore',handle.fd,handle.fd]});
 const code=await new Promise((resolve,reject)=>{child.on('exit',resolve);child.on('error',reject);});await handle.close();
 const row={id,code,seconds:Math.round((performance.now()-start)/100)/10};report.checks.push(row);console.log(JSON.stringify(row));
 if(code!==0){const log=await fs.readFile(file,'utf8');console.log(log.slice(-6000));}
 await saveReport();
}
const own=[];
try{
 if(stage!=='static')protectActiveHistory();
 if(['all','static'].includes(stage)){report.integrity=await validateWorkspace();await run('workspace-contracts',['--test','tools/workspace.test.mjs']);}
 if(['all','build'].includes(stage)){await buildAll(excluded);await buildAll(excluded);report.builds=2;}
 if(['all','geometry'].includes(stage)){
  const oldCommands=[['default-table-design','checks/design.test.mjs','--test'],['default-book-design-types','checks/design.test.mjs','--test'],['wizard-grimoire','checks.mjs'],['wizard-grimoire','motion-checks.mjs'],['wizard-grimoire','fittings-checks.mjs'],['dragon-wing-bookcase','run-audits.mjs'],['dragon-wing-bookcase','anatomy-check.mjs'],['dragon-wing-bookcase','check-mesh-intersections.mjs'],['dragon-carving-exemplar','run-audits.mjs'],['dragon-carving-exemplar','check.mjs']];
  for(const [id,file,flag]of oldCommands){if(excluded.includes(id)||!resources.objects.some(o=>o.id===id))continue;const o=resources.objects.find(o=>o.id===id);await run(id+'-'+file.replace(/[^a-z0-9]/gi,'-'),[...(flag?[flag]:[]),path.join(workspaceRoot,o.resources[file])],path.join(workspaceRoot,o.path));}
  if(resources.objects.some(o=>o.id==='wizard-grimoire')&&!excluded.includes('wizard-grimoire')&&currentBinding!=='anatomy-v2')for(const file of ['check.mjs','gathering-check.mjs','interpolation-check.mjs'])await run('spine-'+file,[path.join(workspaceRoot,resources.files['audits/spine-system-review/repairs/'+file])]);
  else if(resources.objects.some(o=>o.id==='wizard-grimoire')&&!excluded.includes('wizard-grimoire'))report.historicalChecks='The V1 spine repair suite describes the retired binding; current anatomy, motion and interface checks validate v2.';
 }
 if(['all','browser','extra'].includes(stage)){
  for(const o of resources.objects){if(excluded.includes(o.id))continue;const url='http://127.0.0.1:'+o.port+'/';try{await fetch(url,{signal:AbortSignal.timeout(1000)});}catch{const child=spawn(process.execPath,[o.server],{cwd:path.join(workspaceRoot,o.path),windowsHide:true,stdio:'ignore'});own.push(child);for(let i=0;i<60;i++){try{await fetch(url);break;}catch{await new Promise(r=>setTimeout(r,150));}}}}
  if(stage!=='extra')for(const o of resources.objects){if(excluded.includes(o.id))continue;const pkgFile=path.join(workspaceRoot,o.path,'package.json');let pkg;try{pkg=JSON.parse(await fs.readFile(pkgFile,'utf8'));}catch{continue;}const cmd=pkg.scripts['check:browser'];if(!cmd)continue;if(cmd==='playwright test')await run(o.id+'-browser',[path.join(workspaceRoot,'node_modules/@playwright/test/cli.js'),'test'],path.dirname(pkgFile));else await run(o.id+'-browser',cmd.replace(/^node\s+/,'').split(/\s+/),path.dirname(pkgFile));}
  if(stage!=='extra'&&resources.objects.some(o=>o.id==='wizard-grimoire')&&!excluded.includes('wizard-grimoire')){const o=resources.objects.find(o=>o.id==='wizard-grimoire');await run('grimoire-inline',[path.join(workspaceRoot,o.resources['inline-qa.mjs'])]);if(currentBinding!=='anatomy-v2')await run('spine-repair-browser',[path.join(workspaceRoot,resources.files['audits/spine-system-review/repairs/browser-check.mjs'])]);}
  if(stage!=='extra'&&resources.objects.some(o=>o.id==='gothic-library-room')&&!excluded.includes('gothic-library-room')){const o=resources.objects.find(o=>o.id==='gothic-library-room');await run('room-placement',[path.join(workspaceRoot,o.resources['check-placement.mjs'])]);}
  if(['all','extra'].includes(stage)&&resources.objects.some(o=>o.id==='dragon-wing-bookcase')&&!excluded.includes('dragon-wing-bookcase')){const o=resources.objects.find(o=>o.id==='dragon-wing-bookcase');await run('dragon-extra-browser',[path.join(workspaceRoot,o.resources['extra-qa.mjs'])]);}
 }
}catch(error){report.error=error.stack;console.error(error.stack);process.exitCode=1;}
finally{for(const child of own)child.kill();compactHistory();report.passed=!report.error&&report.checks.every(r=>r.code===0);await saveReport(true);}
if(!report.passed)process.exitCode=1;
