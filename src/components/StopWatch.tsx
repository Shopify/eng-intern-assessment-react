import React from "react";
import useStopWatch from "../hooks/useStopwatch";
import { formatTime } from "../lib/formatting/time";

export default function StopWatch() {
  const {
    state: stopwatchState,
    elapsedTime: stopwatchElapsedTime,
    handleStart: handleStartStopwatch,
    handleStop: handleStopStopwatch,
    handleReset: handleResetStopwatch,
  } = useStopWatch({ debug: true });

  const isIdle = React.useMemo(() => stopwatchState === "idle", [stopwatchState]);

  const formattedTime = React.useMemo(() => {
    return formatTime(stopwatchElapsedTime);
  }, [stopwatchElapsedTime]);

  return (
    <div>
      <span>{`${formattedTime.hours}:${formattedTime.minutes}:${formattedTime.seconds}:${formattedTime.milliseconds}`}</span>
      <button onClick={isIdle ? handleStartStopwatch : handleStopStopwatch}>{isIdle ? "start" : "pause"}</button>
      <button onClick={handleResetStopwatch}>Reset</button>
    </div>
  );
}
