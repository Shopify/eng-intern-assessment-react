/**
 * Pads a number with zeroes to achieve the specified length.
 *
 * @param {number} number - The number to pad with zeroes.
 * @param {number} length - The desired length of the resulting string.
 * @returns {string} A string representation of the padded number.
 * 
 */
function padZeroes(number: number, length: number): string {
    return String(number).padStart(length, '0');
}




/**
 * Formats a time value in milliseconds into "hh:mm:ss.SSS" format.
 *
 * @param {number} ms - Time value in milliseconds.
 * @returns {string} Formatted time string.
 * 
 */
export default function formatTime(ms: number): string {
    const milliseconds = ms % 1000;
    const seconds = Math.floor((ms / 1000) % 60);
    const minutes = Math.floor((ms / (60 * 1000)) % 60);
    const hours = Math.floor((ms / (60 * 60 * 1000)));

    return padZeroes(hours, 2) + ":" + padZeroes(minutes, 2) + ":" + padZeroes(seconds, 2) + "." + padZeroes(milliseconds, 3);
}