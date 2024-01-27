// Take in a number, round it down to a whole number, and enforce it to have 2 digits.
function formatTwoDigits(num: number): string {
    let result = Math.floor(num).toString();
    if (result.length == 1) {
        result = '0' + result;
    }
    return result;
}

export default function formatTime(time: number): string {
    const minutes = formatTwoDigits(time / 60);
    const seconds = formatTwoDigits(time % 60);
    const subSeconds = formatTwoDigits((time - Math.floor(time)) * 100);

    return `${minutes}:${seconds}.${subSeconds}`
}