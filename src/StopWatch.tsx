import React, { useState, useEffect } from "react";
import StopWatchButton from "./StopWatchButton";
import formatWithLeadingZero from "./helpers/formatWithLeadingZero";
import "./StopWatch.css";

interface TimeState {
  milliseconds: number;
  seconds: number;
  minutes: number;
}

/**
 * StopWatch component that allows users to measure time and record laps.
 *
 * App -> StopWatch -> StopWatchButton
 */

export default function StopWatch(): JSX.Element {
  const [time, setTime] = useState<TimeState>({
    milliseconds: 0,
    seconds: 0,
    minutes: 0,
  });
  const [isActive, setIsActive] = useState<boolean>(false);
  const [laps, setLaps] = useState<string[]>([]);

  /**
   * This effect is responsible for updating the timer values at a set interval
   * when the stopwatch is active.
   *
   * The interval invokes the updateTimer function every 10 ms, incrementing the
   * timer's milliseconds, seconds, and minutes.
   *
   * @dependency
   * - isActive: determines whether the stopwatch time is incrementing.
   */

  useEffect(() => {
    let interval: NodeJS.Timeout;

    const update = () => {
      updateTimer();
    };

    if (isActive) {
      interval = setInterval(update, 10);
    }

    return () => clearInterval(interval);
  }, [isActive]);

  /**
   * Update the time state by incrementing millseconds, seconds, and minutes.
   */

  const updateTimer = (): void => {
    setTime((prevTime: TimeState): TimeState => {
      let newMilliseconds = prevTime.milliseconds + 1;
      let newSeconds = prevTime.seconds;
      let newMinutes = prevTime.minutes;

      if (newMilliseconds >= 99) {
        newSeconds += 1;
        newMilliseconds = 0;

        if (newSeconds >= 60) {
          newMinutes += 1;
          newSeconds = 0;
        }
      }

      return {
        minutes: newMinutes,
        seconds: newSeconds,
        milliseconds: newMilliseconds,
      };
    });
  };

  /**
   * Handles the start or stop control of the stopwatch.
   */

  const handleStartStop = (): void => {
    setIsActive(!isActive);
    console.log("Timer is active: ", !isActive);
  };

  /**
   * Handles the reset control of the stopwatch.
   * Reset the time state, deactivate the stopwatch and clear all recorded laps.
   */

  const handleReset = (): void => {
    setTime({ minutes: 0, seconds: 0, milliseconds: 0 });
    setIsActive(false);
    setLaps([]);
  };

  /**
   * Handles recording a lap in the stopwatch.
   */

  const handleLap = (): void => {
    // format the current minute, second, ms into a string with leading zeros.
    // ex. { minute: 0, second: 7, millisecond: 11 } => "00: 07: 11"
    const lapTime: string = `
            ${formatWithLeadingZero(time.minutes)}:
            ${formatWithLeadingZero(time.seconds)}:
            ${formatWithLeadingZero(time.milliseconds)}
        `;

    // update the laps state by pushing the formatted lapTime to the array
    setLaps((prevLaps) => [...prevLaps, lapTime]);
  };

  return (
    <div className="stopwatch-container">
      <div className="stopwatch-timer">
        {formatWithLeadingZero(time.minutes)}:
        {formatWithLeadingZero(time.seconds)}:
        {formatWithLeadingZero(time.milliseconds)}
      </div>

      <div className="stopwatch-buttons">
        <StopWatchButton
          onClick={handleStartStop}
          id={isActive ? "stopwatch-pause" : "stopwatch-start"}
          label={isActive ? "Pause" : "Start"}
        />
        <StopWatchButton
          onClick={handleLap}
          id={"stopwatch-lap"}
          label="Lap"
          disabled={!isActive}
        />
        <StopWatchButton
          onClick={handleReset}
          id={"stopwatch-reset"}
          label="Reset"
        />
      </div>

      <div
        className="stopwatch-laps"
        style={{ display: laps.length ? "block" : "none" }}
      >
        <h3>
          <span>Lap</span>
          <span>Time</span>
        </h3>
        <ul>
          {laps.map((lap, index) => (
            <li key={index}>
              <span>{`Lap ${index + 1}`}</span>
              <span>{lap}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
