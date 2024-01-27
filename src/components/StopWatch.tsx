import React, { useRef, useState } from 'react';
import './styles/StopWatch.css';
import { formatTime } from '../utils/formatTime';
import StopWatchButton from './StopWatchButton';
import Laps from './Laps';


export default function StopWatch() {

    const [time, setTime] = useState<number>(0);
    const [currentLap, setCurrentLap] = useState<number>(0);
    const [isRunning, setIsRunning] = useState<boolean>(false);
    const [laps, setLaps] = useState<number[]>([]);
    
    let intervalRef = useRef(null);

    // reset lap information to the initial state
    const resetLaps = () => {
        setLaps([])
        setTime(0)
        setCurrentLap(0);
    }

    // increment time by 10 milliseconds
    const incrementTime = () => {
        setTime((prev) => prev + 10);
        setCurrentLap((prev) => prev + 10);
    }

    // set isRunning states of the stopwatch
    const activate = () => {
        setIsRunning(true);
    }
    const unactivate = () => {
        setIsRunning(false);
    }


    const startTimer = () => {
        if (time === 0) {
            resetLaps()
        }

        if (!isRunning) {
            // start the stopwatch and increment the state of the time every 10 milliseconds by 10 milliseconds
            intervalRef.current = setInterval(() => { incrementTime() }, 10)
            activate()
        }
    }

    //stop time keeping
    const stopTimer = () => {
        // stops time count by clearing the interval
        clearInterval(intervalRef.current);
        intervalRef.current = null;
        unactivate()
    }

    const resetTimer = () => {
        // stop time keeping
        stopTimer()
        resetLaps()
    }

    const newLap = () => {    
        // add the current lap time to the lap records
        setLaps([...laps, currentLap]);

        //reset the time of the current lap
        setCurrentLap(0)
    }

    return(
        <div className='stopwatch-container'>
            <div className='time' data-testid='total-time'>{formatTime(time)}</div>
            <StopWatchButton 
                time={time}
                isRunning={isRunning}
                handleStartTimer={startTimer}
                handleStopTimer={stopTimer}
                handleResetTimer={resetTimer}
                handleNewLap={newLap}
            />
            <Laps laps={laps} currentLapTime={currentLap} />
        </div>
    )
} 