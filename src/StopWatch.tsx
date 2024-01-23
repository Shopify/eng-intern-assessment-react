import React, { useEffect, useState } from 'react'
import StopWatchButton from './StopWatchButton'
import './styles.css'

export default function StopWatch() {
    const [time, setTime] = useState<number>(0);
    const [isActive, setIsActive] = useState<boolean>(false);
    const [laps, setLaps] = useState<number[]>([]);

    let interval: NodeJS.Timeout;
    const lapsList = document.getElementById('Laps');

    useEffect(() => {
        if (isActive) {
            interval = setInterval(() => setTime(time + 1), 10);
        }
        return () => clearInterval(interval);
    }, [isActive, time]);

    const start = () => setIsActive(true);
        
    const stop = () => setIsActive(false);
        
    // Resets both time and laps to 0
    const reset = () => {
        setTime(0);
        setLaps([]);
        lapsList.innerHTML = '';
    }

    const formatTime = (time: number) => {
        const hours = Math.floor(time / 360000);
        const minutes = Math.floor((time % 360000) / 6000)
        const seconds = Math.floor((time % 6000) / 100);
        const milliseconds = time % 100;

        return `${hours.toLocaleString('en-US', {minimumIntegerDigits: 2})}:${minutes.toLocaleString('en-US', {minimumIntegerDigits: 2})}:${seconds.toLocaleString('en-US', {minimumIntegerDigits: 2})}:${milliseconds.toLocaleString('en-US', {minimumIntegerDigits: 2})}`;
    }

    const lap = () => {
        setLaps([...laps, time]);
        const newLap = document.createElement('li');
        newLap.textContent = `Lap ${laps.length + 1} : ${formatTime(time)}`;
        lapsList.appendChild(newLap);
    }
    
    return(
        <div className='StopWatch'>
            <h2 className='Time' data-testid='timeDisplay'>{formatTime(time)}</h2>
            <div className='ButtonsContainer'>
                <StopWatchButton name={'Start'} disabled={isActive} onClick={start} datatestid={'startButton'}></StopWatchButton>
                <StopWatchButton name={'Stop'} disabled={!isActive} onClick={stop} datatestid={'stopButton'}></StopWatchButton>
                <StopWatchButton name={'Reset'} disabled={isActive} onClick={reset} datatestid={'resetButton'}></StopWatchButton>
                <StopWatchButton name={'Lap'} disabled={!isActive} onClick={lap} datatestid={'lapButton'}></StopWatchButton>
            </div>
            <ul id='Laps'></ul>
        </div>
    )
}