import { Lap } from "./StopWatch";

export function secsToTime(secs: number): Lap {
  const hours = Math.floor(secs / 3600);
  const min = Math.floor((secs - hours * 3600) / 60);
  const sec = secs - hours * 3600 - min * 60;
  return { hours, min, sec };
}

export function formatTime({ hours, min, sec }: Lap) {
  function pad(num: number) {
    return num.toString().padStart(2, "0");
  }
  return `${pad(hours)}:${pad(min)}:${pad(sec)}`;
}