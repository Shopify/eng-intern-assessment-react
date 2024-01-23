import React, { useRef, useState } from "react";
import StopWatch from "./components/StopWatch";
import StopWatchButton from "./components/StopWatchButton";
import LapsDisplay from "./components/LapsDisplay";

export default function App() {
  const [isRunning, setIsRunning] = useState(false);
  const [isReset, setIsReset] = useState(true);

  const [elapsedTime, setElapsedTime] = useState(0); // in centiseconds
  const [laps, setLaps] = useState<number[]>([]);

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

  const handleLap = () => {
    setLaps((prevLaps) => [...prevLaps, elapsedTime]);
  };

  const handleReset = () => {
    setIsReset(true);
    setElapsedTime(0);
    setLaps([]);
  };

  const primaryButton = isRunning ? "Stop" : "Start";
  const primaryFunction = isRunning ? handleStop : handleStart;

  const secondaryButton = isRunning ? "Lap" : "Reset";
  const secondaryFunction = isRunning ? handleLap : handleReset;

  return (
    <div>
      <StopWatch time={elapsedTime} />
      <div>
        <StopWatchButton text={primaryButton} onClick={primaryFunction} />
        {!isReset && <StopWatchButton text={secondaryButton} onClick={secondaryFunction} />}
      </div>
      <LapsDisplay laps={laps} />
    </div>
  );
}
