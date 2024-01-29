import React, { useState, useEffect, useCallback } from "react";
import StopWatchButton from "./StopWatchButton";
import { formatTime } from "../helpers/timeMethods";

export default function StopWatch() {
  // State to track the time, whether the timer is on/off, and the lap times
  const [time, setTime] = useState<number>(0);
  const [timerOn, setTimerOn] = useState<boolean>(false);
  const [lapTimes, setLapTimes] = useState<number[]>([]);

  // Stops the timer, resets the time, and clears the lap times. useCallback is used to prevent unnecessary re-renders
  const handleReset = useCallback(() => {
    setTimerOn(false);
    setTime(0);
    setLapTimes([]);
  }, []);

  // Every time timerOn changes, we start or stop the timer
  // useEffect is necessary since setInterval changes the state and we don't want to create an infinite loop
  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;
    if (timerOn) {
      interval = setInterval(() => setTime((time) => time + 1), 10);
    }

    return () => {
      //@ts-ignore
      clearInterval(interval);
    }; // Clears the interval when the component unmounts or timerOn changes
  }, [timerOn]);

  return (
    <div className="stopwatch">
      <h1 className="stopwatch-title">StopWatch</h1>
      <div className="stopwatch-content">
        <div className="stopwatch-buttons">
          <StopWatchButton
            type={"start"}
            onClick={() => setTimerOn(true)}
          ></StopWatchButton>
          <StopWatchButton
            type={"stop"}
            onClick={() => setTimerOn(false)}
          ></StopWatchButton>
          <StopWatchButton
            type={"lap"}
            onClick={() => setLapTimes([...lapTimes, time])}
            timerOn={timerOn}
            lapTimes={lapTimes}
          ></StopWatchButton>
          <StopWatchButton
            type={"reset"}
            onClick={handleReset}
            time={time}
          ></StopWatchButton>
        </div>
        <div className="stopwatch-time">
          <p>{formatTime(time)}</p>
          {/* Display the numbered lap times */}
          {lapTimes.length > 0 && (
            <div className="stopwatch-laptimes">
              <p>Lap times</p>
              <ul>
                {lapTimes.map((lapTime, index) => {
                  return (
                    <li key={index}>
                      {index + 1 + "."} {formatTime(lapTime)}
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
