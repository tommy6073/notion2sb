import * as fs from 'fs';
import * as readline from 'readline';
import { Readable } from 'stream';
import md2sb from 'md2sb';
import { convertCallout, convertGyazo, convertMath, convertTitle } from './converter';
import { extractImageName } from './extractor';

export const notion2sb = async (pagePath: string): Promise<string> => {
  let page!: string;

  try {
    page = fs.readFileSync(pagePath).toString();
  } catch (e: any) {
    throw new Error(`Reading Notion page Markdown file failed: ${e.message}`);
  }

  page = convertTitle(page);
  page = convertCallout(page);
  page = convertMath(page);

  page = await md2sb(page);

  const rl = readline.createInterface({
    input: Readable.from(page),
  });

  let result = '';

  for await (const line of rl) {
    let convertedLine = `${line}\n`;

    const img = extractImageName(line);
    if (img) {
      try {
        convertedLine = await convertGyazo(pagePath, img);
      } catch (e: any) {
        throw new Error(`Gyazo conversion failed: ${e.message}`);
      }
    }

    result += convertedLine;
  }

  return result;
}
