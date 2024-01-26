import React, { useEffect, useState } from "react";
import { IonIcon } from "@ionic/react";
import { play, refresh, stopwatch, pause } from "ionicons/icons";

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
  const [iconName, setIconName] = useState(null);

  //useEffect helps control the states of the different buttons based on their kind
  useEffect(() => {
    if (props.kind === "player") {
      setClassName("player");
      if (!props.isRunning && !props.hasStarted) {
        setLabel("Start");
        setIconName(play);
      } else if (!props.isRunning && props.hasStarted) {
        setLabel("Resume");
        setIconName(play);
      } else {
        setLabel("Stop");
        setIconName(pause);
      }
    }

    //Reset is disabled if stopwatch has not started yet.
    if (props.kind === "reset") {
      setClassName("reset");
      setIconName(refresh);
      if (!props.isRunning && !props.hasStarted) {
        setIsActive(false);
      } else {
        setIsActive(true);
      }
    }

    //Lap is disabled if stopwatch is not running.
    if (props.kind === "lap") {
      setClassName("lap-button");
      setIconName(stopwatch);
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
    <button
      className={`${className} ${label}`}
      onClick={handleClick}
      disabled={!isActive}
      data-testid={className}
    >
      <IonIcon icon={iconName} className={`icon ${label}`} />
      <span>{label}</span>
    </button>
  );
}
