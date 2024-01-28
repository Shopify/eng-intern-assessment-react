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
    <div id="sw-buttons">
      <button id={hasStarted? "stop" : "start"} onClick={handleStartStop}>{hasStarted ? "Stop" : "Start"}</button>
      <button id="reset" onClick={handleLapReset}>{hasStarted ? "Lap" : "Reset"}</button>
    </div>
  );
}
