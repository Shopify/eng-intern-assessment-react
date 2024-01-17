import React, { useEffect, useState } from 'react';
import StopWatchButton from './StopWatchButton';
import './styles.css';

export default function StopWatch() {
    const [isRunning, setRunning] = useState(false)
    const [isUsed, setUsed] = useState(false)
    const [time, setTime] = useState(0)
    const [lapTime, setLapTime] = useState(0)
    const [lapStore, setLapStore] = useState([])

    const handleStart = () => {
        setRunning(true)
        setUsed(true)
    }
    const handleStop = () => {
        setRunning(false)
    }
    const handleReset = () => {
        setTime(0)
        setLapTime(0)
        setLapStore([])
        setUsed(false)
    }
    const handleLap = () => {
        setLapTime(time)
        setLapStore([...lapStore, time])
    }
    useEffect(() => {
        let interval: any;
        if (isRunning) {
            interval = setInterval(() => {
                setTime((time) => time + 10)
            }, 10);
        } else {
            clearInterval(interval)
        }
        return () => clearInterval(interval)
    }, [isRunning])

    const processTime = (time: any) => {
        const miliseconds = Math.floor((time / 10) % 100).toString().padStart(2, '0') ;
        const seconds = Math.floor((time / 1000) % 60).toString().padStart(2, '0');
        const minutes = Math.floor((time / 60000) % 60).toString().padStart(2, '0');
        return `${minutes} : ${seconds} : ${miliseconds}`
    }
    return(
        <div className='timer-container'>
            <div className='time-value'>{processTime(time)}</div>
            <StopWatchButton isUsed={isUsed} isRunning={isRunning} onStart={handleStart} onStop={handleStop} onReset={handleReset} onLap={handleLap}/>
            <div className='lap-time-container'>
                {lapStore.slice().reverse().map((lapTime, index) => (
                    <div className='lap-item'>
                        <div className='lap-label'>{"lap " + (lapStore.length - index) + " "}</div>
                        <div className={(lapTime == Math.max(...lapStore) ? 'max' : (lapTime == Math.min(...lapStore) ? 'min' : ''))}>{processTime(lapTime)}</div>
                    </div>
                ))}
            </div>
        </div>
    )
}