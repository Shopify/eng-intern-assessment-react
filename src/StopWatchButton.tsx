import React, { useState } from "react";

interface ChildProps {
  onTimerEvent: (comand: string) => void;
}

export default function StopWatchButton({ onTimerEvent }: ChildProps) {
  const [hasStarted, setHasStarted] = useState(false);

  const handleStartStop = () => {
    if (hasStarted) {
      setHasStarted(false);
      onTimerEvent("stop");
    } else {
      setHasStarted(true);
      onTimerEvent("start");
    }
  };

  const handleLapReset = () => {
    if (hasStarted) {
      onTimerEvent("lap");
    } else {
      onTimerEvent("reset");
    }
  };

  return (
    <div>
      <button onClick={handleStartStop}>{hasStarted ? "Stop" : "Start"}</button>
      <button onClick={handleLapReset}>{hasStarted ? "Lap" : "Reset"}</button>
    </div>
  );
}
