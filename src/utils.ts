// transforms "x" to "0x"
const padZero = (num: number) => {
  return num.toString().padStart(2, "0");
};

/**
 * @param elapsedTime the elapsed time in milliseconds
 * @returns the elapsed time in the format of "hh:mm:ss"
 */
export const formatElapsedTime = (elapsedTime: number): string => {
  const sec = Math.floor(elapsedTime / 1000) % 60;
  const min = Math.floor(elapsedTime / 1000 / 60) % 60;
  const hr = Math.floor(elapsedTime / 1000 / 60 / 60);

  return `${padZero(hr)}:${padZero(min)}:${padZero(sec)}`;
};

export interface StopWatchState {
  startTime: number;
  isRunning: boolean;
  elapsedTime: number; // ms from startTime to now
  lapTimes: number[]; // elapsed time increments
}

export enum StopWatchActionType {
  ToggleStartPause,
  Reset,
  Lap,
  UpdateElapsedTime,
}

export const initialState: StopWatchState = {
  startTime: 0,
  isRunning: false,
  elapsedTime: 0,
  lapTimes: [],
};

export const getMainButtonText = (state: StopWatchState): string => {
  if (state.isRunning) {
    return "Stop";
  }
  if (state.elapsedTime > 0) {
    return "Resume";
  }
  return "Start";
};
