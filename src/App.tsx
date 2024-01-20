import React, { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid';

import StopWatch from './StopWatch'
import StopWatchButton from './StopWatchButton'

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

    return (
        <div>
            <StopWatch seconds={seconds} />
            <StopWatchButton text='Start' handleClick={() => {
                setCounting(true);
            }} />
            <StopWatchButton text='Stop' handleClick={() => {
                setCounting(false);
            }} />
            <StopWatchButton text='Reset' handleClick={() => {
                setCounting(false);
                setSeconds(0);
                setLaps([]);
            }} />
            <StopWatchButton text='Lap' handleClick={() => {
                // Add current time to lap list
                setLaps([...laps, { id: uuidv4(), seconds: seconds }])
            }} />

            <ol data-testid='lap-list'>
                {laps.map(lap => (
                    <li key={lap.id}>{new Date(lap.seconds * 1000).toISOString().slice(11, 19)}</li>
                ))}
            </ol>
        </div>
    )
}