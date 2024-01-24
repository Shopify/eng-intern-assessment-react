import React, { useState, useEffect } from 'react';
import '../styles/StopWatch.css';

import StopWatchButton from './StopWatchButton';

const StopWatch: React.FC = () => {
    const [startTime, setStartTime] = useState<number | null>(null);
    const [elapsedTime, setElapsedTime] = useState<number>(0);
    const [isRunning, setRunning] = useState<boolean>(false);
    const [laps, setLaps] = useState<number[]>([]);

    useEffect(() => {
        let interval: NodeJS.Timeout | null = null;

        if (isRunning) {
            interval = setInterval(() => {
                setElapsedTime(prevTime => {
                    return new Date().getTime() - (startTime ?? new Date().getTime());
                });
            }, 10);
        } else if (interval) {
            clearInterval(interval);
        }

        return () => {
            if (interval) {
                clearInterval(interval);
            }
        };
    }, [isRunning, startTime]);

    const clickStartStop = () => {
        if (isRunning) {
            setRunning(false);
        } else {
            setRunning(true);
            const currTime = new Date().getTime();
            setStartTime(currTime - elapsedTime);
        }
    };

    const clickLap = () => {
        if (isRunning) {
            setLaps(prevLaps => [...prevLaps, elapsedTime]);
        }
    };

    const clickReset = () => {
        setRunning(false);
        setElapsedTime(0);
        setLaps([]);
        setStartTime(null);
    };

    const formatTime = (time: number) => {
        const millis = (time % 1000);
        const secs = (Math.floor(time / 1000) % 60);
        const mins = (Math.floor(time / (1000 * 60)) % 60);
        const hours = (Math.floor(time / (1000 * 60 * 60)));

        return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}.${millis.toString().padStart(3, '0')}`;
    }

    return (
        <div className='watch-container'>
            <div className='upper-container'>
                <h2 className='watch-title'> Stopwatch </h2>

                <div className='watch-timer'>
                    { formatTime(elapsedTime) }
                </div>

                <div className='watch-buttons'>
                    <StopWatchButton onClick={clickLap} label={'Lap'} />
                    <StopWatchButton onClick={clickStartStop} label={isRunning ? 'Stop' : 'Start'} />
                    <StopWatchButton onClick={clickReset} label={'Reset'} />
                </div>
            </div>

            <div className='laps-container'>
                {laps.length > 0 && (
                    <ul>
                        {laps.map((lap, count) => (
                            <li key={count}>
                                {formatTime(lap)}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default StopWatch;