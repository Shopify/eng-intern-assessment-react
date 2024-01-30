import React, { useState, useEffect, useCallback } from "react";
import StopWatchButton from "./StopWatchButton";

export function timeFormatter(time: number): string {
    const hours = Math.floor(time / 360000);
    const minutes = Math.floor((time % 360000) / 6000);
    const seconds = Math.floor((time % 6000) / 100);
    const milliseconds = time % 100;

  let hoursFormatted = hours < 10 ? `0${hours}` : hours;
  let minutesFormatted = minutes < 10 ? `0${minutes}` : minutes;
  let secondsFormatted = seconds < 10 ? `0${seconds}` : seconds;
  let millisecondsFormatted =
    milliseconds < 10
      ? `0${milliseconds}`
      : `${milliseconds}`

const formattedTime = `${hoursFormatted}:${minutesFormatted}:${secondsFormatted}:${millisecondsFormatted}`;
  
return formattedTime;
}

export default function StopWatch() {
  const [time, setTime] = useState(0);
  const [timerArray, setTimerArray] = useState<Array<number | string>>([]);
  const [numberOfLaps, setNumberOfLaps] = useState<Array<number>>([]);
  const [laps, setLaps] = useState<Array<number>>([]);

 
//   useEffect(() => {
//     setTimerArray(timeCalulator(time));
//   }, [time]);

  return (
    <div>
      <div className="stopwatch-container">
      {timeFormatter(time)}
      </div>
      <div>
        <StopWatchButton  time={time}
          setTime={setTime}
          setNumberOfLaps={setNumberOfLaps}
          setLaps={setLaps}
          laps={laps}></StopWatchButton>
      </div>
      <div className="lap-times-container">
      <h3>Lap Times:</h3>
        <ul>
          {laps.map((lap, index) => (
            <li key={index}>{`Lap ${index + 1}:` + " " + timeFormatter(lap)}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
