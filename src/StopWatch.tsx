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
  const [counter, setCounter] = useState(0);
  const [running, setRunning] = useState(false);
  const [laps, setLaps] = useState([]);

  useEffect(() => {
    if (running) {
      const timer = setInterval(() => {
        setCounter((c) => c + 25);
      }, 25);
      // 4 is chosen here because updating any faster results in incorrect timing
      // 4 ended up also being incorrect upon multiple tests
      // 25 chosen again as it's much higher than the previous minimum I encountered. (15)
      return () => clearInterval(timer);
    }
  }, [running]);

  function toggleTimer() {
    setRunning((r) => !r);
  }

  function reset() {
    setCounter(0);
  }

  function lap() {
    setLaps((l) => [...l, counter]);
    reset();
  }

  return (
    <div>
      <p data-testid="timeDisplay">
        {getDisplayTime(counter)}
      </p>
      <StopWatchButton onclick={toggleTimer} name={running ? "Pause" : "Play"} />
      <StopWatchButton onclick={lap} name="Lap" />
      <StopWatchButton onclick={reset} name="Reset" />
      {laps.length > 0 && (
        <div>
          <h2>Laps:</h2>
          <ul>
            {laps.map((lap: number, ind: number) => {
              const timeString: string =
                Math.floor(lap / 60000) +
                ":" +
                Math.floor(lap / 1000) +
                ":" +
                (lap % 1000);
              return (
                <li>
                  <p>
                    Lap {ind + 1}: {timeString}
                  </p>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
