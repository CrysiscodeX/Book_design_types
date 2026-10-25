import fs from 'node:fs/promises';
const root=new URL('../',import.meta.url);
const catalog=JSON.parse(await fs.readFile(new URL('planning/design-system-v02.json',root),'utf8'));
await fs.writeFile(new URL('models/shared/catalog.mjs',root),'// Generated from planning/design-system-v02.json.\nexport const CATALOG = '+JSON.stringify(catalog)+';\n');
