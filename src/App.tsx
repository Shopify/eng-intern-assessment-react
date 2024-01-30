import React, { useState, useEffect } from "react";
import StopWatch from "./StopWatch";
import StopWatchButton from "./StopWatchButton";
import "./App.css";

export default function App() {
  const [time, setTime] = useState(0);
  const [counting, setCounting] = useState(false);
  const [laps, setLaps] = useState<number[]>([]);

  useEffect(() => {
    let interval: string | number | NodeJS.Timeout = null;

    if (counting) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [counting]);
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    const milliseconds = Math.floor((time % 1000) / 10);

    return `${minutes}m ${seconds}s ${milliseconds}ms`;
  };

  return (
    <div className="stopwatch">
      <StopWatch time={time} />
      <StopWatchButton
        start={() => setCounting(true)}
        stop={() => setCounting(false)}
        reset={() => {
          setTime(0);
          setLaps([]);
        }}
        lap={() => setLaps([...laps, time])}
        counting={counting}
      />
      {laps.map((lap, index) => (
        <div key={index} className="laps">
          Lap {index + 1}: {formatTime(lap)}
        </div>
      ))}
    </div>
  );
}
