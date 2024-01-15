import React, { useEffect } from "react";
import useStopwatch from "./hooks/useStopwatch";
import DisplayTime from "./components/DisplayTime";
import DisplayLaps from "./components/DisplayLaps";
import StopWatchButton from "./StopWatchButton";

export default function StopWatch() {
  const { timer, laps, lap, start, stop, reset, isActive } = useStopwatch();

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <DisplayTime timer={timer} />
      <StopWatchButton
        isActive={isActive}
        timer={timer}
        start={start}
        stop={stop}
        reset={reset}
        lap={lap}
      />
      <DisplayLaps laps={laps} />
    </div>
  );
}
