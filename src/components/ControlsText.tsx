import React from "react";
import "./../css/ControlsText.css";

const ControlsText: React.FC = () => {
  return (
    <div className="controls-text">
      <h3>Controls</h3>
      <p>Space - Start/Stop</p>
      <p>Enter - Lap</p>
      <p>W - Increase Workout Level</p>
      <p>R - Reset</p>
    </div>
  );
};

export default ControlsText;
