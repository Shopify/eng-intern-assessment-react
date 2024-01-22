import React, { useEffect, useState } from "react";

export default function StopWatch() {
  // state to keep track of the time
  const [time, setTime] = useState(0);

  // state to keep track of whether the stopwatch is running or not
  const [isRunning, setIsRunning] = useState(false);

  // state to keep track of the laps
  const [laps, setLaps] = useState<number[]>([]);

  // useEffect runs every time isRunning or time changes
  useEffect(() => {
    if (isRunning) {
      // increments time by 1 every 10 milliseconds
      const interval = setInterval(() => {
        setTime((time) => time + 1);
      }, 10);
      return () => clearInterval(interval);
    }
  }, [isRunning, time]);

  // converts time to hours, minutes, seconds, and milliseconds
  const hours = Math.floor(time / 360000);
  const minutes = Math.floor((time % 360000) / 6000);
  const seconds = Math.floor((time % 6000) / 100);
  const milliseconds = time % 100;

  return (
    <div>
      <button onClick={() => setIsRunning(!isRunning)}>
        {isRunning ? "Stop" : "Start"}
      </button>
      <button
        onClick={() => {
          setTime(0);
          setIsRunning(false);
          setLaps([]);
        }}
      >
        Reset
      </button>
      {`${hours}:${minutes}:${seconds}:${milliseconds}`}
      {isRunning && (
        <button
          onClick={() => {
            setLaps((laps) => [...laps, time]);
          }}
        >
          Lap
        </button>
      )}
      <ul>
        {laps.map((lap) => (
          <li>{lap}</li>
        ))}
      </ul>
    </div>
  );
}
