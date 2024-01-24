import React, { useState } from "react";
import Timer from "./components/Timer";
import ControlButtons from "./components/ControlButtons";
import LapTable from "./components/LapTable";

interface LapTime {
  lap: number;
  lap_time: number;
  overall_time: number;
}

interface LSTime {
  time: number;
  index: number;
}

export default function StopWatch() {
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(true);
  const [time, setTime] = useState(0);
  const [lapTime, setLapTime] = useState(0);
  const [lLapTime, setLLapTime] = useState({ time: 0, index: null });
  const [sLapTime, setSLapTime] = useState({
    time: Math.pow(10, 1000),
    index: null,
  });
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
      lap: lapData.length + 1,
      lap_time: lapTime,
      overall_time: time,
    };
    const newLSTime: LSTime = {
      time: lapTime,
      index: lapData.length + 1,
    };
    setLapData([newLapTime, ...lapData]);
    if (lapTime > lLapTime.time) {
      setLLapTime(newLSTime);
    }
    if (lapTime < sLapTime.time) {
      setSLapTime(newLSTime);
    }
    setLapTime(0);
  };

  return (
    <div className="stop-watch">
      <Timer time={time} lapTime={lapTime} />
      <LapTable lapData={lapData} lLapTime={lLapTime} sLapTime={sLapTime} />
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
