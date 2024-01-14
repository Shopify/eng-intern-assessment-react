

/**
 * This function converts a given timestamp into hours, minutes, seconds, and milliseconds.
 *
 * @export
 * @param {number} ts - The timestamp to be converted, in seconds.
 * @returns An object containing the converted time values.
 * @returns {number} hours - The number of whole hours in the given timestamp.
 * @returns {number} minutes - The number of remaining minutes after the hours have been subtracted from the timestamp.
 * @returns {number} seconds - The number of remaining seconds after the hours and minutes have been subtracted from the timestamp.
 * @returns {number} ms - The number of remaining milliseconds after the hours, minutes, and seconds have been subtracted from the timestamp. This value is rounded to two decimal places.
 */
export const getTime = (ts : number) => {
    let seconds, minutes, hours, ms = 0;
    hours = Math.floor(ts/3600)
    minutes = Math.floor((ts - hours * 3600) / 60)
    seconds = Math.floor(ts - hours * 3600 - minutes * 60)
    ms = parseFloat(((ts - hours * 3600 - minutes * 60 - seconds) * 100).toFixed(2))
    return {hours, minutes, seconds, ms}
}