// ========= FUNCTION FOR FORMATTING TIME ============
const formatTime = (time: number): string => {
    // format time from milliseconds to hours, mins, secs, and centiseconds

    const padZeros = (num: number): string => {
        return num < 10 ? `0${num}` : `${num}`;
    }
    
    const hh = padZeros(Math.floor(time / (60 * 60 * 1000)));
    const mm = padZeros(Math.floor((time % (60 * 60 * 1000)) / (60 * 1000)));
    const ss = padZeros(Math.floor((time % (60 * 1000)) / 1000));
    const cs = padZeros(Math.floor((time % 1000) / 10));

    return `${hh}:${mm}:${ss}.${cs}`
}

export default formatTime;