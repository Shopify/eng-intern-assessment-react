import React from "react";
import { StopWatchButtonProps } from "../../StopWatchInterface";
import "./StopWatchButton.css";

export default function StopWatchButton({
  buttonType, //Button Type determines the text and class
  handleStopwatchButton, // handleStopwatchButton is the functionality of onClick
}: StopWatchButtonProps) {
  return (
    <button
      className={`stop_watch_button ${buttonType.toLowerCase()}`}
      onClick={handleStopwatchButton}
    >
      {buttonType}
    </button>
  );
}
