import React from 'react';

interface StopWatchProps {
  time: number;
  laps: number[];
}

export default function StopWatch({ time, laps }: StopWatchProps) {
  /**
   * Formats the given time in milliseconds into a displayable format.
   * @param milliseconds - The time in milliseconds.
   * @returns The formatted time string in the format "mm:ss.ms".
   */
  const formatDisplayTime = (milliseconds: number) => {
    const minutes = Math.floor(milliseconds / 60000);
    const seconds = ((milliseconds % 60000) / 1000).toFixed(2);

    return `${minutes < 10 ? '0' : ''}${minutes}:${
      +seconds < 10 ? '0' : ''
    }${seconds}`;
  };

  return (
    <div>
      <div>
        <span>{formatDisplayTime(time)}</span>
      </div>
      <ul data-testid='lap-list'>
        {laps.map((lap, index) => (
          <li key={index}>
            <p>
              Lap {index + 1}: {formatDisplayTime(lap)}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
