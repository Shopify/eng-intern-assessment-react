import React, { useState, useEffect } from 'react';
import Stopwatch from './Stopwatch';
import StopwatchButton from './StopwatchButton';
import { formatTime } from './utils';

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
    <div>
        <Stopwatch time={time}/>
        <div className='control-buttons'>
            <StopwatchButton label='Start' disable={timerOn} onClick={handleStart}/>
            <StopwatchButton label='Stop' disable={!timerOn} onClick={handleStop}/>
            <StopwatchButton label='Reset' disable={time === 0} onClick={handleReset}/>
            <StopwatchButton label='Lap' disable={time === 0} onClick={handleLap}/>
        </div>
        <div className='lap-times'>
            {laps.map((lapTime, index) => {
                return <p key={index}>{formatTime(lapTime)}</p>;
            })}
        </div>
    </div>
  );
};

export default App;
