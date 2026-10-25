import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import assert from 'node:assert/strict';
import {workspaceRoot} from '../shared/Part_2-Connectors/resources.mjs';
import {verifyHistory} from './history.mjs';
const read=p=>JSON.parse(fs.readFileSync(path.join(workspaceRoot,p),'utf8'));
const sha=b=>crypto.createHash('sha256').update(b).digest('hex');
export function verifyTransfer(){
 const transfer=read('history/transfer-manifest.json'),checkpoint=read('history/checkpoint-books.json'),baseline=read('history/transfer-source-bytes.json');
 for(const record of [...checkpoint.files,...baseline.files]){assert.equal(sha(fs.readFileSync(path.join(workspaceRoot,record.destination))),record.sha256,record.original||record.source);}
 const reports=[];
 for(const file of ['history/conversations/ranked-covers.json','history/conversations/related-books.json']){
  const record=read(file),messages=record.turns.flatMap(t=>t.messages);for(const message of messages){assert.ok(['user','assistant'].includes(message.role));assert.equal(typeof message.text,'string');assert.ok(!Object.hasOwn(message,'analysis'));}
  reports.push({file,turns:record.turns.length,messages:messages.length});
 }
 const attachments=read('history/conversations/attachments.json');for(const image of attachments)assert.equal(sha(fs.readFileSync(path.join(workspaceRoot,image.path))),image.sha256);
 const combined=read('conversation/messages.json');const messages=Array.isArray(combined)?combined:combined.messages;assert.ok(Array.isArray(messages)&&messages.length>0);assert.equal(new Set(messages.map(m=>m.id)).size,messages.length);for(const message of messages){assert.ok(['user','assistant'].includes(message.role));assert.equal(sha(Buffer.from(message.text)),message.sha256,message.id);}
 assert.match(fs.readFileSync(path.join(workspaceRoot,'.gitattributes'),'utf8'),/^\* -text$/m);
 const bound=fs.readFileSync(path.join(workspaceRoot,'objects/books/bound-open-book/Part_1-Engine-Root/bound-book.mjs'));
 const report={date:'2026-10-25',timezone:'Asia/Dubai',passed:true,copiedSourceRecords:transfer.files.length,immutableSourceFiles:baseline.files.length,checkpointEntries:checkpoint.files.length,historicalSnapshots:verifyHistory(),publicArchives:reports,canonicalPublicMessages:messages.length,messageHashes:'All match; unique message IDs',gitBytePreservation:'Text normalization disabled for all files',attachmentAndContextImages:attachments.length,boundOpenBookSHA256:sha(bound),limits:'Source bytes, scoped public-message structure and attachments; no new artistic or fabrication certification.'};
 fs.mkdirSync(path.join(workspaceRoot,'checks'),{recursive:true});fs.writeFileSync(path.join(workspaceRoot,'checks/migration-integrity.json'),JSON.stringify(report,null,2)+'\n');console.log(JSON.stringify(report));return report;
}
if(process.argv[1]&&path.resolve(process.argv[1])===path.resolve(new URL(import.meta.url).pathname.replace(/^\/(\w:)/,'$1')))verifyTransfer();
