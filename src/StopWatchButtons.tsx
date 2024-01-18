import React from "react";
import Button from "./Button";
import styles from "./StopWatchButtons.module.css";
import { StopWatchState, getMainButtonText } from "./utils";

interface StopWatchButtonProps {
  state: StopWatchState;
  onStartClick: () => void;
  onLapClick: () => void;
  onResetClick: () => void;
}

export default function StopWatchButtons(props: StopWatchButtonProps) {
  return (
    <div className={styles.buttonRow}>
      <Button onClick={props.onStartClick}>
        {getMainButtonText(props.state)}
      </Button>
      <Button disabled={!props.state.isRunning} onClick={props.onLapClick}>
        Lap
      </Button>
      <Button
        disabled={props.state.elapsedTime === 0}
        onClick={props.onResetClick}
        danger
      >
        Reset
      </Button>
    </div>
  );
}
