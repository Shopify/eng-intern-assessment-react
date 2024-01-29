import React, { useState, useEffect, useCallback } from "react";
import DisplayComponent from "./Components/DisplayComponent";
import BtnComponent from "./Components/BtnComponent";
import "./StopWatch.css";

interface Time {
  ms: number;
  s: number;
  m: number;
  h: number;
}

function StopWatch() {
  const [time, setTime] = useState<Time>({ ms: 0, s: 0, m: 0, h: 0 });
  const [interv, setInterv] = useState<NodeJS.Timeout | undefined>();
  const [status, setStatus] = useState<number>(0);
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
  };

  const resume = () => start();

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
          <BtnComponent
            status={status}
            resume={resume}
            reset={reset}
            stop={stop}
            start={start}
          />
        </div>
      </div>
    </div>
  );
}

export default StopWatch;
