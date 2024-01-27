import React from "react";

// Props interface for the StopWatch component
type StopWatchProps = {
  timerSeconds: number;
};

// StopWatch component that displays the formatted time
const StopWatch: React.FC<StopWatchProps> = ({ timerSeconds }) => {
  let hrs: number = Math.floor(timerSeconds / 3600);
  let mins: number = Math.floor((timerSeconds % 3600) / 60);
  let secs: number = Math.floor(timerSeconds % 60);

  if (hrs < 10) {
    hrs = Number(`0${hrs}`);
  }

  if (mins < 10) {
    mins = Number(`0${mins}`);
  }

  if (secs < 10) {
    secs = Number(`0${secs}`);
  }

  return (
    <div>
      <h1 className="digits">{`${hrs} : ${mins} : ${secs}`}</h1>
    </div>
  );
};

export default StopWatch;
