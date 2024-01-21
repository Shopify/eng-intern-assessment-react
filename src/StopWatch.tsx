import React, { useEffect, useState, useRef } from "react";
import StopWatchButton from "./StopWatchButton";
import { formatTime, secsToTime } from "./utils";

import "../styles/stopwatch.css";

export type Lap = {
  hours: number;
  min: number;
  sec: number;
};

export default function StopWatch() {
  const [time, setTime] = useState(0);
  const [laps, setLaps] = useState<Lap[]>([]);
  const [isCounting, setIsCounting] = useState(false);

  const [hours, setHours] = useState(0);
  const [min, setMin] = useState(0);
  const [sec, setSec] = useState(0);

  // Using useRef to persist the interval ID across renders
  const intervalRef = useRef<NodeJS.Timer | null>(null);

  function onClick() {
    if (isCounting) {
      // Clearing the interval using the current value of the ref
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      setIsCounting(false);
      setLaps([...laps, secsToTime(time)]);
    } else {
      intervalRef.current = setInterval(() => setTime((prev) => prev + 1), 1000);
      setIsCounting(true);
    }
  }

  function onClickReset() {
    setIsCounting(false);
    setTime(0);
    setLaps([]);

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }

  useEffect(() => {
    let { hours, min, sec } = secsToTime(time);
    setHours(hours);
    setMin(min);
    setSec(sec);
  }, [time]);

  return (
    <div className="stopwatch-container">
      <div className="stopwatch-time">{formatTime({ hours, min, sec })}</div>
      <div className="stopwatch-buttons">
        <StopWatchButton onClick={onClick} isCounting={isCounting} />
        <div className="stopwatch-button" onClick={onClickReset}>Reset</div>
      </div>
      <div>
        {laps.map((lap, index) => (
          <div className="lap-item" key={index}>Lap {index+1}: {formatTime(lap)}</div>
        ))}
      </div>
    </div>
  );
}
