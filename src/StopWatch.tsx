import React from "react";
import { useState, useEffect } from "react";
import StopWatchButton from "./StopWatchButton";
import { formatTime } from "./utils/formatTime";

export default function StopWatch() {
  const start: string = "Start";
  const stop: string = "Stop";
  const reset: string = "Reset";
  const lap: string = "Lap";
  const [time, setTime] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [btnActionStartStop, setBtnStartStop] = useState<string>("Start");
  const [btnActionResetLap, setBtnResetLap] = useState<string>("Lap");
  const [laps, setLaps] = useState<number[]>([]);

  const stopStartTimer = () => {
    setIsRunning(!isRunning);
    const btnActionStartStop = isRunning ? start : stop;
    const btnActionLapReset =
      isRunning && btnActionStartStop == start ? reset : lap;
    setBtnResetLap(btnActionLapReset);
    setBtnStartStop(btnActionStartStop);
  };

  const actResetLap = () => {
    if (btnActionResetLap == lap) {
      setLaps([...laps, 0]);
      console.log(laps);
    } else if (btnActionResetLap == reset) {
      setTime(0);
      setIsRunning(false);
      setBtnResetLap(lap);
    }
  };
  useEffect(() => {
    let interval: NodeJS.Timer;
    if (isRunning) {
      interval = setInterval(() => setTime((time) => time + 1), 1);
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
        <div data-testid='lap-list'>
          {laps.map((lap, i) => (
            <div data-testid={`lap: ${i}`} key={i}>
              Lap {i + 1}: {formatTime(lap)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
