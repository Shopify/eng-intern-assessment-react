
import { useEffect, useState } from "react";

export default function useStopWatch() {
    const [elapsedTime, setElapsedTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);

    const startStopWatch = () => {
        setIsRunning(true)
    }

    const stopStopWatch = () => {
        setIsRunning(false)
    }

    const resetStopWatch = () => {
        setIsRunning(false)
        setElapsedTime(0);
    }

    // TODO: implement
    const lapStopWatch = () => {
        
    }

    // Update time
    useEffect(() => {
        if (isRunning) {
          const currentTime = Date.now() - elapsedTime;
          const interval = setInterval(() => setElapsedTime(Date.now() - currentTime), 10);
      
          return () => {
            clearInterval(interval);
          };
        }
      }, [isRunning]);
      

    return {elapsedTime, isRunning, startStopWatch, stopStopWatch, resetStopWatch, lapStopWatch}
}