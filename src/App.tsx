import React, { useEffect, useState } from "react";
import StopWatch from "./StopWatch";
import StopWatchButton from "./StopWatchButton";
import "./styles.css";
import Laps from "./Laps";

export default function App() {
  const [isRunning, setIsRunning] = useState(false);
  const [time, setTime] = useState(0);
  const [lastLapTime, setLastLapTime] = useState(0);
  const [laps, setLaps] = useState<number[]>([]);

  /**
   * Function that uses setTimeout to simulate delay
   * @param timetoDelay time to return Promise
   * @returns empty Promise
   */
  const delay = (timetoDelay: number) => {
    return new Promise((res) => setTimeout(res, timetoDelay));
  };

  /**
   * useEffect hook will run every time stopwatch start/stops
   * or time is incremented
   */
  useEffect(() => {
    if (isRunning) {
      // make delay to add to counter
      // 00mins : 00secs: 00 millis
      delay(10).then(() => {
        setTime(time + 1);
      });
    }
  }, [isRunning, time]);

  const handleReset = () => {
    setTime(0);
    setLaps([]);
    setLastLapTime(0);
  };

  const handleLap = () => {
    const newLap = time - lastLapTime;
    const newLaps = [...laps, newLap];
    setLaps(newLaps);
    setLastLapTime(time);
  };

  const handleStart = () => {
    setIsRunning(true);
  };

  const handleStop = () => {
    setIsRunning(false);
  };

  return (
    <div className="stopwatch-container">
      <h1>Stopwatch:</h1>
      <StopWatch timeInTenMillis={time} />
      <StopWatchButton
        isRunning={isRunning}
        start={handleStart}
        stop={handleStop}
        lap={handleLap}
        reset={handleReset}
      />
      <Laps lapTimes={laps} />
    </div>
  );
}
