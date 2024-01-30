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

  // Save the time when the page is hidden to calculate the correct time
  // when the page is active again.
  const [savedTime, setSavedTime] = useState<number>(Date.now());

  // Save the last lapped time to calculate new laps
  const [lastLappedTime, setLastLappedTime] = useState<number>(0);

  const updateTimer = (): void => {
    const newTime = time + Date.now() - savedTime;
    if (!isPaused) {
      setTime(newTime);
    }
  };

  // Whenever the document is hidden, save the current time.
  // When the page return, immdiate request a new frame with a newly calculated
  //time to account for the time when the page is hidden.
  useEffect(() => {
    if (document.hidden) {
      setSavedTime(Date.now());
    } else {
      requestAnimationFrame(updateTimer);
    }
  }, [document.hidden]);

  // Calculate new lap time and update new min and max laps
  const newLap = (): void => {
    const newLap = time - lastLappedTime;
    setLastLappedTime(time);
    const newLaps = [...laps, newLap];

    if (newLap < laps[minLap]) {
      setMinLap(newLaps.length - 1);
    }
    if (newLap > laps[maxLap]) {
      setMaxLap(newLaps.length - 1);
    }
    setLaps(newLaps);
  };

  // Reset all properties when clicking reset
  const resetStopWatch = (): void => {
    setTime(0);
    setSavedTime(0);
    setIsPaused(true);
    setLaps([]);
    setLastLappedTime(0);
    setMaxLap(0);
    setMinLap(0);
  };

  return (
    <div className="app">
      <StopWatch time={time} isPaused={isPaused} setTime={setTime} />
      <StopWatchButton
        isPaused={isPaused}
        addNewLap={newLap}
        setIsPaused={setIsPaused}
        resetStopWatch={resetStopWatch}
      />
      <Laps laps={laps} min={minLap} max={maxLap} />
    </div>
  );
}
