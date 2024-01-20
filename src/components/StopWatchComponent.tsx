import React, { useState } from "react";

export default function StopWatchComponent() {
  const [time, setTime] = useState(0);

  const handleStartStop = () => {
    // handle start and stop logic here
  };

  const handleReset = () => {
    // handle Lap logic here
  };

  const handleLap = () => {
    // handle Lap logic here
  };

  return (
    <>
      <main>
        <h1>{time} s</h1>
        <button onClick={handleStartStop}>Start/Stop</button>
        <button onClick={handleReset}>Reset</button>
        <button onClick={handleLap}>Lap</button>
      </main>
    </>
  );
}
