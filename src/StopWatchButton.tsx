import React from "react";

interface StopWatchButtonProps {
  start: () => void;
  stop: () => void;
  reset: () => void;
  lap: () => void;
}

export default function StopWatchButton({
  start,
  stop,
  lap,
  reset,
}: StopWatchButtonProps) {
  return (
    <div className="buttons">
      <button className="btn btn-start" onClick={start}>
        Start
      </button>
      <button className="btn btn-stop" onClick={stop}>
        Stop
      </button>
      <button className="btn btn-lap" onClick={lap}>
        Lap
      </button>
      <button className="btn btn-reset" onClick={reset}>
        Reset
      </button>
    </div>
  );
}
