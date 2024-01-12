import React from "react";
import StopWatchButton from "./StopWatchButton";

const padZero = (num: number) => {
  return num.toString().padStart(2, "0");
};

/**
 * @param elapsedTime the elapsed time in milliseconds
 * @returns the elapsed time in the format of "hh:mm:ss.ms"
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
      return {
        ...state,
        isRunning: false,
        startTime: 0,
        elapsedTime: 0,
        lapTimes: [],
      };
    case StopWatchActionType.Lap:
      if (!state.isRunning) throw new Error("Stopwatch is not running");
      return {
        ...state,
        lapTimes: [...state.lapTimes, state.elapsedTime],
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

export default function StopWatch() {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const toggleStartPause = () => {
    dispatch(StopWatchActionType.ToggleStartPause);
  };

  const handleReset = () => {
    dispatch(StopWatchActionType.Reset);
  };

  const handleLap = () => {
    dispatch(StopWatchActionType.Lap);
  };

  React.useEffect(() => {
    if (!state.isRunning) {
      return;
    }

    const intervalId = setInterval(() => {
      dispatch(StopWatchActionType.UpdateElapsedTime);
    }, 10);

    return () => clearInterval(intervalId);
  }, [state.isRunning]);

  return (
    <div>
      <h1>{formatElapsedTime(state.elapsedTime)}</h1>
      <div>
        <StopWatchButton onClick={toggleStartPause}>
          {state.isRunning ? "Pause" : "Start"}
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
      <div id="lap-list">
        {state.lapTimes.map((lapTime, index) => (
          <p key={index}>
            {index + 1}: {formatElapsedTime(lapTime)}
          </p>
        ))}
      </div>
    </div>
  );
}
