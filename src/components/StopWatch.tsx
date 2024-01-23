import React from 'react'
import {useState, useEffect} from 'react';
import StopWatchButton from "./StopWatchButton";

/**
 * Function displays the stopwatch timer, capable of starting/stopping and resetting the
 * timer as well as recording lap times
 * @constructor
 */
export default function StopWatch(): React.JSX.Element {
    //state management for updating the unconverted time;
    const [time, setTime] = useState<number>(0);

    // Hours calculation
    const hours = Math.floor(time / 360000).toString().padStart(2, "0");
    // Minutes calculation
    const minutes = Math.floor((time % 360000) / 6000).toString().padStart(2, "0");
    // Seconds calculation
    const seconds = Math.floor((time % 6000) / 100).toString().padStart(2, "0");
    // Milliseconds calculation
    const milliseconds = (time % 100).toString().padStart(2, "0");

    // Timer to be displayed
    const formattedTime = `${hours}:${minutes}:${seconds}:${milliseconds}`


    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%'
        }}>
            <div style={{
                fontSize: '90px',
                width: '500px',
                margin: '30px',
            }}>{formattedTime}</div>
            <StopWatchButton
                formattedTime={formattedTime}
                time={time}
                setTime={setTime}
            />
            <div>
            </div>
        </div>
    )
}
