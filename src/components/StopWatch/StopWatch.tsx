import React, { useState, useRef } from "react";
import { StopWatchButton } from "../StopWatchButton";
import { formatTime } from "../../utils/formatTime";
import { LapList } from "../LapList";
import "./StopWatch.css";

export function StopWatch() {
  const [active, setActive] = useState(false);
  const [time, setTime] = useState(0);

  const [currentLapTime, setCurrentLapTime] = useState(0);
  const [lapData, setLapData] = useState([]);

  let intervalRef = useRef(null);

  const handleStart = () => {
    // After you reset the timer, lap data should reset after starting the timer again
    if (time == 0) {
      setLapData([]);
    }

    if (!active) {
      intervalRef.current = setInterval(() => {
        setTime((prev) => prev + 10);
        setCurrentLapTime((prev) => prev + 10);
      }, 10);
      setActive(true);
    }
  };

  const handleStop = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
    setActive(false);
  };

  const handleReset = () => {
    handleStop();
    setTime(0);
  };

  const handleLap = () => {
    setLapData((times) => [...times, currentLapTime]);
    setCurrentLapTime(0);
  };

  return (
    <main className="container">
      <section>
        <h1>Stopwatch App</h1>
        <p>Made by Richard Marquez</p>
      </section>
      <section className="app">
        <div className="stopwatch-text">{formatTime(time)}</div>
        <StopWatchButton
          isStopWatchActive={active}
          handleStart={handleStart}
          handleStop={handleStop}
          handleReset={handleReset}
          handleLap={handleLap}
        />
        <LapList laps={lapData} />
      </section>
    </main>
  );
}
