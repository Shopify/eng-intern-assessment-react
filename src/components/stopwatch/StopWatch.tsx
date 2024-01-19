import React from 'react';

import {useStopwatch, Lap} from '../../hooks/useStopwatch';

import StopWatchButton from './StopWatchButton';

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

interface TimerProps {
  milliseconds: number;
}

function Timer({milliseconds}: TimerProps) {
  return (
    <div className="text-6xl font-mono mb-8 text-gray-700 dark:text-gray-300">
      {formatMilliseconds(milliseconds)}
    </div>
  );
}

interface LapListProps {
  laps: Lap[];
}

function LapList({laps}: LapListProps) {
  const lapsList = laps.length ? (
    laps.map(({id, milliseconds}) => (
      <li className="text-gray-600 dark:text-gray-400 mb-2 last:mb-0" key={id}>
        {id}: {formatMilliseconds(milliseconds)}
      </li>
    ))
  ) : (
    <li className="text-gray-600 dark:text-gray-400">No laps recorded yet</li>
  );

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200">
        Lap Times
      </h2>
      <ul className="border border-gray-300 dark:border-gray-700 rounded p-4">
        {lapsList}
      </ul>
    </div>
  );
}

export default function StopWatch() {
  const stopwatch = useStopwatch();

  return (
    <div className="flex flex-col text-center items-center justify-center h-screen bg-gray-100 dark:bg-gray-900">
      <div className="text-center">
        <Timer milliseconds={stopwatch.milliseconds} />
        <StopWatchButton
          onResume={stopwatch.resume}
          onPause={stopwatch.pause}
          onReset={stopwatch.reset}
          onLap={stopwatch.lap}
        />
        <LapList laps={stopwatch.laps} />
      </div>
    </div>
  );
}
