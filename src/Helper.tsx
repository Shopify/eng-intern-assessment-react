interface IWatchFormat {
    hours : number;
    minutes : number;
    seconds : number;
}

// Converts time to a more human readable form
// Takes time in seconds and converts it to IWatchFormat
export const convertToTime = (time: number) : IWatchFormat => {
    let remainder = time;
    const hours = Math.floor(remainder / 3600);
    remainder = remainder % 3600;
    const minutes = Math.floor(remainder / 60);
    remainder = remainder % 60;
    const seconds = Math.floor(remainder)
    return {
        hours : hours,
        minutes : minutes,
        seconds : seconds,
    }
}