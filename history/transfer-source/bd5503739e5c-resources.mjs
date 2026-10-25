import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath,pathToFileURL} from 'node:url';

export const workspaceRoot=fileURLToPath(new URL('../../',import.meta.url));
export const resources=JSON.parse(fs.readFileSync(new URL('../../tools/resources.json',import.meta.url),'utf8'));
const origins=new WeakMap();
const reverse=new Map(Object.entries(resources.files).map(([old,current])=>[pathToFileURL(path.join(workspaceRoot,current)).href,old]));
const directoryEntries=Object.entries(resources.directories).sort((a,b)=>b[0].length-a[0].length);

// Logical resource identities let checks and generators follow files across responsibility boundaries.
export function resourceURL(relative,base){
 let original=typeof base==='object'?origins.get(base):undefined;
 original??=reverse.has(String(base))?new URL('source:///'+reverse.get(String(base))):undefined;
 const resolved=new URL(relative,original||base);
 if(resolved.protocol!=='source:')return resolved;
 const key=decodeURIComponent(resolved.pathname.slice(1)).replace(/\/$/,'');
 let target=resources.files[key]||resources.directories[key];
 if(key.includes('/node_modules/'))target='node_modules/'+key.split('/node_modules/')[1];
 if(!target){const prefix=directoryEntries.find(([old])=>key.startsWith(old+'/'));if(prefix)target=prefix[1]+key.slice(prefix[0].length);}
 if(!target)throw Error('Unknown workspace resource: '+key);
 const absolute=path.resolve(workspaceRoot,target),within=path.relative(workspaceRoot,absolute);
 if(within.startsWith('..')||path.isAbsolute(within))throw Error('Resource escapes workspace: '+key);
 const result=pathToFileURL(absolute+(resolved.pathname.endsWith('/')?path.sep:''));
 origins.set(result,resolved);return result;
}

export function objectById(id){const object=resources.objects.find(o=>o.id===id);if(!object)throw Error('Unknown object: '+id);return object;}
