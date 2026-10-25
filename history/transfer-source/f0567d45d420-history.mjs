import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import {workspaceRoot,resources} from '../shared/Part_2-Connectors/resources.mjs';
const manifest=path.join(workspaceRoot,'history/snapshots.json');
let entries=JSON.parse(fs.readFileSync(manifest,'utf8'));
function reload(){entries=JSON.parse(fs.readFileSync(manifest,'utf8'));Object.assign(resources,JSON.parse(fs.readFileSync(path.join(workspaceRoot,'tools/resources.json'),'utf8')));}
const digest=bytes=>crypto.createHash('sha256').update(bytes).digest('hex');
export function verifyHistory(prefix=''){reload();const selected=entries.filter(e=>e.original.startsWith(prefix));for(const e of selected){const bytes=fs.readFileSync(path.join(workspaceRoot,e.destination));if(digest(bytes)!==e.sha256)throw Error('Historical hash mismatch: '+e.original);}return selected.length;}
function save(){fs.writeFileSync(manifest,JSON.stringify(entries,null,2)+'\n');fs.writeFileSync(path.join(workspaceRoot,'tools/resources.json'),JSON.stringify(resources)+'\n');}
export function protectHistoryFile(relative){
 reload();
 const file=path.resolve(workspaceRoot,relative),name=path.relative(workspaceRoot,file).replaceAll('\\','/');
 if(name.startsWith('../')||name.startsWith('history/'))throw Error('Protect an active workspace file.');
 const rows=entries.filter(e=>e.destination===name);if(!rows.length)return 0;
 const bytes=fs.readFileSync(file),hash=digest(bytes);if(rows.some(e=>e.sha256!==hash))throw Error('Historical content was changed before protection: '+name);
 const target='history/content/'+hash.slice(0,12)+'-'+path.basename(name);fs.mkdirSync(path.dirname(path.join(workspaceRoot,target)),{recursive:true});fs.writeFileSync(path.join(workspaceRoot,target),bytes);
 for(const e of rows){e.destination=target;if(resources.files[e.original])resources.files[e.original]=target;}
 for(const o of resources.objects)for(const [key,value]of Object.entries(o.resources))if(value===name&&key.includes('-snapshot/'))o.resources[key]=target;
 save();return rows.length;
}
export function protectActiveHistory(){reload();const files=[...new Set(entries.map(e=>e.destination).filter(p=>!p.startsWith('history/')))];let n=0;for(const file of files)n+=protectHistoryFile(file);return n;}
export function compactHistory(){
 reload();
 const active=new Map();
 function walk(dir){for(const e of fs.readdirSync(dir,{withFileTypes:true})){if(['history','node_modules','.git','.cache','test-results','playwright-report'].includes(e.name)||e.isSymbolicLink())continue;const file=path.join(dir,e.name);if(e.isDirectory())walk(file);else{const name=path.relative(workspaceRoot,file).replaceAll('\\','/'),hash=digest(fs.readFileSync(file));if(!active.has(hash)||name.includes('/references/'))active.set(hash,name);}}}
 walk(workspaceRoot);const redirects=new Map();
 for(const e of entries){const target=active.get(e.sha256);if(target?.includes('/references/')&&e.destination.startsWith('history/content/')){redirects.set(e.destination,target);e.destination=target;}}
 for(const [key,value]of Object.entries(resources.files))if(redirects.has(value))resources.files[key]=redirects.get(value);
 for(const o of resources.objects)for(const [key,value]of Object.entries(o.resources))if(redirects.has(value))o.resources[key]=redirects.get(value);
 const migrationFile=path.join(workspaceRoot,'history/migration.json'),migration=JSON.parse(fs.readFileSync(migrationFile,'utf8'));
 for(const row of migration.files)if(redirects.has(row.destination))row.destination=redirects.get(row.destination);
 fs.writeFileSync(migrationFile,JSON.stringify(migration)+'\n');save();
 const live=new Set([...entries.map(e=>e.destination),...Object.values(resources.files),...resources.objects.flatMap(o=>Object.values(o.resources))]);let removed=0;
 for(const old of redirects.keys())if(!live.has(old)&&fs.existsSync(path.join(workspaceRoot,old))){fs.unlinkSync(path.join(workspaceRoot,old));removed++;}
 verifyHistory();return removed;
}
export function restoreHistory(destination){
 const output=path.resolve(destination),relative=path.relative(workspaceRoot,output);
 if(!relative.startsWith('..')&&!path.isAbsolute(relative))throw Error('Restore outside the active workspace.');
 if(fs.existsSync(output))throw Error('Restore destination must not exist.');
 verifyHistory();
 for(const e of entries){const file=path.resolve(output,e.original);if(!file.startsWith(output+path.sep))throw Error('Invalid history entry');fs.mkdirSync(path.dirname(file),{recursive:true});fs.copyFileSync(path.join(workspaceRoot,e.destination),file);}
 return entries.length;
}
if(process.argv[1]&&path.resolve(process.argv[1])===path.resolve(new URL(import.meta.url).pathname.replace(/^\/(\w:)/,'$1'))){
 const command=process.argv[2]||'verify';if(command==='verify')console.log(`Verified ${verifyHistory()} historical files.`);else if(command==='compact')console.log(`Removed ${compactHistory()} redundant historical blobs.`);else if(command==='restore'&&process.argv[3])console.log(`Restored ${restoreHistory(process.argv[3])} files.`);else if(command==='protect'&&process.argv[3])console.log(`Protected ${protectHistoryFile(process.argv[3])} historical references.`);else throw Error('Usage: node tools/history.mjs [verify | compact | restore <new external directory> | protect <active file>]');
}
