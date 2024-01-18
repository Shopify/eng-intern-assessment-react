import React, { useState, useEffect, useRef } from 'react';
import StopWatchButton from './StopWatchButton';
import LapsList from './LapsList';
import Time from './Time';
import * as mq from '../styles/media-queries';
import useStopwatch from '../hooks/useStopwatch';
import { css } from '@emotion/react';

export default function StopWatch() {
  const {
    time,
    laps,
    isStarted,
    startTimer,
    stopTimer,
    resetTimer,
    addLap,
    cleanLocalStorage,
  } = useStopwatch();

  useEffect(() => {
    if (isStarted) {
      window.addEventListener('beforeunload', handleBeforeUnload);
      return () => {
        window.removeEventListener('beforeunload', handleBeforeUnload);
      };
    }
    window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [isStarted]);

  //Prevents immediate refreshing/navigating when stopwatch is running
  const handleBeforeUnload = (event: BeforeUnloadEvent) => {
    event.preventDefault();
    event.returnValue = 'Are you sure you want to exit?';
    const shouldReload = window.confirm;
    if (shouldReload) {
      cleanLocalStorage();
    }
    return event.returnValue;
  };

  const mainContainerStyle = css({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    width: '90%',
    [mq.large]: {
      flexDirection: 'row',
    },
  });

  const timerContainerStyle = css({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'start',
    minWidth: '100%',
    [mq.large]: {
      minWidth: '50%',
    },
  });

  const buttonsContainerStyle = css({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    width: '40%',
    margin: '0 auto',
    [mq.large]: {
      flexDirection: 'column',
    },
  });

  return (
    <div css={mainContainerStyle}>
      <div css={timerContainerStyle}>
        <div css={{ marginBottom: '5%' }} data-testid="timer-container">
          <Time time={time} />
        </div>

        <div css={buttonsContainerStyle}>
          <StopWatchButton
            variant="default"
            onClick={startTimer}
            disabled={isStarted}
            testId="start-button"
          >
            {time === 0 ? 'Start' : 'Resume'}
          </StopWatchButton>
          <StopWatchButton
            variant="default"
            onClick={stopTimer}
            disabled={!isStarted}
            testId="pause-button"
          >
            Pause
          </StopWatchButton>
          <StopWatchButton
            variant="destructive"
            onClick={resetTimer}
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
