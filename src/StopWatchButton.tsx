import React from "react";

interface ButtonProps {
    startTimer: () => void;
    stopTimer: () => void;
    lapTimer: () => void;
    resetTimer: () => void;
    stopped: boolean
  }
export default function StopWatchButton(props: ButtonProps) {
  
  return (
    <div>
      <button onClick={props.startTimer}>{props.stopped? "Start" : "Resume"}</button>
      <button onClick={props.stopTimer}>Stop</button>
      <button onClick={props.lapTimer}>Lap</button>
      <button onClick={props.resetTimer}>Reset</button>
    </div>
  );
}
