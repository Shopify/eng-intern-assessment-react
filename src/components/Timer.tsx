import React from "react";
import dateFormatter from "../utils/TimeFormatter";

interface TimerProps {
  time: number;
  lapTime: number;
}

export default function Timer({ time, lapTime }: TimerProps) {
  return (
    <div className="timer">
      <div className="main-timer">
        <h2 className="digits">{dateFormatter.formatTimerTime(time)}</h2>
      </div>
      <div className="lap-timer">
        <h2 className="digits">{dateFormatter.formatTimerTime(lapTime)}</h2>
      </div>
    </div>
  );
}
