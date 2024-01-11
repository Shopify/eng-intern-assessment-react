import React, { useState } from 'react';
import StopWatchButton from './StopWatchButton';
import LapsTable from './LapsTable';
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
  const [mainInterval, setMainInterval] = useState<NodeJS.Timeout | null>(null);

  const [lapTimer, setLapTimer] = useState(0);
  const [lapInterval, setLapInterval] = useState<NodeJS.Timeout | null>(null);

  const [lapTimes, setLapTimes] = useState<string[]>([]);

  const startMainTimer = () => {
    const newIntervalId = setInterval(() => {
      setMainTimer((currTime) => currTime + 10);
    }, 10);
    setMainInterval(newIntervalId);
  };

  const stopMainTimer = () => {
    if (mainInterval) {
      clearInterval(mainInterval);
      setMainInterval(null);
    }
  };

  const handlePlayOrPauseClick = () => {
    if (mainInterval) {
      stopMainTimer();
      stopLapTimer();
    } else {
      startMainTimer();
      startLapTimer();
    }
  };

  const startLapTimer = () => {
    const newIntervalId = setInterval(() => {
      setLapTimer((currTime) => currTime + 10);
    }, 10);
    setLapInterval(newIntervalId);
  };

  const stopLapTimer = () => {
    if (lapInterval) {
      clearInterval(lapInterval);
      setLapInterval(null);
    }
  };

  const handleLapClick = () => {
    if (mainInterval) {
      const formattedLapTime = formatTime(lapTimer);
      setLapTimes((prevLapTimes) => [...prevLapTimes, formattedLapTime]);
      setLapTimer(0);
      clearInterval(lapInterval);
      startLapTimer();
    } else if (lapTimer) {
      const formattedLapTime = formatTime(lapTimer);
      setLapTimes((prevLapTimes) => [...prevLapTimes, formattedLapTime]);
      setLapTimer(0);
      clearInterval(lapInterval);
    }
  };

  const handleResetClicked = () => {
    setLapTimer(0);
    clearInterval(lapInterval);
    setMainTimer(0);
    clearInterval(mainInterval);
    stopMainTimer();
    stopLapTimer();
    setLapTimes([]);
  };

  // Decided to create a new component for lap times since this one is getting big.
  return (
    <div className="main">
      <div className="thin-gray-circle">
        <Timers mainTimer={formatTime(mainTimer)} lapTimer={formatTime(lapTimer)} />
      </div>
      <StopWatchButton onPlayOrPause={handlePlayOrPauseClick} onLap={handleLapClick} onReset={handleResetClicked} />
      <LapsTable lapTimes={lapTimes} />
    </div>
  );
};

export default StopWatch;
