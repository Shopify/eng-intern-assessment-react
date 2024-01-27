const MS_IN_SECOND = 1000
const MS_IN_MINUTE = 60 * MS_IN_SECOND;
const MS_IN_HOUR = 60 * MS_IN_MINUTE;

export const formatTime = (ms: number): string =>{

    const hours = Math.floor(ms / MS_IN_HOUR);
    const mins = Math.floor((ms % MS_IN_HOUR) / MS_IN_MINUTE);
    const secs = Math.floor((ms % MS_IN_MINUTE) / MS_IN_SECOND);
    const millisecs = Math.floor((ms % MS_IN_SECOND) / 10)

    const formattedHours = hours.toString().padStart(2, '0');
    const formattedMins = mins.toString().padStart(2, '0');
    const formattedSecs = secs.toString().padStart(2, '0');
    const formattedMs = millisecs.toString().padStart(2, '0');

    const formattedTime = hours > 0 ?
        `${formattedHours}:${formattedMins}:${formattedSecs}:${formattedMs}` :
        `${formattedMins}:${formattedSecs}:${formattedMs}`;

    return formattedTime;
}