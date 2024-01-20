
/**
 * Converts milliseconds into a time format of hours, minutes, seconds, and deciseconds.
 * 
 * Note: performance for this will be slightly less impressive due to the rendering per centisecond
 * 
 * @param {number} centiseconds - The time duration in milliseconds to be formatted.
 * @returns {string} Formatted time string in the format 'hours:minutes:seconds.deciseconds'.
 */


export const formatBigTime = (centiseconds: number) => {
    const hours = Math.floor(centiseconds / 360000); 
    const minutes = Math.floor((centiseconds % 360000) / 6000); 
    const seconds = Math.floor((centiseconds % 6000) / 100); 
    const decisecond = Math.floor((centiseconds % 100) / 10); 

    return `${minutes}:${seconds}.${decisecond}`;
};
