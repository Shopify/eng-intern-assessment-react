import React, { useState, useEffect } from "react";
import StopWatchButton from "./StopWatchButton";

// Helper function to format time
const formatTime = (time: number): string => {
  const hours = Math.floor(time / 3600);
  const minutes = Math.floor((time % 3600) / 60);
  const seconds = time % 60;

  return [hours, minutes, seconds]
    .map((val) => (val < 10 ? `0${val}` : val.toString()))
    .join(":");
};

const Stopwatch: React.FC = () => {
  const [time, setTime] = useState<number>(0);
  const [running, setRunning] = useState<boolean>(false);
  const [paused, setPaused] = useState<boolean>(false);
  const [laps, setLaps] = useState<number[]>([]);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (running && !paused) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    } else if (interval) {
      clearInterval(interval);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [running, paused]);

  const handleStartStop = (): void => {
    setRunning(!running);
    if (!running) setPaused(false); // Reset paused state when starting
  };

  const handlePauseResume = (): void => {
    setPaused(!paused);
  };

  const handleReset = (): void => {
    setRunning(false);
    setTime(0);
    setLaps([]);
    setPaused(false);
  };

  const handleLap = (): void => {
    if (running && !paused) {
      setLaps((prevLaps) => [...prevLaps, time]);
    }
  };

  // Always render the lap list, even when it's empty
  const renderLapList = () => {
    return laps.length > 0
      ? laps.map((lapTime, index) => (
          <li key={index}>
            Lap {index + 1}: {formatTime(lapTime)}
          </li>
        ))
      : null;
  };

  return (
    <div className="stopwatch">
      <div className="stopwatch__display">{formatTime(time)}</div>
      <div className="stopwatch__controls">
        <StopWatchButton
          label={running ? "Stop" : "Start"}
          onClick={handleStartStop}
        />
        <StopWatchButton
          label={paused ? "Resume" : "Pause"}
          onClick={handlePauseResume}
          disabled={!running}
        />
        <StopWatchButton
          label="Lap"
          onClick={handleLap}
          disabled={!running || paused}
        />
        <StopWatchButton label="Reset" onClick={handleReset} />
      </div>
      {laps.length > 0 && (
        <div className="stopwatch__laps">
          <h2>Laps</h2>
          <ul data-testid="lap-list">
            {laps.map((lapTime, index) => (
              <li key={index}>
                Lap {index + 1}: {formatTime(lapTime)}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Stopwatch;
