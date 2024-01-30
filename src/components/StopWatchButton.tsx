import React from "react";
import { TimerStatus } from "../constants/constants";

export default function StopWatchButton({
  start,
  stop,
  resume,
  reset,
  recordLap,
  status,
}: {
  start: () => void;
  stop: () => void;
  resume: () => void;
  reset: () => void;
  recordLap: () => void;
  status: String;
}) {
  return (
    <>
      {/* Status timerNotStarted : only Lap(disabled) and Start buttons are rendered */}
      {status === TimerStatus.NOT_STARTED ? (
        <>
          {" "}
          <button className="stopwatch-btn " disabled>
            Lap
          </button>{" "}
          <button className="stopwatch-btn " onClick={start}>
            Start
          </button>
        </>
      ) : (
        ""
      )}

      {/* Status timerRunning : only Lap and Stop buttons are rendered */}
      {status === TimerStatus.RUNNING ? (
        <>
          <button className="stopwatch-btn alt" onClick={recordLap}>
            Lap
          </button>{" "}
          <button className="stopwatch-btn " onClick={stop}>
            Stop
          </button>
        </>
      ) : (
        ""
      )}

      {/* Status timerPaused : only Reset and Start buttons are rendered */}
      {status === TimerStatus.PAUSED ? (
        <>
          <button className="stopwatch-btn" onClick={reset}>
            Reset
          </button>{" "}
          <button className="stopwatch-btn " onClick={resume}>
            Start
          </button>
        </>
      ) : (
        ""
      )}
    </>
  );
}
