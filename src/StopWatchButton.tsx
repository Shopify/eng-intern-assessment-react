import React from "react";
import "./styles/StopWatchButton.css";

export default function StopWatchButton(props: {
  isStarted: boolean;
  setIsStarted: (isStarted: boolean) => void;
  setTimer: (timer: number) => void;
  addLap: () => void;
}) {
  const isStarted = props.isStarted;
  const setTimer = props.setTimer;
  const setIsStarted = props.setIsStarted;
  const addLap = props.addLap;
  return (
    <div className="buttonrow">
      <button
        className={isStarted ? "button stopbutton" : "button startbutton"}
        onClick={() => setIsStarted(!isStarted)}
      >
        {isStarted ? "Stop" : "Start"}
      </button>
      <button onClick={() => setTimer(0)} className="button resetbutton">
        Reset
      </button>
      <button onClick={() => addLap()} className="button lapbutton">
        Lap
      </button>
    </div>
  );
}
