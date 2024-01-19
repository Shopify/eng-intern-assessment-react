// util functions for formatting time to be displayed
// function that formats number to string characters for timer display
const formatNumberToString = (num: number): string => {
  // if num is 0 return "00"
  if (num === 0) {
    return "00";
  }

  // existing logic for padding numbers
  const numAsString = String(num);
  return numAsString.length < 2 ? "0" + numAsString : numAsString;
};

// function that converts time elapsed to "MM:SS.ss" format for display
export const convertToDisplayTime = (timeElapsed: number): string => {
  // calculate the numbers to be displayed
  const minutes = Math.floor(timeElapsed / (60 * 1000));
  const seconds = Math.floor((timeElapsed % (60 * 1000)) / 1000);
  const milliseconds = timeElapsed % 1000;

  // format the result to "MM:SS.ss" for display
  const formattedMinutes = formatNumberToString(minutes);
  const formattedSeconds = formatNumberToString(seconds);
  const formattedMilliseconds = formatNumberToString(milliseconds / 10); // divide milliseconds by 10 to display at most 2 digits as string

  // return formatted string
  return `${formattedMinutes}:${formattedSeconds}.${formattedMilliseconds}`;
};
