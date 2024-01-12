import "./styles/StopWatch.css";

import React, { useRef, useState } from "react";

import Lap from "./Lap";
import LapHistory from "./LapHistory";
import StopWatchButton from "./StopWatchButton";

export default function StopWatch() {
  const [elapsed, setElapsed] = useState(0);
  const [lapElapsed, setLapElapsed] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState([]);

  const [bestLap, setBestLap] = useState(-1);
  const [worstLap, setWorstLap] = useState(-1);

  let intervalRef = useRef(null);
  const onStart = () => {
    if (isRunning) {
      return;
    }
    intervalRef.current = setInterval(() => {
      setElapsed((prevElapsed) => prevElapsed + 10);
      setLapElapsed((prevLapElapsed) => prevLapElapsed + 10);
    }, 10);
    setIsRunning(true);
  };

  const onStop = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
    setIsRunning(false);
  };

  const onReset = () => {
    setElapsed(0);
    setLapElapsed(0);
    setLaps([]);
    setBestLap(-1);
    setWorstLap(-1);
  };

  const onLap = () => {
    if (worstLap < lapElapsed) {
      setWorstLap(lapElapsed);
    } else if (bestLap === -1 || bestLap > lapElapsed) {
      setBestLap(lapElapsed);
    }
    laps.unshift(formatTime(lapElapsed));
    setLapElapsed(0);
    setLaps(laps);
  };

  const formatTime = (ms: number) => {
    const hours: number = Math.floor(ms / 3600000);
    let remainder: number = ms % 3600000;

    const minutes: number = Math.floor(remainder / 60000);
    remainder = remainder % 60000;

    const seconds: number = Math.floor(remainder / 1000);
    remainder = (remainder % 1000) / 10;

    let formattedTime =
      ("0" + minutes).slice(-2) +
      ":" +
      ("0" + seconds).slice(-2) +
      "." +
      String(remainder).padEnd(2, "0");

    return hours > 0 ? hours + ":" + formattedTime : formattedTime;
  };

  return (
    <div>
      <pre className="time">{formatTime(elapsed)}</pre>
      {isRunning ? (
        <div className="buttons">
          <StopWatchButton title={"Lap"} onPressed={onLap} />
          <div className="rightButton">
            <StopWatchButton
              className="stopButton"
              title={"Stop"}
              onPressed={onStop}
            />
          </div>
        </div>
      ) : (
        <div className="buttons">
          <div>
            <StopWatchButton title={"Reset"} onPressed={onReset} />
          </div>
          <div className="rightButton">
            <StopWatchButton
              className="startButton"
              title={"Start"}
              onPressed={onStart}
            />
          </div>
        </div>
      )}

      {elapsed > 0 && (
        <Lap lapElapsed={formatTime(lapElapsed)} lapIndex={laps.length + 1} />
      )}

      <LapHistory
        laps={laps}
        bestLap={formatTime(bestLap)}
        worstLap={formatTime(worstLap)}
      />
    </div>
  );
}
