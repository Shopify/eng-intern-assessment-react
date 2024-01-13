import React, {useState, useEffect} from "react";
import {ButtonGroup, Card, Text} from "@shopify/polaris";

import StopWatchButton from "./StopWatchButton";
import Laps from "./Laps";

export default function StopWatch() {
  // states to store if stopwatch is running and all elapsed time & time per lap.
  const [running, setRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [lapTime, setLapTime] = useState(0);
  const [laps, setLaps] = useState([]);

  // format the time to hh:mm:ss:ms
  const formatTime = (seconds: number) => {
    const hh = Math.floor(seconds / 3600);
    const mm = Math.floor(hh / 60);
    const ss = Math.floor(seconds % 60);

    const pad = (num: number, length = 2) => {
      return num.toString().padStart(length, "0");
    };

    return `${pad(hh)}:${pad(mm)}:${pad(ss)}`;
  };

  const handleStartTimer = () => {
    setRunning(true);
  };

  const handlePauseTimer = () => {
    setRunning(false);
  };

  const handleResetTimer = () => {
    setRunning(false);
    setElapsedTime(0);
    setLaps([]);
  };

  const lap = () => {
    const lapNo = laps.length + 1;
    setLaps([...laps, [lapNo, formatTime(lapTime), formatTime(elapsedTime)]]);
    setLapTime(0);
  };

  // Update the stopwatch & lap time
  useEffect(() => {
    let interval: any;
    let lapInterval: any;
    if (running) {
      interval = setInterval(() => setElapsedTime((time) => time + 1), 1000);
      lapInterval = setInterval(
        () => setLapTime((elapsedTime) => elapsedTime + 1),
        1000
      );
    } else {
      clearInterval(interval);
      clearInterval(lapInterval);
    }
    return () => {
      clearInterval(interval);
      clearInterval(lapInterval);
    };
  }, [running, elapsedTime]);

  return (
    <>
      <Card>
        <Text variant="heading3xl" as="h2">
          {formatTime(elapsedTime)}
        </Text>
        <ButtonGroup gap="loose">
          {!running ? (
            <StopWatchButton onClick={handleStartTimer} variant="primary">
              Start
            </StopWatchButton>
          ) : (
            <StopWatchButton onClick={handlePauseTimer} variant="primary">
              Pause
            </StopWatchButton>
          )}
          {!running ? (
            <StopWatchButton onClick={handleResetTimer}>Reset</StopWatchButton>
          ) : (
            <StopWatchButton onClick={lap}>Lap</StopWatchButton>
          )}
        </ButtonGroup>
      </Card>
      <Laps laps={laps}></Laps>
    </>
  );
}
