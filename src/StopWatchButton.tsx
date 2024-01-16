import React, { useContext } from "react";
// Context
import RunningContext from "./Context/RunningContext";
import TimeContext from "./Context/TimeContext";
import LapContext from "./Context/LapContext";
// Styles
import "./Styles/StopWatchButtons.css";

export default function StopWatchButton() {
  const { running, changeRunning } = useContext(RunningContext);
  const { time, setTime } = useContext(TimeContext);
  const { addLap, clearLap, resetCounter } = useContext(LapContext);

  const handleLapResetClick = () => {
    if (running) {
      addLap(time);
    } else {
      setTime(0);
      clearLap();
      resetCounter();
    }
  };

  return (
    <div>
      <button onClick={changeRunning} className="startStop">
        {running ? "Stop" : "Start"}
      </button>
      <button onClick={handleLapResetClick} className="restartLap">
        {running ? "Lap" : "Reset"}
      </button>
    </div>
  );
}
