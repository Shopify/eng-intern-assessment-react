const formatTime = (time: number) => {
  // Convert milliseconds to centiseconds
  const centiseconds = Math.floor(time / 10);

  // Calculate minutes, seconds, and remaining centiseconds
  const minutes = Math.floor(centiseconds / 6000);
  const seconds = Math.floor((centiseconds % 6000) / 100);
  const remainingCentiseconds = centiseconds % 100;

  // Format each component with leading zeros if needed
  const formattedMinutes = minutes.toString().padStart(2, "0");
  const formattedSeconds = seconds.toString().padStart(2, "0");
  const formattedCentiseconds = remainingCentiseconds
    .toString()
    .padStart(2, "0");

  // Construct the formatted time string
  return `${formattedMinutes}:${formattedSeconds}:${formattedCentiseconds}`;
};

export default formatTime;
