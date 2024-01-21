//Helper function for calculating and formatting time. Returns an array.

const calculateTime = (timeInSeconds: number): Array<number|string> => {
  
  const milliseconds = (timeInSeconds / 10) % 100;
  const minutes = Math.floor((timeInSeconds / 60000) % 60)
  const seconds = Math.floor((timeInSeconds / 1000) % 60);

  let minutesFormat = `0${minutes}`.slice(-2);
  let secondsFormat = `0${seconds}`.slice(-2);
  let millisecondsFormat = `0${milliseconds}`.slice(-2);

  return [minutesFormat, secondsFormat, millisecondsFormat];
}

export default calculateTime;