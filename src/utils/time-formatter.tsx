/**
 * Converts time in milliseconds to a formatted string.
 * @param {number} time - The time in milliseconds.
 * @returns {string} The formatted time string.
 * If hours are present, the format is HH:MM:SS:mm, otherwise MM:SS:mm.
 */
const getFormattedTime = (time: number) => {
   // Convert milliseconds into hours, minutes, seconds, and milliseconds
   const hours = Math.floor(time / 360000);
   const minutes = Math.floor((time % 360000) / 6000);
   const seconds = Math.floor((time % 6000) / 100);
   const milliseconds = time % 100;

   // Format each time component to ensure two digits
   const formattedHours = hours.toString().padStart(2, "0");
   const formattedMinutes = minutes.toString().padStart(2, "0");
   const formattedSeconds = seconds.toString().padStart(2, "0");
   const formattedMilliseconds = milliseconds.toString().padStart(2, "0");

   // Return formatted time string, including hours if present
   if (hours > 0) {
      return `${formattedHours}:${formattedMinutes}:${formattedSeconds}.${formattedMilliseconds}`;
   }
   return `${formattedMinutes}:${formattedSeconds}.${formattedMilliseconds}`;
};

export { getFormattedTime };
