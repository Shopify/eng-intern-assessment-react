export const pad = (num: number, length: number = 2) => {
  return num.toString().padStart(length, '0');
};

export const formatTime = (time: number) => {
  const hours = Math.floor(time / (60 * 60 * 1000));
  const minutes = Math.floor((time / (60 * 1000)) % 60);
  const seconds = Math.floor((time / 1000) % 60);
  const milliseconds = time % 1000;

  const formattedHours = hours < 10 ? pad(hours) : hours.toString();
  const formattedMinutes = pad(minutes);
  const formattedSeconds = pad(seconds);
  const formattedMilliseconds = pad(milliseconds, 3);

  return `${formattedHours}:${formattedMinutes}:${formattedSeconds}.${formattedMilliseconds}`;
};
