import React, { useState, useEffect } from 'react';
import StopWatchButton from './StopWatchButton';
import './styles/StopWatch.css';

export default function StopWatch() {
    // Import images/logos
    const shopify = require('./logos/shopify.png').default;
    const tesla = require('./logos/Tesla_logo.png').default;
    const LVMH = require('./logos/LVMH.png').default;
    const nestle = require('./logos/Nestle.svg.png').default;
    const pepsico = require('./logos/pepsico.png').default;
    const abinbev = require('./logos/abinbev.png').default;
    const kraftheinz = require('./logos/kraftheinz.png').default;
    const lindt = require('./logos/lindt.png').default;
    const wholefoods = require('./logos/wholefoods.png').default;
    const redbull = require('./logos/redbull.jpg').default;
    const hyatt = require('./logos/hyatt.jpg').default;
    const penguin = require('./logos/penguin.png').default;
    const fitbit = require('./logos/fitbit.png').default;
    const gymshark = require('./logos/gymshark.png').default;
    const kylie = require('./logos/kylie.png').default;
    const kkw = require('./logos/kkw.jpg').default;

    // State variables for time, running state, laps and laptime
    const [time, setTime] = useState(0);
    const [running, setRunning] = useState(false);
    const [laps, setLaps] = useState([]); //array of lap times
    const [lapTime, setLapTime] = useState(0);

    // useEffect hook to handle the timer interval when time or running changes
    useEffect(() => {
        let interval: NodeJS.Timeout | null = null;
        if (running) {
            interval = setInterval(() => {
                setTime(prevTime => prevTime + 1)
                setLapTime(prevTime => prevTime + 1)
            }, 10); // Update the time every 10 milliseconds
        } else if (!running && time !== 0) {
            clearInterval(interval); // Clear the interval when the stopwatch is stopped
        }
        return () => clearInterval(interval);
    }, [running, time]);

    // Event handler to start/stop the stopwatch
    const handleStartStop = () => {
        setRunning(!running);
    }

    // Event handler to reset the timer and laps
    const handleReset = () => {
        setTime(0);
        setLaps([]);
        setRunning(false);
    }

    // Event handler to record a lap
    const handleLap = () => {
        setLaps([...laps, lapTime]);
        setLapTime(0);
    }

    // Function to format the time into hours, minutes, seconds, and milliseconds
    const formatTime = (time: number) => {
        const milliseconds = ("00" + (Math.floor(time) % 100)).slice(-2);
        const seconds = ("00" + (Math.floor(time / 100) % 60)).slice(-2);
        const minutes = ("00" + (Math.floor(time / 6000) % 60)).slice(-2);
        const hours = ("00" + Math.floor(time / 360000)).slice(-2);

        return `${hours}:${minutes}:${seconds}:${milliseconds}`;
    }

    // Render the StopWatch component
    return (
        <div className="timer">
            <div className="logo">
                <img src={shopify} alt="Shopify" />
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
                <img id="tesla" src={tesla} alt="Logo 1" />
                <img id="LVMH" src={LVMH} alt="Logo 2" />
                <img id="nestle" src={nestle} alt="Logo 3" />
                <img id="pepsico" src={pepsico} alt="Logo 4" />
                <img id="abinbev" src={abinbev} alt="Logo 5" />
                <img id="kraftheinz" src={kraftheinz} alt="Logo 6" />
                <img id="lindt" src={lindt} alt="Logo 7" />
                <img id="wholefoods" src={wholefoods} alt="Logo 8" />
            </div>
            <div className="strip-right">
                <img id="redbull" src={redbull} alt="Logo 9" />
                <img id="hyatt" src={hyatt} alt="Logo 10" />
                <img id="penguin" src={penguin} alt="Logo 11" />
                <img id="fitbit" src={fitbit} alt="Logo 12" />
                <img id="gymshark" src={gymshark} alt="Logo 13" />
                <img id="kylie" src={kylie} alt="Logo 14" />
                <img id="kkw" src={kkw} alt="Logo 8" />
            </div>
        </div>
    );
}
