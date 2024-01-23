import React, { useRef, useState } from "react";
import StopWatch from "./components/StopWatch";
import StopWatchButton from "./components/StopWatchButton";
import LapsDisplay from "./components/LapsDisplay";
import StartIcon from "./components/StartIcon";
import PauseIcon from "./components/PauseIcon";
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
            {!isReset && <StopWatchButton {...secondaryButtonProps} />}
          </div>
        </div>
        {laps.length > 0 && <LapsDisplay laps={laps} />}
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
