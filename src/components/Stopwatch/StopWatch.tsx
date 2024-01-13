import React from "react";

import useStopWatch, { StopwatchState } from "../../hooks/useStopwatch";
import StopWatchButton from "./StopWatchButton";
import StopWatchTime from "./StopWatchTime";
import StopwatchLaps, { Lap } from "./StopwatchLaps";

export default function StopWatch() {
  const {
    state: stopwatchState,
    elapsedTime: stopwatchElapsedTime,
    handleStart: handleStartStopwatch,
    handlePause: handlePauseStopwatch,
    handleStop: handleStopStopwatch,
    handleReset: handleResetStopwatch,
  } = useStopWatch({});

  const [laps, setLaps] = React.useState<Array<Lap>>([]);

  const onReset = React.useCallback(() => {
    setLaps([]);
    handleResetStopwatch();
  }, []);

  const addLap = React.useCallback(() => {
    const previousLap: Lap | undefined = laps[laps.length - 1];

    const lap: Lap = {
      id: !previousLap ? 1 : previousLap.id + 1,
      duration: !previousLap ? stopwatchElapsedTime : stopwatchElapsedTime - previousLap.elapsed,
      elapsed: stopwatchElapsedTime,
    };

    setLaps((prev) => [...prev, lap]);
  }, [stopwatchElapsedTime, laps]);

  return (
    <div>
      <h1>Stopwatch</h1>

      <div>
        {stopwatchState !== "stopped" && <StopWatchTime elapsedTime={stopwatchElapsedTime} />}

        <StopWatchButton onClick={handleStartStopwatch}>{stopwatchState === "idle" ? "Resume" : "Start"}</StopWatchButton>
        <StopWatchButton onClick={handleStopStopwatch}>Stop</StopWatchButton>
        <StopWatchButton onClick={handlePauseStopwatch}>Pause</StopWatchButton>
        <StopWatchButton disabled={stopwatchState !== "running" && stopwatchState !== "idle" } onClick={addLap}>Lap</StopWatchButton>
        <StopWatchButton onClick={onReset}>Reset</StopWatchButton>
      </div>

      <StopwatchLaps laps={laps} />
    </div>
  );
}
