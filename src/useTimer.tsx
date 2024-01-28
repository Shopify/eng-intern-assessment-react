import React, {useState} from 'react';

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

const useTimer = () => {
    const [time, setTime] = useState<Time>({ms:0, s:0, m:0, h:0});
    const [intervalTimeout, setIntervalTimeout] = useState<NodeJS.Timer>();
    const [status, setStatus] = useState(TimerStatus.Unstarted);
    const [laps, setLaps] = useState<Time[]>([]);
  
    const start = () => {
      if (status !== TimerStatus.Running) {
        setStatus(TimerStatus.Running);
        setIntervalTimeout(setInterval(run, 10));
      }
    };
  
    var updatedMs = time.ms, updatedS = time.s, updatedM = time.m, updatedH = time.h; 
  
    const run = () => {
      updatedMs += 10;
      if(updatedM == 60){
        updatedH++;
        updatedM = 0;
      }
      if(updatedS == 60){
        updatedM++;
        updatedS = 0;
      }
      if(updatedMs == 1000){
        updatedS++;
        updatedMs = 0;
      }
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
  
    return {
      time, status, laps, controls: { start,  stop, reset, resume, addLap },
    }
  }
  
  export default useTimer;