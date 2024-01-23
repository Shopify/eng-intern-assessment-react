import React, { useState, useRef } from "react";
import { StopWatch } from "./components/StopWatch";
import { StopWatchButton } from "./components/StopWatchButton";
import { formatTime } from "./utils/formatTime";

export default function App() {
  const [active, setActive] = useState(false);
  const [time, setTime] = useState(0);

  const [currentLapTime, setCurrentLapTime] = useState(0);
  const [lapData, setLapData] = useState([]);

  let intervalRef = useRef(null);

  const handleStart = () => {
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
    <div>
      <div>{active ? "currently active" : "not active"}</div>
      <StopWatch currentTime={formatTime(time)} laps={lapData} />
      <StopWatchButton
        isStopWatchActive={active}
        handleStart={handleStart}
        handleStop={handleStop}
        handleReset={handleReset}
        handleLap={handleLap}
      />
    </div>
  );
}
