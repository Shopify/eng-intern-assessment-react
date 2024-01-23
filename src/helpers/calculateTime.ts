export interface TimeFormat {
  minutesFormatted: string;
  secondsFormatted: string;
  millisecondsFormatted: string;
};

const formatTime = (value: number, length: number): string => {
  return String(value).padStart(length, '0');
}

const calculateTime = (timeInSeconds: number): TimeFormat => {
  
  const milliseconds = ((timeInSeconds / 10) % 100);
  const minutes = Math.floor((timeInSeconds / 60000) % 60);
  const seconds = Math.floor((timeInSeconds / 1000) % 60);

  const minutesFormatted = formatTime(minutes, 2);
  const secondsFormatted = formatTime(seconds, 2);
  const millisecondsFormatted = formatTime(milliseconds, 2)

  return { minutesFormatted, secondsFormatted, millisecondsFormatted };
}

export default calculateTime;