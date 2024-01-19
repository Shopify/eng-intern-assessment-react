// component that represents the start, stop, and reset buttons
import React from "react";

interface Props {
  updateStop: (stop: boolean) => void;
  recordLap: () => void; 
  reset: () => void; 
}

export default function StopWatchButton({ updateStop, recordLap, reset }: Props) {
  return (
    <div>
      <button onClick={() => reset()}>Reset</button>
      <button onClick={() => recordLap()}>Lap</button>
      <button onClick={() => updateStop(false)}>Start</button>
      <button onClick={() => updateStop(true)}>Stop</button>
    </div>
  );
}
