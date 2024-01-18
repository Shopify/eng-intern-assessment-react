import React, { useState, useEffect } from 'react';
import StopWatchButton from './StopWatchButton';
import './styles/StopWatch.css';


export default function StopWatch() {
    const [time, setTime] = useState(0);
    const [running, setRunning] = useState(false);
    const [laps, setLaps] = useState([]);

    useEffect(() => {
        let interval: NodeJS.Timeout | null = null;
        if (running) {
            interval = setInterval(() => {
                setTime(prevTime => prevTime + 1)
            }, 10); // Update the time every 10 milliseconds
        } else if (!running && time !== 0) {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [running, time]);

    const handleStartStop = () => {
        setRunning(!running);
    }

    const handleReset = () => {
        setTime(0);
        setLaps([]);
        setRunning(false);
    }

    const handleLap = () => {
        setLaps([...laps, time]);
    }

    // Convert the time to hours, minutes, seconds, and milliseconds
    const formatTime = (time: number) => {
        const milliseconds = ("00" + (Math.floor(time) % 100)).slice(-2);
        const seconds = ("00" + (Math.floor(time / 100) % 60)).slice(-2);
        const minutes = ("00" + (Math.floor(time / 6000) % 60)).slice(-2);
        const hours = ("00" + Math.floor(time / 360000)).slice(-2);

        return `${hours}:${minutes}:${seconds}:${milliseconds}`;
    }

    return (
        <div className="timer">
            <div className="logo">
                <img src="https://cdn.shopify.com/assets/images/logos/shopify-bag.png" alt="Shopify logo" />
            </div>
            <div className="time">
                <h1>{formatTime(time)}</h1>
            </div>
            <div className="buttons">
                <StopWatchButton onClick={handleStartStop} label={running ? 'Stop' : 'Start'} />
                <StopWatchButton onClick={handleReset} label='Reset' />
                <StopWatchButton onClick={handleLap} label='Lap' disabled={!running}/>
            </div>
            <div className="laps">
                {[...laps].reverse().map((lap, index) => (
                    <h2 key={index}>Lap {laps.length - index}: {formatTime(lap)}</h2>
                ))}
            </div>
            <div className="strip-left">
                <img src="logo1.png" alt="Logo 1" />
                <img src="logo2.png" alt="Logo 2" />
                <img src="logo3.png" alt="Logo 3" />
                <img src="logo4.png" alt="Logo 4" />
                <img src="logo5.png" alt="Logo 5" />
            </div>
            <div className="strip-right">
                <img src="logo6.png" alt="Logo 6" />
                <img src="logo7.png" alt="Logo 7" />
                <img src="logo8.png" alt="Logo 8" />
                <img src="logo9.png" alt="Logo 9" />
                <img src="logo10.png" alt="Logo 10" />
            </div>
        </div>
    );
}