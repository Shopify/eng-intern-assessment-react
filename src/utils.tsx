export const getPrettyTime = (time: number) => {
  const minutes = ("0" + Math.floor((time / 60000) % 60)).slice(-2);
  const seconds = ("0" + Math.floor((time / 1000) % 60)).slice(-2);
  const milliseconds = ("0" + ((time / 10) % 100)).slice(-2);

  return `${minutes}:${seconds}:${milliseconds}`;
};
