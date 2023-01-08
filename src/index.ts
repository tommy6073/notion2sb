/// <reference path="./types.d.ts" />
import * as readline from 'readline';
import * as fs from 'fs';
import { Readable } from 'stream';
import md2sb from 'md2sb';
import { callout, gyazo, math, title } from './converter';

const exportDir = 'testdata/Export-ae057c6e-6216-44b1-9354-7d127ac08e22';
const pageName = 'Sub page 1 731aae2b15064faca1cfdc564119e8a9.md';

const main = async () => {
  let page = fs.readFileSync(`${exportDir}/${pageName}`).toString();
  page = title(page);
  page = callout(page);
  page = math(page);

  const md2sbPage = await md2sb(page);

  const rl = readline.createInterface({
    input: Readable.from(md2sbPage),
  });

  let result = '';
  for await (const line of rl) {
    const gyazoLine = await gyazo(line, exportDir);
    if (gyazoLine) {
      result += `${gyazoLine}\n`;
      continue;
    }

    result += `${line}\n`;
  }

  console.log(result);
}

main();
