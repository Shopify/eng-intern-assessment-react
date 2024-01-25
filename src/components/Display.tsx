import React from "react";
import calculateTime from '../helpers/calculateTime'

type DisplayProps = {
  timeInSeconds: number;
}

export default function Display(props:DisplayProps) {
  const { timeInSeconds } = props;
  let formattedTime = calculateTime(timeInSeconds);

  return (
    <div className="time-container" title="display">
      <p className="timer-text" id="minutes">
        {formattedTime.minutesFormatted}
      </p>
      <span>:</span>
      <p className="timer-text" id="seconds">
        {formattedTime.secondsFormatted}
      </p>
      <span>:</span>
      <p className="timer-text" id="milliseconds">
        {formattedTime.millisecondsFormatted}
      </p>
    </div>
  );
}
