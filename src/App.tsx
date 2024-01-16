import React, {useState, useRef} from 'react';
import Stopwatch from './StopWatch';
import StopwatchButtons from './StopWatchButton';
import './styles/StopWatch.css';

// Main App component
export default function App() {

    const [watchtime, setTime] = useState<number>(0);
    const [isRunning, setIsRunning] = useState<boolean>(false);
    const timerRef = useRef<number | null>(null); // Ref for managing the interval
    const [laps, setLaps] = useState<number[]>([]); // Array to store lap times
    const [lapStartTime, setLapStartTime] = useState<number | null>(0); // to handle the initial mount of StopWtach to present negative lap values

    const startStopwatch = () => { 

        if (isRunning) { // stop button function
          clearInterval(timerRef.current!);
        } else {
          // start button function
          timerRef.current = window.setInterval(() => {
            setTime((prevTime) => prevTime + 1);
          }, 10); //time is tracked in centiseconds
        }
    
        setIsRunning(!isRunning);
    };

    const ResetLapStopwatch = () => {

        if (isRunning) { // lap button function
            if (lapStartTime !== null) {
                const lapTime = watchtime - lapStartTime;
                setLaps((prevLaps) => [...prevLaps, lapTime]);
            }
            setLapStartTime(watchtime);
        } else {
            clearInterval(timerRef.current!); // reset button function 
            setTime(0);
            setLaps([]);
            setLapStartTime(0);
            setIsRunning(false);
        }
    };

    return(
        <div className="clock-container">
            <StopwatchButtons onStartStopClick={startStopwatch} onResetLapClick={ResetLapStopwatch} isRunning={isRunning}/>
            <Stopwatch watchtime={watchtime} laps={laps} />
        </div>
    )
}