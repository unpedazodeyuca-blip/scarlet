import { execSync } from 'child_process';
import { readdirSync, statSync } from 'fs';
import { join } from 'path';

const zipFile = '/vercel/share/v0-project/v0-pagina-romantica-interactiva (1).zip';
const extractDir = '/vercel/share/v0-project/extracted';

execSync(`mkdir -p "${extractDir}"`);
execSync(`unzip -o "${zipFile}" -d "${extractDir}"`);

function listFiles(dir, depth = 0) {
  if (depth > 3) return;
  const items = readdirSync(dir);
  for (const item of items) {
    const fullPath = join(dir, item);
    const stat = statSync(fullPath);
    const prefix = '  '.repeat(depth);
    if (stat.isDirectory()) {
      console.log(`${prefix}${item}/`);
      listFiles(fullPath, depth + 1);
    } else {
      console.log(`${prefix}${item}`);
    }
  }
}

console.log('Extracted contents:');
listFiles(extractDir);
