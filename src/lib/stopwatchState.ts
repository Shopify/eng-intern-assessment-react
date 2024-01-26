export interface StopWatchState {
  active: boolean;
  lapStartTime: number | null; // when the current lap started
  currentLapTime: number;
  lapTimes: number[];
}

export const initialState: StopWatchState = {
  active: false,
  lapStartTime: null,
  currentLapTime: 0,
  lapTimes: [],
};

export type StopWatchAction = "start" | "stop" | "reset" | "lap";

export function reducer(
  s: StopWatchState,
  action: StopWatchAction
): StopWatchState {
  switch (action) {
    case "start":
      // if we are already active, do nothing
      if (s.active) {
        return s;
      }

      return { ...s, active: true, lapStartTime: performance.now() };
    case "stop":
      // if we are not active or dont have a start time,
      // do nothing
      if (!s.active || !s.lapStartTime) {
        return s;
      }

      // accumulate the time from start until now into accumulatedTimeMs
      const timeToAdd = performance.now() - s.lapStartTime;

      return {
        ...s,
        active: false,
        currentLapTime: s.currentLapTime + timeToAdd,
      };
    case "reset":
      return structuredClone(initialState);
    case "lap":
      if (!s.active || !s.lapStartTime) {
        return s;
      }

      const now = performance.now();
      const lapTime = now - s.lapStartTime;

      return {
        ...s,
        lapStartTime: now,
        currentLapTime: 0,
        lapTimes: [...s.lapTimes, s.currentLapTime + lapTime],
      };
  }
}
