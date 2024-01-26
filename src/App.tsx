import React, { useState } from "react";
import StopWatch from "./StopWatch";
import StopWatchButton from "./StopWatchButton";

export default function App() {
  const [time, setTime] = useState(0); // time in milliseconds
  const [isCounting, setIsCounting] = useState(false);
  return (
    <div>
      <h1>Stopwatch</h1>
      <div>
        <StopWatch time={time} />
        <StopWatchButton
          time={time}
          setTime={setTime}
          isCounting={isCounting}
          setIsCounting={setIsCounting}
        />
      </div>
    </div>
  );
}
