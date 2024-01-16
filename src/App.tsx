import React, {useState, useRef} from 'react';
import Stopwatch from './StopWatch';
import StopwatchButtons from './StopWatchButton';
import './styles/StopWatch.css';

// Main App component
export default function App() {

    const [watchtime, setTime] = useState<number>(0);
    const [clockstart, setclockstart] = useState<boolean>(false);
    const reftimer = useRef<number | null>(null); // Ref for managing the interval
    const [laps, setLaps] = useState<number[]>([]); // Array to store lap times
    const [lapStartTime, setLapStartTime] = useState<number | null>(0); // to handle the initial mount of StopWtach to present negative lap values

    const startStopwatch = () => { 

        if (clockstart) { // stop button function
          clearInterval(reftimer.current!);
        } else {
          // start button function
          reftimer.current = window.setInterval(() => {
            setTime((prevTime) => prevTime + 1);
          }, 10); //time is tracked in centiseconds
        }
    
        setclockstart(!clockstart);
    };

    const ResetLapStopwatch = () => {

        if (clockstart) { // lap button function
            if (lapStartTime !== null) {
                const lapTime = watchtime - lapStartTime;
                setLaps((prevLaps) => [...prevLaps, lapTime]);
            }
            setLapStartTime(watchtime);
        } else {
            clearInterval(reftimer.current!); // reset button function 
            setTime(0);
            setLaps([]);
            setLapStartTime(0);
            setclockstart(false);
        }
    };

    return(
        <div className="clock-container">
            <StopwatchButtons onStartStopClick={startStopwatch} onResetLapClick={ResetLapStopwatch} clockstart={clockstart}/>
            <Stopwatch watchtime={watchtime} laps={laps} />
        </div>
    )
}