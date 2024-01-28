const getTimeBreakdown = (
  time: number
): { minutes: string; seconds: string; milliseconds: string } => {
  const milliseconds = Math.floor(time % 1000);
  const seconds = Math.floor((time % 60000) / 1000);
  const minutes = Math.floor(time / 60000);

  return {
    minutes: minutes.toString().padStart(2, "0"),
    seconds: seconds.toString().padStart(2, "0"),
    milliseconds: milliseconds.toString().padStart(3, "0"),
  };
};

export { getTimeBreakdown };
