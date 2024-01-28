import React from "react";
import "./styles/StopWatchButton.css";

interface StopWatchButtonProps {
  onClick: () => void;
  label: string;
}

const StopWatchButton: React.FC<StopWatchButtonProps> = ({
  onClick,
  label,
}) => {
  return (
    <button className="stopwatch-button" onClick={onClick}>
      {label}
    </button>
  );
};

export default StopWatchButton;
