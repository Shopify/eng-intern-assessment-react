import React, { useState, useEffect } from 'react';
import StopWatchButton from './StopWatchButton';
import './utils/styles.css';

interface TimersProps {
  mainTimer: string;
  lapTimer: string;
}

const Timers = ({ mainTimer, lapTimer }: TimersProps) => {
    return (
      <div className="timers-container">
        <div className="main-timer">{mainTimer}</div>
        <div className="lap-timer">{lapTimer}</div>
      </div>
    );
  };
  
  const formatTime = (milliseconds: number) => {
    const seconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
  
    const formattedHours = String(hours).padStart(2, '0');
    const formattedMinutes = String(minutes % 60).padStart(2, '0');
    const formattedSeconds = String(seconds % 60).padStart(2, '0');
    const formattedMilliseconds = String(Math.floor((milliseconds % 1000) / 10)).padStart(2, '0');
  
    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}.${formattedMilliseconds}`;
  };
  
  const StopWatch = () => {
    const [mainTimer, setMainTimer] = useState(0);
    const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);
  
    const startTimer = () => {
      const newIntervalId = setInterval(() => {
        setMainTimer((currTime) => currTime + 10);
      }, 10);
      setIntervalId(newIntervalId);
    };
  
    const stopTimer = () => {
      if (intervalId) {
        clearInterval(intervalId);
        setIntervalId(null);
      }
    };
  
    const handlePlayOrPauseClick = () => {
      if (intervalId) {
        stopTimer();
      } else {
        startTimer();
      }
    };
  
    useEffect(() => {
      return () => stopTimer();
    }, []);

  return (
    <div className="main">
      <div className="thin-gray-circle">
        <Timers mainTimer={formatTime(mainTimer)} lapTimer="00:00:00" />
      </div>
      <StopWatchButton onToggleRun={handlePlayOrPauseClick} />
    </div>
  );
};

export default StopWatch;
