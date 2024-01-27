import React, { useEffect, useState } from 'react';
import StopWatch from './StopWatch';
import StopWatchButton from './StopWatchButton';

export default function App() {
    //what is the time to be displayed
    const [time, setTime] = useState(0);
    //is the clock currently running or it ir paused.
    const [clockStatus, setStatus] = useState(false);
    //used to change the running status whenver the user clicks start or stop buttons
    const handleStatusChange = (newStatus: boolean) => {
        setStatus(newStatus);
    };
    //for when the user clicks the reset button
    const handleReset = () => {
        setTime(0);
    };
    const lapTime = () => {
        
    }
    //logic for the displayed time
    useEffect(() => {
        let interval: any;

        if(clockStatus){
            interval = setInterval(() => setTime(time => time + 10), 10)
        }

        return () => {clearInterval(interval)}
    }, [clockStatus])

    return (
        <div>
            <StopWatch
                time={time}
            />
            <StopWatchButton
                status={clockStatus}
                onStatusChange={handleStatusChange}
                onReset={handleReset}
                onLap={lapTime}
             />
        </div>
    );
}
