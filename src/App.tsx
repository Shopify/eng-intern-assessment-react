import React, { useState, useEffect } from 'react';
import StopWatchButton from './StopWatchButton';
import StopWatch from './StopWatch';
import { Page } from '@shopify/polaris'


export default function App() {

  //To track if stopwatch is running or not (true = running, false = not running)
  const [isRunning, setIsRunning] = useState(false);

  //To keep track of current Lap Time
  const [currentTime, setCurrentTime] = useState(0)

  //To keep track of total time elapsed (will rest to 0 if reset button is clicked)
  const [totalTime, setTotalTime] = useState(0)

  const [lapTimes, setLapTimes] = useState<number[]>([]);
  const [totalTimes, setTotalTimes] = useState<number[]>([]);

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


  const startStop = () => {
    setIsRunning(!isRunning)
  }

  const setLap = () => {
    setLapTimes((prevCurr) => [...prevCurr, currentTime])
    setTotalTimes((prevTotal) =>[...prevTotal, totalTime])
    setCurrentTime(0)
  }

  const resetButton = () => {
    while(lapTimes.length){
        lapTimes.pop()
    }
    while(totalTimes.length){
        totalTimes.pop()
    }
    setIsRunning(false)
    setCurrentTime(0)
    setTotalTime(0)
  }

  
  return (
    
    <div >
        <StopWatchButton
      isRunning = {isRunning}
      startStop={startStop}
      lapButton={setLap}
      resetButton={resetButton}/>
      <StopWatch 
      currentTime={currentTime}
      totalTime={totalTime}
      lapTimes={lapTimes}
      totalTimes={totalTimes}/>
      
    </div>
    
  );
};


