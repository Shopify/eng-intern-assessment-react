import React from "react";

export default function StopWatch(
  timerSeconds: number
): [number, number, number] {
  let hrs: number = Math.ceil(timerSeconds / 3600);
  let mins: number = Math.ceil((timerSeconds - hrs * 3600) / 60);
  let secs: number = Math.ceil(timerSeconds - hrs * 3600 - mins * 60);

  if (hrs < 10) {
    hrs = Number(`0${hrs}`);
  }

  if (mins < 10) {
    mins = Number(`0${mins}`);
  }

  if (secs < 10) {
    secs = Number(`0${secs}`);
  }

  return [hrs, mins, secs];
}
