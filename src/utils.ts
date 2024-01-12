export const displayTime = (hours: number, minutes: number, seconds: number) => {
    let string = '';
    string += (hours).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false}) + ':';
    string += (minutes).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false}) + ':';
    string += (seconds).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false});
    return string;
}