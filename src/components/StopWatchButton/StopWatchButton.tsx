import React, { useState, useEffect } from "react";
import "./StopWatchButton.css";

type StopWatchButtonProps = {
  setTimeInSeconds: Function;
};

export default function StopWatchButton(props: StopWatchButtonProps) {
  const { setTimeInSeconds } = props;

  const [startTime, setStartTime] = useState<number | null>(null);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [elapsedTime, setElapsedTime] = useState<number>(0);

  useEffect(() => {
    // Update elapsed time and time in seconds when stopwatch is running
    if (isRunning && startTime) {
      const intervalId = setInterval(() => {
        setElapsedTime(Date.now() - startTime);
        setTimeInSeconds((prevElapsedTime: number) => prevElapsedTime + 1);
      }, 1000);

      // Cleanup function to clear interval when component unmounts or timer stops
      return () => clearInterval(intervalId);
    }
  }, [isRunning, startTime, setTimeInSeconds]);

  const handleStartClick = () => {
    if (!isRunning) {
      const currentTime = Date.now();
      if (elapsedTime === 0) {
        setTimeInSeconds(0);
      }
      setStartTime(currentTime - elapsedTime);
      setIsRunning(true);
    }
  };

  const handleStopClick = () => {
    if (isRunning) {
      setIsRunning(false);
      setElapsedTime(Date.now() - startTime);
    }
  };

  const handleResetClick = () => {
    setIsRunning(false);
    setStartTime(null);
    setTimeInSeconds(0);
    setElapsedTime(0);
  };

  return (
    <main className="controls">
      <div className="buttons-container">
        <button className="lap-button">Lap</button>
        <button className="stop-button" onClick={handleStopClick}>
          Stop
        </button>
        <button className="start-button" onClick={handleStartClick}>
          Start
        </button>
        <button className="reset-button" onClick={handleResetClick}>
          Reset
        </button>
      </div>
    </main>
  );
}
