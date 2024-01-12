import React, { useState, useEffect } from "react";
import StopWatch from "./StopWatch";

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
        start={start}
        setStart={setStart}
        time={time}
        setTime={setTime}
        laps={laps}
        setLaps={setLaps}
        lapTime={lapTime}
        setLapTime={setLapTime}
      ></StopWatch>
    </div>
  );
}
