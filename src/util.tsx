export const getTimeDisplayValue = (timeInMs: number):string => {
    const hundredthsOfASecond = digitize(Math.floor(timeInMs/10) % 100);
    const seconds = digitize(Math.floor(timeInMs/1000) % 60);
    const minutes = digitize(Math.floor(timeInMs/60000) % 60);
    const hours = digitize(Math.floor(timeInMs/3600000) % 24);
    return `${hours}:${minutes}:${seconds}.${hundredthsOfASecond}`;
}

export const digitize = (value: number): string => value < 10 ? `0${value}` : `${value}`;

export const incrementTime = (time: number): number => time + 10;