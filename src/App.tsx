import React, { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid';

import StopWatch from './StopWatch'
import StopWatchButton from './StopWatchButton'
import './styles.css'

export default function App() {
    let intervalID: ReturnType<typeof setInterval>;

    const [seconds, setSeconds] = useState(0);
    const [counting, setCounting] = useState(false);
    const [laps, setLaps] = useState([]);

    useEffect(() => {
        if (counting) {
            intervalID = setInterval(() => {
                setSeconds(seconds => seconds + 1);
            }, 1000)
        } else {
            clearInterval(intervalID);
        }

        return () => {
            clearInterval(intervalID);
        }
    }, [counting, seconds])

    function handleStartClick() {
        setCounting(true);
    }

    function handleStopClick() {
        setCounting(false);
    }

    function handleResetClick() {
        setCounting(false);
        setSeconds(0);
        setLaps([]);
    }

    function handleLapClick() {
        if (counting) {
            if (laps.length == 0) {
                // First lap, just add current time to lap list
                setLaps([{ id: uuidv4(), length: seconds, timeClicked: seconds }]);
            } else {
                // Calculate time passed since last lap
                const currentLapTime = seconds - laps[laps.length - 1].timeClicked;
                setLaps([...laps, { id: uuidv4(), length: currentLapTime, timeClicked: seconds }]);
            }
        }
    }

    return (
        <div id='app-container'>
            <StopWatch seconds={seconds} />

            <div id='btns-container'>
                <StopWatchButton text='Start' handleClick={handleStartClick} />
                <StopWatchButton text='Stop' handleClick={handleStopClick} />
                <StopWatchButton text='Reset' handleClick={handleResetClick} />
                <StopWatchButton text='Lap' handleClick={handleLapClick} />
            </div>

            <ol data-testid='lap-list'>
                {laps.map(lap => (
                    <li key={lap.id}>{new Date(lap.length * 1000).toISOString().slice(11, 19)}</li>
                ))}
            </ol>
        </div>
    )
}