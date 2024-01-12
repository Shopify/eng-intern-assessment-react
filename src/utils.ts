export const displayTime = (hours: number, minutes: number, seconds: number, centiseconds: number) => {
    if (hours === 0 && minutes === 0 && seconds === 0 && centiseconds === 0) {
        return '00:00:00';
    }
    let string = '';
    string += (hours).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false}) + ':';
    string += (minutes).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false}) + ':';
    string += (seconds).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false}) + '.';
    string += (centiseconds).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})
    return string;
}