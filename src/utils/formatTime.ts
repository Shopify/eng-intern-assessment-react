const HOUR_IN_MS = 3600000;
const MINUTE_IN_MS = 60000;
const SECOND_IN_MS = 1000;

// given a number in ms, formats the time in HH:MM:SS
export function formatTime(ms: number): string {
  const hours = Math.floor(ms / HOUR_IN_MS);
  const minutes = Math.floor((ms % HOUR_IN_MS) / MINUTE_IN_MS);
  const seconds = Math.floor((ms % MINUTE_IN_MS) / SECOND_IN_MS);
  const milliseconds = Math.floor((ms % SECOND_IN_MS) / 10);

  const formattedTime = `${("0" + minutes).slice(-2)}:${("0" + seconds).slice(
    -2
  )}.${String(milliseconds).padEnd(2, "0")}`;

  return hours > 0 ? hours + ":" + formattedTime : formattedTime;
}
