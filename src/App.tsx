import React, { useState, useEffect } from 'react';
import StopWatch from './StopWatch';
import StopWatchButton from './StopWatchButton';
import './style.css';

export interface Time {
    hours: string;
    minutes: string;
    seconds: string;
}

const App:React.FC = () => {
    const [timeInSec, setTimeInSec] = useState<number>(0);
    const [time, setTime] = useState<Time>({
        hours: "00",
        minutes: "00",
        seconds: "00"
    });
    
    useEffect(() => {
        let hrs = Math.floor(timeInSec / 3600);
        let mins = Math.floor(timeInSec / 60) % 60;
        let secs = timeInSec % 60;

        setTime({
            hours: `0${hrs}`.slice(-2),
            minutes: `0${mins}`.slice(-2),
            seconds: `0${secs}`.slice(-2)
        });
    }, [timeInSec]);

    return(
        <div className="app-container">
            <StopWatch {...time}/>
            <StopWatchButton setTimeInSec={setTimeInSec}/>
        </div>
    )
};

export default App;