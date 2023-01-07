/// <reference path="./types.d.ts" />
import * as readline from 'readline';
import * as fs from 'fs';
import { Readable } from 'stream';
import Gyazo from 'gyazo-api';
import md2sb from 'md2sb';

const pageName = 'Top page c13012c4a1f64bc69ef90874222212a6';
const gyazoClient = new Gyazo(process.env.GYAZO_ACCESS_TOKEN);

const main = async () => {
  let page = fs.readFileSync(`testdata/${pageName}.md`).toString();

  page = callout(page);
  page = math(page);

  const md2sbPage = await md2sb(page);

  const rl = readline.createInterface({
    input: Readable.from(md2sbPage),
  });

  let result = '';
  for await (const line of rl) {
    const gyazoLine = await gyazo(line);
    if (gyazoLine) {
      result += `${gyazoLine}\n`;
      continue;
    }

    result += `${line}\n`;
  }

  console.log(result);
}

function callout(page: string): string {
  return page.replaceAll(/(<aside>|<\/aside>)/g, '');
}

function math(page: string): string {
  return page.replaceAll(/\$(.+)\$/g, '\[\$ $1\]');
}

async function gyazo(line: string): Promise<string | null> {
  const re = new RegExp(`\\[(${encodeURI(pageName)}\\/.*\\.(jpg|jpeg|png|gif|JPG|JPEG|PNG|GIF))\\]`);
  const imageLink = line.match(re);

  if (imageLink) {
    const imagePath = decodeURI(imageLink[1]);
    const res = await gyazoClient.upload(`testdata/${imagePath}`);
    const gyazoImageURL = res.data.permalink_url;

    return `${gyazoImageURL}`;
  }

  return null;
}

main();
