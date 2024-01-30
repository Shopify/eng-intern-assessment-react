import React, { useState, useEffect, useRef } from 'react';
import StopWatchButton from './StopWatchButton';

export function formatTime(time: number): string {
    const hours = Math.floor(time / 3600000);
    const minutes = Math.floor((time % 3600000) / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    const milliseconds = Math.round(time % 1000 / 10);

    return `${hours > 0 ? `${hours.toString().padStart(2, '0')}:` : ''}${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}:${milliseconds.toString().padStart(2, '0')}`;
}

export default function StopWatch() {
    const [time, setTime] = useState(0);
    const [timerOn, setTimerOn] = useState(false);
    const [lapTimes, setLapTimes] = useState([]);
    const [lastLapTime, setLastLapTime] = useState(0);
    const intervalRef = useRef(null);

    const handleReset = () => {
        setTimerOn(false);
        setTime(0);
        setLapTimes([]);
        setLastLapTime(0);
    };

    useEffect(() => {
        if (!timerOn) {
            clearInterval(intervalRef.current);
            return;
        }

        intervalRef.current = setInterval(() => {
            setTime(time => time + 10);
        }, 10);

        return () => clearInterval(intervalRef.current);
    }, [timerOn]);

    const recordLap = () => {
        const currentLapTime = time - lastLapTime;
        setLapTimes([...lapTimes, currentLapTime]);
        setLastLapTime(time);
    };

    return (
        <div className='stopwatch'>
            <h1 className='stopwatch-title'>StopWatch</h1>
            <div className='stopwatch-content'>
                <div className='stopwatch-buttons'>
                    <StopWatchButton type={'start'} onClick={() => setTimerOn(true)} />
                    <StopWatchButton type={'stop'} onClick={() => setTimerOn(false)} />
                    <StopWatchButton type={'lap'} onClick={recordLap} timerOn={timerOn} lapTimes={lapTimes} />
                    <StopWatchButton type={'reset'} onClick={handleReset} time={time} />
                </div>
                <div className='stopwatch-time'>
                    <p>{formatTime(time)}</p>
                    {lapTimes.length > 0 && (
                        <div className='stopwatch-laptimes'>
                            <p>Lap times</p>
                            <ul>
                                {lapTimes.map((lapTime, index) => <li key={index}>{index + 1}. {formatTime(lapTime)}</li>)}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
