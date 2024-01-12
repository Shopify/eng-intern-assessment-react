import React, { useState, useEffect } from "react";
import "./styles/Stopwatch.css";
import StopWatchButton from "./StopWatchButton";

const Stopwatch: React.FC = () => {
  const [time, setTime] = useState<number>(0);
  const [laps, setLaps] = useState<number[]>([]);
  const [running, setRunning] = useState<boolean>(false);

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;

    if (running) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1000);
      }, 1000);
    }

    return () => interval && clearInterval(interval);
  }, [running]);

  const handleStartStop = () => {
    setRunning(!running);
  };

  const handleReset = () => {
    setRunning(false);
    setTime(0);
    setLaps([]);
  };

  const handleLap = () => {
    if (running) {
      setLaps([...laps, time]);
    }
  };

  return (
    <div className="stopwatch">
      <div className="stopwatch__display">
        {new Date(time).toISOString().slice(11, 19)}
      </div>
      <div className="stopwatch__controls">
        <StopWatchButton
          label={running ? "Stop" : "Start"}
          onClick={handleStartStop}
          buttonType={running ? "stop" : "start"}
        />
        <StopWatchButton label="Lap" onClick={handleLap} buttonType="lap" />
        <StopWatchButton
          label="Reset"
          onClick={handleReset}
          buttonType="reset"
        />
      </div>
      {laps.length > 0 && (
        <div className="stopwatch__laps">
          <h2>Laps</h2>
          <ul>
            {laps.map((lapTime, index) => (
              <li key={index}>
                Lap {index + 1}: {new Date(lapTime).toISOString().slice(11, 19)}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Stopwatch;
