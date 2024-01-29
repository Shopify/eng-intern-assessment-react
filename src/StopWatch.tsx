import React, { useEffect } from 'react';

type Props = {
    isRunning: boolean;
    time: number;
    setTime: React.Dispatch<React.SetStateAction<number>>;
    laps: number[];
};

export const formatTime = (timeInMilliseconds: number): string => {
  const minutes = Math.floor(timeInMilliseconds / (60 * 1000));
  const seconds = Math.floor((timeInMilliseconds % (60 * 1000)) / 1000);
  const milliseconds = timeInMilliseconds % 1000;

  const formattedMilliseconds = `${milliseconds}`.slice(0, 2);

  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}:${formattedMilliseconds.padStart(2, '0')}`;
};

export default function StopWatch(props: Props) {
    useEffect(() => {
      let interval: NodeJS.Timeout;
  
      if (props.isRunning) {
        interval = setInterval(() => {
          props.setTime((prevTime) => prevTime + 10);
        }, 10);
      }
  
      return () => clearInterval(interval);
    }, [props.isRunning]);
  
    return (
      <div>
        <span role='time-display'>{formatTime(props.time)}</span>
        {props.laps.length > 0 && (
        <div role='laps'>
          <h2>Laps</h2>
          <ul>
            {props.laps.map((lap, index) => (
              <li key={index}>{formatTime(lap)}</li>
            ))}
          </ul>
        </div>
      )}
      </div>
    );
}