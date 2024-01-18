import * as Enums from '../utils/enums';

// Utility function to format a number to a specified length by adding leading zeros
const formatNumber = (num: number, length: number): string => {
  const numString = Math.floor(num).toString();
  return '0'.repeat(Math.max(0, length - numString.length)) + numString;
};

// Function to format time based on a specified time unit
const formatTimeUnit = (
  milliseconds: number,
  unit: Enums.TimeUnit
): string | number => {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const totalCentiseconds = Math.floor((milliseconds % 1000) / 10);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  // Switch statement to determine which time unit to format
  switch (unit) {
    case Enums.TimeUnit.Hours:
      return formatNumber(hours, 2);
    case Enums.TimeUnit.Minutes:
      return formatNumber(minutes, 2);
    case Enums.TimeUnit.Seconds:
      return formatNumber(seconds, 2);
    case Enums.TimeUnit.Centiseconds:
      return formatNumber(totalCentiseconds, 2);
    default:
      throw new Error(`'${unit}' is not implemented.`);
  }
};

// Exporting the functions and enum for external use
export { formatTimeUnit };
