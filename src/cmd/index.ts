#!/usr/bin/env node

import { notion2sb } from '../notion2sb';

const main = async () => {
  if (process.argv.length < 3) {
    console.error('You must specify Notion page Markdown file path to convert');
    process.exit(1);
  }

  const pagePath = process.argv[2];

  try {
   const convertedPage = await notion2sb(pagePath);
   console.log(convertedPage);
  } catch (e: any) {
    console.error(e.message);
    process.exit(1);
  }
}

main();
