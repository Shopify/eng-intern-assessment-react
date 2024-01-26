import React from 'react';

interface StopwatchProps {
    time: number;
    laps: number[];
}

const formatTime = (time: number) => {
  const milliseconds = Math.floor((time % 1000) / 10);
  const seconds = Math.floor(time / 1000) % 60;
  const minutes = Math.floor(time / 60000) % 60;
  const hours = Math.floor(time / 3600000);

  const formattedMilliseconds = String(milliseconds).padStart(2, '0');
  const formattedSeconds = String(seconds).padStart(2, '0');
  const formattedMinutes = String(minutes).padStart(2, '0');
  const formattedHours = String(hours).padStart(2, '0');

  return `${formattedHours}:${formattedMinutes}:${formattedSeconds}.${formattedMilliseconds}`;
};

export default function Stopwatch({ time, laps }: StopwatchProps) {
    return (
        <div>
            <h2 className='stopwatch'>{formatTime(time)}</h2>
            <h3>Laps</h3>
            <ul>
                {laps.map((lap, index) => (
                    <li key={index}>{formatTime(lap)}</li>
                ))}
            </ul>
        </div>
    );
}