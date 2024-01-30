import React, { useState } from "react";
import { displayTime } from "./utils";

interface StopWatchButtonProps {
  isCounting: boolean;
  currentLap: number;
  setIsCounting: (isCounting: boolean) => void;
  setHasStartedStopwatch: (hasStartedStopwatch: boolean) => void;
  setTime: React.Dispatch<React.SetStateAction<number>>;
  setLaps: React.Dispatch<React.SetStateAction<string[]>>;
  setCurrentLap: React.Dispatch<React.SetStateAction<number>>;
}

export default function StopWatchButton({
  isCounting,
  currentLap,
  setIsCounting,
  setHasStartedStopwatch,
  setTime,
  setLaps,
  setCurrentLap,
}: StopWatchButtonProps) {
  // the timer variable will hold the reference to the timer returned in setInterval; it is necessary because the timer is accessed by multiple functions to start/stop the stopwatch
  const [timer, setTimer] = useState(null);

  // resets stopwatch to 00:00:00.00 and clears all the laps
  const resetTimer = (): void => {
    setTime(0);
    setLaps([]);
    setHasStartedStopwatch(false); // will remove any laps displayed
  };

  // stop the stopwatch
  const stopTimer = (): void => {
    clearInterval(timer); // clear the timer that is responsible for incrementing the time
    setTimer(null);
    setIsCounting(false);
  };

  const addLap = (): void => {
    setLaps((oldLaps) => [...oldLaps, displayTime(currentLap)]); // add new lap into array
    setCurrentLap(0); // next lap should start counting from 0 (following same behaviour as iOS Stopwatch functionality)
  };

  const startTimer = (): void => {
    setIsCounting(true);
    setHasStartedStopwatch(true); // will show the current lap that is actively counting up
    const interval = setInterval(updateTime, 10); // will run the function to updateTime every 10 milliseconds
    setTimer(interval); // allows stop function to access and clear the interval
  };

  const updateTime = (): void => {
    setTime((oldTime: number) => oldTime + 10); // increase the time on the stopwatch by 10 milliseconds
    setCurrentLap((oldLap: number) => oldLap + 10); // increase the time of the current lap by 10 milliseconds
  };
  return (
    <div className="button-container">
      {/* if stopwatch is currently active and counting up then we want to see the stop and lap buttons; if stopwatch is not actively counting up then we should see the start and reset buttons */}
      {isCounting ? (
        <button className="stopwatch-button" onClick={stopTimer}>
          Stop
        </button>
      ) : (
        <button className="stopwatch-button" onClick={startTimer}>
          Start
        </button>
      )}
      {isCounting ? (
        <button className="stopwatch-button" onClick={addLap}>
          Lap
        </button>
      ) : (
        <button className="stopwatch-button" onClick={resetTimer}>
          Reset
        </button>
      )}
    </div>
  );
}
