import React, { useState, useEffect, useCallback } from 'react';
import StopWatchButton from './StopWatchButton';

// Function to format the time. This is necessary since both the time and lap times need to be formatted
export function formatTime(time: number): string {
  // Format the time in mm:ss:ms. Display hours only if reached
  const hours = Math.floor(time / 360000);
  const minutes = Math.floor((time % 360000) / 6000);
  const seconds = Math.floor((time % 6000) / 100);
  const milliseconds = time % 100;
  // Format the minutes, seconds, and milliseconds to be two digits
  const formattedMinutes = minutes.toString().padStart(2, '0');
  const formattedSeconds = seconds.toString().padStart(2, '0');
  const formattedMilliseconds = milliseconds.toString().padStart(2, '0');
  // If stopwatch reaches at least an hour, display the hours
  if (hours > 0) {
    const formattedHours = hours.toString().padStart(2, '0');
    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}:${formattedMilliseconds}`;
  }
  // Combine the values into a string
  const formattedTime = `${formattedMinutes}:${formattedSeconds}:${formattedMilliseconds}`;
  return formattedTime;
}

export default function StopWatch() {
  // State to track the time, whether the timer is on/off, and the lap times
  const [time, setTime] = useState(0);
  const [timerOn, setTimerOn] = useState(false);
  const [lapTimes, setLapTimes] = useState<number[]>([]);

  // Stops the timer, resets the time, and clears the lap times. useCallback is used to prevent unnecessary re-renders
  const handleReset = useCallback(() => {
    setTimerOn(false);
    setTime(0);
    setLapTimes([]);
  }, []);

  // Every time timerOn changes, we start or stop the timer
  // useEffect is necessary since setInterval changes the state and we don't want to create an infinite loop
  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;

    if (timerOn) {
      interval = setInterval(() => setTime(time => time + 1), 10);
    }

    return () => { clearInterval(interval); }; // Clears the interval when the component unmounts or timerOn changes
  }, [timerOn]);

  return (
    <div className='stopwatch'>
      <h1 className='stopwatch-title'>stopwatchify</h1>
      <div className='stopwatch-content'>
        <div className='stopwatch-buttons'>
          <StopWatchButton type={'start'} onClick={() => setTimerOn(true)} className={'clickable-button'}></StopWatchButton>
          <StopWatchButton type={'stop'} onClick={() => setTimerOn(false)} className={'clickable-button'}></StopWatchButton>
          <StopWatchButton type={'lap'} onClick={() => setLapTimes([...lapTimes, time])} timerOn={timerOn} lapTimes={lapTimes} className={'clickable-button'}></StopWatchButton>
          <StopWatchButton type={'reset'} onClick={handleReset} time={time} className={'clickable-button'}></StopWatchButton>
        </div>
        <div className='stopwatch-time'>
          <p>{formatTime(time)}</p>
          {/* Display the numbered lap times */}
          {lapTimes.length > 0 && (
            <div className='stopwatch-laptimes'>
              <p>Lap Times</p>
              <ul>

                <li>
                  <strong>Total Time:</strong> {formatTime(time)}
                </li>
                {lapTimes.slice().reverse().map((lapTime, index) => {
                  const lapDifference = index === 0 ? 0 : lapTimes[index - 1] - lapTime;
                  return (
                    <li key={index}>
                      <strong>Lap {lapTimes.length - index}:</strong> {formatTime(lapTime)}
                      {index > 0 && (
                        <span className='lap-difference'>
                          ({lapDifference >= 0 ? '+' : '-'}{formatTime(Math.abs(lapDifference))})
                        </span>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}