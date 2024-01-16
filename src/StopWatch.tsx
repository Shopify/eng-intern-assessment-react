import React from "react";
import "./styles/StopWatch.css";
import formatTime from "./FormatTime";
//Props for the stopwatch itself include isStarted, timer, and setTimer, these are used to get the timer and whether it is started or not from the main App component
export default function StopWatch(props: {
  isStarted: boolean;
  timer: number;
  setTimer: (timer: number) => void;
}) {
  const { isStarted, timer, setTimer } = props; //Destructuring props to get the variables needed

  // useEffect is used to update the timer every 10 milliseconds, this is what makes the stopwatch work
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
