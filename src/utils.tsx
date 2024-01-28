const getTimeBreakdown = (
  time: number
): { minutes: string; seconds: string; centiseconds: string } => {
  const centiseconds = Math.floor((time % 1000) / 10);
  const seconds = Math.floor((time % 60000) / 1000);
  const minutes = Math.floor(time / 60000);

  return {
    minutes: minutes.toString().padStart(2, "0"),
    seconds: seconds.toString().padStart(2, "0"),
    centiseconds: centiseconds.toString().padStart(2, "0"),
  };
};

export { getTimeBreakdown };
