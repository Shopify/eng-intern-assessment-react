import React, { useState } from "react";

//props for StopWatchButton
interface StopWatchButtonProps {
  onStart: () => void;
  onStop: () => void;
  onReset: () => void;
  onLap: () => void;
  isRunning: boolean;
}

const StopWatchButton: React.FC<StopWatchButtonProps> = ({
  onStart,
  onStop,
  onReset,
  onLap,
  isRunning,
}) => {
  // track currently selected button
  const [selectedButton, setSelectedButton] = useState<string | null>(null);

  // button clicks, set selectedbutton state based on clicked
  const handleButtonClick = (action: string, callback: () => void) => {
    setSelectedButton(action);
    callback();
  };

  return (
    <div>
      <button
        className={`btn ${selectedButton === "start" ? "selected" : ""}`}
        onClick={() => handleButtonClick("start", onStart)}
        disabled={isRunning}
      >
        Start
      </button>
      <button
        className={`btn ${selectedButton === "stop" ? "selected" : ""}`}
        onClick={() => handleButtonClick("stop", onStop)}
        disabled={!isRunning}
      >
        Stop
      </button>
      <button
        className={`btn ${selectedButton === "reset" ? "selected" : ""}`}
        onClick={() => handleButtonClick("reset", onReset)}
      >
        Reset
      </button>
      <button
        className={`btn ${selectedButton === "lap" ? "selected" : ""}`}
        onClick={() => handleButtonClick("lap", onLap)}
        disabled={!isRunning}
      >
        Lap
      </button>
    </div>
  );
};

export default StopWatchButton;
