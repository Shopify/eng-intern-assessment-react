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

// Custom hook for managing timer state
const useTimer = () => {
  // State variables for time, interval ID, timer status, and laps
    const [time, setTime] = useState<Time>({ms:0, s:0, m:0, h:0});
    const [intervalTimeout, setIntervalTimeout] = useState<NodeJS.Timer>();
    const [status, setStatus] = useState(TimerStatus.Unstarted);
    const [laps, setLaps] = useState<Time[]>([]);

    // Variables to keep track of update time values
    let updatedMs = time.ms, updatedS = time.s, updatedM = time.m, updatedH = time.h; 
  
    // Starts the timer ticking every 10ms
    const start = () => {
      if (status !== TimerStatus.Running) {
        setStatus(TimerStatus.Running);
        setIntervalTimeout(setInterval(run, 10));
      }
    };
  
    // Tick time forward by 10 milliseconds
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
  
    // Return the timer state and control functions
    return {
      time, status, laps, controls: { start,  stop, reset, resume, addLap },
    }
  }
  
  export default useTimer;