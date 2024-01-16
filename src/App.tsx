import React, { useState, useEffect } from 'react';
import StopWatchButton from './StopWatchButton';

export default function App() {

  //To track if stopwatch is running or not (true = running, false = not running)
  const [isRunning, setIsRunning] = useState(false);

  //To keep track of current Lap Time
  const [currentTime, setCurrentTime] = useState(0)

  //To keep track of total time elapsed (will rest to 0 if reset button is clicked)
  const [totalTime, setTotalTime] = useState(0)

  /*
  To keep track of current lap time and total time, if the stopwatch is running 
  then 1 second is added to the current lap time and start time.
  */
  useEffect(() => {
    if(isRunning){
        var interval = setInterval(() => {
            setCurrentTime(currentTime + 1)
            setTotalTime(totalTime + 1)
          }, 1000);
    }
    
    return () => {
        
        clearInterval(interval)
      };
  }, [isRunning, currentTime, totalTime])

 
  // Math.floor rounds down to the nearest integer (i.e. 1.9 = 1)
  const seconds = Math.floor(currentTime % 60) //current number of seconds
  const totalSeconds = Math.floor(totalTime % 60) //total number of seconds

  const startStop = () => {
    setIsRunning(!isRunning)
  }

  const setLap = () => {
    setCurrentTime(0)
  }

  const resetButton = () => {
    setIsRunning(false)
    setCurrentTime(0)
    setTotalTime(0)
  }

  
  return (
    <div>
      <h2>{seconds.toString() + " Lap " + totalSeconds.toString()}</h2>
      <StopWatchButton
      isRunning = {isRunning}
      startStop={startStop}
      lapButton={setLap}
      resetButton={resetButton}/>
    </div>
  );
};


