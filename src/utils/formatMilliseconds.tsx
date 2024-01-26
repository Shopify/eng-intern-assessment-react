export default function formatMilliseconds(milliseconds: number): string {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const formattedTime = `${pad(minutes)}:${pad(seconds)}:${pad(milliseconds % 1000, 3)}`;

  return formattedTime;
}

function pad(number: number, length = 2): string {
  return String(number).padStart(length, '0');
}