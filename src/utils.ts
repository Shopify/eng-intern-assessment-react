const SECOND = 100;
const MINUTE = 60 * SECOND;

/**
 * Function that adds a padded zero in the tens place when necessary
 * @param unformattedTime raw time
 * @returns formatted time as a string
 */
export const formatWithPaddedZeros = (unformattedTime: number): string => {
  if (unformattedTime >= 10) {
    return unformattedTime.toString();
  } else {
    return `0${unformattedTime}`;
  }
};

/**
 * Function that formats tenMillis into minutes:seconds:milliseconds
 * @returns a string with mins:secs:millis
 */
export const formattedTime = (time: number) => {
  const minutes = Math.floor(time / MINUTE);
  const seconds = Math.floor((time % MINUTE) / SECOND);
  const tenMillis = Math.floor(time % SECOND);
  return `${formatWithPaddedZeros(minutes)}:${formatWithPaddedZeros(seconds)}:${formatWithPaddedZeros(tenMillis)}`;
};
