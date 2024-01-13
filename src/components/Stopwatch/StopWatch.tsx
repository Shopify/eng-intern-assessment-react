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
  } = useStopWatch({ debug: true });

  const [laps, setLaps] = React.useState<Array<Lap>>([]);

  const isIdle = React.useMemo(() => stopwatchState === "idle", [stopwatchState]);

  const addLap = React.useCallback(() => {
    const previousLap: Lap | undefined = laps[laps.length - 1];

    console.log(previousLap);

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
        <StopWatchTime elapsedTime={stopwatchElapsedTime} />

        <StopWatchButton onClick={isIdle ? handleStartStopwatch : handleStopStopwatch}>{isIdle ? "start" : "pause"}</StopWatchButton>
        <StopWatchButton onClick={addLap}>Lap</StopWatchButton>
        <StopWatchButton onClick={handleResetStopwatch}>Reset</StopWatchButton>
      </div>

      <StopwatchLaps laps={laps} />
    </div>
  );
}
