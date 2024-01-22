import React, { useEffect, useState } from "react";
import StopWatchButton from "./StopWatchButton";

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
    <>
      <div className="time-display">
        <p className="time-display-text">
          {hours}:{minutes}:{seconds}:{milliseconds}
        </p>
      </div>
      <StopWatchButton
        isRunning={isRunning}
        setIsRunning={setIsRunning}
        setTime={setTime}
        setLaps={setLaps}
        time={time}
      />
      <div className="lap-display">
        <ul className="laps">
          {laps.map((lap, index) => {
            const hours = Math.floor(lap / 360000);
            const minutes = Math.floor((lap % 360000) / 6000);
            const seconds = Math.floor((lap % 6000) / 100);
            const milliseconds = lap % 100;
            return (
              <li key={index} className="lap">
                <p className="lap-number">Lap {index + 1}</p>
                <p className="lap-text">
                  {hours}:{minutes}:{seconds}:{milliseconds}
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}
