import React, { useState } from "react";

/* 
This component is responsible for rendering the buttons
and handling the user input. It takes a function as a prop, 
and depending on the button pressed, it will call that function.
  __________________________________________________________________
  |                                                                |
  |  Props:                                                        |
  |    onTimerEvent: (comand: string) => void                      |
  |                                                                |
  |  State:                                                        |
  |    hasStarted: boolean                                         |
  |                                                                |
  |  Methods:                                                      |
  |    handleStartStop(): void                                     |
  |    handleLapReset(): void                                      | 
  |                                                                |
  |________________________________________________________________|
  */

interface ChildProps {
  onTimerEvent: (comand: string) => void;
}

export default function StopWatchButton({ onTimerEvent }: ChildProps) {
  const [hasStarted, setHasStarted] = useState(false); // Used to keep track of if the timer is running

  // handles start and stop
  // If the timer has started, it will stop it, and vice versa
  const handleStartStop = () => {
    if (hasStarted) {
      setHasStarted(false);
      onTimerEvent("stop");
    } else {
      setHasStarted(true);
      onTimerEvent("start");
    }
  };

  // handles lap and reset
  // If the timer has started, it will lap it
  // If the timer has not started, it will reset it
  const handleLapReset = () => {
    if (hasStarted) {
      onTimerEvent("lap");
    } else {
      onTimerEvent("reset");
    }
  };

  return (
    <div id="sw-buttons">
      <button id={hasStarted ? "stop" : "start"} onClick={handleStartStop}>
        {hasStarted ? "Stop" : "Start"}
      </button>
      <button id="reset" onClick={handleLapReset}>
        {hasStarted ? "Lap" : "Reset"}
      </button>
    </div>
  );
}
