/**
 * Formats the given time (in seconds) into a string in HH:MM:SS format.
 * @param {number} time - The time in seconds to be formatted.
 * @returns {string} - The formatted time string.
 */
export const formatTime = (time: number) => {
  // Calculate hours, minutes, and seconds
  const hours = Math.floor(time / 3600);
  const minutes = Math.floor((time % 3600) / 60);
  const seconds = time % 60;

  // Format the time string with padding
  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2,"0")}:${String(seconds).padStart(2, "0")}`;
};

