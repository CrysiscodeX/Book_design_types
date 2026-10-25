import fs from 'node:fs/promises';
const names=['specification.mjs','geometry.mjs','materials.mjs','content.mjs','book.mjs'];
let source='';for(const name of names){let s=await fs.readFile(new URL(name,import.meta.url),'utf8');s=s.replace(/^import .*;\r?\n/gm,'').replace(/^export /gm,'');source+='\n'+s;}
const template=await fs.readFile(new URL('inline-template.html',import.meta.url),'utf8'),fragment=template.replace('/* ASSEMBLY_SOURCE */',source);
if(Buffer.byteLength(fragment)>1e6)throw Error('Inline fragment exceeds 1 MB');
const output='C:/Users/Andre.Olivier/.codex/visualizations/2026/10/09/01a120d1-0d41-7fc2-9908-c54bc792023f/wizard-grimoire-study.html';await fs.writeFile(output,fragment);console.log(JSON.stringify({output,bytes:Buffer.byteLength(fragment)}));
// Browser-only test wrapper mirrors the skill's sandbox when Python is unavailable.
const assets='C:/Users/Andre.Olivier/.codex/plugins/cache/openai-bundled/visualize/1.0.55/skills/visualize/assets/';
const css=await fs.readFile(assets+'visualize.css','utf8'),kit=await fs.readFile(assets+'visualize.html','utf8'),bridge=await fs.readFile(assets+'standalone-host-bridge.js','utf8');
const csp="default-src 'none'; script-src 'unsafe-inline' 'unsafe-eval' https://esm.sh https://cdn.jsdelivr.net https://cdnjs.cloudflare.com https://unpkg.com; style-src 'unsafe-inline' https://fonts.googleapis.com; img-src data: blob:; font-src data: https://fonts.gstatic.com; connect-src data: blob:; frame-src 'none'; object-src 'none'";
const frame='<!doctype html><html lang="en" data-visualize-standalone><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta http-equiv="Content-Security-Policy" content="'+csp+'"><style>'+css+'</style></head><body><script type="application/json" id="codex-visualization-widget-state">{}</script><script>'+bridge.replaceAll('</script','<\\/script')+'</script>'+kit.replace('<!--__INLINE_VISUALIZATION_FRAGMENT__-->',fragment)+'</body></html>';
const encoded=frame.replaceAll('&','&amp;').replaceAll('"','&quot;').replaceAll('<','&lt;').replaceAll('>','&gt;');
await fs.writeFile(new URL('inline-test.html',import.meta.url),'<!doctype html><html><head><meta name="viewport" content="width=device-width,initial-scale=1"><style>body{margin:0}iframe{border:0;width:100%;height:720px}</style></head><body><iframe sandbox="allow-scripts" srcdoc="'+encoded+'" title="Sandboxed inline grimoire"></iframe></body></html>');
