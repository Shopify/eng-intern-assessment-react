import React from "react";
import StopWatchButton from "./StopWatchButton";

const padZero = (num: number) => {
  return num.toString().padStart(2, "0");
};

/**
 * @param elapsedTime the elapsed time in milliseconds
 * @returns the elapsed time in the format of "hh:mm:ss"
 */
const formatElapsedTime = (elapsedTime: number): string => {
  const sec = Math.floor(elapsedTime / 1000) % 60;
  const min = Math.floor(elapsedTime / 1000 / 60) % 60;
  const hr = Math.floor(elapsedTime / 1000 / 60 / 60);

  return `${padZero(hr)}:${padZero(min)}:${padZero(sec)}`;
};

interface StopWatchState {
  startTime: number;
  isRunning: boolean;
  elapsedTime: number;
  lapTimes: number[]; // elapsed times
}

enum StopWatchActionType {
  ToggleStartPause,
  Reset,
  Lap,
  UpdateElapsedTime,
}

const initialState: StopWatchState = {
  startTime: 0,
  isRunning: false,
  elapsedTime: 0,
  lapTimes: [],
};

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

const getMainButtonText = (state: StopWatchState): string => {
  if (state.isRunning) {
    return "Stop";
  }
  if (state.elapsedTime > 0) {
    return "Resume";
  }
  return "Start";
};

export default function StopWatch() {
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
    <div>
      <h1>{formatElapsedTime(state.elapsedTime)}</h1>
      <div>
        <StopWatchButton onClick={toggleStartPause}>
          {getMainButtonText(state)}
        </StopWatchButton>
        <StopWatchButton disabled={!state.isRunning} onClick={handleLap}>
          Lap
        </StopWatchButton>
        <StopWatchButton
          disabled={state.elapsedTime === 0}
          onClick={handleReset}
        >
          Reset
        </StopWatchButton>
      </div>
      <div data-testid="lap-list">
        {state.lapTimes.map((lapTime, index) => (
          <p key={index}>
            Lap {index + 1}: {formatElapsedTime(lapTime)}
          </p>
        ))}
      </div>
    </div>
  );
}
