import React, { useEffect, useState } from "react";
import StopWatchButton from "./StopWatchButton";

export default function StopWatch() {
  // state to keep track of time
  const [time, setTime] = useState<number>(0);

  // state to track if the time has started or stopped
  const [isRunning, setIsRunning] = useState<boolean>(false);

  // state for laps with array to store lap times
  const [laps, setLaps] = useState<number[]>([]);

  //useEffect to manage the interval (start/stop) as the condition for isRunning state changes
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isRunning) {
      // start interval if isRunning state true
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    } else {
      // stop & clear interval if isRunning state false
      clearInterval(interval);
    }
    // run function when component unmounts or dependency changes
    return () => {
      clearInterval(interval);
    };
  }, [isRunning]);

  // start stopwatch
  const startTime = () => {
    setIsRunning(true);
  };

  // stop stopwatch
  const stopTime = () => setIsRunning(false);

  // reset stopwatch
  const resetTime = () => {
    setTime(0);
    stopTime();
  };

  // convert time to display hours, minutes and seconds
  const timeConversion = () => {
    const hrs = Math.floor(time / 3600);
    const mins = Math.floor((time % 3600) / 60);
    const secs = time % 60;

    return { hrs, mins, secs };
  };

  // function to handle the laps & add the time to the laps array
  const handleLaps = () => setLaps([...laps, time]);

  return (
    <>
      <div>
        {/* using template literals to render the time; covert nums to string & use padStart method to ensure 2 numbers display for each unit of time */}
        {`${String(timeConversion().hrs).padStart(2, "0")} : ${String(
          timeConversion().mins
        ).padStart(2, "0")} : ${String(timeConversion().secs).padStart(
          2,
          "0"
        )}`}
      </div>
      <StopWatchButton
        onClick={isRunning ? stopTime : startTime}
        title={isRunning ? "Stop" : "Start"}
      />
      <StopWatchButton onClick={resetTime} title="Reset" />
      <StopWatchButton onClick={handleLaps} title="Lap" />
      {/* iterate over the array & render laps if any  */}
      {laps.length > 0 && (
        <div>
          <h2>Lap</h2>
          <ul>
            {laps.map((lap, index) => (
              <li key={index}>{`Lap ${index + 1} : ${lap}`}</li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}
