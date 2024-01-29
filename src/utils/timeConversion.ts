export const getTimeComponentsFromMs = (ms: number) => {
  let seconds = Math.floor(ms / 1000) % 60;
  let minutes = Math.floor(ms / 1000 / 60) % 60;
  let hours = Math.floor(ms / 1000 / 60 / 60);
  ms = (ms % 1000) / 10;
  if (hours) return [hours, minutes, seconds, ms].map(padNumber);
  else return [minutes, seconds, ms].map(padNumber);
};
export const padNumber = (num: Number) => {
  if (num.toString().length === 1) {
    return "0" + num;
  } else return num.toString();
};
