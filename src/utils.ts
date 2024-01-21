/**
 * Returns a formatted time string with leading zeros for a given value.
 *
 * @param {number} value - The value to be formatted as a time string.
 * @returns {string} The formatted time string.
 */
export const getTimeString = (value: number) => `0${value}`.slice(-2);
/**
 * Formats the given elapsed time into a string in the format "HH:MM:SS,CC".
 *
 * @param {number} elapsedTime - The elapsed time in milliseconds.
 * @returns {string} The formatted time string.
 */
export const formatTime = (elapsedTime: number): string => {
    const seconds = Math.floor((elapsedTime / 1000) % 60)
    const minutes = Math.floor((elapsedTime / 60000) % 60);
    const hours = Math.floor((elapsedTime / 3600000) % 24);
    const centisec = Math.floor((elapsedTime / 10) % 100)

    return `${hours ? `${getTimeString(hours)}:` : `${getTimeString(hours)}:`}${getTimeString(minutes)}:${getTimeString(seconds)},${getTimeString(centisec)}`;
}
