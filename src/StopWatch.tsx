import React, { useState, useEffect } from "react";
import StopWatchButton from "./StopWatchButton";
import {
  faFlag,
  faPlay,
  faRedo,
  faStop,
} from "@fortawesome/free-solid-svg-icons";

export default function StopWatch() {
  const [time, setTime] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [laps, setLaps] = useState<number[]>([]);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isRunning) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning]);

  const start = () => setIsRunning(true);
  const stop = () => setIsRunning(false);
  const reset = () => {
    setTime(0);
    setIsRunning(false);
    setLaps([]);
  };
  const recordLap = () => {
    setLaps([...laps, time]);
  };

  return (
    <div>
      <h2>Stopwatch</h2>
      <p>{time}</p>
      <StopWatchButton
        onClick={start}
        disabled={isRunning}
        icon={faPlay}
        label="Start"
      />
      <StopWatchButton
        onClick={stop}
        disabled={!isRunning}
        icon={faStop}
        label="Stop"
      />
      <StopWatchButton onClick={reset} icon={faRedo} label="Reset" />
      <StopWatchButton
        onClick={recordLap}
        disabled={!isRunning}
        icon={faFlag}
        label="Lap"
      />
      {laps.length > 0 && (
        <div>
          <h3>Laps</h3>
          <ul>
            {laps.map((lap, index) => (
              <li key={index}>{lap}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
