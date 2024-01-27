import React from "react";
import "./StopWatchButton.css";

export default function StopWatchButton() {
  return (
    <main className="controls">
      <div className="buttons-container">
        <button className="lap-button">Lap</button>
        <button className="stop-button">Stop</button>
        <button className="start-button">Start</button>
        <button className="reset-button">Reset</button>
      </div>
    </main>
  );
}
