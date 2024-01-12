import React from "react";
import "./styles/StopWatchButton.css";
import { StopWatchButtonProps } from "../types/stopwatchTypes";

const StopWatchButton: React.FC<StopWatchButtonProps> = ({
  label,
  onClick,
  buttonType,
}) => {
  return (
    <button
      className={`stopwatch-button stopwatch-button--${buttonType}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default StopWatchButton;
