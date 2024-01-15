import React from "react";
import "./StopWatchButton.css";

export default function StopWatchButton(props: {isStarted: boolean, setIsStarted: (isStarted: boolean) => void}) {
    const isStarted = props.isStarted;
    const setIsStarted = props.setIsStarted;
  return (
    <div className="buttonrow">
      <button
        className={isStarted ? "button stopbutton" : "button startbutton"}
        onClick={() => setIsStarted(!isStarted)}
      >
        {isStarted ? "Stop" : "Start"}
      </button>
      <button className="button resetbutton">Reset</button>
      <button className="button lapbutton">Lap</button>
    </div>
  );
}
