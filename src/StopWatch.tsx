import React, { useState } from "react";
import Timer from "./components/Timer";
import ControlButtons from "./components/ControlButtons";
import LapTable from "./components/LapTable";

interface LapTime {
  lap: number;
  lapTime: number;
  overallTime: number;
}

interface LSTime {
  time: number;
  index: number | null;
}

export default function StopWatch() {
  /* State Variables Usage:
    1. isActive: flag var used to indicate whether user has pressed start
    2. isPaused: flag var '                                       ' stop(aka pause)
    3. time: time count for main timer in milliseconds
    4. lapTime: '         ' lap timer '              '
    5. lLapTime/sLapTime: stores longest and shortest lap time data
    6. lapData: stores overall lap data (row: lap #, lap time, overall time)
  */

  const [isActive, setIsActive] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(true);
  const [time, setTime] = useState<number>(0);
  const [lapTime, setLapTime] = useState<number>(0);
  const [lLapTime, setLLapTime] = useState<LSTime>({ time: 0, index: null });
  const [sLapTime, setSLapTime] = useState<LSTime>({
    time: Math.pow(10, 1000),
    index: null,
  });
  const [lapData, setLapData] = useState<LapTime[]>([]);

  /* Main hook that increments both timers every 10ms, given
  user has pressed start and has not pressed stop or reset */
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
    // set stopwatch to its initial state by: resetting both
    // timers + erasing lapData
    setIsActive(false);
    setTime(0);
    setLapTime(0);
    setLapData([]);
  };

  const handleLap = () => {
    const newLapTime: LapTime = {
      lap: lapData.length + 1,
      lapTime: lapTime,
      overallTime: time,
    };
    const newLSTime: LSTime = {
      time: lapTime,
      index: lapData.length + 1,
    };
    // Add new lap time data to lapData
    setLapData([newLapTime, ...lapData]);

    // Update shortest/longest lap time if necessary
    if (lapTime > lLapTime.time) {
      setLLapTime(newLSTime);
    }
    if (lapTime < sLapTime.time) {
      setSLapTime(newLSTime);
    }
    // Reset lap timer
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
