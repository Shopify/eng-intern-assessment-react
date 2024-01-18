import React, { useState, useEffect } from 'react';
import StopWatchButton from './StopWatchButton';

export default function StopWatch() {
  const [milliseconds, setMilliseconds] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [lapTimes, setLapTimes] = useState<string[]>([]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
  
    if (isRunning) {
      timer = setInterval(() => {
        setMilliseconds((prev) => {
          if (prev >= 99) {
            setSeconds((s) => s + 1);
            return 0;
          }
          return prev + 1;
        });
        
        if (seconds >= 59) {
          setMinutes((prev) => (prev + 1) % 60);
        }
      }, 1);
    }
  
    return () => clearInterval(timer);
  }, [isRunning, milliseconds]);

  const startStopwatch = () => {
    setIsRunning(true);
  };

  const stopStopwatch = () => {
    setIsRunning(false);
  };

  const resetStopwatch = () => {
    setIsRunning(false);
    setMilliseconds(0);
    setSeconds(0);
    setMinutes(0);
    setLapTimes([]);
  };

  const lapStopwatch = () => {
    const lapTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(2, '0')}`;
    setLapTimes((prev) => [...prev, lapTime]);
  };

  return (
    <>
      <div style={{ width: '100%', height: '250px', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <h1 style={{ fontSize: '8rem', fontWeight: 'lighter' }}>
          {`${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`}
          <span style={{ fontSize: '3rem', width: '50px', display: 'inline-block' }}>{`${milliseconds.toString().padStart(2, '0')}`}</span>
        </h1>
      </div>
      <StopWatchButton
        onStart={startStopwatch}
        onStop={stopStopwatch}
        onReset={resetStopwatch}
        onLap={lapStopwatch}
        isRunning={isRunning}
      />
      <div style={{ padding: '40px' }}>
        {lapTimes.map((lap, index) => (
          <div key={index}><b>Lap {index+1}:</b> {lap}</div>
        ))}
      </div>
    </>
  );
}