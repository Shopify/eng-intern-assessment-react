import React from "react";
import "./StopWatch.css";
export default function StopWatch(props: { isStarted: boolean, timer: number, setTimer: (timer: number) => void }) {
  const isStarted = props.isStarted;
  function formatTime(time: number): string {
    const hours = Math.floor(time / 360000);
    const minutes = Math.floor((time % 360000) / 6000);
    const seconds = Math.floor((time % 6000) / 100);
    const milliseconds = time % 100;
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}:${milliseconds.toString().padStart(2, "0")}`;
  }
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
