import { MEDIA } from '../../constants';

/**
 * Standardizes a string by converting it to lowercase and removing non-alphanumeric characters.
 * @param str - The input string to standardize.
 * @returns The standardized string.
 */
function standardize(str: string = ''): string {
  return str.toLocaleLowerCase().replace(/[^a-zA-Z0-9]/g, '');
}

/**
 * Checks if two strings match after standardization.
 * @param a - The first string to compare.
 * @param b - The second string to compare.
 * @returns A boolean indicating whether the two strings match.
 */
export function isMatch(a: string, b: string): boolean {
  return standardize(a) === standardize(b);
}

/**
 * Generates a URL for a performance based on its title.
 * @param title - The title of the performance.
 * @returns The performance URL.
 */
export function getPerformanceURL(title: string): string {
  return `${MEDIA}/${standardize(title)}`;
}
