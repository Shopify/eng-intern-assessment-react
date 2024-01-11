import React, { useEffect, useState } from "react";
import StopWatchButton from "./StopWatchButton";
import Styles from "./Styles/Styles";
import padNumber from "./Helper/PadNumbers";

const StopWatch = () => {
  // Used states to hold the variables that would change during the page
  const [time, setTime] = useState(0);
  const [isRunning, setRunning] = useState(false);
  const [laps, setLaps] = useState([]);

  // Used the React useEffect to increment the timer
  useEffect(() => {
    if (isRunning) {
      let id = setInterval(() => setTime(time + 1));
      return () => clearInterval(id);
    }
  }, [time, isRunning]);

  // Functions that are called when buttons are pressed
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

  // Calculated the types of seconds based on the current timer
  // Used a helper function to format the numbers correctly
  const milliseconds = padNumber(time % 100, 2);
  const seconds = padNumber((time % 6000) / 100, 2);
  const minutes = padNumber((time % 360000) / 6000, 2);

  // I created a style class called Styles.tsx to hold all my css
  // I wasn't sure if we were allowed to import libaries (such as styled-components)

  return (
    <div>
      {/* The Timer */}
      <div style={Styles.timer}>
        {minutes}:{seconds}:{milliseconds}
      </div>
      {/* The Buttons */}
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

      {/* The Laps */}
      {/* I decided to only show the laps title if there was already a lap stored */}
      {laps.length > 0 && <div style={Styles.title}> Laps </div>}
      {/* Creates a row for each lap that was stored */}
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
