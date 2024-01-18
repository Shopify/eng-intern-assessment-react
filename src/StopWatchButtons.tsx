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

interface StopWatchButtonsProps {
  onStatusChange: StatusChangeHandler;
  onReset: () => void;
  onLap: () => void;
}

const StopWatchButtons: React.FC<StopWatchButtonsProps> = ({
  onStatusChange,
  onReset,
  onLap,
}) => {
  const [btnStatus, setBtnStatus] = useState<ButtonStatus>(ButtonStatus.Pause);

  const handlePause = () => {
    const newStatus =
      btnStatus === ButtonStatus.Play ? ButtonStatus.Pause : ButtonStatus.Play;
    setBtnStatus(newStatus); // Update the status in the parent component
    onStatusChange(newStatus); // Handle any additional logic on status change
  };

  return (
    <div style={{ display: "flex" }}>
      <button
        className="resetButton"
        onClick={onReset}
        disabled={btnStatus === ButtonStatus.Play ? true : false}
      >
        <div className="iconContainer">
          <FontAwesomeIcon icon={faRotateRight} />
        </div>
      </button>
      <button className="playButton" onClick={handlePause}>
        <div className="iconContainer">
          <FontAwesomeIcon
            icon={btnStatus === ButtonStatus.Play ? faPause : faPlay}
          />
        </div>
      </button>
      <button
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

export default StopWatchButtons;
