/**
 * Used to store a given time by subcomponents
 * @param ms - milliseconds
 * @param seconds - seconds
 * @param minutes - minutes
 * @param hours - hours
 */
interface TimeBreakdown {
    ms: number;
    seconds: number;
    minutes: number;
    hours: number;
}

/**
 * Breaks down a time given in milliseconds into an object consisting of ms, seconds, minutes, and hours.
 * @param time 
 * @returns a TimeBreakdown object
 */
export const breakdownTime = (time: number) => {
    const ms = time % 1000;
    const seconds = Math.floor(time / 1000) % 60;
    const minutes = Math.floor(time / 1000 / 60) % 60;
    const hours = Math.floor(time / 1000 / 60 / 60);

    return {
        ms,
        seconds,
        minutes,
        hours,
    } as TimeBreakdown;
}

/**
 * Formats a time given in milliseconds into a string of the format hh:mm:ss:ms
 * @param time
 * @returns a string of the format hh:mm:ss:ms
 */
export const formatTime = (time: number) => {
    const { ms, seconds, minutes, hours } = breakdownTime(time);

    const msString = ms.toString().padStart(3, '0');
    const secondsString = seconds.toString().padStart(2, '0');
    const minutesString = minutes.toString().padStart(2, '0');
    const hoursString = hours.toString().padStart(2, '0');

    return `${hoursString}:${minutesString}:${secondsString}:${msString}`;
}