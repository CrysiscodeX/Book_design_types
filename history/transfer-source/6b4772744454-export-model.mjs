import {resourceURL} from '../../../../shared/Part_2-Connectors/resources.mjs';
import fs from 'node:fs/promises';
import {buildModel} from '../Part_1-Engine-Root/geometry.mjs';
import {CATALOG,DEMO} from '../Part_1-Engine-Root/design.mjs';
for(const rank of CATALOG.ranks){const model=buildModel({...DEMO,rank:rank.id});await fs.writeFile(resourceURL('book-'+rank.id+'.json',import.meta.url),JSON.stringify(model.solidJSON()));model.dispose();}
console.log('Exported three closed Three.js solid assemblies. Offline labels use a portable pixel font; studio exports retain canvas typography.');
