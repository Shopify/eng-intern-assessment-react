import React, { useEffect, useState } from "react";
import StopWatchButton from "./StopWatchButton";
import Styles from "./Styles";

const StopWatch = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setRunning] = useState(false);
  const [laps, setLaps] = useState([]);

  useEffect(() => {
    if (isRunning) {
      let id = setInterval(() => setTime(time + 1));
      return () => clearInterval(id);
    }
  }, [time, isRunning]);

  const start = () => {
    setRunning(true);
  };

  const stop = () => {
    setRunning(false);
  };

  const reset = () => {
    setRunning(false);
    setLaps([]);
    setTime(0);
  };

  const lap = () => {
    setLaps([...laps, { min: minutes, sec: seconds, ms: milliseconds }]);
  };

  function padNumber(num: number, pad: number) {
    return Math.floor(num).toString().padStart(pad, "0");
  }

  const milliseconds = padNumber(time % 100, 2);
  const seconds = padNumber((time % 6000) / 100, 2);
  const minutes = padNumber((time % 360000) / 6000, 2);

  return (
    <div>
      <div style={Styles.timer}>
        {minutes}:{seconds}:{milliseconds}
      </div>
      <div style={Styles.buttonGrid}>
        <StopWatchButton
          style={Styles.button}
          text={"Start"}
          pressed={start}
          disabled={isRunning}
        />
        <StopWatchButton
          style={Styles.button}
          text={"Stop"}
          pressed={stop}
          disabled={!isRunning}
        />
        <StopWatchButton
          style={Styles.button}
          text={"Reset"}
          pressed={reset}
          disabled={false}
        />
        <StopWatchButton
          style={Styles.button}
          text={"Lap"}
          pressed={lap}
          disabled={!isRunning}
        />
      </div>
      {laps.length > 0 && <div style={Styles.title}> Laps </div>}
      {laps.length > 0 &&
        laps.map((l, index) => {
          return (
            <div style={Styles.grid}>
              <div> Lap {index}: </div>
              <div>
                {l.min}:{l.sec}:{l.ms}
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default StopWatch;
