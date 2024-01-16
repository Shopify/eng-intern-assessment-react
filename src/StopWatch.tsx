import React from "react";
import "./styles/StopWatch.css";
import formatTime from "./FormatTime";
export default function StopWatch(props: {
  isStarted: boolean;
  timer: number;
  setTimer: (timer: number) => void;
}) {
  const isStarted = props.isStarted;
  const timer = props.timer;
  const setTimer = props.setTimer;

  React.useEffect(() => {
    if (isStarted) {
      const interval = setInterval(() => {
        setTimer(timer + 1);
      }, 10);
      return () => clearInterval(interval);
    }
  }, [isStarted, timer]);
  return <div className="stopwatch">{formatTime(timer)}</div>;
}
