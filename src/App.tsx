import React, { useState, useEffect } from 'react';
import Stopwatch from './Stopwatch';
import StopwatchButton from './StopwatchButton';
import LapTimeList from './LapTimeList';
import './assets/app.css';


const App: React.FC = () => {
  const [time, setTime] = useState<number>(0);
  const [timerOn, setTimerOn] = useState<boolean>(false);
  const [laps, setLaps] = useState<number[]>([]);

  useEffect(() => {
    let timeout = setTimeout(() => {
      if(timerOn) setTime(time + 1);
    }, 1000);

    return () => clearInterval(timeout);
  }, [time, timerOn]);

  const handleLap = () => {
    setLaps([...laps, time]);
  }

  const handleStart = () => {
    setTimerOn(true);
  }

  const handleStop = () => {
    setTimerOn(false);
  }
  const handleReset = () => {
    setTime(0);
    setLaps([]);
  }

  return (
    <div className="app">
        <Stopwatch time={time}/>
        <div className='control-buttons'>
            <StopwatchButton label='Start' disable={timerOn} onClick={handleStart}/>
            <StopwatchButton label='Stop' disable={!timerOn} onClick={handleStop}/>
            <StopwatchButton label='Reset' disable={time === 0} onClick={handleReset}/>
            <StopwatchButton label='Lap' disable={time === 0} onClick={handleLap}/>
        </div>
        <LapTimeList laps={laps}/>
    </div>
  );
};

export default App;
