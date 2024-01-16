/**
 * Format time duration given in milliseconds into a string.
 * @param {number} ms - The time duration in milliseconds.
 * @returns {string} The formatted time string in the format "mm:ss:ms".
 *
 */
export function formatTime(ms: number) {
  const milliseconds = Math.floor((ms % 1000) / 10);
  const seconds = Math.floor((ms / 1000) % 60);
  const minutes = Math.floor((ms / (60 * 1000)) % 60);
  const formattedTime = `${padZero(minutes)}:${padZero(seconds)}:${padZero(
    milliseconds
  )}`;

  return formattedTime;
}

/**
 * Pads a number with a leading zero if it is a single-digit number.
 * @param {number} num - The number to be padded.
 * @returns {string} The padded number as a string.
 */
export function padZero(num: number, length = 2) {
  return num.toString().padStart(length, "0");
}
