function padWithZeroes(num: number, length = 2) {
  return num.toString().padStart(length, '0');
}

export function formatMillisAsTimestamp(millis: number) {
  const ss = padWithZeroes(Math.floor(millis / 1_000) % 60);
  const mm = padWithZeroes(Math.floor(millis / 1_000 / 60) % 60);
  const hh = padWithZeroes(Math.floor(millis / 1_000 / 60 / 60));

  if (hh !== '00') {
    return `${hh}:${mm}:${ss}`;
  }

  const ms = padWithZeroes(Math.floor((millis % 1000) / 10));

  return `${mm}:${ss}.${ms}`;
}
