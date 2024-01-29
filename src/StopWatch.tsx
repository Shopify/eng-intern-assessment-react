import React, { useEffect, useState } from 'react'
import StopWatchButton from './StopWatchButton'

// stopwatch display

interface Props {
    // time: number;
    ms: number;
}

export default function StopWatch() {

    const [time, setTime] = useState(0)
    const [laps, setLaps] = useState([])
    const [isRunning, setIsRunning] = useState(false)
  
    const getMinutes = (ms: number) => ("0" + Math.floor((ms / 60 / 1000) % 60)).slice(-2)
    const getSeconds = (ms: number) => ("0" + Math.floor((ms / 1000) % 60)).slice(-2)
    const getMilliSeconds = (ms: number) => ("0" + (ms / 10) % 100).slice(-2)
  
    const formatTime = (ms: number) => `${getMinutes(ms)}:${getSeconds(ms)}.${getMilliSeconds(ms)}`
  
    useEffect(() => {
      let interval: string | number | NodeJS.Timeout = null;
  
      if (isRunning) {
        interval = setInterval(() => setTime(time => time + 10), 10);
      } 
      
      return () => clearInterval(interval);
    }, [isRunning]);
  
    useEffect(() => {
      if (time) {
        const rest = laps.slice(0,laps.length-1)    
        let last =  time - rest.reduce((acc,x) => acc+x, 0)
        setLaps([...rest,last])
      }
      else {
        setLaps([])
      }
    },[time])

    return(
       <div>
                <div className="stopwatch-time">{formatTime(time)}</div>
        <div className="stopwatch-buttons">
        {!isRunning && !time && <StopWatchButton color={"green"} onClick={() => setIsRunning(true)}>Start</StopWatchButton>}
        {!isRunning && time > 0 && <StopWatchButton color={"green"} onClick={() => setIsRunning(true)}>Resume</StopWatchButton>}
        {isRunning && <StopWatchButton color={"red"} onClick={() => setIsRunning(false)}>Stop</StopWatchButton> }
        {isRunning && <StopWatchButton color={"blue"} onClick={() => setLaps([...laps,0])}>Lap</StopWatchButton>}
        {!isRunning && time > 0 && <StopWatchButton color={"blue"} onClick={() => setTime(0)}>Reset</StopWatchButton> }

        </div>
  
        <div className="laps">
          {laps.map((x,i) => <div key={i}>Lap {i+1}: {formatTime(x)}</div>)}
        </div>
       </div>
    )
}