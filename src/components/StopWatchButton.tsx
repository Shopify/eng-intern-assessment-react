import React from "react";

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
  status: number;
}) {
  return (
    <>
      {/* Status 0 : only Lap(disabled) and Start buttons are rendered */}
      {status === 0 ? (
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

      {/* Status 1 : only Lap and Stop buttons are rendered */}
      {status === 1 ? (
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

      {/* Status 2 : only Reset and Start buttons are rendered */}
      {status === 2 ? (
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
