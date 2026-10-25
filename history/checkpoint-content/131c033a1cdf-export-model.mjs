import fs from 'node:fs/promises';
import {buildModel} from '../../models/threejs/geometry.mjs';
import {CATALOG,DEMO} from '../../models/shared/design.mjs';
for(const rank of CATALOG.ranks){const model=buildModel({...DEMO,rank:rank.id});await fs.writeFile(new URL('book-'+rank.id+'.json',import.meta.url),JSON.stringify(model.solidJSON()));model.dispose();}
console.log('Exported three closed Three.js solid assemblies. Offline labels use a portable pixel font; studio exports retain canvas typography.');
