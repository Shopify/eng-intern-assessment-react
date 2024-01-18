import React from "react";

// defining types for typescript!
interface Props {
  start: () => void;
  stop: () => void;
  reset: () => void;
  lap: () => void;
}

export default function StopWatchButton({ start, stop, reset, lap }: Props) {
  return (
    <div>
      <button onClick={start}>Start</button>
      <button onClick={stop}>Stop</button>
      <button onClick={reset}>Reset</button>
      <button onClick={lap}>Lap</button>
    </div>
  );
}
