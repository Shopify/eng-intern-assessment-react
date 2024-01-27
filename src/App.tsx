import React, { useState, useEffect } from "react";
import "./App.css";
import StopWatch from "./components/StopWatch/StopWatch";
import StopWatchButton from "./components/StopWatchButton/StopWatchButton";

export default function App() {
  // States to manage displayed time
  const [timeInSeconds, setTimeInSeconds] = useState<number>(0);
  const [displayTime, setDisplayTime] = useState<Array<number | string>>([]);

  // Update the display time whenever timeInSeconds changes
  useEffect(() => {
    let timeArray: Array<number | string> = formatTime(timeInSeconds);
    setDisplayTime(timeArray);
  }, [timeInSeconds]);

  // Format time in hours, minutes, and seconds
  function formatTime(timeInSeconds: number): Array<number | string> {
    const hours = String(Math.floor(timeInSeconds / 3600)).padStart(2, "0");
    const minutes = String(Math.floor((timeInSeconds % 3600) / 60)).padStart(
      2,
      "0"
    );
    const seconds = String(Math.floor(timeInSeconds % 60)).padStart(2, "0");

    return [hours, minutes, seconds];
  }

  return (
    <main>
      <StopWatch displayTime={displayTime} />
      <StopWatchButton setTimeInSeconds={setTimeInSeconds} />
    </main>
  );
}
