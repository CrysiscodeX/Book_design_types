import fs from 'node:fs/promises';
import path from 'node:path';
import {spawnSync} from 'node:child_process';
import {fileURLToPath,pathToFileURL} from 'node:url';
import {workspaceRoot,resources,objectById} from '../shared/Part_2-Connectors/resources.mjs';
import {protectActiveHistory,compactHistory} from './history.mjs';

export async function buildObject(id){
 const o=objectById(id);if(!o.bundle)return;
 let source='';
 const recipeURL=o.bundle.recipe?pathToFileURL(path.join(workspaceRoot,o.bundle.recipe)):null;
 const inputs=recipeURL?(await import(recipeURL.href)).inlineSources.map(name=>fileURLToPath(new URL(name,recipeURL))):o.bundle.sources.map(name=>path.join(workspaceRoot,o.resources[name]));
 for(const input of inputs){
  let text=await fs.readFile(input,'utf8');
  text=text.replace(/^import .*;\r?\n/gm,'').replace(/^export /gm,'');source+='\n'+text;
 }
 let fragment;
 if(id==='wizard-grimoire'){
  const template=await fs.readFile(path.join(workspaceRoot,o.resources['inline-template.html']),'utf8');fragment=template.replace('/* ASSEMBLY_SOURCE */',source);
 }else{
  const controls=await fs.readFile(path.join(workspaceRoot,o.resources[id==='dragon-wing-bookcase'?'fragment.html':'controls.html']),'utf8');
  fragment=controls+'\n<script type="module">\n'+source+`\ntry {const THREE=await import("https://cdn.jsdelivr.net/npm/three@${o.bundle.three}/build/three.module.js");${o.bundle.factory}(THREE,document.getElementById("${o.bundle.rootId}"));}catch(error){const status=document.querySelector('[data-status]');if(status)status.textContent="The 3D view could not start: "+error.message;throw error;}\n</script>\n`;
 }
 if(Buffer.byteLength(fragment)>1e6)throw Error(id+': inline fragment exceeds 1 MB');
 const output=path.join(workspaceRoot,o.inline);await fs.mkdir(path.dirname(output),{recursive:true});await fs.writeFile(output,fragment);
 if(process.env.INLINE_OUTPUT_DIR){const external=path.resolve(process.env.INLINE_OUTPUT_DIR);await fs.mkdir(external,{recursive:true});await fs.writeFile(path.join(external,id+'.html'),fragment);}
 const css=await fs.readFile(path.join(workspaceRoot,'shared/Part_3-Outer-Look-Shell/visualize.css'),'utf8');
 if(id==='wizard-grimoire'){
  const kit=await fs.readFile(path.join(workspaceRoot,'shared/Part_3-Outer-Look-Shell/visualize.html'),'utf8'),bridge=await fs.readFile(path.join(workspaceRoot,'shared/Part_3-Outer-Look-Shell/standalone-host-bridge.js'),'utf8');
  const csp="default-src 'none'; script-src 'unsafe-inline' 'unsafe-eval' https://esm.sh https://cdn.jsdelivr.net https://cdnjs.cloudflare.com https://unpkg.com; style-src 'unsafe-inline' https://fonts.googleapis.com; img-src data: blob:; font-src data: https://fonts.gstatic.com; connect-src data: blob:; frame-src 'none'; object-src 'none'";
  const frame='<!doctype html><html lang="en" data-visualize-standalone><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta http-equiv="Content-Security-Policy" content="'+csp+'"><style>'+css+'</style></head><body><script type="application/json" id="codex-visualization-widget-state">{}</script><script>'+bridge.replaceAll('</script','<\\/script')+'</script>'+kit.replace('<!--__INLINE_VISUALIZATION_FRAGMENT__-->',fragment)+'</body></html>';
  const encoded=frame.replaceAll('&','&amp;').replaceAll('"','&quot;').replaceAll('<','&lt;').replaceAll('>','&gt;');
  await fs.writeFile(path.join(workspaceRoot,o.resources['inline-test.html']),'<html><body style="margin:0"><iframe sandbox="allow-scripts" style="border:0;width:100%;height:720px" srcdoc="'+encoded+'" title="Sandboxed inline grimoire"></iframe></body></html>');
 }else if(o.resources['inline-preview.html'])await fs.writeFile(path.join(workspaceRoot,o.resources['inline-preview.html']),`<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><style>${css}\nbody{margin:0;padding:20px}main{max-width:1050px;margin:auto}[data-stage]{height:620px}@media(max-width:600px){body{padding:12px}[data-stage]{height:380px}}</style></head><body><main>${fragment}</main></body></html>`);
 console.log('Built '+id+' embedded preview.');
}
export async function buildAll(excluded=[]){
 protectActiveHistory();
 for(const o of resources.objects){
  if(excluded.includes(o.id))continue;
  if(o.bundle)await buildObject(o.id);
  const pkgPath=path.join(workspaceRoot,o.path,'package.json');
  try{const pkg=JSON.parse(await fs.readFile(pkgPath,'utf8'));for(const key of ['sync:catalog','drawings','export:model','documents'])if(pkg.scripts[key]){const run=spawnSync(process.execPath,pkg.scripts[key].replace(/^node\s+/,'').split(/\s+/),{cwd:path.dirname(pkgPath),stdio:'inherit',windowsHide:true});if(run.status!==0)throw Error(o.id+': '+key+' failed');}}catch(error){if(error.code!=='ENOENT')throw error;}
 }
 compactHistory();
}
if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url)){if(process.argv[2]&&!process.argv[2].startsWith('--'))await buildObject(process.argv[2]);else await buildAll(process.argv.filter(a=>a.startsWith('--exclude=')).map(a=>a.slice(10)));}
