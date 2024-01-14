export const formatTime = (milliseconds: number): string => {
  // Convert milliseconds to seconds
  const totalSeconds = Math.floor(milliseconds / 1000);

  // Calculate minutes, seconds, and centiseconds
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  const centiseconds = Math.floor((milliseconds % 1000) / 10);

  // Format the time components with leading zeros
  const formattedMinutes = String(minutes).padStart(2, "0");
  const formattedSeconds = String(seconds).padStart(2, "0");
  const formattedCentiseconds = String(centiseconds).padStart(2, "0");

  // Construct and return the formatted time string
  return `${formattedMinutes}:${formattedSeconds}:${formattedCentiseconds}`;
};
