import Gyazo from 'gyazo-api';

const gyazoClient = new Gyazo(process.env.GYAZO_ACCESS_TOKEN);

export function title(page: string): string {
  return page.replace(/^# (.+)$/m, '$1');
}

export function callout(page: string): string {
  return page.replaceAll(/(<aside>|<\/aside>)/g, '');
}

export function math(page: string): string {
  return page.replaceAll(/\$(.+)\$/g, '\[\$ $1\]');
}

export async function gyazo(line: string, exportDir: string): Promise<string | null> {
  const re = new RegExp(`\\[(.+\\.(jpg|jpeg|png|gif|JPG|JPEG|PNG|GIF))]`);
  const imageLink = line.match(re);

  if (imageLink) {
    const imagePath = decodeURI(imageLink[1]);
    const res = await gyazoClient.upload(`${exportDir}/${imagePath}`);
    const gyazoImageURL = res.data.permalink_url;

    return `[${gyazoImageURL}]`;
  }

  return null;
}
