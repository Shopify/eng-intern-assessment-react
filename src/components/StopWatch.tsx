import React, { useState, useEffect, useRef } from 'react';
import StopWatchButton from './StopWatchButton';
import LapsList from './LapsList';
import Time from './Time';
import * as mq from '../styles/media-queries';

// Function to get stored time from local storage,
function setStoredTime() {
  const storedTime = localStorage.getItem('stopwatch_time');
  return storedTime ? parseFloat(storedTime) : 0;
}

// Function to get stored laps from local storage
function setStoredLaps() {
  const storedLaps = localStorage.getItem('stopwatch_laps');
  return storedLaps ? JSON.parse(storedLaps) : [];
}

export default function StopWatch() {
  const [time, setTime] = useState(setStoredTime);
  const [laps, setLaps] = useState(setStoredLaps);
  const [isStarted, setIsStarted] = useState(false);
  const requestIdRef = useRef<number>();

  // Main 
  useEffect(() => {
    let prevTime: number;

    if (isStarted) {
      requestIdRef.current = requestAnimationFrame(function updateTimer(
        timestamp: number
      ) {
        if (!prevTime) prevTime = timestamp;
        const deltaMs = timestamp - prevTime;
        prevTime = timestamp;
        setTime((prev => prev + deltaMs));
        requestIdRef.current = requestAnimationFrame(updateTimer);
      });
    } else {
      cancelAnimationFrame(requestIdRef.current);
    }
    // Clean up
    return () => {
      cancelAnimationFrame(requestIdRef.current);
    };
  }, [isStarted]);

  useEffect(() => {
    // Save laps to local storage
    localStorage.setItem('stopwatch_laps', JSON.stringify(laps));
  }, [laps]);

  useEffect(() => {
    if (isStarted) {
      window.addEventListener('beforeunload', handleBeforeUnload);
      return () => {
        window.removeEventListener('beforeunload', handleBeforeUnload);
      };
    }
    window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [isStarted]);

  const startTimerHandler = () => {
    setIsStarted(true);
  };

  const stopTimerHandler = () => {
    setIsStarted(false);
    // Save time to local storage
    localStorage.setItem('stopwatch_time', time.toString());
  };

  const resetTimerHandler = () => {
    setIsStarted(false);
    setTime(0);
    setLaps([]);
    // Reset local storage
    localStorage.setItem('stopwatch_time', '0');
    localStorage.setItem('stopwatch_laps', JSON.stringify([]));
  };

  const addLap = () => {
    // Get the last lap
    const lastLap = laps.length > 0 ? laps[laps.length - 1] : null;

    // Check if there is a last lap and if the current time is different from the last lap's timestamp
    if (lastLap) {
      if (lastLap.timestamp === time) return;
      setLaps((prevLaps: { timestamp: number; duration: number }[]) => [
        ...prevLaps,
        { timestamp: time, duration: time - lastLap.timestamp },
      ]);
    } else {
      setLaps((prevLaps: { timestamp: number; duration: number }[]) => [
        ...prevLaps,
        { timestamp: time, duration: time },
      ]);
    }
  };

  //Prevents immediate refreshing/navigating when stopwatch is running
  const handleBeforeUnload = (event: BeforeUnloadEvent) => {
    event.preventDefault();
    event.returnValue = 'Are you sure you want to exit?';
    const shouldReload = window.confirm;
    if (shouldReload) {
      resetTimerHandler()
    }
    return event.returnValue;
  };

  return (
    <div
      css={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        width: '90%',
        [mq.large]: {
          flexDirection: 'row',
        },
      }}
    >
      <div
        css={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'start',
          minWidth: '100%',
          [mq.large]: {
            minWidth: '50%',
          },
        }}
      >
        <div css={{ marginBottom: '5%' }} data-testid="timer-container">
          <Time time={time} />
        </div>

        <div
          css={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            width: '40%',
            margin: '0 auto',
            [mq.large]: {
              flexDirection: 'column',
            },
          }}
        >
          <StopWatchButton
            variant="default"
            onClick={startTimerHandler}
            disabled={isStarted}
            testId="start-button"
          >
            {time === 0 ? 'Start' : 'Resume'}
          </StopWatchButton>
          <StopWatchButton
            variant="default"
            onClick={stopTimerHandler}
            disabled={!isStarted}
            testId="pause-button"
          >
            Pause
          </StopWatchButton>
          <StopWatchButton
            variant="destructive"
            onClick={resetTimerHandler}
            disabled={time === 0}
            testId="reset-button"
          >
            Reset
          </StopWatchButton>
          <StopWatchButton
            variant="default"
            onClick={addLap}
            disabled={time === 0 || !isStarted}
            testId="lap-button"
          >
            Lap
          </StopWatchButton>
        </div>
      </div>
      <LapsList laps={laps} />
    </div>
  );
}
