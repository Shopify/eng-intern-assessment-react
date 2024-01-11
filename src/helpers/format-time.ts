/**
 * Converts a time measured in milliseconds to "hh:mm:ss"
 * formatted string.
 *
 * @param time in milliseconds
 * @returns time as a "hh:mm:ss" formatted string
 */
export const formatTime = (time: number): string => {
    const hours = Math.floor((time || 0) / 3600000)
        .toString()
        .padStart(2, "0");
    const minutes = Math.floor((time || 0) / 60000)
        .toString()
        .padStart(2, "0");
    const seconds = Math.floor(((time || 0) / 1000) % 60)
        .toString()
        .padStart(2, "0");

    return `${hours}:${minutes}:${seconds}`;
};
