import React from 'react';

import StopWatchButton from './StopWatchButton';
import {useStopwatch} from './hooks/useStopwatch';

function formatNumber(num: number) {
  return String(num).padStart(2, '0');
}

function formatMilliseconds(milliseconds: number) {
  const hours = formatNumber(Math.floor(milliseconds / 3600000));
  const minutes = formatNumber(Math.floor((milliseconds % 3600000) / 60000));
  const seconds = formatNumber(Math.floor((milliseconds % 60000) / 1000));
  const centiseconds = formatNumber(Math.floor((milliseconds % 1000) / 10));

  return `${hours}:${minutes}:${seconds}.${centiseconds}`;
}

export default function StopWatch() {
  const stopwatch = useStopwatch();

  return (
    <>
      <StopWatchButton
        onResume={stopwatch.resume}
        onPause={stopwatch.pause}
        onReset={stopwatch.reset}
        onLap={stopwatch.lap}
      />
      <span>{formatMilliseconds(stopwatch.milliseconds)}</span>
      <ul>
        {stopwatch.laps.map(({id, milliseconds}) => (
          <li key={id}>
            <span>{formatMilliseconds(milliseconds)}</span>
          </li>
        ))}
      </ul>
    </>
  );
}
