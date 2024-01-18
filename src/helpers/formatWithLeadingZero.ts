/**
 * Formats a number with a leading zero if it is less than 10.
 * @param {number} number - The number to format.
 * @returns {string} - The formatted string.
 */

export default function formatWithLeadingZero(number: number): string{
  return number < 10 ? "0" + number : number.toString();
}

