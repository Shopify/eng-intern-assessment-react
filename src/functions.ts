type TimeComponents = [string, string, string, string];

const getTimeComponents = (elapsedTime: number) => {
  const centiseconds = elapsedTime % 100;
  const seconds = Math.floor(elapsedTime / 100) % 60;
  const minutes = Math.floor(elapsedTime / 6000) % 60;
  const hours = Math.floor(elapsedTime / 360000);

  return [
    hours.toString().padStart(2, "0"),
    minutes.toString().padStart(2, "0"),
    seconds.toString().padStart(2, "0"),
    centiseconds.toString().padStart(2, "0"),
  ] as TimeComponents;
};

const timeToString = (time: number) => {
  const [hours, minutes, seconds, centiseconds] = getTimeComponents(time);
  return `${time >= 360000 ? hours + ":" : ""}${minutes}:${seconds}.${centiseconds}`;
};

export default {
  getTimeComponents,
  timeToString,
};
