/**
 * StopWatch Component
 * Created by Vansh Sood
 *
 * This component renders the main stopwatch interface, including the timer display
 * and control buttons (Start/Stop, Record Lap, Reset).
 *
 * Features:
 * - Displays time in minutes, seconds, and milliseconds.
 * - Allows user to start, stop, record laps, and reset the stopwatch.
 * - Dynamically updates laps table as laps are recorded.
 * - Responsive design for optimal viewing on various screen sizes.
 */

import React, { useState, useEffect, useMemo } from "react";
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
import { formatTime, calculateSplit } from "../utils/helpers";

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

  const buttons = useMemo(
    () => [
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
    ],
    [isRunning, time]
  );

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
                const splitTime = formatTime(calculateSplit(index, laps));
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
