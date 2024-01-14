import React, { useState, useEffect } from "react";
import StopWatch from "./StopWatch";
import "./App.css";
import StopWatchButton from "./StopWatchButton";
import Table from "react-bootstrap/Table";

const App: React.FC = () => {
  const [time, setTime] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [lapTimes, setLapTimes] = useState<number[]>([]);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (isRunning) {
      intervalId = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [isRunning]);

  const startTimer = () => {
    setIsRunning((prevIsRunning) => !prevIsRunning);
  };

  const recordLap = () => {
    setLapTimes((prevLapTimes) => [...prevLapTimes, time]);
  };

  const stopResetTimer = () => {
    setIsRunning(false);
    setTime(0);
    setLapTimes([]);
  };

  const formatTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    const formattedHours = String(hours).padStart(2, "0");
    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(remainingSeconds).padStart(2, "0");

    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
  };

  return (
    <div className="App">
      <div className="timer__container">
        <h2>Shopify Stopwatch</h2>
        <StopWatch time={time} formatTime={formatTime} />
        <StopWatchButton
          isRunning={isRunning}
          startTimer={startTimer}
          stopResetTimer={stopResetTimer}
          recordLap={recordLap}
        />
        <div className="laps">
          <h5>Lap Times</h5>

          <Table>
            <thead>
              <tr>
                <th>Lap</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              {lapTimes.map((lap, index) => (
                <tr>
                  <td>Lap {index + 1}</td>
                  <td>{formatTime(lap)}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default App;
