import React, { useEffect, useState } from "react";

import StopWatchButton from "./StopWatchButton";

export default function StopWatch() {
  /* This will represent whether or not our stopwatch is running */
  const [timer, setTimer] = useState(false);

  /* This will represent the elapsed time in seconds.*/
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    // Creating a ref to our interval function so we can clean it up when our timer stops
    let intervalRef: NodeJS.Timeout;

    /* We will update our timer in increments of 0.1s. The more updates/renders we make,
	the more it will affect our performance. */
    if (timer) intervalRef = setInterval(incrementTimer, 100);

    return () => clearInterval(intervalRef);
  });

  const incrementTimer = () => {
    const newNumber = Number((elapsedTime + 0.1).toFixed(2));
    setElapsedTime(newNumber);
  };

  return (
    <div>
      <p>StopWatch</p>
      <div>Current: {elapsedTime}</div>
      <StopWatchButton
        active={timer}
        timerHandler={setTimer}
        elapsedTimeHandler={setElapsedTime}
      />
    </div>
  );
}
