// Helper function to format the stopwatch and lap times

export default function formatTime(time: number) {
  // Calculate hours, minutes, seconds, and milliseconds
  const hours = Math.floor(time / 360000);
  const minutes = Math.floor((time % 360000) / 6000);
  const seconds = Math.floor((time % 6000) / 100);
  const milliseconds = time % 100;

  return `${hours}:${minutes.toString().padStart(2, "0")}:
  ${seconds.toString().padStart(2, "0")}:
  ${milliseconds.toString().padStart(2, "0")}`;
}
