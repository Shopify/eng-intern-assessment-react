/**
 * StopWatch Component
 *
 * This component implements a stopwatch with start, stop, lap, and reset functionalities.
 * It uses React hooks for state management and effects to handle timer functionalities.
 *
 * Author: Vy
 * Date of Creation: Jan 20, 2024
 * Last Revision Date: Jan 24, 2024
 */

import React, { useState, useEffect, useRef } from 'react';

import StopWatchButton from './StopWatchButton';

import './StopWatch.css';

/**
 * Formats the time from milliseconds to a desired format (Minutes:Second:Hundredths of a second).
 * @param {number} time - The time in milliseconds to format.
 * @return {string} The formatted time string.
 */
export const formatTime = (time: number): string => {
  // Calculate hours, minutes, seconds, and milliseconds
  const hours = Math.floor(time / 3600000);
  const minutes = Math.floor((time % 3600000) / 60000);
  const seconds = Math.floor((time % 60000) / 1000);
  const milliseconds = Math.floor((time % 1000) / 10);

  // Helper function to format time components
  const format = (num: number) => num.toString().padStart(2, '0');

  // Construct the formatted time string
  if (hours > 0) {
    return `${format(hours)}:${format(minutes)}:${format(seconds)}:${format(
      milliseconds
    )}`;
  } else {
    return `${format(minutes)}:${format(seconds)}:${format(milliseconds)}`;
  }
};

export default function StopWatch() {
  // State to track if the stopwatch is active (running).
  const [isActive, setIsActive] = useState(false);

  // State to track the elapsed time in milliseconds.
  const [time, setTime] = useState(0);

  // State to track the time of the last lap.
  const [lastLapTime, setLastLapTime] = useState(0);

  // State to store lap times.
  const [laps, setLaps] = useState<number[]>([]);

  // useRef to hold a reference to the stopwatch interval for accurate clearing.
  const interval = useRef<NodeJS.Timeout | null>(null);

  /**
   * Effect to manage the timer interval.
   * Sets up and clears the interval based on the isActive state.
   * Timer set up with setInterval,the timer calls a function every 10 miliseconds which will keep track of the elapsed time in milliseconds
   * Ensures cleanup of interval to prevent memory leaks when the component unmounts or isActive changes.
   */
  useEffect(() => {
    if (isActive) {
      interval.current = setInterval(() => {
        setTime((time) => time + 10);
      }, 10);
    } else {
      clearInterval(interval.current);
    }

    return () => {
      /** Clear intervals runs when the component is unmount or when isActive changes, prevent memory leaks 
    ensuring that the timer doesn't continue to run after the component is no longer needed or before a new timer is set up.*/
      if (interval.current) clearInterval(interval.current);
    };
  }, [isActive]);

  /**
   * Toggles the stopwatch state and records the time when stopped.
   */
  const handleStartStop = () => {
    setIsActive(!isActive);
    if (!isActive) {
      setLastLapTime(time);
    }
  };

  /**
   * Records the current lap time and resets the last lap time.
   */
  const handleLap = () => {
    if (isActive) {
      const lapTime = time - lastLapTime;
      setLaps([...laps, lapTime]);
      setLastLapTime(time);
    }
  };

  /**
   * Resets the stopwatch and clears all laps.
   */
  const handleReset = () => {
    setIsActive(false);
    setTime(0);
    setLastLapTime(0);
    setLaps([]);
  };

  return (
    <div className='stopwatch-container'>
      <div className='stopwatch-head'>
        <h1 className='stopwatch-title'>StopWatch</h1>
        <span className='stopwatch-display'>{formatTime(time)}</span>
        <div className='stopwatch-buttons'>
          <StopWatchButton
            onClick={handleStartStop}
            label={isActive ? 'Stop' : 'Start'}
          />
          <StopWatchButton
            onClick={!isActive ? handleReset : handleLap}
            label={!isActive ? 'Reset' : 'Lap'}
          />
        </div>
      </div>
      {laps.length > 0 && (
        <ul className='lap-container'>
          {laps.map((lap, index) => (
            <li
              key={index}
              className='lap-item'
            >
              Lap {index + 1}: {formatTime(lap)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
