// Helper function to calculate hours, minutes, and seconds from total seconds

/**
 * Converts a number of seconds into an array formatted as [HH, MM, SS].
 * Each unit of time is padded with a leading zero if it is less than 10.
 * 
 * @param {number} timeInSeconds - The total time in seconds.
 * @returns {Array<number|string>} An array containing the formatted time.
 */
 function calculateTimer(timeInSeconds: number): Array<number|string> {
   // Calculate the number of hours, minutes, and seconds
   let hours: number = Math.floor(timeInSeconds / 3600);
   let minutes: number = Math.floor((timeInSeconds - (hours * 3600)) / 60);
   let seconds: number = timeInSeconds - (hours * 3600) - (minutes * 60);

   // Format the hours, minutes, and seconds with leading zeros if necessary
   let hoursFormat = hours < 10 ? `0${hours}` : hours;
   let minutesFormat = minutes < 10 ? `0${minutes}` : minutes;
   let secondsFormat = seconds < 10 ? `0${seconds}` : seconds;

   // Return the formatted time as an array
   return [hoursFormat, minutesFormat, secondsFormat];
}

// Export the calculateTimer function for use in other modules
export default calculateTimer;
