// A separate component that represents the stopwatch display.
import React, { useState, useEffect } from "react";
import StopWatchButton from "./StopWatchButton";

/*
  Props interface for the StopWatchProps.
  Represents the properties needed for controlling a stopwatch, including
  callbacks for start, reset, and lap functions, along with a label for the button
 */
interface StopWatchProps {
  onStartClick: () => void;
  onResetClick: () => void;
  onLapClick: () => void;
  laps: string[];
  label: string;
  formattedTime: string;
}

// props are being deconstructed along with the StopWatchProps destructured object, specifying that it should conform to the StopWatchProps
export default function StopWatch({
  label,
  onStartClick,
  onResetClick,
  onLapClick,
  laps,
  formattedTime,
}: StopWatchProps) {
  return (
    <div className="stop-watch-container">
      <div className="top-half">
        <div className="display">
          <p data-testid="digits-section" className="digits">
            {formattedTime}
          </p>
          <div className="display-headings">
            <p>hours</p>
            <p>mins</p>
            <p>secs</p>
            <p>milli-secs</p>
          </div>
        </div>
        <div className="controls-container">
          <StopWatchButton label={label} onClick={onStartClick} />
          {/* Passing the result of the ternary to populate the correct label based of the state isRunning on App.tsx */}
          <StopWatchButton label="Lap" onClick={onLapClick} />
          <StopWatchButton label="Reset" onClick={onResetClick} />
        </div>
      </div>
      <div className="bottom-half">
        <p>Laps</p>
        <div data-testid="laps-section" className="laps">
          <ul>
            {laps.map((lap, index) => (
              <li key={index}>
                <p>{`Lap ${index + 1}: ${lap}`}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
