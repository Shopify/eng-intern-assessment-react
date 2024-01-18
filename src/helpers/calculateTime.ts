const calculateTime = (timeInSeconds: number): Array<number|string> => {
  const milliseconds = timeInSeconds * 1000;

  const minutes = Math.floor(milliseconds / (60 * 1000));
  const remainingMilliseconds = milliseconds % (60 * 1000);

  const seconds = Math.floor(remainingMilliseconds / 1000);

  let minutesFormat = minutes < 10 ? `0${minutes}` : minutes;
  let secondsFormat = seconds < 10 ? `0${seconds}` : seconds;
  let millisecondsFormat = remainingMilliseconds < 10 ? `0${remainingMilliseconds}` : remainingMilliseconds;

  return [minutesFormat, secondsFormat, millisecondsFormat];
}

export default calculateTime;