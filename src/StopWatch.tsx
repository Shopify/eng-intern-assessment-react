import React from "react";

// Props definition for the StopWatch component
// timePassed: Corresponds to the number of seconds that have passed in the stopwatch
interface StopWatchProps {
  timePassed: number;
}

const StopWatch: React.FC<StopWatchProps> = ({ timePassed }) => {
  // Function to format the time
  // It converts the timePassed (in seconds) to hours, minutes, and seconds to make it readable
  const formatTime = () => {
    const getSeconds = `0${timePassed % 60}`.slice(-2);
    const minutes = Math.floor(timePassed / 60);
    const getMinutes = `0${minutes % 60}`.slice(-2);
    const getHours = `0${Math.floor(timePassed / 3600)}`.slice(-2);
    return `${getHours}:${getMinutes}:${getSeconds}`;
  };

  // The StopWatch component rendering the formatted time
  // It displays a header and the time
  return (
    <div>
      <h2>Stopwatch</h2>
      <div id="display">{formatTime()}</div>
    </div>
  );
};

export default StopWatch;
