export const formatTime = (milliseconds: number): string => {
    const hours = Math.floor(milliseconds / 3600000);
    const minutes = Math.floor((milliseconds % 3600000) / 60000);
    const seconds = Math.floor((milliseconds % 60000) / 1000);
    const remainingMilliseconds = Math.floor((milliseconds % 1000) / 10);

    return `${padZero(hours)}:${padZero(minutes)}:${padZero(seconds)}:${padZero(remainingMilliseconds)}`;
};

export const padZero = (num: number, length: number = 2): string => {
    const str = num.toString();
    return str.length >= length ? str : '0'.repeat(length - str.length) + str;
};
