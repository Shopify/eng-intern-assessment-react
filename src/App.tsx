// The main component that renders the stopwatch and handles its functionality.
import React, { useState, useEffect } from "react";

import StopWatch from "./StopWatch";
import StopWatchButton from "./StopWatchButton";

export default function App() {
  // states for timer
  const [isStopped, setIsStopped] = useState<boolean>(true);
  const [startTime, setStartTime] = useState<number>(0);
  const [timeElapsed, setTimeElapsed] = useState<number>(0);

  // states for laps
  const [latestLapTime, setLastestLapTime] = useState<number>(0);
  const [lapTimes, setLapTimes] = useState<number[]>([]);

  // use setInterval to update timer
  useEffect(() => {
    if (!isStopped) {
      const intervalId = setInterval(() => {
        setTimeElapsed((prevTimeElapsed) => prevTimeElapsed + 10);
      }, 10); // increment timeElapsed by 10 every 10 milliseconds

      return () => {
        clearInterval(intervalId);
      };
    }
  }, [isStopped]);

  // function to update isStopped state of timer
  const updateStop = (stop: boolean): void => {
    setIsStopped(stop);
  };

  // function to record lap times
  const recordLap = (): void => {
    // only record lap if timer currently running
    if (!isStopped) {
      // set the latest lap time to current time elapsed
      setLastestLapTime(timeElapsed);
      let newLapTime = 0;

      // new lap time is time elapsed if no existing lap times in array,
      // otherwise it is the difference between time elapsed and latest lap time.
      if (!lapTimes) {
        newLapTime = timeElapsed;
      } else {
        newLapTime = timeElapsed - latestLapTime;
      }

      // add new lap time to array
      setLapTimes((prevLapTimes) => [...prevLapTimes, newLapTime]);
    }
  };

  // function to stop and reset stopwatch values to zero
  const reset = (): void => {
    setIsStopped(true);
    setStartTime(0);
    setTimeElapsed(0);
    setLastestLapTime(0);
    setLapTimes([]);
  }

  return (
    <div>
      <StopWatch
        timeElapsed={timeElapsed}
        latestLapTime={latestLapTime}
        lapTimes={lapTimes}
        stopWatchButton={<StopWatchButton updateStop={updateStop} recordLap={recordLap} reset={reset} />}
      />
    </div>
  );
}
