#!/usr/bin/env node

import * as readline from 'readline';
import * as fs from 'fs';
import { Readable } from 'stream';
import path from 'path';
import md2sb from 'md2sb';
import { callout, gyazo, math, title } from './converter';

const main = async () => {
  const pagePath = process.argv[2];

  let page = fs.readFileSync(pagePath).toString();
  page = title(page);
  page = callout(page);
  page = math(page);

  const md2sbPage = await md2sb(page);

  const rl = readline.createInterface({
    input: Readable.from(md2sbPage),
  });

  let result = '';
  for await (const line of rl) {
    const gyazoLine = await gyazo(line, path.dirname(pagePath));
    if (gyazoLine) {
      result += `${gyazoLine}\n`;
      continue;
    }

    result += `${line}\n`;
  }

  console.log(result);
}

main();
