import fetch from 'node-fetch';
import * as cheerio from 'cheerio';
import { BadRequestError } from './errors.js';

export const fetchUrlData = async (url) => {
  try {
    const urlFetch = await fetch(url);
    const html = await urlFetch.text();
    const $ = cheerio.load(html);

    const title = $('title').text() || 'No title available';
    const description =
      $('meta[name="description"]').attr('content') ||
      $('meta[property="og:description"]').attr('content') ||
      null;

    // Use Google favicon fetching to get the website url or use google as fallback
    const googleFaviconUrl = `https://t0.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${encodeURIComponent(
      url
    )}&size=128`;

    const faviconResponse = await fetch(googleFaviconUrl);
    const faviconURL = faviconResponse.headers.get('Content-Location') || null;

    console.log(title, description, faviconURL);

    return {
      title,
      description,
      faviconURL,
    };
  } catch (error) {
    throw new BadRequestError('We could not process this website information.');
  }
};
