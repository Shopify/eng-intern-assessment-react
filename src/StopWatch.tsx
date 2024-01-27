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

  const buttons = [
    {
      onClick: recordLap,
      disabled: !isRunning,
      icon: faFlag,
      label: "Record",
    },
    {
      onClick: isRunning ? stop : start,
      icon: isRunning ? faStop : faPlay,
      label: isRunning ? "Stop" : "Start",
      isSecond: true,
    },
    {
      onClick: reset,
      disabled: time === 0,
      icon: faRedo,
      label: "Reset",
    },
  ];

  return (
    <TimerContainer>
      <TimerHeader>
        <h1>Stopwatch</h1>
      </TimerHeader>
      <TimeDisplay>
        <TimeValue className="minutes">{formatTime(time).minutes}</TimeValue>
        <Colon>:</Colon>
        <TimeValue className="seconds">{formatTime(time).seconds}</TimeValue>
        <Colon>:</Colon>
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
        <div>
          <h3>Laps</h3>
          <ol>
            {laps.map((lap, index) => {
              const formattedLap = formatTime(lap);
              return (
                <li key={index}>
                  <span className="minutes">{formattedLap.minutes}</span>:
                  <span className="seconds">{formattedLap.seconds}</span>:
                  <span className="milliseconds">
                    {formattedLap.milliseconds}
                  </span>
                </li>
              );
            })}
          </ol>
        </div>
      )}
    </TimerContainer>
  );
}
