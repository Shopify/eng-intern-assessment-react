import React, { useState } from "react";
import { ButtonStatus, StatusChangeHandler } from "./types";
import "./styles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFlag,
  faPause,
  faPlay,
  faRotateRight,
} from "@fortawesome/free-solid-svg-icons";
// Interface for the properties of the StopWatchButton component
interface StopWatchButtonsProps {
  onStatusChange: StatusChangeHandler; // Function to handle status change
  time: {
    minutes: number;
    seconds: number;
    milliseconds: number;
  };
  onReset: () => void; // Function to handle reset action
  onLap: () => void; // Function to handle lap action
}

/**
 * The StopWatchButton component renders the control buttons for the stopwatch,
 * including play/pause, reset, and lap buttons.
 */
const StopWatchButton: React.FC<StopWatchButtonsProps> = ({
  onStatusChange,
  onReset,
  onLap,
  time,
}) => {
  // State for the current button status (Play/Pause)
  const [btnStatus, setBtnStatus] = useState<ButtonStatus>(ButtonStatus.Pause);

  // Handler for the play/pause button
  const handlePause = () => {
    const newStatus =
      btnStatus === ButtonStatus.Play ? ButtonStatus.Pause : ButtonStatus.Play;
    setBtnStatus(newStatus); // Update the status in the parent component
    onStatusChange(newStatus); // Handle any additional logic on status change
  };

  // Render the control buttons
  return (
    <div style={{ display: "flex" }}>
      {/* Reset Button */}
      <button
        data-testid="resetButton"
        className="resetButton"
        onClick={onReset}
        disabled={
          btnStatus === ButtonStatus.Play ||
          (time.minutes == 0 && time.seconds == 0 && time.milliseconds == 0)
            ? true
            : false
        }
      >
        <div className="iconContainer">
          <FontAwesomeIcon icon={faRotateRight} />
        </div>
      </button>

      {/* Play/Pause Button */}
      <button
        data-testid="playButton"
        className="playButton"
        onClick={handlePause}
      >
        <div className="iconContainer">
          <FontAwesomeIcon
            icon={btnStatus === ButtonStatus.Play ? faPause : faPlay}
          />
        </div>
      </button>

      {/* Lap Button */}
      <button
        data-testid="lapButton"
        className="lapButton"
        onClick={onLap}
        disabled={btnStatus === ButtonStatus.Play ? false : true}
      >
        <div className="iconContainer">
          <FontAwesomeIcon icon={faFlag} />
        </div>
      </button>
    </div>
  );
};

export default StopWatchButton;
