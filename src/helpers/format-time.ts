/**
 * Converts a time measured in milliseconds to "hh:mm:ss"
 * formatted string.
 *
 * @param time in milliseconds
 * @returns time as a "hh:mm:ss" formatted string
 */
export const formatTime = (time: number): string => {
    const padWithZero = (value: number) => value.toString().padStart(2, "0");

    const hours = padWithZero(Math.floor((time || 0) / 3600000));
    const minutes = padWithZero(Math.floor((time || 0) / 60000));
    const seconds = padWithZero(Math.floor(((time || 0) / 1000) % 60));

    return `${hours}:${minutes}:${seconds}`;
};
