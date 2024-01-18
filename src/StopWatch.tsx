import React, { useEffect, useState } from "react";

export default function StopWatch() {
  const [timerRunning, setTimerRunning] = useState<boolean>(false);
  const [time, setTime] = useState<number>(0);

  useEffect(() => {
    let interval = null;
    // Check if timer is running
    if (timerRunning) {
      // Interval updates every 10ms
      interval = setInterval(() => {
        // Increment the time state every 10ms
        setTime((prev) => prev + 10);
      }, 10);
    }
    // If timer is not running and time is not at 0
    else if (!timerRunning && time !== 0) {
      clearInterval(interval);
    }
    return clearInterval(interval);
    // useEffect will run when the timerRunning state changes
  }, [timerRunning]);

  return <div id="stopwatch"></div>;
}
