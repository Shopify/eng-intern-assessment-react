import React from "react";
import StopWatchButton from "../StopWatchButton";
import LapsRecord from "../LapsRecord";
import { useStopWatch } from "../../hooks/useStopWatch";
import styles from "./StopWatch.module.css";

export default function StopWatch() {
  const {
    isRunning,
    time,
    laps,
    startHandler,
    pauseHandler,
    resetHandler,
    lapHandler,
  } = useStopWatch();

  return (
    <>
      <div className={styles.timerContainer}>
        <p className={styles.timer} data-testid="timer">
          {time}
        </p>
        <div className={styles.buttonContainer}>
          <StopWatchButton onClick={!isRunning ? startHandler : pauseHandler}>
            {!isRunning ? "Start" : "Stop"}
          </StopWatchButton>
          <StopWatchButton onClick={lapHandler} disabled={!isRunning}>
            Lap
          </StopWatchButton>
          <StopWatchButton onClick={resetHandler}>Reset</StopWatchButton>
        </div>
      </div>
      {laps.length > 0 ? <LapsRecord lapsData={laps} /> : null}
    </>
  );
}
