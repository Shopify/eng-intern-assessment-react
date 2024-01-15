export const getCurrentTime = (seconds: number) => {
  if (isNaN(seconds)) {
    throw new Error("Invalid timer or startTime");
  }
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds - hours * 3600) / 60);
  seconds = seconds - hours * 3600 - minutes * 60;

  return {
    hours,
    minutes,
    seconds,
  };
};

export const formatNum = (num: number) => ("0" + num).slice(-2);
