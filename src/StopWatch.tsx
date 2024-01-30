import React, { useRef, useState, useEffect } from "react";
import StopWatchButton from "./StopWatchButton";

export default function StopWatch() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [lapTimes, setLapTimes] = useState<string[]>([]);
  const [lastLapTime, setLastLapTime] = useState<number | null>(null);
  const timerRef = useRef<number | null>(null);

  // Set initial last lap time when the component mounts
  useEffect(() => {
    setLastLapTime(time);
  }, []);

  //Format the Time displayed on the screen '00:00:00:00'
  function formatTime(timeValue: number = 0): string {
    const hours = Math.floor(time / (1000 * 60 * 60));
    const minutes = Math.floor((time / (1000 * 60)) % 60);
    const seconds = Math.floor((time / 1000) % 60);
    const milliseconds = Math.floor((time % 1000) / 10);

    return `${padZero(hours)}:${padZero(minutes)}:${padZero(seconds)}:${padZero(
      milliseconds
    )}`;
  }

  //Start times of each value to '00'
  function padZero(value: number): string {
    return value < 10 ? `0${value}` : `${value}`;
  }

  //Start handle
  const startStopwatch = () => {
    if (!isRunning) {
      timerRef.current = window.setInterval(() => {
        setTime((prevTime) => prevTime + 10); // increment by 10 milliseconds
      }, 10);
    } else {
      alert("The StopWatch has already started");
      window.clearInterval(timerRef.current!);
    }

    setIsRunning(!isRunning);
  };

  //Stop handle
  const stopStopwatch = () => {
    window.clearInterval(timerRef.current!);
    setIsRunning(false);
  };

  //Reset handle
  const resetStopwatch = () => {
    stopStopwatch();
    setLastLapTime(0);
    setTime(0);
    setLapTimes([]);
  };

  //Lap handle
  const handleLap = () => {
    if (lastLapTime === null) {
      setLastLapTime(time);
      return;
    }
    const elapsed = time - lastLapTime;
    const lapTime =
      padZero(Math.floor(elapsed / (1000 * 60 * 60))) +
      ":" +
      padZero(Math.floor((elapsed / (1000 * 60)) % 60)) +
      ":" +
      padZero(Math.floor((elapsed / 1000) % 60)) +
      "." +
      padZero(Math.floor((elapsed % 1000) / 10));

    setLapTimes((prevLaps) => [...prevLaps, lapTime]);
    setLastLapTime(time);
  };
  return (
    <>
      <div>
        <h1>{formatTime()}</h1>
      </div>
      <div>
        <StopWatchButton onClick={startStopwatch} label="Start" />
        <StopWatchButton onClick={stopStopwatch} label="Stop" />
        <StopWatchButton onClick={resetStopwatch} label="Reset" />
        <StopWatchButton
          onClick={handleLap}
          label="Lap"
          condition={isRunning}
        />
        {/* {isRunning && (
          <button className="btn" onClick={handleLap}>
            Lap
          </button>
        )} */}
      </div>
      <div>
        <h2>Lap Times</h2>
        <ul>
          {lapTimes.map((laps, index) => (
            <li key={index}>{laps}</li>
          ))}
        </ul>
      </div>
    </>
  );
}
