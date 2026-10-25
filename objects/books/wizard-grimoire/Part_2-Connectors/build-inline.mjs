import fs from 'node:fs/promises';
import path from 'node:path';
import {inlineSources} from './inline-recipe.mjs';
export async function buildGrimoireInline(){let source='';for(const name of inlineSources){let text=await fs.readFile(new URL(name,import.meta.url),'utf8');text=text.replace(/^import .*;\r?\n/gm,'').replace(/^export /gm,'');source+='\n'+text;}
  const template=await fs.readFile(new URL('../Part_3-Outer-Look-Shell/inline-template.html',import.meta.url),'utf8'),fragment=template.replace('/* ASSEMBLY_SOURCE */',source);
  if(Buffer.byteLength(fragment)>1e6)throw Error('Inline source exceeds 1 MB.');await fs.writeFile(new URL('../exports/inline-fragment.html',import.meta.url),fragment);
  if(process.env.INLINE_OUTPUT_DIR){await fs.mkdir(process.env.INLINE_OUTPUT_DIR,{recursive:true});await fs.writeFile(path.join(process.env.INLINE_OUTPUT_DIR,'wizard-grimoire.html'),fragment);}
  const root=new URL('../../../../',import.meta.url),css=await fs.readFile(new URL('shared/Part_3-Outer-Look-Shell/visualize.css',root),'utf8'),kit=await fs.readFile(new URL('shared/Part_3-Outer-Look-Shell/visualize.html',root),'utf8'),bridge=await fs.readFile(new URL('shared/Part_3-Outer-Look-Shell/standalone-host-bridge.js',root),'utf8');
  const csp="default-src 'none'; script-src 'unsafe-inline' 'unsafe-eval' https://esm.sh https://cdn.jsdelivr.net https://cdnjs.cloudflare.com https://unpkg.com; style-src 'unsafe-inline'; img-src data: blob:; connect-src data: blob:; frame-src 'none'; object-src 'none'";
  const frame='<!doctype html><html data-visualize-standalone><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta http-equiv="Content-Security-Policy" content="'+csp+'"><style>'+css+'</style><body><script type="application/json" id="codex-visualization-widget-state">{}</script><script>'+bridge.replaceAll('</script','<\\/script')+'</script>'+kit.replace('<!--__INLINE_VISUALIZATION_FRAGMENT__-->',fragment)+'</body></html>',encoded=frame.replaceAll('&','&amp;').replaceAll('"','&quot;').replaceAll('<','&lt;').replaceAll('>','&gt;');
  await fs.writeFile(new URL('../Part_3-Outer-Look-Shell/inline-test.html',import.meta.url),'<html><body style="margin:0"><iframe sandbox="allow-scripts" style="border:0;width:100%;height:720px" srcdoc="'+encoded+'" title="Sandboxed inline grimoire"></iframe></body></html>');console.log('Built v2 hollow-back grimoire inline source: '+Buffer.byteLength(fragment)+' bytes.');return fragment;
}
if(process.argv[1]?.replaceAll('\\','/').endsWith('/build-inline.mjs'))await buildGrimoireInline();
