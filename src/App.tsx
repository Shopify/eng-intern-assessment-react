import React, { useRef, useState } from "react";
import StopWatch from "./StopWatch";
import StopWatchButton from "./StopWatchButton";

export default function App() {
  const [isRunning, setIsRunning] = useState(false);
  const [isReset, setIsReset] = useState(true);

  const [elapsedTime, setElapsedTime] = useState(0); // in centiseconds
  let timer = useRef<NodeJS.Timer | null>(null);

  const handleStart = () => {
    setIsRunning(true);
    setIsReset(false);

    timer.current = setInterval(() => {
      setElapsedTime((prevTime) => prevTime + 1);
    }, 10);
  };

  const handleStop = () => {
    setIsRunning(false);

    clearInterval(timer.current);
  };

  const handleLap = () => {};

  const handleReset = () => {
    setIsReset(true);
    setElapsedTime(0);
  };

  const primaryButton = isRunning ? "Stop" : "Start";
  const primaryFunction = isRunning ? handleStop : handleStart;

  const secondaryButton = isRunning ? "Lap" : "Reset";
  const secondaryFunction = isRunning ? handleLap : handleReset;

  return (
    <div>
      <StopWatch elapsedTime={elapsedTime} />
      <div>
        <StopWatchButton text={primaryButton} onClick={primaryFunction} />
        {!isReset && (
          <StopWatchButton text={secondaryButton} onClick={secondaryFunction} />
        )}
      </div>
    </div>
  );
}
