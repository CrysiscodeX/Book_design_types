import {resourceURL} from '../../../../shared/Part_2-Connectors/resources.mjs';
import {chromium} from '@playwright/test';
import fs from 'node:fs/promises';
const browser=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true,args:['--enable-webgl','--ignore-gpu-blocklist']}),page=await browser.newPage({viewport:{width:1920,height:1080},deviceScaleFactor:1});
await page.goto('http://127.0.0.1:4194/?embed=1');await page.waitForFunction(()=>document.getElementById('study')?.grimoire,{timeout:90000});
const performance=[];for(const mode of ['orbit','turn','close']){const r=await page.evaluate(mode=>document.getElementById('study').grimoire.benchmark(mode==='orbit'?120:80,mode),mode);performance.push(r);console.log(JSON.stringify(r));}
await fs.writeFile(resourceURL('performance-results.json',import.meta.url),JSON.stringify({generated:new Date().toISOString(),performance},null,2));await browser.close();
