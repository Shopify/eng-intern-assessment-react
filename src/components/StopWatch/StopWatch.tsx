import React from "react";
import "./StopWatch.css";

export default function StopWatch() {
  return (
    <main className="stopwatch-container">
      <div className="stopwatch-numbers">
        <div>
          <p className="number">0</p>
          <p className="text">Hours</p>
        </div>
        <span>:</span>
        <div>
          <p className="number">0</p>
          <p className="text">Minutes</p>
        </div>
        <span>:</span>
        <div>
          <p className="number">0</p>
          <p className="text">Seconds</p>
        </div>
      </div>
    </main>
  );
}
