import React, { useState, useRef, useEffect} from 'react'
import StopWatchButton from '../StopWatchButton/StopWatchButton'
import Laps from '../Laps/Laps'
import { Time } from '../../Models/timeModel'
import './StopWatch.css'

export default function StopWatch() {
    const [time, setTime] = useState<Time>({
        ms: 0,
        s: 0,
        m: 0
    });

    const [isRunning, setIsRunning] = useState(false);
    const [lapTimes, setLapTimes] = useState<string[]>([]);

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

    const deleteLap = (index: number) => {
        const updatedLaps = [...lapTimes];
        updatedLaps.splice(index, 1); // Remove the lap at the specified index
        setLapTimes(updatedLaps);
    }

    const formatTime = (time: Time) => {
        return `${(time.m >= 10) ? time.m : "0" + time.m} : ${(time.s >= 10) ? time.s : "0" + time.s} : ${(time.ms >= 10) ? time.ms : "0" + time.ms}`
    }

    useEffect(() => {
        let interval: NodeJS.Timer;

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
        <div className="stopwatch-container">
            <div className="time-container">
                <h1>
                    {(time.m >= 10) ? time.m : "0" + time.m}: 
                    {(time.s >= 10) ? time.s : "0" + time.s}: 
                    {(time.ms >= 10) ? time.ms : "0" + time.ms}
                </h1>
            </div>

            <div className="buttons-container">
                <StopWatchButton variant="primary" onClick={start} label="Start" />
                <StopWatchButton variant="danger" onClick={stop} label="Stop" />
                <StopWatchButton variant="secondary" onClick={reset} label="Reset" />
                <StopWatchButton variant="secondary" onClick={lap} label="Lap" />
            </div>

            <Laps lapTimes={lapTimes} onDelete={deleteLap} />
        </div>
    )
}