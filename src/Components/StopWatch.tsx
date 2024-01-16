// A separate component that represents the stopwatch display.
import React, { useState, useEffect } from "react";
import StopWatchButton from "./StopWatchButton";

interface StopWatchProps {
  onStartClick: () => void;
  onResetClick: () => void;
  onLapClick: () => void;
  label: string;
}

export default function StopWatch({
  label,
  onStartClick,
  onResetClick,
  onLapClick,
}: StopWatchProps) {
  return (
    <>
      <div className="stop-watch-container">
        <div className="display">
          <p className="digits">
            <span>00</span>:<span>00</span>.<span>00</span>
          </p>
        </div>
        <div className="controls-container">
          <StopWatchButton label={label} onClick={onStartClick} />
          <StopWatchButton label="Lap" onClick={onLapClick} />
          <StopWatchButton label="Reset" onClick={onResetClick} />
        </div>
        <div className="laps">
          <ul>{/* lap entries will go here */}</ul>
        </div>
      </div>
    </>
  );
}
