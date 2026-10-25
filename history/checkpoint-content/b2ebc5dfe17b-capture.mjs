import {chromium} from '@playwright/test';
import fs from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
const dir=fileURLToPath(new URL('./screenshots/',import.meta.url));await fs.mkdir(dir,{recursive:true});
const browser=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true,args:['--enable-webgl','--ignore-gpu-blocklist']}),page=await browser.newPage({viewport:{width:1600,height:1100},deviceScaleFactor:1}),errors=[];
page.on('pageerror',e=>{errors.push(e.message);console.log('PAGE ERROR',e.message);});page.on('console',m=>{if(m.type()==='error'){errors.push(m.text());console.log(m.text().slice(0,300));}});
await page.goto('http://127.0.0.1:4194/');await page.waitForFunction(()=>document.getElementById('study')?.grimoire,{timeout:90000});
if(process.argv.includes('--turnin-only')){await page.evaluate(()=>{const a=document.getElementById('study').grimoire;a.bookmark('turnin');a.setDisplay('clay','neutral');});await page.locator('[data-viewport]').screenshot({path:dir+'detail-turnin.png'});await browser.close();process.exit(0);}
await page.evaluate(()=>{const a=document.getElementById('study').grimoire;a.setPose({opening:0,turn:0,release:0});a.setDisplay('material','studio');a.setView('hero');});
await page.locator('[data-viewport]').screenshot({path:dir+'closed.png'});
await page.evaluate(()=>{const a=document.getElementById('study').grimoire;a.setPose({opening:130,turn:0});a.setView('hero');});
await page.locator('[data-viewport]').screenshot({path:dir+'open.png'});
if(!process.argv.includes('--quick')){
  for(const view of ['front','rear','side','underside']){await page.evaluate(v=>document.getElementById('study').grimoire.setView(v),view);await page.locator('[data-viewport]').screenshot({path:dir+view+'.png'});}
  await page.evaluate(()=>{const a=document.getElementById('study').grimoire;a.setPose({opening:130,turn:.5});a.setView('hero');});await page.locator('[data-viewport]').screenshot({path:dir+'mid-turn.png'});
  for(const detail of ['corner','turnin','joint','head','fold','edge','clasp','repair','gutter','underside']){await page.evaluate(n=>{const a=document.getElementById('study').grimoire;a.bookmark(n);a.setDisplay('clay',n==='turnin'?'neutral':'grazing');},detail);await page.locator('[data-viewport]').screenshot({path:dir+'detail-'+detail+'.png'});}
  for(let i=0;i<6;i++){await page.evaluate(i=>{const a=document.getElementById('study').grimoire;a.setPose({opening:130,turn:0,leaf:[24,60,104,144,188,232][i]});a.setDisplay('material','neutral');a.setView('front');},i);await page.locator('[data-viewport]').screenshot({path:dir+'spread-'+(i+1)+'.png'});}
  for(const light of ['neutral','grazing']){await page.evaluate(light=>{const a=document.getElementById('study').grimoire;a.bookmark('corner');a.setDisplay('material',light);},light);await page.locator('[data-viewport]').screenshot({path:dir+'material-'+light+'.png'});}
  await fs.mkdir(new URL('artwork/',import.meta.url),{recursive:true});const artwork=await page.evaluate(()=>document.getElementById('study').grimoire.art.canvases.map(c=>c.toDataURL('image/png').split(',')[1]));for(let i=0;i<artwork.length;i++)await fs.writeFile(new URL('artwork/page-'+String(i+1).padStart(2,'0')+'.png',import.meta.url),Buffer.from(artwork[i],'base64'));
  await page.evaluate(()=>{const a=document.getElementById('study').grimoire;a.setPose({opening:0,turn:0,release:0});a.setView('hero');a.setDisplay('material','studio');});await page.screenshot({path:dir+'interface.png',fullPage:true});
  const swatches=await browser.newPage({viewport:{width:1500,height:900},deviceScaleFactor:1});await swatches.goto('http://127.0.0.1:4194/material-study.html');await swatches.waitForFunction(()=>window.materialStudy);await swatches.screenshot({path:dir+'material-swatches.png'});await swatches.close();
}
console.log(JSON.stringify({errors,metrics:await page.evaluate(()=>{const a=document.getElementById('study').grimoire;return {parts:a.book.parts.size,render:a.renderer.info.render,budget:a.book.budget};})},null,2));
await fs.writeFile(new URL('capture-errors.json',import.meta.url),JSON.stringify(errors,null,2));await browser.close();if(errors.length)process.exitCode=1;
