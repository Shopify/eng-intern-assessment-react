import React, { useState } from "react";
import "./Stopwatch.css";

type StopWatchProps = {
  timer: string;
};

export default function StopWatch({ timer }: StopWatchProps) {
  // Split timer string into individual characters
  const [hours, minutes, secondsMs] = timer.split(":");
  const [seconds, milliseconds] = secondsMs.split(".");

  return (
    <div className="stopwatch">
      {/* Hours */}
      <div className="digit" data-testid="hours-1">
        {hours[0]}
      </div>
      <div className="digit" data-testid="hours-2">
        {hours[1]}
      </div>
      <div className="colon">:</div>

      {/* Minutes */}
      <div className="digit" data-testid="min-1">
        {minutes[0]}
      </div>
      <div className="digit" data-testid="min-2">
        {minutes[1]}
      </div>
      <div className="colon">:</div>

      {/* Seconds */}
      <div className="digit" data-testid="seconds-1">
        {seconds[0]}
      </div>
      <div className="digit" data-testid="seconds-2">
        {seconds[1]}
      </div>
      <div className="dot">.</div>

      {/* Milliseconds */}
      <div className="digit" data-testid="ms-1">
        {milliseconds[0]}
      </div>
      <div className="digit" data-testid="ms-2">
        {milliseconds[1]}
      </div>
      <div className="digit" data-testid="ms-3">
        {milliseconds[2]}
      </div>
    </div>
  );
}
