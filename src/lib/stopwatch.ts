export interface StopWatchState {
  active: boolean;
  currentLapStartTime: number | null; // when the current lap started
  currentLapElapsedTime: number; // time elapsed in the current lap until the last stop
  lapDurations: number[];
}

export const initialState: StopWatchState = {
  active: false,
  currentLapStartTime: null,
  currentLapElapsedTime: 0,
  lapDurations: [],
};

export type StopWatchAction = "start" | "stop" | "reset" | "lap";

export function stopWatchReducer(
  s: StopWatchState,
  action: StopWatchAction
): StopWatchState {
  switch (action) {
    case "start":
      // if we are already active, do nothing
      if (s.active) {
        return s;
      }

      return { ...s, active: true, currentLapStartTime: performance.now() };
    case "stop":
      // if we are not active or dont have a start time,
      // do nothing
      if (!s.active || !s.currentLapStartTime) {
        return s;
      }

      // accumulate the time from start until now into accumulatedTimeMs
      const timeToAdd = performance.now() - s.currentLapStartTime;

      return {
        ...s,
        active: false,
        currentLapElapsedTime: s.currentLapElapsedTime + timeToAdd,
      };
    case "reset":
      return structuredClone(initialState);
    case "lap":
      if (!s.active || !s.currentLapStartTime) {
        return s;
      }

      const now = performance.now();
      const lapTime = now - s.currentLapStartTime;

      return {
        ...s,
        currentLapStartTime: now,
        currentLapElapsedTime: 0,
        lapDurations: [...s.lapDurations, s.currentLapElapsedTime + lapTime],
      };
  }
}
