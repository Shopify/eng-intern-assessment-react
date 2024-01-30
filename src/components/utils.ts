const MILLISECONDS_TO_SECONDS_CONVERSION_UNIT = 1000; // because there are 1000ms in 1 second
const SECONDS_MINUTES_HOURS_CONVERSION_UNIT = 60; // because there are 60 seconds in 1 minute and 60 minutes in 1 hour

export function formatTime(
  hours: number,
  minutes: number,
  seconds: number,
  milliseconds: number
): string {
  const hoursString = hours.toString().padStart(2, "0");
  const minutesString = minutes.toString().padStart(2, "0");
  const secondsString = seconds.toString().padStart(2, "0");
  const millisecondsString = milliseconds.toString().padStart(2, "0");
  return `${hoursString}:${minutesString}:${secondsString}.${millisecondsString}`; // display the time in the format HH:MM:SS.MsMs ex: 10500ms is 00:00:10.50
}

export function displayTime(time: number): string {
  const milliseconds = Math.round(
    (time % MILLISECONDS_TO_SECONDS_CONVERSION_UNIT) / 10 // get the number of milliseconds to display rounded to the nearest tens (ex: 546ms rounds to 550ms)
  );
  const totalSeconds = Math.floor(
    time / MILLISECONDS_TO_SECONDS_CONVERSION_UNIT // get the total number of seconds (still need to convert to get number of minutes)
  );
  const seconds = totalSeconds % SECONDS_MINUTES_HOURS_CONVERSION_UNIT; // get the number of seconds to display
  const totalMinutes = Math.floor(
    totalSeconds / SECONDS_MINUTES_HOURS_CONVERSION_UNIT // get total number of minutes (still need to convert to get number of hours)
  );
  const minutes = totalMinutes % SECONDS_MINUTES_HOURS_CONVERSION_UNIT; // get number of minutes to display
  const hours = Math.floor(
    totalMinutes / SECONDS_MINUTES_HOURS_CONVERSION_UNIT // get number of hours to display
  );
  return formatTime(hours, minutes, seconds, milliseconds);
}
