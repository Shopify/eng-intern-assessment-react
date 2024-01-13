export function toStopWatchFormat(time: number) {
  const minutes = Math.floor(time / (60 * 100))
    .toString()
    .padStart(2, '0');
  const seconds = Math.floor((time / 100) % 60)
    .toString()
    .padStart(2, '0');
  const hundredthSec = Math.floor(time % 100)
    .toString()
    .padStart(2, '0');
  return `${minutes}:${seconds}:${hundredthSec}`;
}
