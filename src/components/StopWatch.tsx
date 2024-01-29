/**
 * StopWatch.tsx
 *
 * This is a functional component that displays the current time on the stopwatch.
 *
 * @imports
 * - StopWatch.css: The CSS styles for the StopWatch component.
 *
 * @props
 * - time: The current time on the stopwatch, passed in from the parent component.
 *
 * @component
 * - StopWatch: A functional component that takes in a 'time' prop. It calculates the minutes, seconds, and milliseconds from the time, and displays them in a formatted string.
 */
import React from "react";
import "../styles/StopWatch.css";

interface StopWatchProps {
  time: number;
}

const StopWatch: React.FC<StopWatchProps> = ({ time }) => {
  // Calculate the number of whole minutes in the given time
  const minutes = Math.floor(time / 60);

  // Calculate the remaining seconds after the minutes have been subtracted
  const seconds = Math.floor(time % 60); // Round down to the nearest whole number

  // Calculate the milliseconds from the remaining fractional part of the last second
  const milliseconds = Math.floor((time % 1) * 100);

  return (
    <div className="stopwatch">
      <h1 className="stopwatch-time">
        {minutes}:{seconds < 10 ? `0${seconds}` : seconds}.
        {milliseconds < 10 ? `0${milliseconds}` : milliseconds}
      </h1>
    </div>
  );
};

export default StopWatch;
