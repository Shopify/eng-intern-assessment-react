import React, { useState, useRef } from "react";
import StopWatchButton from "./StopWatchButton";
import "../styles/StopWatchStyles.css";

// The main Stopwatch component
const StopWatch = () => {
  // State variables for elapsed time, running state, lap times, and last lap timestamp
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [lapTimes, setLapTimes] = useState<number[]>([]);
  const [lastLapTimestamp, setLastLapTimestamp] = useState<number | null>(null);

  // Ref to store the timer interval ID
  const timerRef = useRef<NodeJS.Timer | null>(null);

  // Function to start the timer
  const startTimer = () => {
    if (!isRunning) {
      // Calculate the start time and set the running state to true
      const startTime = Date.now() - elapsedTime;
      setIsRunning(true);

      // Set up an interval to update the elapsed time every 10 milliseconds
      timerRef.current = setInterval(() => {
        setElapsedTime(Date.now() - startTime);
      }, 10) as NodeJS.Timer;
    }
  };

  // Function to stop the timer
  const stopTimer = () => {
    if (isRunning && timerRef.current !== null) {
      // Clear the interval, set running state to false, and reset the timer reference
      clearInterval(timerRef.current);
      setIsRunning(false);
      timerRef.current = null;
    }
  };

  // Function to reset the timer and lap times
  const resetTimer = () => {
    stopTimer();
    setElapsedTime(0);
    setLapTimes([]);
    setLastLapTimestamp(null);
  };

  // Function to record a lap
  const recordLap = () => {
    if (isRunning) {
      // Calculate the current lap time and update lap times array and last lap timestamp
      const currentTimestamp = elapsedTime;
      const currentLapTime =
        lastLapTimestamp !== null
          ? currentTimestamp - lastLapTimestamp
          : elapsedTime;

      setLapTimes((prevLapTimes) => [currentLapTime, ...prevLapTimes]);
      setLastLapTimestamp(currentTimestamp);
    }
  };

  // Function to format time in hours, minutes, seconds, and milliseconds
  const formatTime = (milliseconds: number) => {
    const padZero = (num: number, length: number) => {
      return num.toString().padStart(length, "0");
    };

    const hours = padZero(Math.floor(milliseconds / (60 * 60 * 1000)), 2);
    const minutes = padZero(
      Math.floor((milliseconds % (60 * 60 * 1000)) / (60 * 1000)),
      2
    );
    const seconds = padZero(Math.floor((milliseconds % (60 * 1000)) / 1000), 2);
    const remainingMilliseconds = padZero(milliseconds % 1000, 3);

    return `${hours}:${minutes}:${seconds}.${remainingMilliseconds}`;
  };

  // Render the Stopwatch component
  return (
    <div className="stopwatchContainer">
      <div className="headerStyle">Stopwatch</div>
      <div className="elapsedTimeStyle">{formatTime(elapsedTime)}</div>

      <div className="lapTimesHeader">Lap Times:</div>
      <div className="lapTimesContainer">
        <ul className="lapTimesList">
          {lapTimes.map((lapTime, index) => (
            <li key={index} className="lapTimeItem">
              Lap {lapTimes.length - index}: {formatTime(lapTime)}
            </li>
          ))}
        </ul>
      </div>

      <div className="buttonsContainer">
        {/* Render the StopWatchButton component with appropriate event handlers and running state */}
        <StopWatchButton
          onStart={startTimer}
          onStop={stopTimer}
          onReset={resetTimer}
          onLap={recordLap}
          isRunning={() => isRunning}
        />
      </div>
    </div>
  );
};

// Export the Stopwatch component as the default export
export default StopWatch;
