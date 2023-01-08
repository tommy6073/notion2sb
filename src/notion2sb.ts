import * as fs from 'fs';
import * as converter from './converter';
import * as readline from 'readline';
import { Readable } from 'stream';
import path from 'path';
import md2sb from 'md2sb';

export const notion2sb = async (pagePath: string): Promise<string> => {
  let page!: string;
  try {
    page = fs.readFileSync(pagePath).toString();
  } catch (e: any) {
    throw new Error(`Reading Notion page Markdown file failed: ${e.message}`);
  }
  page = converter.title(page);
  page = converter.callout(page);
  page = converter.math(page);

  const md2sbPage = await md2sb(page);

  const rl = readline.createInterface({
    input: Readable.from(md2sbPage),
  });

  let result = '';
  for await (const line of rl) {
    let gyazoLine: string | null;
    try {
      gyazoLine = await converter.gyazo(line, path.dirname(pagePath));
    } catch (e: any) {
      throw new Error(`Gyazo conversion failed: ${e.message}`);
    }
    if (gyazoLine) {
      result += `${gyazoLine}\n`;
      continue;
    }

    result += `${line}\n`;
  }

  return result;
}
