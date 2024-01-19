// The main component that renders the stopwatch and handles its functionality.
import React, { useState, useEffect } from "react";

export default function App() {
  // states for timer
  const [startTime, setStartTime] = useState(0);
  const [timeElapsed, setTimeElapsed] = useState(0);
  
  // use setInterval to update timer 
  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeElapsed(timeElapsed + 10);
    }, 10); // update every 100 milliseconds

    return () => {
      clearInterval(intervalId);
    };
  });

  return (
    <div>
      <h1>{startTime}</h1>
      <h1>{timeElapsed}</h1>
    </div>
  );
}
