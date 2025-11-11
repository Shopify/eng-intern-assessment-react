export const formatTime = (milliseconds: number): string => {
  const mins = Math.floor(milliseconds / 60000);
  const secs = Math.floor((milliseconds % 60000) / 1000);
  const ms = Math.floor((milliseconds % 1000) / 10);

  const paddedMins = mins.toString().padStart(2, "0");
  const paddedSecs = secs.toString().padStart(2, "0");
  const paddedMs = ms.toString().padStart(2, "0");

  return `${paddedMins}:${paddedSecs}.${paddedMs}`;
};
