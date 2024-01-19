import React from "react";
import StopWatch from "./StopWatch";
import { StopWatchActionType, StopWatchState, initialState } from "./utils";
import styles from "./App.module.css";
import classNames from "classnames";
import Laps from "./Laps";
import StopWatchButtons from "./StopWatchButtons";
import Stack from "./Stack";

export default function App() {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const toggleStartPause = React.useCallback(() => {
    dispatch(StopWatchActionType.ToggleStartPause);
  }, [dispatch]);

  const handleReset = React.useCallback(() => {
    dispatch(StopWatchActionType.Reset);
  }, [dispatch]);

  const handleLap = React.useCallback(() => {
    dispatch(StopWatchActionType.Lap);
  }, [dispatch]);

  React.useEffect(() => {
    if (!state.isRunning) {
      return;
    }

    const intervalId = setInterval(() => {
      dispatch(StopWatchActionType.UpdateElapsedTime);
    }, 100);

    return () => clearInterval(intervalId);
  }, [state.isRunning]);

  return (
    <div className={styles.container}>
      <Stack
        className={classNames(styles.container, styles.innerContainer)}
        size={2}
      >
        <Stack>
          <StopWatch elapsedTime={state.elapsedTime} />
          <StopWatchButtons
            state={state}
            onStartClick={toggleStartPause}
            onLapClick={handleLap}
            onResetClick={handleReset}
          />
        </Stack>
        <Laps lapTimes={state.lapTimes} />
      </Stack>
    </div>
  );
}

const reducer = (
  state: StopWatchState,
  action: StopWatchActionType
): StopWatchState => {
  switch (action) {
    case StopWatchActionType.ToggleStartPause:
      if (state.isRunning) {
        return {
          ...state,
          startTime: 0,
          elapsedTime: Date.now() - state.startTime,
          isRunning: false,
        };
      }
      return {
        ...state,
        startTime: Date.now() - state.elapsedTime,
        isRunning: true,
      };
    case StopWatchActionType.Reset:
      return initialState;
    case StopWatchActionType.Lap:
      if (!state.isRunning) throw new Error("Stopwatch is not running");
      const elapsedTimeBeforeLap = state.lapTimes.reduce((a, b) => a + b, 0);
      return {
        ...state,
        lapTimes: [...state.lapTimes, state.elapsedTime - elapsedTimeBeforeLap],
      };
    case StopWatchActionType.UpdateElapsedTime:
      if (!state.isRunning) throw new Error("Stopwatch is not running");
      return {
        ...state,
        elapsedTime: Date.now() - state.startTime,
      };
    default:
      throw new Error("Invalid action type: " + action);
  }
};
