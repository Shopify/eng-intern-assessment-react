export default function formatTime(time: number): string {
  const hours = Math.floor(time / 360000); // Divides the time by 360000 to get the hours
  const minutes = Math.floor((time % 360000) / 60000); // Fix: Divide by 60000 to get the correct minutes
  const seconds = Math.floor((time % 60000) / 1000); // Divides the time by 60000 and then gets the remainder, then divides that by 1000 to get the seconds
  const milliseconds = time % 1000; // Gets the remainder of the time divided by 1000 to get the milliseconds
  // The return statement returns the time in the format of HH:MM:SS:MS
  return `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}:${milliseconds
    .toString()
    .padStart(2, "0")}`;
}
