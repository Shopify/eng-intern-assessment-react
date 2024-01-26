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
  const [className, setClassName] = useState("");

  //useEffect helps control the states of the different buttons based on their kind
  useEffect(() => {
    if (props.kind === "player") {
      setClassName("player");
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
      setClassName("reset");
      if (!props.isRunning && !props.hasStarted) {
        setIsActive(false);
      } else {
        setIsActive(true);
      }
    }

    //Lap is disabled if stopwatch is not running.
    if (props.kind === "lap") {
      setClassName("lap-button");
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
    <button className={className} onClick={handleClick} disabled={!isActive}>
      {label}
    </button>
  );
}
