// A separate component that represents the stopwatch display.
import React, { useState, useEffect } from "react";
import StopWatchButton from "./StopWatchButton";

interface StopWatchProps {
  onStartClick: () => void;
}

export default function StopWatch({ onStartClick }: StopWatchProps) {
  return (
    <>
      <div className="stop-watch-container">
        <div className="display">
          <p className="digits">
            <span>00</span>:<span>00</span>.<span>00</span>
          </p>
        </div>
        <div className="controls-container">
          <StopWatchButton onClick={onStartClick} />
          <StopWatchButton />
          <StopWatchButton />
        </div>
        <div className="laps">
          <ul>{/* lap entries will go here */}</ul>
        </div>
      </div>
    </>
  );
}
