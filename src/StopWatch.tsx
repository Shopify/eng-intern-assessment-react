import "./styles/StopWatch.css";

import React, { useEffect, useRef, useState } from "react";

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
    // do nothing if start button clicked while running
    if (isRunning) return;

    // increment overall time and lap time every 10 ms (stopwatch only shows hundreths of second)
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
    }
    if (bestLap === -1 || bestLap > lapElapsed) {
      // when bestLap is still default, this lap is automatically the best. otherwise compare
      setBestLap(lapElapsed);
    }
    // add to beginning of list for easier lap history displaying
    laps.unshift(formatTime(lapElapsed));
    setLapElapsed(0);
    setLaps(laps);
  };

  // handle key events for start/stop, lap, reset
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      const pressedKey = event.key.toLowerCase();

      if (pressedKey === " ") {
        event.preventDefault();
        isRunning ? onStop() : onStart();
      } else if (isRunning && pressedKey === "l") {
        event.preventDefault();
        onLap();
      } else if (!isRunning && pressedKey === "r") {
        event.preventDefault();
        onReset();
      }
    };

    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [isRunning, onStart, onStop, onLap, onReset]);

  /**
   * Formats milliseconds into HH:mm:ss.SS format
   * @param ms milliseconds to format
   * @returns HH:mm:ss.SS representation
   */
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
      <p className="time">{formatTime(elapsed)}</p>
      {/*Conditionally render buttons*/}
      <div className="buttons">
        {isRunning ? (
          <>
            <StopWatchButton title={"Lap"} onPressed={onLap} />
            <div className="rightButton">
              <StopWatchButton
                title={"Stop"}
                onPressed={onStop}
                isStop={true}
              />
            </div>
          </>
        ) : (
          <>
            <StopWatchButton title={"Reset"} onPressed={onReset} />
            <div className="rightButton">
              <StopWatchButton
                title={"Start"}
                onPressed={onStart}
                isStart={true}
              />
            </div>
          </>
        )}
      </div>

      {/*Show current lap time once stopwatch has started*/}
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
