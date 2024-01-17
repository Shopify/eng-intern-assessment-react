import React from "react";
import formatTime from "../utils/formatTime";
import useStopWatch from "../hooks/useStopWatch";
import StopWatchButton from "./StopWatchButton";

export default function StopWatch() {
  const {
    elapsedTime,
    isRunning,
    startStopWatch,
    stopStopWatch,
    resetStopWatch,
    lapStopWatch,
  } = useStopWatch();

  return (
    <>
      <h1>{formatTime(elapsedTime)}</h1>
      <hr></hr>
      <div className="buttons">
        {isRunning ? (
          <StopWatchButton onClick={stopStopWatch}>Stop</StopWatchButton>
        ) : (
          <StopWatchButton onClick={startStopWatch}>Start</StopWatchButton>
        )}
        <StopWatchButton onClick={resetStopWatch} disabled={!isRunning}>
          Reset
        </StopWatchButton>

        <StopWatchButton onClick={lapStopWatch} disabled={!isRunning}>
          Lap
        </StopWatchButton>
      </div>
      <hr></hr>
    </>
  );
}
