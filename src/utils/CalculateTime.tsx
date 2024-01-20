//utility component to calculate the time based on the time in milliseconds

export function CalculateTime(timeInMiliSeconds: number): string {
  //calculates the time based on the time in milliseconds
  let hours: number = Math.floor(timeInMiliSeconds / 3600000);
  let minutes: number = Math.floor((timeInMiliSeconds % 3600000) / 60000);
  let seconds: number = Math.floor((timeInMiliSeconds % 60000) / 1000);
  let milliseconds: number = Math.floor((timeInMiliSeconds % 1000) / 10);

  //formats the time to be displayed in the format HH:MM:SS.MS
  const hoursFormatted = hours < 10 ? `0${hours}` : hours;
  const minutesFormatted = minutes < 10 ? `0${minutes}` : minutes;
  const secondsFormatted = seconds < 10 ? `0${seconds}` : seconds;
  const millisecondsFormatted =
    milliseconds < 10 ? `0${milliseconds}` : milliseconds;

  // returns the formatted stopwatch string
  return hours !== 0 // To enhance visual clarity, hours are only shown if they are not 0
    ? `${hoursFormatted}:${minutesFormatted}:${secondsFormatted}.${millisecondsFormatted}`
    : `${minutesFormatted}:${secondsFormatted}.${millisecondsFormatted}`;
}
