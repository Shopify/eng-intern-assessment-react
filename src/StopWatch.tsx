import React, { useState, useEffect, useCallback } from "react";
import StopWatchButton from "./StopWatchButton";

export function timeCalulator(time: number): Array<number | string> {
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
  
  return [
    hoursFormatted,
    minutesFormatted,
    secondsFormatted,
    millisecondsFormatted,
  ];
}

export default function StopWatch() {
  const [time, setTime] = useState(0);
  const [timerArray, setTimerArray] = useState<Array<number | string>>([]);

  useEffect(() => {
    setTimerArray(timeCalulator(time));
  }, [time]);

  return (
    <div>
      <div className="stopwatch-container">
        <p className="timer-text">{timerArray[0]}</p>
        <span>:</span>
        <p className="timer-text">{timerArray[1]}</p>
        <span>:</span>
        <p className="timer-text">{timerArray[2]}</p>
        <span>:</span>
        <p className="timer-text">{timerArray[3]}</p>
      </div>
      <div>
        <StopWatchButton setTime={setTime}></StopWatchButton>
      </div>
    </div>
  );
}
