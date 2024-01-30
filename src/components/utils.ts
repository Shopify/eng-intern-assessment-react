const MILLISECONDS_TO_SECONDS_CONVERSION_UNIT = 1000;
const SECONDS_MINUTES_HOURS_CONVERSION_UNIT = 60;

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
  return `${hoursString}:${minutesString}:${secondsString}.${millisecondsString}`;
}

export function displayTime(time: number): string {
  const milliseconds = Math.round(
    (time % MILLISECONDS_TO_SECONDS_CONVERSION_UNIT) / 10
  );
  const totalSeconds = Math.floor(
    time / MILLISECONDS_TO_SECONDS_CONVERSION_UNIT
  );
  const seconds = totalSeconds % SECONDS_MINUTES_HOURS_CONVERSION_UNIT;
  const totalMinutes = Math.floor(
    totalSeconds / SECONDS_MINUTES_HOURS_CONVERSION_UNIT
  );
  const minutes = totalMinutes % SECONDS_MINUTES_HOURS_CONVERSION_UNIT;
  const hours = Math.floor(
    totalMinutes / SECONDS_MINUTES_HOURS_CONVERSION_UNIT
  );
  return formatTime(hours, minutes, seconds, milliseconds);
}
