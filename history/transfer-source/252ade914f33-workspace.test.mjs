import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import http from 'node:http';
import crypto from 'node:crypto';
import {once} from 'node:events';
import {resourceURL,resources,workspaceRoot} from '../shared/Part_2-Connectors/resources.mjs';
import {serveObject} from '../shared/Part_2-Connectors/server.mjs';
import {restoreHistory,verifyHistory,protectHistoryFile,compactHistory} from './history.mjs';

test('historical snapshots reconstruct exactly and reject overwrite',()=>{
 const temp=fs.mkdtempSync(path.join(os.tmpdir(),'3d-history-test-')),output=path.join(temp,'restored');
 try{assert.equal(restoreHistory(output),verifyHistory());const entries=JSON.parse(fs.readFileSync(path.join(workspaceRoot,'history/snapshots.json'),'utf8'));for(const e of entries)assert.equal(crypto.createHash('sha256').update(fs.readFileSync(path.join(output,e.original))).digest('hex'),e.sha256);assert.throws(()=>restoreHistory(output),/must not exist/);assert.throws(()=>restoreHistory(path.join(workspaceRoot,'restore')),/outside/);}finally{assert.equal(path.dirname(temp),os.tmpdir());assert.ok(path.basename(temp).startsWith('3d-history-test-'));fs.rmSync(temp,{recursive:true});}
});
test('historical assets freeze before writes and deduplicate without changing source bytes',()=>{
 compactHistory();
 const entries=JSON.parse(fs.readFileSync(path.join(workspaceRoot,'history/snapshots.json'),'utf8')),entry=entries.find(e=>!e.destination.startsWith('history/')&&e.destination.includes('/references/'));assert.ok(entry);
 const before=fs.readFileSync(path.join(workspaceRoot,entry.destination));assert.ok(protectHistoryFile(entry.destination)>0);assert.equal(verifyHistory(),entries.length);assert.deepEqual(fs.readFileSync(path.join(workspaceRoot,entry.destination)),before);compactHistory();assert.equal(verifyHistory(),entries.length);
});
test('dynamic build resources follow relocated directories',()=>{
 const file=resources.files['default-book-design-types/drafts/svg/generate.mjs'];const base=resourceURL('../../',new URL('../'+file,import.meta.url));
 const output=resourceURL('exports/svg/initial-front.svg',base);assert.ok(fs.existsSync(output));
 assert.throws(()=>resourceURL('../../../../unowned-file',base),/Unknown workspace resource/);
});
test('local server serves relocated modules and blocks traversal and hidden files',async()=>{
 const o=resources.objects.find(o=>o.id==='default-table-design'),port=o.port;o.port=0;const server=serveObject(o.id);await once(server,'listening');const url='http://127.0.0.1:'+server.address().port;
 try{
  assert.equal((await fetch(url)).status,200);assert.equal((await fetch(url+'/models/threejs/viewer.mjs')).status,200);
  assert.equal((await fetch(url+'/.git/config')).status,403);assert.equal((await fetch(url,{method:'POST'})).status,405);
  const status=await new Promise((resolve,reject)=>{http.get(url+'/@workspace/%2e%2e/secret',r=>{r.resume();resolve(r.statusCode);}).on('error',reject);});assert.ok([403,404].includes(status));
 }finally{await new Promise(r=>server.close(r));o.port=port;}
});
