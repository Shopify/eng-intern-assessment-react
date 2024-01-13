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

// convert centiseconds to hh:mm:ss.cc format
export const centiSecondsToDisplayFormat = (totalCentiseconds: number) => {
    const hours = Math.floor(totalCentiseconds / 360000);
    const minutes = Math.floor((totalCentiseconds % 360000) / 6000);
    const seconds = Math.floor((totalCentiseconds % 6000) / 100);
    const centiseconds = totalCentiseconds % 100;
    return displayTime(hours, minutes, seconds, centiseconds);
}