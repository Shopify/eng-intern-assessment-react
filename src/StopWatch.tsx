import React, { useState, useRef, useEffect} from 'react'
import StopWatchButton from './StopWatchButton'
import Laps from './Laps'

export default function StopWatch() {
    //stopwatch application hh:mm:ss:ms
    const [time, setTime] = React.useState({
        ms: 0,
        s: 0,
        m: 0,
    })

    const [isRunning, setIsRunning] = useState(false);
    const [lapTimes, setLapTimes] = useState([]);

    const start = () => { 
        console.log("start");
        setIsRunning(true)
    }

    const stop = () => {
        console.log("stop");
        setIsRunning(false)
    }

    const reset = () => {
        console.log("reset");
        setTime({ms: 0, s: 0, m: 0})
        setLapTimes([])
    }

    const lap = () => {
        console.log("lap");
        setLapTimes([...lapTimes, formatTime(time)])
    }

    const formatTime = (time: any) => {
        return `${(time.m >= 10) ? time.m : "0" + time.m} : ${(time.s >= 10) ? time.s : "0" + time.s} : ${(time.ms >= 10) ? time.ms : "0" + time.ms}`
    }

    useEffect(() => {
        let interval: any = null;

        if (isRunning) {
          interval = setInterval(() => {
            setTime((prevTime) => {
              let newMs = prevTime.ms + 10;
      
              if (newMs >= 1000) {
                newMs = 0;
                let newS = prevTime.s + 1;
      
                if (newS >= 60) {
                  newS = 0;
                  let newM = prevTime.m + 1;
      
                  return { ms: newMs, s: newS, m: newM };
                }
      
                return { ms: newMs, s: newS, m: prevTime.m };
              }
      
              return { ...prevTime, ms: newMs };
            });
          }, 10);
        }

        return () => clearInterval(interval);
    }, [isRunning])

    return(
        <div>
            <h1>StopWatch</h1>
            <div className = "time-container">
                <span>{(time.m >= 10) ? time.m : "0" + time.m}</span>:
                <span>{(time.s >= 10) ? time.s : "0" + time.s}</span>:
                <span>{(time.ms >= 10) ? time.ms : "0" + time.ms}</span>
            </div>

            <div className = "buttons-container">
                <StopWatchButton onClick={start} label="Start" />
                <StopWatchButton onClick={stop} label="Stop" />
                <StopWatchButton onClick={reset} label="Reset" />
                <StopWatchButton onClick={lap} label="Lap" />
            </div>

            <Laps lapTimes={lapTimes} />
                
        </div>
    )
}