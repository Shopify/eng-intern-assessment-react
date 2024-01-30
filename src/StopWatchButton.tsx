import React from "react";

interface StopwatchButtonProps {
  start: () => void;
  stop: () => void;
  reset: () => void;
  lap: () => void;
  counting: boolean;
}

const StopWatchButton: React.FC<StopwatchButtonProps> = ({
  start,
  stop,
  reset,
  lap,
  counting,
}) => {
  return (
    <div>
      {!counting && <button onClick={start}>Start</button>}
      {counting && <button onClick={stop}>Stop</button>}
      <button onClick={reset}>Reset</button>
      <button onClick={lap}>Lap</button>
    </div>
  );
};
export default StopWatchButton;
