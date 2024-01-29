import React, { useState } from "react";

//Useing interface to pass the elapsed time to the StopWatch component
interface StopWatchProps {
  hours: number;
  minutes: number;
  seconds: number;
}

export default function StopWatch(props: StopWatchProps) {
  const hours = props.hours;
  const minutes = props.minutes;
  const seconds = props.seconds;

  //Pad numbers with 0 if less than 10, so that time is displayed as 00:00:00
  function pad2(number: number) {
    return (number < 10 ? "0" : "") + number;
  }

  return (
    <div>
      <h1>StopWatch</h1>
      <h2>
        {pad2(hours)}:{pad2(minutes)}:{pad2(seconds)}
      </h2>
    </div>
  );
}
