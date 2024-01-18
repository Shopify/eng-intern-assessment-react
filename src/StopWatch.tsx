import React, { useEffect, useState } from "react";

interface stopWatchProps {
  time: number;
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
  return <div className="stopwatch">{formatNumbers(props.time)}</div>;
}
