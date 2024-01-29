import React, { useState, useEffect } from "react";
import StopWatchButton from "./StopWatchButton";

function getDisplayTime(count: number) {
  //Breaks down a simple count into milliseconds, seconds, and minutes.
  const min = Math.floor(count / 60000);
  const sec = Math.floor(count / 1000) % 60;
  const msec = count % 1000;
  // % operators make sure the count rolls over when the cap is reached
  // return prepends 0s to keep the string in format n:nn:nnn
  return (
    min +
    ":" +
    (sec > 9 ? sec : "0" + sec) +
    ":" +
    (msec > 99 ? msec : msec > 9 ? "0" + msec : "00" + msec)
  );
}

export default function StopWatch() {
  const [start, setStart] = useState(new Date().valueOf());
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);
  const [laps, setLaps] = useState([]);

  useEffect(() => {
    //Anchors a start time, then periodically checks a new date objects value against the anchored time to get time elapsed
    setStart(new Date().valueOf());
    const oldTime = time;
    //Previous time chunks must be added to elapsed time for start/stop functionality
    //must be outside the loop or it will compound increasing time elapsed exponentially
    if (running) {
      const timer = setInterval(() => {
        setTime(new Date().valueOf() - start + oldTime);
      }, 25);
      return () => clearInterval(timer);
    }
  }, [running, start]);

  function toggleTimer() {
    setRunning((r) => !r);
  }

  function reset() {
    setTime(0);
    setStart(new Date().valueOf());
  }

  function lap() {
    setLaps((l) => [...l, time]);
    reset();
  }

  return (
    <div className="watch">
      <h1>Stopwatch</h1>
      <div>
        <p data-testid="timeDisplay" className="time">
          {getDisplayTime(time)}
        </p>
      </div>
      <div className="buttons">
        <StopWatchButton
          onclick={toggleTimer}
          name={running ? "Stop" : "Start"}
        />
        <StopWatchButton onclick={lap} name="Lap" />
        <StopWatchButton onclick={reset} name="Reset" />
      </div>
      <div>
        {/* && operator only evals true (returning the righthand statement) when there are recored laps in the array, hiding laps header when no laps are present*/}
        {laps.length > 0 && (
          <div>
            <h2>Laps:</h2>
            <ul>
              {/*Iterate over laps array and render jsx for each lap in the array*/}
              {laps.map((lap: number, ind: number) => {
                const timeString: string = getDisplayTime(lap);
                return (
                  <li key={`lap${ind + 1}`}>
                    <span>{`Lap ${ind + 1}: ${timeString}`}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
