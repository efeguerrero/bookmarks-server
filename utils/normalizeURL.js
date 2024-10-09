export function normalizeUrl(url) {
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    return `https://${url.startsWith('www.') ? '' : 'www.'}${url}`;
  }
  return url;
}
