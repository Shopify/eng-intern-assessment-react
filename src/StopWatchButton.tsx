// component that represents the start, stop, and reset buttons
import React from "react";

interface Props {
  updateStop: (stop: boolean) => void;
  recordLap: () => void; 
}

export default function StopWatchButton({ updateStop, recordLap }: Props) {
  return (
    <div>
      <button onClick={() => recordLap()}>Lap</button>
      <button onClick={() => updateStop(false)}>Start</button>
      <button onClick={() => updateStop(true)}>Stop</button>
    </div>
  );
}
