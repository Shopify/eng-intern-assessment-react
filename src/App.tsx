
import React, {useState} from 'react';
import StopWatch from './StopWatch';
import StopWatchButton from './StopWatchButton';
import './App.css';

export default function App() {

    const [time, setTime] = useState({ms:0, s:0, m:0, h:0});
    const [interv, setInterv] = useState<NodeJS.Timer | undefined>();
    const [status, setStatus] = useState(0);
    const [laps, setLaps] = useState<string[]>([]);
    const [prevTime, setPrevTime] = useState<number | null>(null);

    const start = () => {
        timeUpdater();
        setStatus(1);
        setInterv(setInterval(timeUpdater, 10) as NodeJS.Timer);
    };

    var updatedMs = time.ms, updatedS= time.s, updatedM = time.m, updatedH = time.h

    // updates the timer for when 1 unit of time passes
    const timeUpdater = () => {
        if (updatedM === 60) {
            updatedH++;
            updatedM = 0;
        }
        if (updatedS === 60) {
            updatedM++;
            updatedS = 0;
        }
        if (updatedMs === 100) {
            updatedS++;
            updatedMs = 0;
        }
        updatedMs++;
        return setTime({ms:updatedMs, s:updatedS, m:updatedM, h:updatedH});
    };

    const stop = () => {
        clearInterval(interv);
        setStatus(2);
    };

    const reset = () => {
        setTime({ ms: 0, s: 0, m: 0, h: 0 });
        setPrevTime(null);
        if (interv) {
          clearInterval(interv);
        }
        setStatus(0);
        // clear all the laps
        setLaps([]);
    };
    
    const resume = () => start();

    const lap = () => {
        const now = Date.now();
        if (prevTime === null) {
          // for first lap display current time on the timer
          const lapTime = convertToTime(time.h, time.m, time.s, time.ms);
          setLaps([lapTime]);
        } else {
          // for the following laps display difference between current time on the timer and the previous lap
          const lapTime = calculateLapTime(now);
          setLaps(prevLaps => [...prevLaps, lapTime]);
        }
        setPrevTime(now);
      };
    
      const calculateLapTime = (currentTime: number): string => {
        const diff = currentTime - prevTime!;
        const lapTime = convertToTime(0, 0, Math.floor(diff / 1000), Math.floor((diff % 1000) / 10));
        return lapTime;
      };
    
      const convertToTime = (h: number, m: number, s: number, ms: number): string => {
        return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}.${ms.toString().padStart(2, '0')}`;
      };
    
      return (
        <div className="main-section">
          <div className="clock-holder">
            <div className="stopwatch">
              <StopWatch time={time} />
              <StopWatchButton status={status} start={start} stop={stop} reset={reset} lap={lap} resume={resume}/>
              <div className="laps-section">
                <h2>Laps</h2>
                <ul>
                  {laps.map((lap, index) => (
                    <li key={index}>{lap}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      );
}

import React from 'react'
import './App.css'
import StopWatch from './StopWatch'

export default function App() {
    return(
        <StopWatch />
    )
}
