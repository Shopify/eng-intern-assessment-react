import React, { useRef, useState } from "react";
import StopWatch from "./components/StopWatch";
import StopWatchButton from "./components/StopWatchButton";
import LapsDisplay from "./components/LapsDisplay";
import "./styles.css";

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

  const primaryButtonProps = {
    text: isRunning ? "⏸︎" : "▶",
    handleClick: isRunning ? handleStop : handleStart,
    buttonStyle: isRunning ? "pause-button" : "play-button",
    alt: isRunning ? "Stop" : "Start",
  };

  const secondaryButtonProps = {
    text: isRunning ? "Lap" : "Reset",
    handleClick: isRunning ? handleLap : handleReset,
    buttonStyle: "secondary-button",
  };

  return (
    <div className="App">
      <div className="stopwatch-container">
        <StopWatch time={elapsedTime} />
      </div>
      <div className="buttons-container">
        <div className="secondary-button-container">
          <StopWatchButton {...primaryButtonProps} />
        </div>
        <div className="secondary-button-container">
          {!isReset && <StopWatchButton {...secondaryButtonProps} />}
        </div>
      </div>
      <div className="laps-container">
        <LapsDisplay laps={laps} />
      </div>
    </div>
  );
}
