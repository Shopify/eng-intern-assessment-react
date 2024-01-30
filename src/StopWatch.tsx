import React, { useState, useEffect, useCallback } from "react";
import StopWatchButton from "./StopWatchButton";


//time formatter to display time in 00:00:00:00 format
export function timeFormatter(time: number): string {
  const hours = Math.floor(time / 360000);
  const minutes = Math.floor((time % 360000) / 6000);
  const seconds = Math.floor((time % 6000) / 100);
  const milliseconds = time % 100;

  const hoursFormatted = hours.toString().padStart(2, "0");
  const minutesFormatted = minutes.toString().padStart(2, "0");
  const secondsFormatted = seconds.toString().padStart(2, "0");
  const millisecondsFormatted = milliseconds.toString().padStart(2, "0");

  return `${hoursFormatted}:${minutesFormatted}:${secondsFormatted}:${millisecondsFormatted}`;
}

export default function StopWatch() {
  const [time, setTime] = useState(0); //keeps track of current time 
  const [laps, setLaps] = useState<Array<number>>([]); //keeps track of number of times the laps button was clicked

  return (
    <div>
      <div className="stopwatch-container">{timeFormatter(time)}</div>
      <div>
        <StopWatchButton
          time={time}
          setTime={setTime}
          setLaps={setLaps}
          laps={laps}
        ></StopWatchButton>
      </div>
      <div className="lap-times-container">
        <h3>Lap Times:</h3>
        <ul>
          {laps.map((lap, index) => (
            <li key={index}>
              {`Lap ${index + 1}:` + " " + timeFormatter(lap)}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
