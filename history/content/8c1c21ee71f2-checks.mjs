import {resourceURL} from '../../../../shared/Part_2-Connectors/resources.mjs';
import * as T from 'three';
import fs from 'node:fs/promises';
import {createWizardBook} from '../Part_1-Engine-Root/book.mjs';
import {auditGeometry} from './audit.mjs';
const book=createWizardBook(T),reports=[],cache=new Map();
for(const part of book.parts.values()){
  let report=cache.get(part.mesh.geometry);if(!report){report=auditGeometry(part.mesh.geometry);cache.set(part.mesh.geometry,report);}reports.push({id:part.id,...report});
}
const bad=reports.filter(r=>!r.passed);console.log(JSON.stringify({meshes:reports.length,unique:cache.size,failed:bad},null,2));
await fs.writeFile(resourceURL('solid-results.json',import.meta.url),JSON.stringify({generated:new Date().toISOString(),passed:!bad.length,reports},null,2));book.dispose();if(bad.length)process.exitCode=1;
