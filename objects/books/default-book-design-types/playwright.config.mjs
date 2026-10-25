import {defineConfig} from '@playwright/test';
import fs from 'node:fs';
const installed=['C:/Program Files/Google/Chrome/Application/chrome.exe','C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'].find(p=>fs.existsSync(p));
export default defineConfig({testDir:'./checks',testMatch:'studio.spec.mjs',timeout:180000,workers:1,use:{baseURL:'http://127.0.0.1:4174',viewport:{width:1500,height:1100},launchOptions:{...(installed?{executablePath:installed}:{}),args:['--enable-unsafe-swiftshader']},acceptDownloads:true},webServer:{command:'npm run start',url:'http://127.0.0.1:4174',reuseExistingServer:true,timeout:30000},reporter:[['list'],['json',{outputFile:'checks/browser-results.json'}]]});
