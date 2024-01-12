import React, { useState, useEffect } from "react";
import StopWatch from "./StopWatch";
import StopWatchButton from "./StopWatchButton";

type Lap = {
  lapTime: number;
  totalTime: number;
};

export default function App() {
  const [time, setTime] = useState<number>(0);
  const [lapTime, setLapTime] = useState<number>(0);
  const [start, setStart] = useState<boolean>(false);
  const [laps, setLaps] = useState<Lap[]>([]);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (start) {
      interval = setInterval(() => {
        setTime(prevTime => prevTime + 1);
      }, 10);
    } else if (!start && time !== 0) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [start, time]);

  return (
    <div>
      <StopWatch
        time={time}
        setTime={setTime}
        laps={laps}
        lapTime={lapTime}
        setLapTime={setLapTime}
      ></StopWatch>
      <StopWatchButton
        start={start}
        setStart={setStart}
        setTime={setTime}
        time={time}
        laps={laps}
        setLaps={setLaps}
        lapTime={lapTime}
        setLapTime={setLapTime}
      ></StopWatchButton>
    </div>
  );
}
