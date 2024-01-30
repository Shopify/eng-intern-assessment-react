import React from "react";
import "./Stopwatch.css";

interface StopWatchProps {
  time: number;
}

const StopWatch: React.FC<StopWatchProps> = ({ time }) => {
  return (
    <div>
      <p className="timeDisplay">
        {("0" + Math.floor((time / 60000) % 60)).slice(-2)}:
        {("0" + Math.floor((time / 1000) % 60)).slice(-2)}.
        {("0" + ((time / 10) % 100)).slice(-2)}
      </p>
    </div>
  );
};
export default StopWatch;
