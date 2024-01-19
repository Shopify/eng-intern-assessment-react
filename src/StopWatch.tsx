import React, { useEffect, useState } from "react";

interface StopWatchProps {
  time: number;
  lapTimes: number[];
  laps: number;
}

export default function StopWatch(props: StopWatchProps) {
  // converts number to a string and pads with '0' if single digit number
  function padNumbers(num: number) {
    return num.toString().padStart(2, "0");
  }
  // convert each value to correct value, format and pads number in return statement
  function formatNumbers(time: number) {
    const minutes = Math.floor((time / 60000) % 60);
    const seconds = Math.floor((time / 1000) % 60);
    const milliseconds = Math.floor((time / 10) % 100);
    return `${padNumbers(minutes)}:${padNumbers(seconds)}:${padNumbers(
      milliseconds
    )}`;
  }

  return (
    <div id="stopwatch-display">
      <div>
        <p id="stopwatch-text">{formatNumbers(props.time)}</p>
      </div>
      {props.laps > 0 ? (
        <div className={"lap-list"} title="lap-list" role="list">
          {/* reverses lapTimes array so first lap displays at the beginning,
          then maps over the array to display each lap time in correct format*/}
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
