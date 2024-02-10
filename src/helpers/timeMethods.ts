// Function to format the time. This is necessary since both the time and lap times need to be formatted
export const formatTime = (time: number): string => {
  // Format the time in mm:ss:ms. Display hours only if reached
  const hours = Math.floor(time / 360000);
  const minutes = Math.floor((time % 360000) / 6000);
  const seconds = Math.floor((time % 6000) / 100);
  const milliseconds = time % 100;
  // Format the minutes, seconds, and milliseconds to be two digits
  const formattedMinutes = minutes.toString().padStart(2, '0');
  const formattedSeconds = seconds.toString().padStart(2, '0');
  const formattedMilliseconds = milliseconds.toString().padStart(2, '0');
  // If stopwatch reaches at least an hour, display the hours
  if (hours > 0) {
    const formattedHours = hours.toString().padStart(2, '0');
    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}:${formattedMilliseconds}`;
  }
  // Combine the values into a string
  const formattedTime = `${formattedMinutes}:${formattedSeconds}:${formattedMilliseconds}`;
  return formattedTime;
};
