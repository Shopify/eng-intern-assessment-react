import React, { useState, useEffect } from "react";
import StopWatchButton from "./StopWatchButton";

export default function StopWatch() {
  //Managing state of the current time and a boolean to check if it is currently running

  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState<number[]>([]);

  //using this useEffect hook to take advantage of setInterval and reset time.

  useEffect(() => {
    let interval: NodeJS.Timeout;
    //setting up an interval to udpate time every 10 ms when the stopwatch is running
    if (isRunning) {
      // as opposed to just doing setInterval we need a intervalId so we know which one to stop
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);

      //Incrementing by 10 ms every 10 ms, we handle logic below
    } else {
      clearInterval(interval);
    }
    // the reason why we create a new interval if we restart is because we need to avoid multiple intervals and make sure it is in sync with the current state

    //this is the clean up function on unmount or when isRunning changes
    return () => clearInterval(interval);
  }, [isRunning]);

  const start = () => setIsRunning(true);
  const stop = () => setIsRunning(false);
  const reset = () => {
    setIsRunning(false);
    setLaps([]);
    setTime(0);
  };
  const lap = () => setLaps([...laps, time]);

  // helper function that reformats the time for both lap and stopwatch display

  const formatTime = (milliseconds: number) => {
    const seconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    const remainingMs = milliseconds % 1000;
    return `${minutes} minutes : ${
      remainingSeconds < 10 ? "0" : ""
    }${remainingSeconds}.${remainingMs}`;
  };
  //additional functionality so we can't lap if time isn't moving or if we didn't start at all!
  const isLapDisabled = !isRunning || time === 0;
  return (
    <div>
      <h2>Stopwatch</h2>
      <p>{formatTime(time)} seconds</p>
      {/* passing callback functions to child component */}
      <StopWatchButton
        start={start}
        stop={stop}
        reset={reset}
        lap={lap}
        lapDisabled={isLapDisabled}
      />

      {/* implementing conditional display using && operator iff we have 1 or more laps to display */}

      {laps.length > 0 && (
        <div>
          <h3>Laps</h3>
          <ul>
            {laps.map((lapTime, index) => (
              <li key={index}>
                Lap {index + 1}: {formatTime(lapTime)} seconds
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
