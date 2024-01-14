import React from "react";
import "./StopWatchButton.css";

interface ButtonProps {
  startTimer: () => void;
  stopTimer: () => void;
  lapTimer: () => void;
  resetTimer: () => void;
  stopped: boolean;
}
export default function StopWatchButton(props: ButtonProps) {
  return (
    <div className="container">
      <button className="button" onClick={props.startTimer}>
        {props.stopped ? "Start" : "Resume"}
      </button>
      <button className="button" onClick={props.stopTimer}>
        Stop
      </button>
      <button className="button" onClick={props.lapTimer}>
        Lap
      </button>
      <button className="button" onClick={props.resetTimer}>
        Reset
      </button>
    </div>
  );
}
