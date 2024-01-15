import React from "react";
import useStopwatch from "./hooks/useStopwatch";

export default function StopWatchButton({
  start,
  stop,
  reset,
  lap,
  isActive,
  timer,
}: {
  start: () => void;
  stop: () => void;
  reset: () => void;
  lap: () => void;
  isActive: boolean;
  timer: number;
}) {
  return (
    <div style={{ marginTop: "20px" }}>
      <button onClick={start} disabled={isActive}>
        Start
      </button>
      <button onClick={stop} disabled={!isActive}>
        Stop
      </button>
      <button onClick={reset} disabled={!isActive && !timer}>
        Reset
      </button>
      <button onClick={lap} disabled={!isActive && !timer}>
        Lap
      </button>
    </div>
  );
}
