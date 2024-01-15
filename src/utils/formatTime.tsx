export const formatTime = (ms: number) => {
  const getH = (ms: number) => ("0" + ((ms / 10) % 100)).slice(-2);
  const getS = (ms: number) => ("0" + Math.floor((ms / 1000) % 60)).slice(-2);
  const getM = (ms: number) =>
    ("0" + Math.floor((ms / 1000 / 60) % 60)).slice(-2);

  return `${getM(ms)}:${getS(ms)}:${getH(ms)}`;
};
