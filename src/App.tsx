import React, { useRef, useState } from "react";
import StopWatch from "./StopWatch";
import StopWatchButton from "./StopWatchButton";
import { TimeComponents } from "./types";

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
  };

  const getTimeComponents = (elapsedTime: number) => {
    const centiseconds = elapsedTime % 100;
    const seconds = Math.floor(elapsedTime / 100) % 60;
    const minutes = Math.floor(elapsedTime / 6000) % 60;
    const hours = Math.floor(elapsedTime / 360000);

    return [
      hours.toString().padStart(2, "0"),
      minutes.toString().padStart(2, "0"),
      seconds.toString().padStart(2, "0"),
      centiseconds.toString().padStart(2, "0"),
    ] as TimeComponents;
  };

  const primaryButton = isRunning ? "Stop" : "Start";
  const primaryFunction = isRunning ? handleStop : handleStart;

  const secondaryButton = isRunning ? "Lap" : "Reset";
  const secondaryFunction = isRunning ? handleLap : handleReset;

  return (
    <div>
      <StopWatch timeComponents={getTimeComponents(elapsedTime)} />
      <div>
        <StopWatchButton text={primaryButton} onClick={primaryFunction} />
        {!isReset && (
          <StopWatchButton text={secondaryButton} onClick={secondaryFunction} />
        )}
      </div>
      <div>
        {laps.map((lap, index) => {
          const [hours, minutes, seconds, centisecond] = getTimeComponents(lap);
          return (
            <div>
              {index + 1} - {hours === "00" ? "" : hours + ":"}
              {minutes}:{seconds}.{centisecond}
            </div>
          );
        })}
      </div>
    </div>
  );
}
