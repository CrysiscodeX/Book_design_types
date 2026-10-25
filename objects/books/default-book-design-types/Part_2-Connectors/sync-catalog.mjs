import {resourceURL} from '../../../../shared/Part_2-Connectors/resources.mjs';
import fs from 'node:fs/promises';
const root=resourceURL('../',import.meta.url);
const catalog=JSON.parse(await fs.readFile(resourceURL('planning/design-system-v02.json',root),'utf8'));
await fs.writeFile(resourceURL('models/shared/catalog.mjs',root),'// Generated from planning/design-system-v02.json.\nexport const CATALOG = '+JSON.stringify(catalog)+';\n');
