export default function formatTime(time: number): string {
// This function takes in a number and returns a string in the format of HH:MM:SS:MS
  const hours = Math.floor(time / 360000); // Divides the time by 360000 to get the hours
  const minutes = Math.floor((time % 360000) / 6000); // Divides the time by 360000 and then gets the remainder, then divides that by 6000 to get the minutes
  const seconds = Math.floor((time % 6000) / 100); // Divides the time by 6000 and then gets the remainder, then divides that by 100 to get the seconds
  const milliseconds = time % 100; // Gets the remainder of the time divided by 100 to get the milliseconds
  // The return statement returns the time in the format of HH:MM:SS:MS
  return `${hours.toString().padStart(2, "0")}:${minutes 
    .toString()
    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}:${milliseconds
    .toString()
    .padStart(2, "0")}`;
}
