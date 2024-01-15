import React from "react";
import { useStopWatch } from "../../hooks/useStopWatch";
import StopWatchButton from "../StopWatchButton";
import LapsRecord from "../LapsRecord";

export default function StopWatch() {
  const {
    isRunning,
    time,
    laps,
    startHandler,
    pauseHandler,
    resetHandler,
    lapHandler,
  } = useStopWatch();

  return (
    <>
      <div>
        <p>{time}</p>
        <div>
          <StopWatchButton onClick={!isRunning ? startHandler : pauseHandler}>
            {!isRunning ? "Start" : "Stop"}
          </StopWatchButton>
          <StopWatchButton onClick={lapHandler}>Lap</StopWatchButton>
          <StopWatchButton onClick={resetHandler}>Reset</StopWatchButton>
        </div>
      </div>
      <LapsRecord lapsData={laps} />
    </>
  );
}
