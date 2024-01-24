import React, { useEffect, useRef, useState } from "react";
import StopWatch from "./components/StopWatch";
import StopWatchButton from "./components/StopWatchButton";
import LapsDisplay from "./components/LapsDisplay";
import StartIcon from "./components/StartIcon";
import PauseIcon from "./components/PauseIcon";
import "./styles.css";

const START_TIME: number = 0; // When the stopwatch starts counting
const LAP_START_TIME: number = 0; // When laps can start to be recorded

export default function App() {
  const [isRunning, setIsRunning] = useState(false);
  const [isReset, setIsReset] = useState(true);

  const [elapsedTime, setElapsedTime] = useState(START_TIME); // in centiseconds
  const [laps, setLaps] = useState<number[]>([]);

  const timer = useRef<NodeJS.Timer | null>(null);

  const lastLapTime = useRef(LAP_START_TIME);
  const fastestLap = useRef(Number.MAX_VALUE);
  const slowestLap = useRef(-1);
  const fastestLapIndex = useRef(-1);
  const slowestLapIndex = useRef(-1);

  // Event handlers

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
    // Ignore laps before the stopwatch starts
    if (elapsedTime < LAP_START_TIME) return;

    const newLap = elapsedTime - lastLapTime.current;
    setLaps((prevLaps) => [...prevLaps, newLap]);
    lastLapTime.current = elapsedTime;

    // Update fastest and slowest lap times
    if (newLap < fastestLap.current) {
      fastestLap.current = newLap;
      fastestLapIndex.current = laps.length;
    }
    if (newLap > slowestLap.current) {
      slowestLap.current = newLap;
      slowestLapIndex.current = laps.length;
    }
  };

  const handleReset = () => {
    setIsReset(true);
    setElapsedTime(0);
    setLaps([]);
  };

  // Props for the Start/Stop and Lap/Reset buttons

  const primaryButtonProps = {
    Icon: isRunning ? <PauseIcon className="pause-icon" /> : <StartIcon className="start-icon" />,
    handleClick: isRunning ? handleStop : handleStart,
    buttonStyle: "button-effect",
    alt: isRunning ? "Stop" : "Start",
  };

  const secondaryButtonProps = {
    Icon: isRunning ? (
      <div className="small-text">Lap</div>
    ) : (
      <div className="small-text">Reset</div>
    ),
    handleClick: isRunning ? handleLap : handleReset,
    buttonStyle: "secondary-button button-effect",
    alt: isRunning ? "Lap" : "Reset",
  };

  // Clear timer on unmount to prevent memory leaks
  useEffect(() => () => clearInterval(timer.current), []);

  return (
    <div className="App">
      <div className="stopwatch-container">
        <div className="display-container">
          <StopWatch time={elapsedTime} />
        </div>
        <div className="buttons-container">
          <div className="button-container" />
          <div className="button-container">
            <StopWatchButton {...primaryButtonProps} />
          </div>
          <div className="button-container">
            {isReset || <StopWatchButton {...secondaryButtonProps} />}
          </div>
        </div>
        {laps.length > 0 && (
          <LapsDisplay
            laps={laps}
            fastest={fastestLapIndex.current}
            slowest={slowestLapIndex.current}
          />
        )}
      </div>
      <div className="footer-container">
        <div className="footer-section" />
        <a
          href="https://www.maxzhang.ca"
          className="footer-section made-by-msg extra-extra-small-text"
        >
          Made with ♥ by Max Zhang
        </a>
      </div>
    </div>
  );
}
