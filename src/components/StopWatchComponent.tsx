import React, { useEffect, useRef, useState } from "react";
import StopWatchButtonComponent from "./StopWatchButtonComponent";

export default function StopWatchComponent() {
  const [isRunning, setIsRunning] = useState<boolean>(false); // state to track if watch is running ot not
  const [laps, setLaps] = useState<number[]>([]); // numeric array to store laps

  // State for watch
  const [time, setTime] = useState<number>(0); //store the time, in miliseconds
  const intervalRef = useRef<NodeJS.Timeout | null>(null); // state to track interval id
  const startTimeRef = useRef<number | null>(null);

  // State for the lap timer
  const [lapTime, setLapTime] = useState(0);
  const lapTimerRef = useRef<NodeJS.Timeout | null>(null);
  const lapStartTimeRef = useRef<number | null>(null);

  const handleStartStop = () => {
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setTime(0);
    setLapTime(0);
    setLaps([]);
    setIsRunning(false);
  };

  const handleLap = () => {
    setLaps((prevLaps) => [...prevLaps, time]);
    if (lapTimerRef.current) {
      clearInterval(lapTimerRef.current);
    }
    lapTimerRef.current = setInterval(() => {
      setLapTime(Date.now() - lapStartTimeRef.current!);
    }, 10);
    lapStartTimeRef.current = Date.now();
  };
  // ***
  //    formats time into hours minutes and seconds,
  //    @param time <number>
  //    @return <string>
  // ***
  const formatTime = (time: number) => {
    const hours = Math.floor(time / 3600000);
    const minutes = Math.floor((time % 3600000) / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    const milliseconds = time % 1000;

    // Formatting each time component
    const formattedHours = hours.toString().padStart(2, "0");
    const formattedMinutes = minutes.toString().padStart(2, "0");
    const formattedSeconds = seconds.toString().padStart(2, "0");
    const formattedMilliseconds = milliseconds.toString().padStart(3, "0");

    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}:${formattedMilliseconds}`;
  };

  //   handling the effect of start and end of watch
  //   If stopwatch is running set interval to increase in every 10ms
  //   clean the interval when stop watch is not running
  useEffect(() => {
    if (isRunning && startTimeRef.current === null) {
      startTimeRef.current = Date.now() - time;
      intervalRef.current = setInterval(() => {
        setTime(Date.now() - startTimeRef.current!);
      }, 10);
    } else if (!isRunning && intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
      startTimeRef.current = null;
    }

    // lap timer logic
    if (isRunning && lapStartTimeRef.current === null) {
      lapStartTimeRef.current = Date.now();
      lapTimerRef.current = setInterval(() => {
        setLapTime(Date.now() - lapStartTimeRef.current!);
      }, 10);
    }

    return () => {
      // cleanup function to clear the interval
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (lapTimerRef.current) clearInterval(lapTimerRef.current);
    };
  }, [isRunning]);
  return (
    <>
      <main>
        <h1>Timer: {formatTime(time)}</h1>
        <h2>Lap Timer :{formatTime(lapTime)}</h2>
        <div>
          <StopWatchButtonComponent
            onClick={handleStartStop}
            buttonPlaceHolder={!isRunning ? "Start" : "Stop"}
          />
          <StopWatchButtonComponent
            onClick={handleReset}
            buttonPlaceHolder="Reset"
          />
          <StopWatchButtonComponent
            onClick={handleLap}
            buttonPlaceHolder="Lap"
          />
        </div>
        <div>
          {laps.map((lap, index) => (
            <p key={index}>
              Lap {index + 1}: {formatTime(lap)}s
            </p>
          ))}
        </div>
      </main>
    </>
  );
}
