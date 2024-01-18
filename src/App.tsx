import React, { useState, useEffect, useRef } from 'react';
import StopWatchButton from './StopWatchButton';
import StopWatch from './StopWatch';
import LiveWatch from './LiveWatch';
import { Button, InlineStack } from '@shopify/polaris'
import './stylesheets/App.css'


export default function App() {

  //To track if stopwatch is running or not (true = running, false = not running)
  const [isRunning, setIsRunning] = useState(false);

  //To keep track of current Lap Time
  const [currentTime, setCurrentTime] = useState(0)

  //To keep track of total time elapsed (will rest to 0 if reset button is clicked)
  const [totalTime, setTotalTime] = useState(0)

  const [lapTimes, setLapTimes] = useState<number[]>([]);
  const [totalTimes, setTotalTimes] = useState<number[]>([]);

  const [display, setDisplay] = useState(true);
  const [buttonText, setButtonText] = useState('Show Live Clock')

  const [maintainCurr, setMaintainCurr] = useState(0) 
  const [maintainTotal, setMaintainTotal] = useState(0) 

  /*
  To keep track of current lap time and total time, if the stopwatch is running 
  then 1 second is added to the current lap time and start time.
  */
  useEffect(() => {
    if(isRunning){
        var interval = setInterval(() => {
            setCurrentTime(currentTime + 1)
            setTotalTime(totalTime + 1)
            setMaintainCurr((Math.floor(currentTime % 60)) * 6)
            setMaintainTotal((Math.floor(totalTime % 60)) * 6)
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
    setMaintainCurr(0)
    setMaintainTotal(0)

  }

  const toggleVisibility = () => {
    setDisplay(!display)
    setButtonText(display ? 'Show Lap Times' : 'Show Live Clock')
  }
  
  return (
    
    <div className='pageBg'>

      <StopWatchButton
      isRunning = {isRunning}
      startStop={startStop}
      lapButton={setLap}
      resetButton={resetButton}/>

      {display ? <StopWatch 
      currentTime={currentTime}
      totalTime={totalTime}
      lapTimes={lapTimes}
      totalTimes={totalTimes}/> : 
      <LiveWatch
      
      maintainCurr={maintainCurr}
      maintainTotal={maintainTotal}/>}

      <div style={{marginTop:'1%'}}>
        <InlineStack align='center'>
          <Button size='large' variant='primary' onClick={toggleVisibility}>
            {buttonText}
          </Button>
        </InlineStack>
      </div>
      
    </div>
    
  );
};


