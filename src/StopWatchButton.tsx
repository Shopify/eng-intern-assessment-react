import React from "react";

interface BtnComponentProps {
  status: number;
  start: () => void;
  pause: () => void;
  stop: () => void;
  reset: () => void;
  resume: () => void;
  recordLap: () => void;
}

const StopWatchButton: React.FC<BtnComponentProps> = (props) => {
  return (
    <div>
      {props.status === 0 ? (
        <button
          className="stopwatch-btn stopwatch-btn-gre"
          onClick={props.start}
        >
          Start
        </button>
      ) : (
        ""
      )}

      {props.status === 1 ? (
        <div>
          <button
            className="stopwatch-btn stopwatch-btn-pur"
            onClick={props.pause}
          >
            Pause
          </button>
          <button
            className="stopwatch-btn stopwatch-btn-red"
            onClick={props.stop}
          >
            Stop
          </button>
          <button
            className="stopwatch-btn stopwatch-btn-yel"
            onClick={props.reset}
          >
            Reset
          </button>
          <button
            className="stopwatch-btn stopwatch-btn-blu"
            onClick={props.recordLap}
          >
            Lap
          </button>
        </div>
      ) : (
        ""
      )}

      {props.status === 2 ? (
        <div>
          <button
            className="stopwatch-btn stopwatch-btn-gre"
            onClick={props.resume}
          >
            Resume
          </button>
          <button
            className="stopwatch-btn stopwatch-btn-yel"
            onClick={props.reset}
          >
            Reset
          </button>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default StopWatchButton;
