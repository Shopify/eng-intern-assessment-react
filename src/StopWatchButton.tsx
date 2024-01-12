import React from "react";
import "./styles/StopWatchButton.css";
import { StopWatchButtonProps } from "../types/stopwatchTypes";

const StopWatchButton: React.FC<StopWatchButtonProps> = ({
  label,
  onClick,
  buttonType,
  disabled = false,
}) => {
  return (
    <button
      className={`stopwatch-button stopwatch-button--${buttonType}`}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
};

export default StopWatchButton;
