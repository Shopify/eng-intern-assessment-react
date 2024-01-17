import React from "react";
import formatTime from "../utils/formatTime";
import useStopWatch from "../hooks/useStopWatch";
import StopWatchButton from "./StopWatchButton";
import Laps from "./Laps";

export default function StopWatch() {
  const {
    elapsedTime,
    isRunning,
    laps,
    startStopWatch,
    stopStopWatch,
    resetStopWatch,
    lapStopWatch,
  } = useStopWatch();

  return (
    <>
      <h3 className="title">Stopwatch</h3>
      <h1>{formatTime(elapsedTime)}</h1>
      <hr></hr>
      <div className="buttons">
        {isRunning ? (
          <StopWatchButton onClick={stopStopWatch}>Stop</StopWatchButton>
        ) : (
          <StopWatchButton onClick={startStopWatch}>Start</StopWatchButton>
        )}
        <StopWatchButton onClick={resetStopWatch} disabled={!(elapsedTime > 0)}>
          Reset
        </StopWatchButton>

        <StopWatchButton onClick={lapStopWatch} disabled={!isRunning}>
          Lap
        </StopWatchButton>
      </div>
      <hr></hr>
      <Laps laps={laps} />
    </>
  );
}
