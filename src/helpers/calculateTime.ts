export interface TimeFormat {
  minutesFormatted: string;
  secondsFormatted: string;
  millisecondsFormatted: string;
};

const formatTime = (value: number, length: number): string => {
  return String(value).padStart(length, '0');
}

const calculateTime = (timeInSeconds: number): TimeFormat => {
  const millisecondsPerInterval = 10;
  const maxMilliseconds = 100;
  const millisecondsInMinute = 60000;
  const secondsInMinute = 60;
  const millisecondsInSecond = 1000;
  
  const milliseconds = ((timeInSeconds / millisecondsPerInterval) % maxMilliseconds);
  const minutes = Math.floor((timeInSeconds / millisecondsInMinute) % secondsInMinute);
  const seconds = Math.floor((timeInSeconds / millisecondsInSecond) % secondsInMinute);

  const minutesFormatted = formatTime(minutes, 2);
  const secondsFormatted = formatTime(seconds, 2);
  const millisecondsFormatted = formatTime(milliseconds, 2)

  return { minutesFormatted, secondsFormatted, millisecondsFormatted };
}

export default calculateTime;