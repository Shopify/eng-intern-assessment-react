export const getCurrentTime = (time: number) => {
  if (isNaN(time)) {
    throw new Error("Invalid timer or startTime");
  }
  const hours = Math.floor(time / 3600000);
  const minutes = Math.floor((time % 3600000) / 60000);
  const seconds = Math.floor((time % 60000) / 1000);
  const milliseconds = time % 1000;

  return {
    hours,
    minutes,
    seconds,
    milliseconds,
  };
};

export const formatNum = (num: number) => ("0" + num).slice(-2);
