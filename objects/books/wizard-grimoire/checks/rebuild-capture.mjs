import {chromium} from '@playwright/test';
import fs from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
const dir=fileURLToPath(new URL('../exports/screenshots/v2/',import.meta.url));await fs.mkdir(dir,{recursive:true});
const browser=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true,args:['--enable-webgl','--ignore-gpu-blocklist']}),page=await browser.newPage({viewport:{width:1540,height:1040},deviceScaleFactor:1}),errors=[];
page.on('pageerror',e=>{errors.push(e.message);console.log('ERROR',e.message);});
await page.goto('http://127.0.0.1:4194/');await page.waitForFunction(()=>document.getElementById('study')?.grimoire,{timeout:90000});
for(const[name,opening,turn,view]of [['closed',0,0,'hero'],['open',130,0,'hero'],['head',130,0,'front'],['spine',130,0,'rear'],['turn',130,.5,'hero'],['underside',130,0,'underside']]){await page.evaluate(({opening,turn,view})=>{const a=document.getElementById('study').grimoire;a.setPose({opening,turn,release:opening?1:0});a.setDisplay('material','neutral');a.setView(view);},{opening,turn,view});await page.locator('[data-viewport]').screenshot({path:dir+name+'.png'});}
for(const name of ['head','hollow','corner','joint','turnin','fold','clasp','gutter','repair']){await page.evaluate(name=>{const a=document.getElementById('study').grimoire;a.bookmark(name);a.setDisplay('material','neutral');},name);await page.locator('[data-viewport]').screenshot({path:dir+'detail-'+name+'.png'});}
for(const name of ['head','hollow','corner','joint']){await page.evaluate(name=>{const a=document.getElementById('study').grimoire;a.bookmark(name);a.setDisplay('clay','grazing');},name);await page.locator('[data-viewport]').screenshot({path:dir+'clay-'+name+'.png'});}
for(let i=0;i<6;i++){await page.evaluate(i=>{const a=document.getElementById('study').grimoire;a.setPose({opening:130,leaf:[24,60,104,144,188,232][i],turn:0});a.setAssembly('assembled');a.setDisplay('material','neutral');a.setView('hero');},i);await page.locator('[data-viewport]').screenshot({path:dir+'spread-'+(i+1)+'.png'});}
const materials=await browser.newPage({viewport:{width:1500,height:900}});await materials.goto('http://127.0.0.1:4194/material-study.html');await materials.waitForFunction(()=>window.materialStudy);await materials.screenshot({path:dir+'material-swatches.png'});await materials.close();
await fs.writeFile(new URL('rebuild-browser-errors.json',import.meta.url),JSON.stringify(errors,null,2));console.log('CAPTURE',errors);await browser.close();if(errors.length)process.exitCode=1;
