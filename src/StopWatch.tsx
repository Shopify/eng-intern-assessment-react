import React from "react";
import { formatElapsedTime } from "./utils";
import styles from "./StopWatch.module.css";

interface StopWatchProps {
  elapsedTime: number;
}

export default function StopWatch({ elapsedTime }: StopWatchProps) {
  return <h1 className={styles.counter}>{formatElapsedTime(elapsedTime)}</h1>;
}
