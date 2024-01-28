import React from "react";
import StopWatch from "./StopWatch";
import StopWatchButton from "./StopWatchButton";
import Laps from "./Laps";
import { useState, useEffect } from "react";

export default function App() {
  const [time, setTime] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(true);
  const [laps, setLaps] = useState<number[]>([]);
  const [minLap, setMinLap] = useState<number>(0);
  const [maxLap, setMaxLap] = useState<number>(0);
  const [savedTime, setSavedTime] = useState<number>(Date.now());
  const [lastLappedTime, setLastLappedTime] = useState<number>(0);

  const updateTimer = (): void => {
    const newTime = time + Date.now() - savedTime;
    if (!isPaused) {
      setTime(newTime);
    }
  };

  useEffect(() => {
    if (document.hidden) {
      setSavedTime(Date.now());
    } else {
      requestAnimationFrame(updateTimer);
    }
  }, [document.hidden]);

  const newLap = (): void => {
    const newLap = time - lastLappedTime;
    setLastLappedTime(time);
    const newLaps = [...laps, newLap]
    

    let minVal = laps[0];
    let minPos = 0;
    let maxPos = 0;
    let maxVal = laps[0];

    newLaps.forEach((lap, index) => {
      if (lap < minVal) {
        minVal = lap;
        minPos = index;
      }
      if (lap > maxVal) {
        maxVal = lap;
        maxPos = index;
      }
    });
    setMinLap(minPos);
    setMaxLap(maxPos);
    setLaps(newLaps);
  };


  return (
    <div>
      <StopWatch
        time={time}
        isPaused={isPaused}
        setTime={setTime}
        setIsPaused={setIsPaused}
      />
      <StopWatchButton
        time={time}
        setTime={setTime}
        isPaused={isPaused}
        setIsPaused={setIsPaused}
        setLaps={setLaps}
        addNewLap={newLap}
        setSavedTime={setSavedTime}
      />
      <Laps laps={laps} min={minLap} max={maxLap} />
    </div>
  );
}
