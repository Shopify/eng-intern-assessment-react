import React, { useEffect, useState } from "react";

import StopWatchButton from "./StopWatchButton";

export default function StopWatch() {
  /* This will represent whether or not our stopwatch is running */
  const [timer, setTimer] = useState<boolean>(false);

  /* This will represent the elapsed time in seconds.*/
  const [elapsedTime, setElapsedTime] = useState<number>(0);

  /* Records the history of our lapsed times. Since we do not expect to have a large amount,
  we can just use an array to record these lapsed times. */
  const [laps, setLaps] = useState<number[]>([]);

  /* We will update our timer in increments of 0.1s. The more updates/renders we make,
  the more it will affect our performance. */
  const timeIncrement = 0.1;

  useEffect(() => {
    // Creating a ref to our interval function so we can clean it up when our timer stops
    let intervalRef: NodeJS.Timeout;
    if (timer) intervalRef = setInterval(incrementTimer, 1000 * timeIncrement);
    return () => clearInterval(intervalRef);
  });

  const incrementTimer = () => {
    const newNumber = Number((elapsedTime + timeIncrement).toFixed(1));
    setElapsedTime(newNumber);
  };

  return (
    <div className="stopwatch-box">
      <h1 className="timer-box">
        Elapsed Time (s): {elapsedTime.toFixed(1).toString()}
      </h1>
      <div className="laps-outer-box">
        <h3 className="laps-title">Current Laps:</h3>
        <div className="laps-box">
          {laps.map((time, index) => (
            <p>
              Lap {index + 1}: {time} seconds
            </p>
          ))}
        </div>
      </div>
      <StopWatchButton
        timer={timer}
        timerHandler={setTimer}
        elapsedTime={elapsedTime}
        elapsedTimeHandler={setElapsedTime}
        laps={laps}
        lapsHandler={setLaps}
      />
    </div>
  );
}
