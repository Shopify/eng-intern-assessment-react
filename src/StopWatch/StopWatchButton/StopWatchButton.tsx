import React from "react";
import { StopWatchButtonProps } from "../../StopWatchInterface";
import "./StopWatchButton.css";

export default function StopWatchButton({
  buttonType,
  handleStopwatchButton,
}: StopWatchButtonProps) {
  return (
    <button
      className= {`stop_watch_button ${buttonType.toLowerCase()}`}
      onClick={handleStopwatchButton}
    >
      {buttonType}
    </button>
  );
}
