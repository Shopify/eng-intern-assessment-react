import React from "react";

interface ButtonProps {
    startTimer: () => void;
    stopTimer: () => void;
    lapTimer: () => void;
    resetTimer: () => void;
    
  }
export default function StopWatchButton(props: ButtonProps) {
  
  return (
    <div>
      <button onClick={props.startTimer}>Start</button>
      <button onClick={props.stopTimer}>Stop</button>
      <button onClick={props.lapTimer}>Lap</button>
      <button onClick={props.resetTimer}>Reset</button>
    </div>
  );
}
