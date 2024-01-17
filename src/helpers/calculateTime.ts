const calculateTime = (timeInSeconds: number): number[] => {
  const milliseconds = timeInSeconds * 1000;

  const minutes = Math.floor(milliseconds / (60 * 1000));
  const remainingMilliseconds = milliseconds % (60 * 1000);

  const seconds = Math.floor(remainingMilliseconds / 1000);

  return [minutes, seconds, remainingMilliseconds];
}

export default calculateTime;