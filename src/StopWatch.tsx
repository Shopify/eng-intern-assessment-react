import React, { useState, useRef } from "react";
import StopWatchButton from "./StopWatchButton";
import "../styles/StopWatchStyles.css";

const StopWatch = () => {
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [lapTimes, setLapTimes] = useState<number[]>([]);
  const [lastLapTimestamp, setLastLapTimestamp] = useState<number | null>(null);
  const timerRef = useRef<NodeJS.Timer | null>(null);

  const startTimer = () => {
    if (!isRunning) {
      const startTime = Date.now() - elapsedTime;
      setIsRunning(true);

      timerRef.current = setInterval(() => {
        setElapsedTime(Date.now() - startTime);
      }, 10) as NodeJS.Timer;
    }
  };

  const stopTimer = () => {
    if (isRunning && timerRef.current !== null) {
      clearInterval(timerRef.current);
      setIsRunning(false);
      timerRef.current = null;
    }
  };

  const resetTimer = () => {
    stopTimer();
    setElapsedTime(0);
    setLapTimes([]);
    setLastLapTimestamp(null);
  };

  const recordLap = () => {
    if (isRunning) {
      const currentTimestamp = elapsedTime;
      const currentLapTime =
        lastLapTimestamp !== null
          ? currentTimestamp - lastLapTimestamp
          : elapsedTime;

      setLapTimes((prevLapTimes) => [currentLapTime, ...prevLapTimes]);

      setLastLapTimestamp(currentTimestamp);
    }
  };

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

export default StopWatch;
