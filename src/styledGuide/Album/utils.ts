export function isImageURL(url: string | undefined): boolean {
  return !!(url || '').match(/\.(jpg|png|jpeg|gif)[^/]*$/i);
}
