import React, { useState } from 'react'
import TimeDisplay from './TimeDisplay';
import Lap from './Lap';
import StopWatchButton, { ButtonVariant } from './StopWatchButton';

export enum TimerStatus {
    Unstarted,
    Running,
    Paused,
}

export type Time = {
    h: number;
    m: number;
    s: number;
    ms: number;
}

export default function StopWatch() {
    const [time, setTime] = useState<Time>({ms:0, s:0, m:0, h:0});
    const [intervalTimeout, setIntervalTimeout] = useState<NodeJS.Timer>();
    const [status, setStatus] = useState(TimerStatus.Unstarted);
    const [laps, setLaps] = useState<Time[]>([]);
  
    const start = () => {
      run();
      setStatus(TimerStatus.Running);
      setIntervalTimeout(setInterval(run, 10));
    };
  
    var updatedMs = time.ms, updatedS = time.s, updatedM = time.m, updatedH = time.h; 
  
    const run = () => {
      if(updatedM == 60){
        updatedH++;
        updatedM = 0;
      }
      if(updatedS == 60){
        updatedM++;
        updatedS = 0;
      }
      if(updatedMs == 100){
        updatedS++;
        updatedMs = 0;
      }
      updatedMs++;
      return setTime({ms:updatedMs, s:updatedS, m:updatedM, h:updatedH});
    };
  
    const stop = () => {
      clearInterval(intervalTimeout);
      setStatus(TimerStatus.Paused);
    };
  
    const reset = () => {
      clearInterval(intervalTimeout);
      setStatus(TimerStatus.Unstarted);
      setTime({ms:0, s:0, m:0, h:0})
      setLaps([]);
    };
  
    const resume = () => start();
  
    const addLap = () => {
      setLaps([...laps, time]);
    }

    let buttons: React.ReactNode[] = [];
    if (status === TimerStatus.Unstarted) {
        buttons = [
            <StopWatchButton variant={ButtonVariant.Green} onClick={start}>Start</StopWatchButton>,
        ];
    } else if (status === TimerStatus.Running) {
        buttons = [
            <StopWatchButton variant={ButtonVariant.Red} onClick={stop}>Stop</StopWatchButton>,
            <StopWatchButton variant={ButtonVariant.Yellow} onClick={reset}>Reset</StopWatchButton>,
        ];
    } else if (status === TimerStatus.Paused) {
        buttons = [
            <StopWatchButton variant={ButtonVariant.Green} onClick={resume}>Resume</StopWatchButton>,
            <StopWatchButton variant={ButtonVariant.Yellow} onClick={reset}>Reset</StopWatchButton>,
        ]
    }

    if (status === TimerStatus.Running || status === TimerStatus.Paused) {
        buttons.push(
            <StopWatchButton variant={ButtonVariant.Green} onClick={addLap}>Lap</StopWatchButton>)
    }

    return (
        <div>
            <div className='clock-holder'>
                <div className='stopwatch'>
                    <TimeDisplay time={time} />
                    <div>
                        {...buttons}
                    </div>
                </div>
            </div>
            <Lap laps={laps} />
        </div>
    )
}