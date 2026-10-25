import http from 'node:http';
import fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root=fileURLToPath(new URL('../../',import.meta.url));
const mime={'.html':'text/html; charset=utf-8','.mjs':'text/javascript; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.svg':'image/svg+xml','.png':'image/png','.json':'application/json','.md':'text/plain; charset=utf-8','.csv':'text/csv; charset=utf-8'};
http.createServer(async(req,res)=>{try{let requested=decodeURIComponent(new URL(req.url,'http://localhost').pathname);if(requested==='/')requested='/models/threejs/index.html';const file=path.resolve(root,'.'+requested),relative=path.relative(root,file);if(relative.startsWith('..')||path.isAbsolute(relative)||relative.split(path.sep).some(p=>p.startsWith('.'))){res.writeHead(403);res.end('Forbidden');return;}const data=await fs.readFile(file);res.writeHead(200,{'Content-Type':mime[path.extname(file)]||'application/octet-stream','Cache-Control':'no-store'});res.end(data);}catch{res.writeHead(404);res.end('Not found');}}).listen(Number(process.env.PORT||4174),'127.0.0.1',()=>console.log('Book studio: http://127.0.0.1:4174'));
