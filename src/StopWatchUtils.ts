/**
 * Calculates time in milliseconds to hours:min:sec:ms
 *
 * @param time - time in milliseconds
 * @returns string in hr:min:sec:ms format
 */
export function calculateTime(time: number): string {
  const hours: number = Math.floor((time / (1000 * 60 * 60)) % 60);
  const minutes: number = Math.floor((time / (1000 * 60)) % 60);
  const seconds: number = Math.floor((time / 1000) % 60);
  const milliseconds: number = (time / 10) % 1000;

  return formatTime(hours, minutes, seconds, milliseconds);
}

/**
 * Formats the hr, min, sec, and ms values into string
 *
 * @param hr
 * @param min
 * @param sec
 * @param ms
 * @returns string in hr:min:sec:ms format
 */
export function formatTime(
  hr: number,
  min: number,
  sec: number,
  ms: number
): string {
  const hrString: string = `${("0" + hr.toString()).slice(-2)}`;
  const minString: string = `${("0" + min.toString()).slice(-2)}`;
  const secString: string = `${("0" + sec.toString()).slice(-2)}`;
  const msString: string = `${("0" + ms.toString()).slice(-2)}`;

  return hrString + ":" + minString + ":" + secString + ":" + msString;
}
