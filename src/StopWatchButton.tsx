import React from "react";
import { useStopWatchContext } from "./StopWatchContext";

// Component that handles the Start button
function StartButton() {
  const { setIsRunning, isRunning } = useStopWatchContext();

  const handleClick = () => {
    setIsRunning(true);
  };

  return (
    <button onClick={handleClick} disabled={isRunning}>
      Start
    </button>
  );
}

// Component that handles the Stop button
function StopButton() {
  const { setIsRunning, isRunning } = useStopWatchContext();

  const handleClick = () => {
    setIsRunning(false);
  };

  return (
    <button onClick={handleClick} disabled={!isRunning}>
      Stop
    </button>
  );
}

// Component that handles the Lap button
function LapButton() {
  const { time, setLaps, isRunning } = useStopWatchContext();

  const handleClick = () => {
    setLaps((laps) => [...laps, time]);
  };

  return (
    <button onClick={handleClick} disabled={!isRunning}>
      Lap
    </button>
  );
}

// Component that handles the Reset button
function ResetButton() {
  const { setTime, setLaps, isRunning } = useStopWatchContext();

  const handleClick = () => {
    setTime(0);
    setLaps([]);
  };

  return (
    <button onClick={handleClick} disabled={isRunning}>
      Reset
    </button>
  );
}

// Component that renders all the buttons
export default function StopWatchButton() {
  const { isRunning } = useStopWatchContext();

  return (
    <div>
      {isRunning ? <StopButton /> : <StartButton />}
      <LapButton />
      <ResetButton />
    </div>
  );
}
