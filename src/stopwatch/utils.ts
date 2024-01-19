function pad(num: number, length = 2) {
  return num.toString().padStart(length, '0');
}

/**
 * Format a given duration in milliseconds as a timestamp.
 *
 * @returns 'hh:mm:ss' if the duration is at least one hour, otherwise 'mm:ss:ms'
 */
export function formatMillisAsTimestamp(millis: number) {
  const seconds = Math.floor(millis / 1000) % 60;
  const minutes = Math.floor(millis / 1000 / 60) % 60;
  const hours = Math.floor(millis / 1000 / 60 / 60);

  // If we have hours, display them. Otherwise, just show minutes and seconds.
  if (hours > 0) {
    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
  }

  const milliseconds = Math.floor((millis % 1000) / 10);

  return `${pad(minutes)}:${pad(seconds)}.${pad(milliseconds)}`;
}
