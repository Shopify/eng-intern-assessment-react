import React, { useState, useEffect } from 'react';
import StopWatchButton from './StopWatchButton';
import './StopWatch.css';

const StopWatch: React.FC = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState( false );

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isRunning) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning]);

  const startTimer = () => {
    setIsRunning(true);
  };

  const stopTimer = () => {
    setIsRunning(false);
  };

  const resetTimer = () => {
    setTime(0);
    setIsRunning(false);
  };

  return (
    <div className="stopwatch">
      <section className='container'>
        <h1 className='text'>{Math.floor(time / 3600).toString().padStart(2, '0')}</h1>
        <span>:</span>
        <h1 className='text'>{Math.floor((time % 3600) / 60).toString().padStart(2, '0')}</h1>
        <span>:</span>
        <h1 className='text'>{(time % 60).toString().padStart(2, '0')}</h1>
      </section>
      <StopWatchButton
        onStart={startTimer}
        onStop={stopTimer}
        onReset={resetTimer}
        isRunning={isRunning}
      />
    </div>
  );
};

export default StopWatch;
