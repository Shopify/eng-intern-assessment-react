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
        setLapStore([...lapStore, lapTime])
    }
    useEffect(() => {
        let interval: any = null
        if (isRunning) {
            interval = setInterval(() => {
                setTime((time) => time + 10)
            }, 1);
        } else {
            clearInterval(interval)
        }
        return () => clearInterval(interval)
    }, [isRunning])

    const processTime = (time: any) => {
        const miliseconds = (time % 1000) / 10;
        const seconds = Math.floor(time / 1000) % 60;
        const minutes = Math.floor(time / 60000) % 60;
        return `${minutes.toString().padStart(2, '0')} : ` + `${seconds.toString().padStart(2, '0')} : ` + `${miliseconds.toString().padStart(2, '0')}`
    }
    return(
        <div className='timer-container'>
            <div>{processTime(time)}</div>
            <StopWatchButton isUsed={isUsed} isRunning={isRunning} onStart={handleStart} onStop={handleStop} onReset={handleReset} onLap={handleLap}/>
            <div>{lapStore.map(lapTime => processTime(lapTime))}</div>
        </div>
    )
}