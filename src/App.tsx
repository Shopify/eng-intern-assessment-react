/*
Note: I followed similar functionality as the Stopwatch on Apple iOS
When the stopwatch is actively counting up, only the stop and lap buttons are shown
When the stopwatch is actively counting up, there is a lap that is shown in the Laps section that is actively counting up as well showing the time elapsed of the current lap
When user presses the Lap button, then that timestamp is saved and displayed, and the new lap is counted starting from 0 milliseconds again
When the stopwatch is in the stopped state (i.e. not actively counting), only the start and reset buttons are shown
*/

import React, { useState } from "react";
import StopWatch from "./components/StopWatch";
import StopWatchButton from "./components/StopWatchButton";
import Laps from "./components/Laps";
import "./App.css";

export default function App() {
  const [time, setTime] = useState<number>(0); // time in milliseconds (counter for the stopwatch)
  const [isCounting, setIsCounting] = useState<boolean>(false); // boolean to track if the current state of the stopwatch is actively counting or not
  const [currentLap, setCurrentLap] = useState<number>(0); // counter for the current lap time
  const [laps, setLaps] = useState<string[]>([]); // store the lap times
  const [hasStartedStopwatch, setHasStartedStopwatch] =
    useState<boolean>(false); // used to conditionally render the currently counting lap only if the stopwatch has at least been started once

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
