const padZeros = (n: number) => {
  return n.toString().padStart(2, '0');
};

export const formatTime = (
  hours: number,
  minutes: number,
  seconds: number,
  milliseconds: number
) => {
  return (
    hours +
    ':' +
    padZeros(minutes) +
    ':' +
    padZeros(seconds) +
    ':' +
    padZeros(milliseconds)
  );
};
