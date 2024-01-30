import React from "react";
import { TimerStatus } from "../constants/constants";

type StopWatchButtonProps = {
  start: () => void;
  stop: () => void;
  resume: () => void;
  reset: () => void;
  recordLap: () => void;
  status: TimerStatus;
};
export default function StopWatchButton({
  start,
  stop,
  resume,
  reset,
  recordLap,
  status,
}: StopWatchButtonProps) {
  return (
    <>
      {/* Status NOT_STARTED : only Lap(disabled) and Start buttons are rendered */}
      {status === TimerStatus.NOT_STARTED && (
        <>
          {" "}
          <button className="stopwatch-btn " disabled>
            Lap
          </button>{" "}
          <button className="stopwatch-btn " onClick={start}>
            Start
          </button>
        </>
      )}

      {/* Status RUNNING : only Lap and Stop buttons are rendered */}
      {status === TimerStatus.RUNNING && (
        <>
          <button className="stopwatch-btn alt" onClick={recordLap}>
            Lap
          </button>{" "}
          <button className="stopwatch-btn " onClick={stop}>
            Stop
          </button>
        </>
      )}

      {/* Status PAUSED : only Reset and Start buttons are rendered */}
      {status === TimerStatus.PAUSED && (
        <>
          <button className="stopwatch-btn" onClick={reset}>
            Reset
          </button>{" "}
          <button className="stopwatch-btn " onClick={resume}>
            Start
          </button>
        </>
      )}
    </>
  );
}
