/**
 * Formats an elapsed time in the stopwatch format. 
 * Note that the milliseconds are truncated to two digits for legibility.
 * 
 * @param time The elapsed time in milliseconds
 * @returns A stopwatch formatted elapsed time
 */
export const formatTime = (time: number) => {
    const hours = Math.floor(time / (1000 * 60 * 60));
    const minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((time % (1000 * 60)) / 1000);
    const milliseconds = time % 1000;

    const minutesStr = minutes.toString().padStart(2, "0");
    const secondsStr = seconds.toString().padStart(2, "0");
    const millisecondsStr = milliseconds.toString().padStart(3, "0").substring(0, 2);

    return `${hours}:${minutesStr}:${secondsStr}:${millisecondsStr}`;
}
