import React, { useState } from "react";
import StopWatch from "./StopWatch";
import StopWatchButton from "./StopWatchButton";
import Laps from "./Laps";

export default function App() {
  const [time, setTime] = useState(0); // time in milliseconds
  const [isCounting, setIsCounting] = useState(false);
  const [currentLap, setCurrentLap] = useState(0);
  const [laps, setLaps] = useState([]);
  const [hasStartedStopwatch, setHasStartedStopwatch] = useState(false);

  return (
    <div>
      <h1>Stopwatch</h1>
      <div>
        <StopWatch time={time} />
        <StopWatchButton
          currentLap={currentLap}
          setTime={setTime}
          isCounting={isCounting}
          setIsCounting={setIsCounting}
          setLaps={setLaps}
          setHasStartedStopwatch={setHasStartedStopwatch}
          setCurrentLap={setCurrentLap}
        />
        <Laps
          laps={laps}
          currentLap={currentLap}
          hasStartedStopwatch={hasStartedStopwatch}
        ></Laps>
      </div>
    </div>
  );
}
