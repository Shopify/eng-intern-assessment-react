import React, { useEffect, useState } from "react";

interface stopWatchProps {
  time: number;
  lapTimes: number[];
  laps: number;
}

export default function StopWatch(props: stopWatchProps) {
  // converts number to a string and pads with '0' if single digit number
  function padNumbers(num: number) {
    return num.toString().padStart(2, "0");
  }
  // convert each value to correct value, format and pads number
  function formatNumbers(time: number) {
    const unFormattedMinutes = Math.floor((time / 60000) % 60);
    const unFormattedSeconds = Math.floor((time / 1000) % 60);
    const unFormattedMilliseconds = Math.floor((time / 10) % 100);

    const minutes = padNumbers(unFormattedMinutes);
    const seconds = padNumbers(unFormattedSeconds);
    const milliseconds = padNumbers(unFormattedMilliseconds);
    return `${minutes}:${seconds}:${milliseconds}`;
  }

  return (
    <div id="stopwatch-display">
      <div>
        <p id="stopwatch-text">{formatNumbers(props.time)}</p>
      </div>
      {props.laps > 0 ? (
        <div className={"lap-list"} title="lap-list" role="list">
          {props.lapTimes
            .slice()
            .reverse()
            .map((lapTime, index) => (
              <ul className="lap-time" title={`Lap # ${index + 1}`} key={index}>
                Lap #{props.laps - index} {formatNumbers(lapTime)}
              </ul>
            ))}
        </div>
      ) : null}
    </div>
  );
}
