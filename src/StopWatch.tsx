import React from "react";
import useStopwatch from "./hooks/useStopwatch";
import DisplayTime from "./components/DisplayTime";

export default function StopWatch() {
  const { timer, startTime, start, stop, reset, isActive } = useStopwatch();

  return (
    <div>
      <DisplayTime timer={timer} startTime={startTime} />
      <button onClick={start}>Start</button>
      <button onClick={stop} disabled={!isActive}>
        Stop
      </button>
      <button onClick={reset} disabled={!isActive && !timer}>
        Reset
      </button>
    </div>
  );
}
