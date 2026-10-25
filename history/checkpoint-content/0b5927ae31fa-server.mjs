import http from 'node:http';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const root = path.dirname(fileURLToPath(import.meta.url));
const types = { '.html':'text/html; charset=utf-8', '.mjs':'text/javascript; charset=utf-8', '.js':'text/javascript; charset=utf-8', '.css':'text/css; charset=utf-8', '.json':'application/json; charset=utf-8', '.svg':'image/svg+xml', '.png':'image/png', '.md':'text/plain; charset=utf-8' };
http.createServer(async (req,res) => {
  try {
    const name=decodeURIComponent(new URL(req.url,'http://localhost').pathname);
    if(name==='/favicon.ico'){res.writeHead(204);res.end();return;}
    const file=path.resolve(root,name==='/'?'index.html':name.slice(1));
    const relative=path.relative(root,file);
    if(relative.startsWith('..') || path.isAbsolute(relative)) throw Error('Invalid path');
    const data=await fs.readFile(file);
    res.writeHead(200,{'Content-Type':types[path.extname(file)]||'application/octet-stream','Cache-Control':'no-store'});res.end(data);
  } catch {res.writeHead(404);res.end('Not found');}
}).listen(4194,'127.0.0.1',()=>console.log('Wizard grimoire: http://127.0.0.1:4194/'));
