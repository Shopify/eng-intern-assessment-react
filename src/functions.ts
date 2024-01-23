import { TimeComponents } from "./types";

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

export default {
  getTimeComponents,
};
