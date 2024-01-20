import React, { useState, useEffect } from 'react';

export default function StopWatch() {
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [intervalId, setIntervalId] = useState(null);

  // Effect to run the stopwatch
  useEffect(() => {
    if (isRunning) {
      const id = window.setInterval(() => {
        setElapsedTime((prevElapsedTime) => prevElapsedTime + 20); // Update every 10 milliseconds
      }, 20); // Update interval set to 10 milliseconds
      setIntervalId(id);
    } else if (intervalId) {
      clearInterval(intervalId);
    }

    // Clean up the interval on unmount
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isRunning]);

  // To toggle the timer on or off
  const toggleStartStop = () => {
    setIsRunning(!isRunning);
    if (isRunning && intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }
  };

  // Reset the stopwatch
  const reset = () => {
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }
    setIsRunning(false);
    setElapsedTime(0);
  };

  // Format the elapsed time into a displayable format
  const formatTime = (totalMilliseconds: number) => {
    const minutes = Math.floor((totalMilliseconds % 3600000) / 60000);
    const seconds = Math.floor((totalMilliseconds % 60000) / 1000);
    const milliseconds = Math.floor((totalMilliseconds % 1000) / 10 );

    // Add leading zeros if number is less than 10
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
    const formattedMilliseconds = milliseconds < 10 ? `0${milliseconds}` : milliseconds;

    return `${formattedMinutes} ${formattedSeconds} ${formattedMilliseconds}`;
  };


  const [formattedMinutes, formattedSeconds, formattedMilliseconds] = formatTime(elapsedTime).split(/[ ]/); // Split when there's a space found


  return (
    <div className='flex-col'>
      <div className="stopwatch-container">
        <div className="time-box">{formattedMinutes}</div>
        <div className="box">:</div>
        <div className="time-box">{formattedSeconds}</div>
        <div className="box">.</div>
        <div className="time-box">{formattedMilliseconds}</div>
      </div>
      <div className="stopwatch-container">
      <button className='button-outline' onClick={toggleStartStop}>
          {isRunning ? 'Stop' : 'Start'}
        </button>
        <button className='button-outline' onClick={reset}>Reset</button>
      </div>
    </div>
  );
}
