import Gyazo from 'gyazo-api';
import path from 'path';

const gyazoClient = new Gyazo(process.env.GYAZO_ACCESS_TOKEN);

export function convertTitle(page: string): string {
  return page.replace(/^# (.+)$/m, '$1');
}

export function convertCallout(page: string): string {
  return page.replaceAll(/(<aside>|<\/aside>)/g, '');
}

export function convertMath(page: string): string {
  return page.replaceAll(/\$(.+)\$/g, '\[\$ $1\]');
}

export async function convertGyazo(pagePath: string, img: string): Promise<string> {
  let res!: any;
  try {
    res = await gyazoClient.upload(`${path.dirname(pagePath)}/${img}`);
  } catch (e: any) {
    throw new Error(`upload failed: ${e}`);
  }
  const gyazoImageURL = res.data.permalink_url;

  return `[${gyazoImageURL}]\n`;
}
