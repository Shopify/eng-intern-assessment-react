import React, { useState, useEffect } from 'react'
import StopWatchButton from './StopWatchButton'

export default function StopWatch() {
    const [time, setTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [laps, setLaps] = useState([]);
    const [lapStartTime, setLapStartTime] = useState(0);

    const startTimer = () => {
        setIsRunning(true);
        setLapStartTime(time);
    };

    const stopTimer = () => {
        setIsRunning(false);
    };

    const resetTimer = () => {
        setTime(0);
        setIsRunning(false);
        setLaps([]);
    };

    const addLap = () => {
        const lapTime = laps.length > 0 ? time - lapStartTime : time ;
        setLapStartTime(time);
        setLaps([...laps, lapTime]);
    };
    
    // useEffect to handle the stopwatch timing.
    // Starts an interval to update 'time' every 10ms when 'isRunning' is true.
    // Clears the interval on cleanup or when 'isRunning' changes to false.
    useEffect(() => {
        let interval: NodeJS.Timeout | null = null;

        if (isRunning) {
        interval = setInterval(() => {
            setTime(t => t + 10);
        }, 10);
        }

        return () => {
            if (interval) clearInterval(interval);
        };

    }, [isRunning]);

    return(
        <div style={{display:"flex", alignItems : "center", flexDirection : "column"}}>
            <h1 style={{margin: '10px', fontSize : '50px'}}>Stopwatch</h1>
            <div style={{ fontSize: '120px', margin: '5px 10px' }}>
                {Math.floor(time / 60000).toString().padStart(2, '0')}:
                {((time % 60000) / 1000).toFixed(1).padStart(4, '0')}
            </div>
            {
                isRunning ?
                <div>
                    <StopWatchButton onClick={stopTimer} text="Stop"/> 
                    <StopWatchButton onClick={addLap} text="Lap" />
                </div> 
                : 
                <div>
                    <StopWatchButton onClick={startTimer} text="Start"/>
                    <StopWatchButton onClick={resetTimer} text="Reset"/>
                </div>
            }

            <div style={{ overflow: 'auto', maxHeight: '450px', margin : '25px'}} >
                {laps.map((lap, index) => (
                <div key={index} style={{margin: '10px', fontSize : '40px'}}>
                    <span style={{paddingRight : "50px"}}>Lap {index + 1}</span>
                    <span>
                        {Math.floor(lap / 60000).toString().padStart(2, '0')}:
                        {((lap % 60000) / 1000).toFixed(1).padStart(4, '0')}
                    </span>
                </div>
                ))}
            </div>
        </div>
    )
}