import React from "react";

interface TimerProps {
  time: number;
}

export default function Timer({ time }: TimerProps) {
  return (
    <div className="main-timer">
      <h2 className="digits">
        {("0" + Math.floor((time / 60000) % 60)).slice(-2) +
          " : " +
          ("0" + Math.floor((time / 1000) % 60)).slice(-2) +
          " . " +
          ("0" + ((time / 10) % 100)).slice(-2)}
      </h2>
    </div>
  );
}
