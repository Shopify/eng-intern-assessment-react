import React, { useState, useEffect } from 'react';
import StopWatchButton from './StopWatchButton';
import './StopWatch.css';

const StopWatch: React.FC = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState<number[]>([]); 

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
    setLaps([]); 
  };

  const recordLap = () => {
    setLaps((prevLaps) => [...prevLaps, time]); 
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
        onLap={recordLap} 
        isRunning={isRunning}
      />
     
      <div className="lap-list">
        {laps.map((lap, index) => (
          <div key={index} className="lap">
            <span>Lap {index + 1}:</span>
            <span>{Math.floor(lap / 3600).toString().padStart(2, '0')}:</span>
            <span>{Math.floor((lap % 3600) / 60).toString().padStart(2, '0')}:</span>
            <span>{(lap % 60).toString().padStart(2, '0')}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StopWatch;
