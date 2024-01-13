import React from "react";

import useStopWatch from "../../hooks/useStopwatch";
import StopWatchButton from "./StopWatchButton";
import StopWatchTime from "./StopWatchTime";
import StopwatchLaps, { Lap } from "./StopwatchLaps";

export default function StopWatch() {
  const {
    state: stopwatchState,
    elapsedTime: stopwatchElapsedTime,
    handleStart: handleStartStopwatch,
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
    <div className='stopwatch-container'>
      <StopWatchTime elapsedTime={stopwatchElapsedTime} />

      <div className='stopwatch-actions'>
        <StopWatchButton disabled={stopwatchState !== "running"} onClick={addLap}>Lap</StopWatchButton>
        <StopWatchButton onClick={stopwatchState !== "running" ? handleStartStopwatch : handleStopStopwatch}>
          {stopwatchState === "idle" ? "Start" : stopwatchState === "stopped" ? "Resume" : "Stop"}
        </StopWatchButton>
        <StopWatchButton onClick={onReset}>Reset</StopWatchButton>
      </div>

      <StopwatchLaps laps={laps} />
    </div>
  );
}
