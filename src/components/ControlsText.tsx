import React from "react";
import "./../css/ControlsText.css";

const ControlsText: React.FC = () => {
  return (
    <div
      className="controls-text"
      role="complementary"
      aria-labelledby="controls-heading"
    >
      <h3 id="controls-heading">Controls</h3>
      <p>
        <kbd>Space</kbd> -{" "}
        <span aria-label="Start or Stop the timer">Start/Stop</span>
      </p>
      <p>
        <kbd>Enter</kbd> - <span aria-label="Record a lap">Lap</span>
      </p>
      <p>
        <kbd>W</kbd> -{" "}
        <span aria-label="Increase workout level">Increase Workout Level</span>
      </p>
      <p>
        <kbd>R</kbd> -{" "}
        <span aria-label="Reset the timer and statistics">Reset</span>
      </p>
    </div>
  );
};

export default ControlsText;
