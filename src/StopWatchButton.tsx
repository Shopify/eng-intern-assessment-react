// component that represents the start, stop, and reset buttons
import React from "react";

interface Props {
  updateStopState: (stop: boolean) => void;
  recordLap: () => void; 
  reset: () => void; 
}

export default function StopWatchButton({ updateStopState, recordLap, reset }: Props) {
  return (
    <div>
      <button onClick={() => reset()}>Reset</button>
      <button onClick={() => recordLap()}>Lap</button>
      <button onClick={() => updateStopState(false)}>Start</button>
      <button onClick={() => updateStopState(true)}>Stop</button>
    </div>
  );
}
