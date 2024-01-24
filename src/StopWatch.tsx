import React, { useState } from "react";
import Timer from "./components/Timer";
import ControlButtons from "./components/ControlButtons";
import LapTable from "./components/LapTable";

interface LapTime {
  lap: number;
  lap_time: number;
  overall_time: number;
}

export default function StopWatch() {
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(true);
  const [time, setTime] = useState(0);
  const [lapTime, setLapTime] = useState(0);
  const [lapData, setLapData] = useState([]);

  React.useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isActive && isPaused === false) {
      interval = setInterval(() => {
        setTime((time) => time + 10);
        setLapTime((lapTime) => lapTime + 10);
      }, 10);
    } else {
      clearInterval(interval);
    }
    return () => {
      clearInterval(interval);
    };
  }, [isActive, isPaused]);

  const handleStart = () => {
    setIsActive(true);
    setIsPaused(false);
  };

  const handlePauseResume = () => {
    setIsPaused(!isPaused);
  };

  const handleReset = () => {
    setIsActive(false);
    setTime(0);
    setLapTime(0);
    setLapData([]);
  };

  const handleLap = () => {
    const newLapTime: LapTime = {
      lap: lapData.length,
      lap_time: lapTime,
      overall_time: time,
    };
    setLapTime(0);
    setLapData([...lapData, newLapTime]);
  };

  return (
    <div className="stop-watch">
      <Timer time={time} lapTime={lapTime} />
      <LapTable lapData={lapData} />
      <ControlButtons
        active={isActive}
        isPaused={isPaused}
        handleStart={handleStart}
        handlePauseResume={handlePauseResume}
        handleReset={handleReset}
        handleLap={handleLap}
      />
    </div>
  );
}
