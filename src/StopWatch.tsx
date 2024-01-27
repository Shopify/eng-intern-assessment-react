import React, { useState, useEffect } from "react";
import StopWatchButton from "./StopWatchButton";
import {
  faFlag,
  faPlay,
  faRedo,
  faStop,
} from "@fortawesome/free-solid-svg-icons";
import {
  Colon,
  LapItem,
  LapsContainer,
  Table,
  TableCell,
  TableHeader,
  TableRow,
  TimeDisplay,
  TimeValue,
  TimerContainer,
  TimerHeader,
} from "../styles/StopWatchStyles";
import { ButtonContainer, ButtonsGroup } from "../styles/StopWatchButtonStyles";

export default function StopWatch() {
  const [time, setTime] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [laps, setLaps] = useState<number[]>([]);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isRunning) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning]);

  const start = () => setIsRunning(true);
  const stop = () => setIsRunning(false);
  const reset = () => {
    setTime(0);
    setIsRunning(false);
    setLaps([]);
  };
  const recordLap = () => {
    setLaps([...laps, time]);
  };

  // Function to format time into minutes, seconds, and milliseconds
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    const milliseconds = Math.floor((time % 1000) / 10);

    return {
      minutes: `${minutes < 10 ? "0" : ""}${minutes}`,
      seconds: `${seconds < 10 ? "0" : ""}${seconds}`,
      milliseconds: `${milliseconds < 10 ? "0" : ""}${milliseconds}`,
    };
  };

  // Function to calculate the split time given the current index and laps array
  const calculateSplit = (index: number) => {
    if (index === 0) return laps[0];
    return laps[index] - laps[index - 1];
  };

  const buttons = [
    {
      onClick: recordLap,
      disabled: !isRunning,
      icon: faFlag,
      label: "Record",
      ariaLabel: "Record Lap",
    },
    {
      onClick: isRunning ? stop : start,
      icon: isRunning ? faStop : faPlay,
      label: isRunning ? "Stop" : "Start",
      isSecond: true,
      ariaLabel: isRunning ? "Stop Timer" : "Start Timer",
    },
    {
      onClick: reset,
      disabled: time === 0,
      icon: faRedo,
      label: "Reset",
      ariaLabel: "Reset Timer",
    },
  ];

  return (
    <TimerContainer>
      <TimerHeader></TimerHeader>
      <TimeDisplay>
        <TimeValue className="minutes">{formatTime(time).minutes}</TimeValue>
        <Colon>:</Colon>
        <TimeValue className="seconds">{formatTime(time).seconds}</TimeValue>
        <Colon>.</Colon>
        <TimeValue className="milliseconds">
          {formatTime(time).milliseconds}
        </TimeValue>
      </TimeDisplay>
      <ButtonsGroup>
        {buttons.map((button, index) => (
          <StopWatchButton key={index} {...button} />
        ))}
      </ButtonsGroup>
      {laps.length > 0 && (
        <LapsContainer>
          <Table>
            <thead>
              <TableRow>
                <TableHeader>Lap No.</TableHeader>
                <TableHeader>Split</TableHeader>
                <TableHeader>Total</TableHeader>
              </TableRow>
            </thead>
            <tbody>
              {laps.map((lap, index) => {
                const splitTime = formatTime(calculateSplit(index));
                const totalTime = formatTime(lap);
                return (
                  <TableRow key={index} data-testid={`lap-${index}`}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>
                      {splitTime.minutes}:{splitTime.seconds}:
                      {splitTime.milliseconds}
                    </TableCell>
                    <TableCell>
                      {totalTime.minutes}:{totalTime.seconds}:
                      {totalTime.milliseconds}
                    </TableCell>
                  </TableRow>
                );
              })}
            </tbody>
          </Table>
        </LapsContainer>
      )}
    </TimerContainer>
  );
}
