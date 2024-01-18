import React, { useState, useEffect } from 'react';
import StopWatchButton from './StopWatchButton';
import StopWatch from './StopWatch';
import LiveWatch from './LiveWatch';
import { Button, InlineStack } from '@shopify/polaris'
import './stylesheets/App.css'


export default function App() {


  // To track if stopwatch is running or not (true = running, false = not running).
  const [isRunning, setIsRunning] = useState(false);


  // To keep track of current Lap Time.
  const [currentTime, setCurrentTime] = useState(0)


  // To keep track of total time elapsed (will rest to 0 if reset button is clicked).
  const [totalTime, setTotalTime] = useState(0)


  // To keep track of the time of each lap.
  const [lapTimes, setLapTimes] = useState<number[]>([]);


  // To keep track of the total time elapsed by the time each Lap is reached.
  const [totalTimes, setTotalTimes] = useState<number[]>([]);


  /*
  To toggle between the live clock display and the lap times display.
  Display is set to the component that needs to be rendered. <Stopwatch/> shows
  the lap times and a digital format of the total elapsed time and current lap
  time. <LiveWatch /> displays an analog/live format (in seconds only) of the
  total elapsed time and current lap time.
  */ 
  const [display, setDisplay] = useState(true);

  /*
  When the display (digital/analog) is toggled, this is used to change the button
  label. The app starts in the digital format therefore the initial useState value
  is set to 'Show Live Clock'. When the analog/live clock is displayed the value
  on the button changes to 'Show Lap Times'.
  */
  const [buttonText, setButtonText] = useState('Show Live Clock')


  /*
  Used to maintain the current second value of the current lap time. Initially,
  the current second will be set to 0. When start is pressed, the current second
  value will be automatically updated. This component is sent as a prop to 
  <LiveWatch/> which then calculates how much the orange second hand should rotate.
  */
  const [maintainCurr, setMaintainCurr] = useState(0)
  

  /*
  Used to maintain the current second value of the total elapsed time. Initially,
  the current second will be set to 0. When start is pressed, the current second
  value will be automatically updated. This component is sent as a prop to 
  <LiveWatch/> which then calculates how much the blue second hand should rotate.
  */
  const [maintainTotal, setMaintainTotal] = useState(0) 


  /*
  To keep track of current lap time and total time, if the stopwatch is running 
  then 1 second is added to the current lap time and start time. The values
  that are updated to the analog/live clock are also updated every second.
  */
  useEffect(() => {
    if(isRunning){
        var interval = setInterval(() => {
            setCurrentTime(currentTime + 1)
            setTotalTime(totalTime + 1)
            setMaintainCurr((Math.floor((currentTime + 1) % 60)) * 6)
            setMaintainTotal((Math.floor((totalTime + 1) % 60)) * 6)
          }, 1000);
    }
    
    return () => {
        
        clearInterval(interval)
      };
  }, [isRunning, currentTime, totalTime])


  // Button onClick function used to start and stop the stopwatch.
  const startStop = () => {
    setIsRunning(!isRunning)
  }


  /*
  Button onClick function to record lap times. The method only works when the 
  stopwatch is running otherwise no lap times are stored. Once the lap time is
  stored in the lapTimes array and the total elapsed time for that lap is stored
  in the totalTimes array, the current (new) lap time is set to 0.
  */
  const setLap = () => {
    if(isRunning){
      setLapTimes((prevCurr) => [...prevCurr, currentTime])
      setTotalTimes((prevTotal) =>[...prevTotal, totalTime])
      setCurrentTime(0)
    }
  }


  /*
  Stops the stopwatch and resets total elapsed time and current lap time to 0. Clears
  the lapTimes array and the totalTimes array. Sets the maintainCurr and maintainTotal
  values to 0 so that the analog/live clock also resets to 0.
  */
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


  /* 
  Button onClick function used to set the value of the display button depending on 
  what is being displayed.
  */
  const toggleVisibility = () => {
    setDisplay(!display)
    setButtonText(display ? 'Show Lap Times' : 'Show Live Clock')
  }
  
  
  return (
    <div className='pageBg'>
      {/*Buttons to start, stop, lap, and reset stopwatch*/}
      <StopWatchButton
      isRunning = {isRunning}
      startStop={startStop}
      lapButton={setLap}
      resetButton={resetButton}/>


      {/*switches between digital and analog display when button below is clicked*/}
      {display ? <StopWatch 
      currentTime={currentTime}
      totalTime={totalTime}
      lapTimes={lapTimes}
      totalTimes={totalTimes}/> : 
      <LiveWatch
      maintainCurr={maintainCurr}
      maintainTotal={maintainTotal}/>}

      
      {/*when clicked, switches the current display and changes to the appropriate button label*/}
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


