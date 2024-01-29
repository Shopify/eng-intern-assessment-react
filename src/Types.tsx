export type Time = {
  hours: number;
  minutes: number;
  seconds: number;
  milliseconds: number;
};

export type Lap = {
  time: Time;
  lapNumber: number;
};
