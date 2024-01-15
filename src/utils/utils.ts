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
// takes a number and returns a string with 2 digits, e.g. 1 -> "01"
// if the number is greater than 10, it returns the number as a string
export const formatNum = (num: number) => {
  return num >= 10 ? String(num) : ("00" + num).slice(-2);
};
