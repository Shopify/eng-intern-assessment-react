// A separate component that represents the stopwatch display.

import React from 'react'

interface StopWatchProps {
    time: number;
}

export default function StopWatch({time}: StopWatchProps) {

    const textStyle = { //used to style the stopwatch display text
        color: 'black',
        fontSize: '80px',
        letterSpacing: '2px',
        margin: '2px'
    };

    const formatTime = (time: number) => { //formats the time to be displayed in the stopwatch
        const getSeconds = `0${(time % 60)}`.slice(-2);  //.slice(-2) ensures the stirng is always 2 characters long thus displaying 00:00:00
        const minutes = `${Math.floor(time / 60)}`;
        const getMinutes = `0${Number(minutes) % 60}`.slice(-2);
        const getHours = `0${Math.floor(time / 3600)}`.slice(-2);

        return `${getHours}:${getMinutes}:${getSeconds}`;
    }

    return(
        <div>
            <p style = {textStyle}> {formatTime(time)} </p>
        </div>
    )
}