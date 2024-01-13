import React, { useState } from "react";
import StopWatch from "./StopWatch";
import "./App.css";
import StopWatchButton from "./StopWatchButton";

const App: React.FC = () => {
  const [time, setTime] = useState<number>(0);

  const formatTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    const formattedHours = String(hours).padStart(2, "0");
    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(remainingSeconds).padStart(2, "0");

    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
  };

  return (
    <div className="App">
      <div className="timer__container">
        <h2>Shopify Stopwatch</h2>
        <StopWatch time={time} formatTime={formatTime} />
        <StopWatchButton />
      </div>
    </div>
  );
};

export default App;
