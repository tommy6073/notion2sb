/// <reference path="./types.d.ts" />
import * as readline from 'readline';
import * as fs from 'fs';
import { Readable } from 'stream';
import Gyazo from 'gyazo-api';
import md2sb from 'md2sb';

const gyazoClient = new Gyazo(process.env.GYAZO_ACCESS_TOKEN);

const main = async () => {
  const pageName = 'Top page c13012c4a1f64bc69ef90874222212a6';
  const md2sbPage = await md2sb(fs.readFileSync(`${pageName}.md`));

  const rl = readline.createInterface({
    input: Readable.from(md2sbPage),
  });

  let result = '';
  for await (const line of rl) {
    const re = new RegExp(`\\[(${encodeURI(pageName)}\\/.*\\.(jpg|jpeg|png|gif|JPG|JPEG|PNG|GIF))\\]`);
    const imageLink = line.match(re);
    if (imageLink) {
      const imagePath = decodeURI(imageLink[1]);
      const res = await gyazoClient.upload(imagePath);
      const gyazoImageURL = res.data.permalink_url;
      result += `[${gyazoImageURL}]\n`;
    } else {
      result += `${line}\n`;
    }
  }

  console.log(result);
}

main();
