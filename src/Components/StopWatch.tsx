// A separate component that represents the stopwatch display.
import React, { useState, useEffect } from "react";
import StopWatchButton from "./StopWatchButton";

/*
  Props interface for the StopWatchProps.
  Represents the properties needed for controlling a stopwatch, including
  callbacks for start, reset, and lap functions, along with a label for the button
 */
type StopWatchProps = {
  onStartClick: () => void;
  onResetClick: () => void;
  onLapClick: () => void;
  label: string;
};

// props are being deconstructed along with the StopWatchProps destructured object, specifying that it should conform to the StopWatchProps
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
          <StopWatchButton label={label} onClick={onStartClick} />{" "}
          {/* Passing the result of the ternary to populate the correct label based of the state isRunning on App.tsx */}
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
