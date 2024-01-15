// Small helper for readability
const pad = (num: number, length = 2) => num.toString().padStart(length, '0');

/**
 * Formats time to hh:mm:ss:mss
 *
 * @param time time in milliseconds
 */
export function formatTime(time: number) {
  const ms = pad(time % 1000, 3);
  const seconds = pad(Math.floor(time / 1000) % 60);
  const minutes = pad(Math.floor(time / 60000));
  const hours = pad(Math.floor(time / 3600000));

  return `${hours}:${minutes}:${seconds}:${ms}`;
}
