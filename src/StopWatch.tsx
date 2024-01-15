import React from "react";
import useStopwatch from "./hooks/useStopwatch";
import DisplayTime from "./components/DisplayTime";
import DisplayLaps from "./components/DisplayLaps";

export default function StopWatch() {
  const { timer, laps, lap, start, stop, reset, isActive } =
    useStopwatch();

  return (
    <div>
      <DisplayTime timer={timer} />
      <DisplayLaps laps={laps} />
      <button onClick={start}>Start</button>
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
