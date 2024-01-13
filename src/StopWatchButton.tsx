import React from "react";

interface ButtonProps {
    startTimer: () => void;
    stopTimer: () => void;
    loopTimer: () => void;
    resetTImer: () => void;
    
  }
export default function StopWatchButton(props: ButtonProps) {
  
  return (
    <div>
      <button onClick={props.startTimer}>Start</button>
      <button onClick={props.stopTimer}>Stop</button>
      <button onClick={props.loopTimer}>Loop</button>
      <button onClick={props.resetTImer}>Reset</button>
    </div>
  );
}
