import React, { useEffect, useState } from "react";
import StopWatchButton from "./StopWatchButton";

export default function StopWatch() {
  const [time, setTime] = useState(0);
  const [laps, setLaps] = useState([]);
  const [timerOn, setTimerOn] = useState(false);

  const getPrettyTime = (time: number) => {
    const minutes = ("0" + Math.floor((time / 60000) % 60)).slice(-2);
    const seconds = ("0" + Math.floor((time / 1000) % 60)).slice(-2);
    const milliseconds = ("0" + ((time / 10) % 100)).slice(-2);

    return `${minutes}:${seconds}:${milliseconds}`;
  };

  useEffect(() => {
    let interval: any = null;

    if (timerOn) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    } else if (!timerOn) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [timerOn]);

  const onStart = () => {
    setTimerOn(true);
  };

  const onStop = () => {
    setTimerOn(false);
  };

  const onReset = () => {
    setTime(0);
    setLaps([]);
  };

  const onLap = () => {
    setLaps([time, ...laps]);
  };

  return (
    <div className="stopwatch-wrapper">
      <div className="timer-wrapper">
        <p className="stopwatch-text">{getPrettyTime(time)}</p>
        <div className="buttons-wrapper">
          {timerOn ? (
            <StopWatchButton type="lap" onClick={onLap} />
          ) : (
            <StopWatchButton type="reset" onClick={onReset} />
          )}
          {timerOn ? (
            <StopWatchButton type="stop" onClick={onStop} />
          ) : (
            <StopWatchButton type="start" onClick={onStart} />
          )}
        </div>
      </div>
      <div className="laps-wrapper">
        <div className="lap-wrapper">
          <p>Lap {laps.length + 1}</p>
          <p>{getPrettyTime(time)}</p>
        </div>
        {laps.map((lap: any, index: number) => (
          <div key={index} className="lap-wrapper">
            <p>Lap {laps.length - index}</p>
            <p>{getPrettyTime(lap)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
