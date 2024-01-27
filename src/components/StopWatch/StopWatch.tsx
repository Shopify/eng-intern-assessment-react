import React from "react";
import "./StopWatch.css";

type Props = {
  // Array containing the display time values for hours, minutes, and seconds
  displayTime: Array<number | string>;
};

export default function StopWatch({ displayTime }: Props) {
  return (
    <main className="stopwatch-container">
      <div className="stopwatch-numbers">
        <div>
          <p className="number">{displayTime[0]}</p>
          <p className="text">Hours</p>
        </div>
        <span>:</span>
        <div>
          <p className="number">{displayTime[1]}</p>
          <p className="text">Minutes</p>
        </div>
        <span>:</span>
        <div>
          <p className="number">{displayTime[2]}</p>
          <p className="text">Seconds</p>
        </div>
      </div>
    </main>
  );
}
