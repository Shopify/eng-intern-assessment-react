import React, { useContext } from "react";
import "./StopWatchButton.css";
import { StopWatchContext } from "../StopWatch/StopWatch";

/**
 * * This component displays the button and communicates with the stopwatch via useContext.
 * * I chose to make the Reset button disapper when the stopwatch is stopped, this was based on the Apple stopwatch.
 * * I reviewed the test cases and saw the resume/pause buttons!
 **/

export default function StopWatchButton() {
  const StopWatchContextInButton = useContext(StopWatchContext);
  const StopWatchContextStopCase = () => {
    if (
      StopWatchContextInButton.command === "stop" ||
      StopWatchContextInButton.command === "pause" ||
      StopWatchContextInButton.command === "inital"
    ) {
      return "none";
    } else {
      return "";
    }
  };

  const StopWatchContextStartCase = () => {
    if (StopWatchContextInButton.command === "inital") {
      return "";
    } else {
      return "none";
    }
  };

  const StopWatchContextResumePauseCase = () => {
    if (StopWatchContextInButton.command === "inital") {
      return "none";
    } else {
      return "";
    }
  };

  return (
    <div>
      <div className="stop-watch-button-flex" id="button-list">
        <button
          id="start-button"
          className="stop-watch-button-button"
          onClick={() => {
            StopWatchContextInButton.setCommand("start");
          }}
          style={{
            display: `${StopWatchContextStartCase()}`,
          }}
        >
          Start
        </button>
        <div
          className="stop-watch-button-resume-pause-flex"
          style={{
            display: `${StopWatchContextResumePauseCase()}`,
          }}
        >
          <button
            id="resume-button"
            className="stop-watch-button-button"
            onClick={() => {
              StopWatchContextInButton.setCommand("pause");
            }}
          >
            Pause
          </button>
          <button
            id="pause-button"
            className="stop-watch-button-button"
            onClick={() => {
              StopWatchContextInButton.setCommand("resume");
            }}
          >
            Resume
          </button>
        </div>

        <button
          id="stop-button"
          className="stop-watch-button-button"
          onClick={() => {
            StopWatchContextInButton.setCommand("stop");
          }}
        >
          Stop
        </button>
        <button
          id="reset-button"
          className="stop-watch-button-button"
          onClick={() => {
            StopWatchContextInButton.setCommand("reset");
          }}
        >
          Reset
        </button>
        <button
          id="lap-button"
          data-testid="lap-button"
          className="stop-watch-button-button"
          onClick={() => {
            StopWatchContextInButton.setCommand("lap");
          }}
          style={{
            display: `${StopWatchContextStopCase()}`,
          }}
        >
          Lap
        </button>
      </div>
    </div>
  );
}
