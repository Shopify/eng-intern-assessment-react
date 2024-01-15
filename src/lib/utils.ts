/**
 * Converts a time value in seconds to a formatted string representing hours, minutes, and seconds.
 * The format of the returned string is HH:MM:SS. Each unit is padded to ensure two digits are displayed.
 * 
 * @param {number} time - The time in seconds to be formatted.
 * @returns {string} A string representing the formatted time.
 * 
 * @example
 * formatTime(3661); // returns "01:01:01"
 */

export const formatTime = (time: number) => {
    if(time < 0){ // Prevent negative time values
        return '00:00:00';
    }
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;

    // Padding each value to ensure two digits
    const formattedHours = String(hours).padStart(2, '0');
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(seconds).padStart(2, '0');

    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
};

