/**
 * @file StopWatchUtils.ts
 * @desc Utility functions such as time formatters for a stopwatch
 * @author Hadi Naqvi
 */

/**
 * Formats the elapsed time of a stopwatch into a string format of HH:MM:ss.mm
 * @param {number} elapsedTime - The elapsed time in milliseconds of a stopwatch timer
 * @returns {string} - A formatted string representing the elapsed time in the format HH:MM:SS.mm
 * 
 * @example
 * // Usage example:
 * const elapsedTime = 3665500; // 1 hour, 1 minute, 5.5 seconds
 * const formattedTime = formatTime(elapsedTime);
 * console.log(formattedTime); // Output: "01:01:05.55"
 */
export const formatTime = (elapsedTime: number): string => {
    // Return a time of 0 if elapsed time is non-positive
    if (elapsedTime <= 0) return "00:00:00.00";

    // Calculates the number of hours, minutes, seconds, and milliseconds (First 2 digits) passed
    const hours = Math.floor(elapsedTime / 3600000);
    const minutes = Math.floor((elapsedTime % 3600000) / 60000);
    const seconds = Math.floor((elapsedTime % 60000) / 1000);
    const truncatedMilliseconds = Math.floor((elapsedTime % 1000) / 10);

    // Formats and returns the time in HH:MM:SS.mm
    const formattedHours = String(hours).padStart(2, '0');
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(seconds).padStart(2, '0');
    const formattedMilliseconds = String(truncatedMilliseconds).padStart(2, '0');

    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}.${formattedMilliseconds}`;
}