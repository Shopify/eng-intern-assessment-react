import React, { useState } from "react";
import StopWatch from "./components/StopWatch";
import StopWatchButton from "./components/StopWatchButton";
import Laps from "./components/Laps";
import "./App.css";

export default function App() {
  const [time, setTime] = useState(0); // time in milliseconds
  const [isCounting, setIsCounting] = useState(false);
  const [currentLap, setCurrentLap] = useState(0);
  const [laps, setLaps] = useState([]);
  const [hasStartedStopwatch, setHasStartedStopwatch] = useState(false);

  return (
    <div className="app">
      <div>
        <div className="stopwatch-display">
          <h1 className="title">Stopwatch</h1>
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
        </div>
        <div>
          <Laps
            laps={laps}
            currentLap={currentLap}
            hasStartedStopwatch={hasStartedStopwatch}
          ></Laps>
        </div>
      </div>
    </div>
  );
}
