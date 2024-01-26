import React, { useState, useEffect } from "react";
import StopWatch from "./StopWatch";
import StopWatchButton from "./StopWatchButton";
import { getPrettyTime } from "./utils";
import "./styles.css";

export default function App() {
  const [time, setTime] = useState(0);
  const [laps, setLaps] = useState([]);
  const [timerOn, setTimerOn] = useState(false);

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

  // Logic for the timer
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

  return (
    <div className="wrapper">
      <div className="stopwatch-wrapper">
        <div className="timer-wrapper">
          <StopWatch time={time} />
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
    </div>
  );
}
