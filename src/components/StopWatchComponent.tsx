import React, { useEffect, useRef, useState } from "react";
import StopWatchButtonComponent from "./StopWatchButtonComponent";
import "./../utils/utils.css";
import "./StopWatchComponent.css";

// type for lap info
type LapInfo = {
  lap: number;
  total: number;
};

export default function StopWatchComponent() {
  const [isRunning, setIsRunning] = useState<boolean>(false); // state to track if watch is running ot not
  const [laps, setLaps] = useState<LapInfo[]>([]); // LapInfo type to store laps

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
    const lastTotalTime = laps.length > 0 ? laps[laps.length - 1].total : 0;
    const newLapTime = time - lastTotalTime;

    setLaps((prevLaps) => [...prevLaps, { lap: newLapTime, total: time }]);

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
      <main className="d-flex flex-dir-col align-center container">
        <h1 className="container__title">
          <span>Shopify</span> : StopWatch
        </h1>
        <section className="container__body">
          <div className="d-flex flex-dir-col align-center container__timer">
            <div className="container__timeHeading">
              <span className="font-stopwatch">{formatTime(time)}</span>
            </div>
            <div className="container__lapHeading">
              <span className="font-stopwatch">{formatTime(lapTime)}</span>
            </div>
          </div>
          <section className="container__button">
            <StopWatchButtonComponent
              onClick={handleStartStop}
              buttonPlaceHolder={!isRunning ? "Start" : "Pause"}
            />
            <StopWatchButtonComponent
              onClick={handleReset}
              buttonPlaceHolder="Reset"
            />
            <StopWatchButtonComponent
              onClick={handleLap}
              buttonPlaceHolder="Lap"
            />
          </section>
          <section>
            <table className="container__table">
              <thead>
                <tr>
                  <th>Lap</th>
                  <th>Time</th>
                  <th>Total Time</th>
                </tr>
              </thead>
              <tbody>
                {laps.map((lap, index) => (
                  <tr>
                    <td>{index + 1}</td>
                    <td>{formatTime(lap.lap)}</td>
                    <td>{formatTime(lap.total)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        </section>
      </main>
    </>
  );
}
