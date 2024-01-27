import React, { useState, useEffect } from "react";
import "./StopWatchButton.css";

type StopWatchButtonProps = {
  setTimeInSeconds: Function;
  recordLap: Function;
  laps: number[];
  setLaps: Function;
  formatTime: Function;
};

export default function StopWatchButton(props: StopWatchButtonProps) {
  const { setTimeInSeconds, laps, setLaps, formatTime } = props;

  const [startTime, setStartTime] = useState<number | null>(null);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const [lapStartTime, setLapStartTime] = useState<number | null>(null);

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
      setLapStartTime(currentTime);
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
    setLapStartTime(null);
    setLaps([]);
  };

  const handleLapClick = () => {
    if (isRunning && startTime && lapStartTime) {
      const currentTime = Date.now();
      const lapTime = Math.floor((currentTime - lapStartTime) / 1000);
      setLaps((prevLaps: number[]) => [...prevLaps, lapTime]);
      setLapStartTime(currentTime);
    }
  };

  return (
    <main className="controls">
      <div className="buttons-container">
        {isRunning ? (
          <>
            <button className="lap-button" onClick={handleLapClick}>
              Lap
            </button>
            <button className="stop-button" onClick={handleStopClick}>
              Stop
            </button>
          </>
        ) : (
          <button className="start-button" onClick={handleStartClick}>
            Start
          </button>
        )}
        <button className="reset-button" onClick={handleResetClick}>
          Reset
        </button>
      </div>
      <div className="laps">
        <ul className="lap-list">
          {laps.map((lap, index) => (
            <li className="lap-item" key={index}>
              <div>Lap {laps.length - index}:</div>
              <div>{formatTime(lap).join(":")}</div>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
