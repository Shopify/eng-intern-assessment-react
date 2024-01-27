// Function to format time into minutes, seconds, and milliseconds
export const formatTime = (time: number) => {
  const minutes = Math.floor(time / 60000);
  const seconds = Math.floor((time % 60000) / 1000);
  const milliseconds = Math.floor((time % 1000) / 10);

  return {
    minutes: `${minutes < 10 ? "0" : ""}${minutes}`,
    seconds: `${seconds < 10 ? "0" : ""}${seconds}`,
    milliseconds: `${milliseconds < 10 ? "0" : ""}${milliseconds}`,
  };
};

// Function to calculate the split time given the current index and laps array
export const calculateSplit = (index: number, laps: number[]) => {
  if (index === 0) return laps[0];
  return laps[index] - laps[index - 1];
};
