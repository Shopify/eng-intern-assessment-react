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
    }
}

export const formatTime = (time: number) => {
    const { ms, seconds, minutes, hours } = breakdownTime(time);

    const msString = ms.toString().padStart(3, '0');
    const secondsString = seconds.toString().padStart(2, '0');
    const minutesString = minutes.toString().padStart(2, '0');
    const hoursString = hours.toString().padStart(2, '0');

    return `${hoursString}:${minutesString}:${secondsString}:${msString}`;
}