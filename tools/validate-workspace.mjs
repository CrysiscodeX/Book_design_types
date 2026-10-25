import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import {fileURLToPath} from 'node:url';
import {spawnSync} from 'node:child_process';
import {workspaceRoot,resources} from '../shared/Part_2-Connectors/resources.mjs';
import {verifyHistory} from './history.mjs';
import {checkExports} from './check-exports.mjs';

function filesIn(directory){return fs.readdirSync(directory,{withFileTypes:true}).flatMap(e=>{if(['node_modules','.git','.cache','test-results','playwright-report'].includes(e.name)||e.isSymbolicLink())return [];const p=path.join(directory,e.name);return e.isDirectory()?filesIn(p):[p];});}
export async function validateWorkspace(){
 const failures=[],files=filesIn(workspaceRoot);let links=0,imports=0;
 for(const [old,target]of Object.entries(resources.files))if(!fs.existsSync(path.join(workspaceRoot,target)))failures.push('Missing resource '+old+' -> '+target);
 for(const file of files){
  const relative=path.relative(workspaceRoot,file).replaceAll('\\','/');
  if(relative.startsWith('history/')||relative.startsWith('conversation/'))continue; // Historical source/link paths describe their captured layout.
  if(file.endsWith('.mjs')){
   const check=spawnSync(process.execPath,['--check',file],{encoding:'utf8',windowsHide:true});if(check.status!==0)failures.push(relative+': '+check.stderr);
   const text=fs.readFileSync(file,'utf8');for(const m of text.matchAll(/(?:\bfrom\s*|\bimport\s*\(\s*)['"]([^'"\n]+)['"]/g)){const spec=m[1];if(spec.startsWith('.')){imports++;if(!fs.existsSync(path.resolve(path.dirname(file),spec)))failures.push('Missing import '+relative+' -> '+spec);}}
  }
  if(file.endsWith('.md')&&!relative.startsWith('history/content/')&&!relative.startsWith('history/spine-system/before/')){
   const text=fs.readFileSync(file,'utf8');for(const m of text.matchAll(/\]\(([^)\n]+)\)/g)){let target=m[1].replace(/^<|>$/g,'').split('#')[0];if(!target||/^[a-z][a-z0-9+.-]*:/i.test(target)||target.startsWith('/'))continue;links++;try{target=decodeURIComponent(target);}catch{}if(!fs.existsSync(path.resolve(path.dirname(file),target)))failures.push('Broken link '+relative+' -> '+target);}
  }
 }
 const migration=JSON.parse(fs.readFileSync(path.join(workspaceRoot,'history/migration.json'),'utf8'));if(migration.files.length!==migration.checkpoint.files)failures.push('Incomplete migration dispositions');
 for(const row of migration.files){if(!['keep','move','merge','regenerate','preserve in history','delete'].includes(row.outcome))failures.push('Invalid disposition '+row.path);if(row.destination&&!fs.existsSync(path.join(workspaceRoot,row.destination)))failures.push('Missing disposition destination '+row.path+' -> '+row.destination);}
 for(const id of ['default-book-design-types']){
  const o=resources.objects.find(o=>o.id===id),csv=o?.resources['references/reference-index.csv'];if(!csv)continue;
  const text=fs.readFileSync(path.join(workspaceRoot,csv),'utf8').replace(/^\uFEFF/,'');
  const rows=text.trim().split(/\r?\n/).map(line=>[...line.matchAll(/(?:^|,)(?:"((?:[^"]|"")*)"|([^,]*))/g)].map(m=>(m[1]??m[2]).replaceAll('""','"'))),header=rows.shift();
  for(const values of rows){const row=Object.fromEntries(header.map((k,i)=>[k,values[i]]));if(row.sha256){const p=path.join(workspaceRoot,o.path,'references',row.relative_path),hash=crypto.createHash('sha256').update(fs.readFileSync(p)).digest('hex');if(hash.toUpperCase()!==row.sha256.toUpperCase())failures.push('Reference hash changed: '+p);}}
 }
 const report={files:files.length,localLinks:links,relativeImports:imports,historicalFiles:verifyHistory(),exports:checkExports(),originalDispositions:migration.files.length,failures};
 if(failures.length)throw Error(JSON.stringify(report,null,2));console.log(JSON.stringify(report));return report;
}
if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url))await validateWorkspace();
