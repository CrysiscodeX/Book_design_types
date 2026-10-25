import http from 'node:http';
import fs from 'node:fs/promises';
import path from 'node:path';
import {workspaceRoot,objectById} from './resources.mjs';
const types={'.html':'text/html; charset=utf-8','.mjs':'text/javascript; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.json':'application/json','.svg':'image/svg+xml','.png':'image/png','.jpg':'image/jpeg','.md':'text/plain; charset=utf-8','.csv':'text/csv; charset=utf-8','.bin':'application/octet-stream'};
function inside(base,relative){const file=path.resolve(base,relative),r=path.relative(base,file);if(r.startsWith('..')||path.isAbsolute(r))throw Error('Invalid path');return file;}
export function serveObject(id){
 const object=objectById(id);
 const server=http.createServer(async(req,res)=>{
  try{
   if(!['GET','HEAD'].includes(req.method)){res.writeHead(405);res.end();return;}
   const pathname=decodeURIComponent(req.url.split('?')[0]);
   if(pathname.includes('\\')||pathname.includes('\0')||pathname.split('/').some(p=>p==='..'||p.startsWith('.'))){res.writeHead(403);res.end('Invalid path');return;}
   if(pathname==='/favicon.ico'){res.writeHead(204);res.end();return;}
   if(pathname==='/sandbox-preview'){
    const fragment=await fs.readFile(path.join(workspaceRoot,object.inline),'utf8'),css=await fs.readFile(path.join(workspaceRoot,'shared/Part_3-Outer-Look-Shell/visualize.css'),'utf8');
    const csp="default-src 'none'; script-src 'unsafe-inline' https://cdn.jsdelivr.net; style-src 'unsafe-inline'; img-src data: blob:; connect-src 'none'; object-src 'none'";
    const content=`<!doctype html><html><head><meta charset="utf-8"><meta http-equiv="Content-Security-Policy" content="${csp}"><style>${css}</style></head><body>${fragment}</body></html>`;
    const encoded=content.replaceAll('&','&amp;').replaceAll('"','&quot;').replaceAll('<','&lt;').replaceAll('>','&gt;');
    res.writeHead(200,{'Content-Type':types['.html']});res.end(`<html><body style="margin:0"><iframe sandbox="allow-scripts" title="${id}" style="width:100%;height:1250px;border:0" srcdoc="${encoded}"></iframe></body></html>`);return;
   }
   let file;
   if(pathname==='/visualize.css')file=path.join(workspaceRoot,'shared/Part_3-Outer-Look-Shell/visualize.css');
   else if(pathname.startsWith('/vendor/')||pathname.startsWith('/node_modules/three/')){
    let relative=pathname.startsWith('/vendor/')?pathname.slice(8):pathname.slice('/node_modules/three/'.length);
    if(['three.module.js','three.core.js'].includes(relative))relative='build/'+relative;
    if(relative.startsWith('addons/'))relative='examples/jsm/'+relative.slice(7);
    file=inside(path.join(workspaceRoot,'node_modules/three'),relative);
   }else if(pathname.startsWith('/@workspace/')){
    const relative=pathname.slice(12);if(relative.split('/').some(p=>['node_modules','history','.git'].includes(p))){res.writeHead(403);res.end();return;}
    file=inside(workspaceRoot,relative);
   }else{
    const target=pathname==='/'?object.entry:object.resources[pathname.slice(1)];
    if(!target)throw Error('Unknown resource');
    if(/\.(mjs|js)$/.test(target)){res.writeHead(302,{Location:'/@workspace/'+target});res.end();return;}
    file=inside(workspaceRoot,target);
   }
   const type=types[path.extname(file)];if(!type)throw Error('Unsupported resource');
   const body=await fs.readFile(file);res.writeHead(200,{'Content-Type':type,'Cache-Control':'no-store'});res.end(req.method==='HEAD'?undefined:body);
  }catch{res.writeHead(404);res.end('Not found');}
 });
 server.listen(object.port,'127.0.0.1',()=>console.log(`${id}: http://127.0.0.1:${object.port}/`));return server;
}
