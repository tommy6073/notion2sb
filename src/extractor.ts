export function convertImage(line: string): string | null {
  const re = new RegExp(`\\[(.+\\.(jpg|jpeg|png|gif|JPG|JPEG|PNG|GIF))]`);
  const imageLink = line.match(re);
  return imageLink ? decodeURI(imageLink[1]) : null;
}
