import React, { useEffect, useState } from "react";

export default function StopWatchButton(props: {
  action: () => void;
  isRunning: boolean;
  hasStarted: boolean;
  kind: string;
  defaultLabel: string;
}) {
  const [label, setLabel] = useState(props.defaultLabel);
  const [isActive, setIsActive] = useState(true);

  //useEffect helps control the states of the different buttons based on their kind
  useEffect(() => {
    if (props.kind === "player") {
      if (!props.isRunning && !props.hasStarted) {
        setLabel("Start");
      } else if (!props.isRunning && props.hasStarted) {
        setLabel("Resume");
      } else {
        setLabel("Stop");
      }
    }

    //Reset is disabled if stopwatch has not started yet.
    if (props.kind === "reset") {
      if (!props.isRunning && !props.hasStarted) {
        setIsActive(false);
      } else {
        setIsActive(true);
      }
    }

    //Lap is disabled if stopwatch is not running.
    if (props.kind === "lap") {
      if (props.isRunning) {
        setIsActive(true);
      } else {
        setIsActive(false);
      }
    }
  }, [props.isRunning, props.hasStarted]);

  const handleClick = () => {
    props.action();
  };
  return (
    <button onClick={handleClick} disabled={!isActive}>
      {label}
    </button>
  );
}
