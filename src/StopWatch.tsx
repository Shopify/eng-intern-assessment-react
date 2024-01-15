import React from "react";
import { useState, useEffect } from "react";
import StopWatchButton from "./StopWatchButton";
import { formatTime } from "./utils/formatTime";

export default function StopWatch() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [btnActionStartStop, setBtnStartStop] = useState("Start");
  const [btnActionResetLap, setBtnResetLap] = useState("Lap");
  const [laps, setLaps] = useState([]);

  const stopStartTimer = () => {
    setIsRunning(!isRunning);
    const btnActionStartStop = isRunning ? "Start" : "Stop";
    const btnActionLapReset =
      isRunning && btnActionStartStop == "Start" ? "Reset" : "Lap";
    setBtnResetLap(btnActionLapReset);
    setBtnStartStop(btnActionStartStop);
  };

  const actResetLap = () => {
    if (btnActionResetLap == "Lap") {
      setLaps([...laps, 0]);
      console.log(laps);
    } else if (btnActionResetLap == "Reset") {
      setTime(0);
      setIsRunning(false);
      setBtnResetLap("Lap");
    }
  };
  useEffect(() => {
    let interval: NodeJS.Timer;
    if (isRunning) {
      interval = setInterval(() => setTime((time) => time + 10), 10);
    }
    return () => {
      clearInterval(interval);
    };
  }, [isRunning]);

  useEffect(() => {
    if (time) {
      const rest = laps.slice(0, laps.length - 1);
      const curr = time - rest.reduce((acc, v) => acc + v, 0);
      setLaps([...rest, curr]);
    } else {
      setLaps([]);
    }
  }, [time]);
  return (
    <div>
      {formatTime(time)}
      <div>
        <StopWatchButton
          btnAction={btnActionStartStop}
          abilityDisable={false}
          onClick={stopStartTimer}
        ></StopWatchButton>
        <StopWatchButton
          btnAction={btnActionResetLap}
          abilityDisable={time == 0 && !isRunning}
          onClick={actResetLap}
        ></StopWatchButton>
        <div className='Laps'>
          {laps.map((lap, i) => (
            <div key={i}>
              Lab {i + 1}: {formatTime(lap)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
