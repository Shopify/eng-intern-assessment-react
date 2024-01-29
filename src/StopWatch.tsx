import React, { useState, useEffect, useCallback } from "react";
import DisplayComponent from "./Components/DisplayComponent";
import StopWatchButton from "./StopWatchButton";
import "./Stopwatch.css";

interface Time {
  ms: number;
  s: number;
  m: number;
  h: number;
}

function Stopwatch() {
  const [time, setTime] = useState<Time>({ ms: 0, s: 0, m: 0, h: 0 });
  const [interv, setInterv] = useState<NodeJS.Timeout | undefined>();
  const [status, setStatus] = useState<number>(0);
  const [lapTimes, setLapTimes] = useState<string[]>([]);

  // Not started = 0
  // started = 1
  // stopped = 2

  const start = () => {
    run();
    setStatus(1);
    if (!interv) {
      setInterv(setInterval(run, 10));
    }
  };

  let updatedMs = time.ms,
    updatedS = time.s,
    updatedM = time.m,
    updatedH = time.h;

  const run = () => {
    if (updatedM === 60) {
      updatedH++;
      updatedM = 0;
    }
    if (updatedS === 60) {
      updatedM++;
      updatedS = 0;
    }
    if (updatedMs === 100) {
      updatedS++;
      updatedMs = 0;
    }
    updatedMs++;
    return setTime({ ms: updatedMs, s: updatedS, m: updatedM, h: updatedH });
  };

  const stop = () => {
    if (interv) {
      clearInterval(interv);
      setInterv(undefined);
    }
    setStatus(2);
  };

  const reset = () => {
    if (interv) {
      clearInterval(interv);
      setInterv(undefined);
    }
    setStatus(0);
    setTime({ ms: 0, s: 0, m: 0, h: 0 });
    setLapTimes([]);
  };

  const resume = () => start();

  const recordLap = () => {
    setLapTimes((prevLapTimes) => [...prevLapTimes, getFormattedTime()]);
  };

  const getFormattedTime = (): string => {
    const formatTimeUnit = (unit: number): string =>
      unit >= 10 ? unit.toString() : "0" + unit;

    const formattedTime = `${formatTimeUnit(time.m)}:${formatTimeUnit(
      time.s
    )}:${formatTimeUnit(time.ms)}`;
    return formattedTime;
  };

  useEffect(() => {
    return () => {
      if (interv) {
        clearInterval(interv);
        setInterv(undefined);
      }
    };
  }, [interv]);

  return (
    <div className="main-section">
      <div className="clock-holder">
        <div className="stopwatch">
          <DisplayComponent time={time} />
          <StopWatchButton
            status={status}
            resume={resume}
            reset={reset}
            stop={stop}
            start={start}
            recordLap={recordLap}
          />
        </div>
        {lapTimes.length > 0 && (
          <div className="lap-times">
            <p>Lap Times</p>
            <ul>
              {lapTimes.map((lapTime, index) => (
                <li key={index}>
                  Lap {index + 1}: {lapTime}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default Stopwatch;
