import React, { useEffect, useState } from 'react';
import StopWatch from './StopWatch';
import StopWatchButton from './StopWatchButton';

export default function App() {

    //what is the time to be displayed
    const [time, setTime] = useState(0);
    //is the clock currently running or it ir paused.
    const [clockStatus, setStatus] = useState(false);
    //for the lapped timings
    const [laps, setLaps] = useState([])

    //used to change the running status whenver the user clicks start or stop buttons
    const handleStatusChange = (newStatus: boolean) => {
        setStatus(newStatus);
    };
    //for when the user clicks the reset button
    const handleReset = () => {
        setTime(0);
    };
    //for when the user clicks the lap button
    const lapTime = () => {
        setLaps([...laps, 0])
        console.log(laps)
    }

    //logic for the displayed time
    useEffect(() => {
        let interval: number;

        if(clockStatus){
            interval = window.setInterval(() => setTime(time => time + 10), 10)
        }

        return () => {clearInterval(interval)}
    }, [clockStatus])
    //logic for list of lapped times
    useEffect(() => {
        if(time){
            const restLaps:number[] = laps.slice(0, laps.length - 1)
            const last:number = time - restLaps.reduce((acc,v) => acc+v, 0)
            setLaps([...restLaps, last])
        }
        else{
            setLaps([])
        }

    }, [time])

    //function to format displayed time to M:S:MS   
    const getMili = (ms:number) => ('0' + Math.floor(ms / 1000 / 60) % 60).slice(-2)
    const getSec = (ms:number) => ('0' + Math.floor(ms / 1000) % 60).slice(-2)
    const getMin = (ms:number) => ('0' + (ms / 10) % 100).slice(-2);
    
    const formatTime = (ms: number) => `${getMili(ms)}:${getSec(ms)}:${getMin(ms)}`

    return (
        <div id="clock">
            <StopWatch
                time={time}
                formatTime={formatTime}
            />
            <StopWatchButton
                status={clockStatus}
                onStatusChange={handleStatusChange}
                onReset={handleReset}
                onLap={lapTime}
             />
            <div className='laps'>
                {laps.map((lap, i) => <div key={i}>Lap {i + 1}: {formatTime(lap)}</div>)}
            </div>
        </div>
    );
}
