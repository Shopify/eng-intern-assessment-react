import { Dispatch, SetStateAction } from "react";

export interface StopWatchProps {
  isStopped: boolean;
  time: number;
  setTime: Dispatch<SetStateAction<number>>;
}

export interface StopWatchButtonProps {
  isStopped: boolean;
  setIsStopped: Dispatch<SetStateAction<boolean>>;
  time: number;
  resetTime: Dispatch<SetStateAction<number>>;
  resetLaps: Dispatch<SetStateAction<number[]>>;
  resetMinTime: Dispatch<SetStateAction<number>>;
  resetMaxTime: Dispatch<SetStateAction<number>>;
  resetCalculatedLapTimes: Dispatch<SetStateAction<number[]>>;
}

export enum LapCategory {
  Green = "green",
  Red = "red",
  Black = "black",
}
