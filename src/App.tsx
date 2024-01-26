import React, { useState, useEffect } from 'react';
import Stopwatch from './StopWatch';

const App: React.FC = () => {
  const [isRunning, setIsRunning] = useState(false); //use state that tracks if the stopwatch is running, set to false initially
  const [elapsedTime, setElapsedTime] = useState(0); //tracks the elapsed time, used to display current stopwatch time
  const [lapTimes, setLapTimes] = useState<{ minutes: number; seconds: number }[]>([]); //array of lap times that tracks minutes and seconds for lap times

  useEffect(() => { //use effect to update the stopwatch everytime it ticks by the second
    let interval: NodeJS.Timeout; //interval is a timer identifier type, interval will be used as the timer

    if (isRunning) {
      interval = setInterval(() => {
        setElapsedTime((prevElapsedTime) => prevElapsedTime + 1);
      }, 1000);
    }//if the stopwatch is running, we use a useEffect to update the elapsed time, by setting the interval as the previous time and adding 1 second

    return () => clearInterval(interval); //clears the interval to prevent it from counting when isRunning is set to false (when the stopwatch is stopped)
  }, [isRunning]);

  const handleStart = () => {
    setIsRunning(true); //sets is running to true, which starts the stopwatch
  };

  const handleStop = () => {
    setIsRunning(false); //sets is running to false, which stops the stopwatch
  };

  const handleReset = () => { //handle reset sets all the variables and laptimes to their default settings
    setIsRunning(false);
    setElapsedTime(0);
    setLapTimes([]);
  };

  const handleLap = () => { //takes the current elapsed time, formats them into seconds and minutes, creates a new lap time object and sets it to the array 
    const totalSeconds = elapsedTime % 60;
    const totalMinutes = Math.floor(elapsedTime / 60);

    const lapTime = {
      minutes: totalMinutes,
      seconds: totalSeconds,
    };

    setLapTimes((prevLapTimes) => [...prevLapTimes, lapTime]);
  };

  return (
    <Stopwatch
      isRunning={isRunning}
      elapsedTime={elapsedTime}
      lapTimes={lapTimes}
      onStart={handleStart}
      onStop={handleStop}
      onReset={handleReset}
      onLap={handleLap}
    />
  );
};

export default App;
