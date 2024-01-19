import React, { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid';

import StopWatch from './StopWatch'
import StopWatchButton from './StopWatchButton'

export default function App() {
    let intervalID: ReturnType<typeof setInterval>;

    const [seconds, setSeconds] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [hours, setHours] = useState(0);
    const [counting, setCounting] = useState(false);
    const [laps, setLaps] = useState([]);

    useEffect(() => {
        if (counting) {
            intervalID = setInterval(() => {

                // Handle seconds overflow
                if (seconds == 59) {
                    setMinutes(minutes => minutes + 1);
                    setSeconds(0);
                    return;
                }

                // Handle minutes overflow
                if (minutes == 59) {
                    setHours(hours => hours + 1);
                    setMinutes(0);
                    return;
                }

                // Handle hours overflow
                if (hours == 59) {
                    clearInterval(intervalID);
                    return;
                }

                setSeconds(seconds => seconds + 1);
            }, 1000)
        } else {
            clearInterval(intervalID);
        }

        return () => {
            clearInterval(intervalID);
        }
    }, [counting, seconds, minutes, hours])

    return (
        <div>
            <StopWatch hours={hours} minutes={minutes} seconds={seconds} />
            <StopWatchButton text='Start' handleClick={() => {
                setCounting(true);
            }} />
            <StopWatchButton text='Stop' handleClick={() => {
                setCounting(false);
            }} />
            <StopWatchButton text='Reset' handleClick={() => {
                setCounting(false);
                setSeconds(0);
                setMinutes(0);
                setHours(0);
                setLaps([]);
            }} />
            <StopWatchButton text='Lap' handleClick={() => {
                // Add current time to lap list
                setLaps([...laps, { id: uuidv4(), hours: hours, minutes: minutes, seconds: seconds }])
            }} />

            <ol data-testid='lap-list'>
                {laps.map(lap => (
                    <li key={lap.id}>{String(lap.hours).padStart(2, '0')}:{String(lap.minutes).padStart(2, '0')}:{String(lap.seconds).padStart(2, '0')}</li>
                ))}
            </ol>
        </div>
    )
}