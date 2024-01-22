/*
  This file defines a Time object.
*/

const ONE_SECOND_MS: number = 1000;
const ONE_MINUTE_MS: number = ONE_SECOND_MS * 60;
const ONE_HOUR_MS: number = ONE_MINUTE_MS * 60;

export class Time {
  /*
    Time is an object that measures time with 4 parameters: ms, s, min and hour.
    - Instantiate with total time in ms.
    - function to return the time, formatted as a string
  */
  ms: number;
  s: number;
  min: number;
  hour: number;
  private getNumOrZero = (n: number) => Math.floor(Math.max(0, n));

  constructor(elapsed_ms: number) {
    this.hour = this.getNumOrZero(elapsed_ms / ONE_HOUR_MS);
    const wholeHoursInMs = this.hour * ONE_HOUR_MS;
    this.min = this.getNumOrZero(elapsed_ms / ONE_MINUTE_MS - wholeHoursInMs);
    const wholeMinutesInMs = this.min * ONE_MINUTE_MS;
    this.s = this.getNumOrZero((elapsed_ms - wholeMinutesInMs) / ONE_SECOND_MS);
    const wholeSecondsInMs = this.s * ONE_SECOND_MS;
    this.ms = elapsed_ms - wholeMinutesInMs - wholeSecondsInMs;
  }

  display() {
    return `${this.hour}:${this.min.toString().padStart(2, "0")}:${this.s.toString()
      .padStart(2, "0")}:${this.ms.toString().padStart(3, "0")}`;
  }
}

export interface Lap {
  /*
    A lap is simply 2 pieces of information:
    1. the total time elapsed when the lap ends (total_t)
    2. the length of time the lap took (lap_t)
  */
  total_t: Time;
  lap_t: Time;
}
