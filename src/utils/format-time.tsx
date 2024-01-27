export const formatTime = (time: number) => {
  const hours = Math.floor(time / 3600000);
  const minutes = Math.floor((time % 3600000) / 60000);
  const seconds = Math.floor((time % 60000) / 1000);
  const milliseconds = Math.floor((time % 1000) / 10);

  const timePad = (time: number) => {
    return time < 10 ? `0${time}` : time;
  };

  return `${timePad(hours)}:${timePad(minutes)}:${timePad(seconds)}.${timePad(
    milliseconds
  )}`;
};
