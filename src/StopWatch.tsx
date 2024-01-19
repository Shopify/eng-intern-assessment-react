import React, { useState, useEffect } from 'react';

function StopWatch() {
  const [currentState, setCurrentState] = useState('');
  const [currentTime, setCurrentTime] = useState(0);
  const [laps, setLaps] = useState([]);

  // Start the stopwatch
  const onStart = () => {
    if (currentState === 'START') return;
    setCurrentState('START');
  };

  // Stop the stopwatch
  const onStop = () => {
    if (currentState === 'STOP') return;
    setCurrentState('STOP');
  };

  // Reset the stopwatch
  const onReset = () => {
    if (currentState === 'RESET') return;
    setCurrentTime(0);
    setLaps([]);
    setCurrentState('RESET');
  };

  // Record a lap
  const onLap = () => {
    try {
      // Allow lap recording in both START and STOP states
      if (currentState === 'START' || currentState === 'STOP' || currentTime==0) {
        setLaps((prevLaps) => [...prevLaps, currentTime]);
      }
    } catch (error) {
      console.error('Error recording lap:', error.message);
    }
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;

    // Update time at regular intervals when in the START state
    try {
      if (currentState === 'START') {
        interval = setInterval(() => {
          setCurrentTime((currentTime) => currentTime + 50);
        }, 50);
      } else {
        clearInterval(interval);
      }
    } catch (error) {
      console.error('Error updating time:', error.message);
    }

    // Cleanup the interval on component unmount
    return () => {
      clearInterval(interval);
    };
  }, [currentState, currentTime]);

  // Format the time as a string
  const formatTime = (time: number): string => {
    try {
      const sec = Math.floor(time / 1000);
      const min = Math.floor(sec / 60);
      const hour = Math.floor(min / 60);
      const milliseconds = (time % 1000).toString().padStart(3, '0');
      const seconds = (sec % 60).toString().padStart(2, '0');
      const minutes = (min % 60).toString().padStart(2, '0');
      const hours = (hour % 24).toString().padStart(2, '0');
      return `${hours}:${minutes}:${seconds}.${milliseconds}`;
    } catch (error) {
      console.error('Error formatting time:', error.message);
      return '00:00:00.000';
    }
  };

  return (
    <div style={{ textAlign: 'center', margin: '50vh' }}>
      <span>{formatTime(currentTime)}</span>

      <br />

      <button onClick={onStart}>Start</button>
      <button onClick={onStop}>Stop</button>
      <button onClick={onReset}>Reset</button>
      <button onClick={onLap}>Lap</button>

      <div>
        <span>Laps:</span>
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {laps.map((lapTime, index) => (
            <li key={index}>{`Lap ${index + 1}: ${formatTime(lapTime)}`}</li>
          ))}
        </ul>
      </div>
      
    </div>
  );
}

export default StopWatch;
