import React from "react";
import "../styles/StopWatch.css";

interface StopWatchProps {
  time: number;
}

const StopWatch: React.FC<StopWatchProps> = ({ time }) => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60); // Round down to the nearest whole number
  const milliseconds = Math.floor((time % 1) * 100);

  return (
    <div className="stopwatch">
      <h1 className="stopwatch-time">
        {minutes}:{seconds < 10 ? `0${seconds}` : seconds}.
        {milliseconds < 10 ? `0${milliseconds}` : milliseconds}
      </h1>
    </div>
  );
};

export default StopWatch;
