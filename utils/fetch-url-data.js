import fetch from 'node-fetch';
import * as cheerio from 'cheerio';

export const fetchUrlData = async (url) => {
  const urlFetch = await fetch(url);
  const html = await urlFetch.text();
  const $ = cheerio.load(html);

  const title = $('title').text() || 'No title available';
  const description =
    $('meta[name="description"]').attr('content') ||
    $('meta[property="og:description"]').attr('content') ||
    null;
  const faviconURL =
    $('link[rel="icon"]').attr('href') ||
    $('link[rel="shortcut icon"]').attr('href') ||
    null;

  console.log(title, description, faviconURL);

  return {
    title,
    description,
    faviconURL,
  };
};
