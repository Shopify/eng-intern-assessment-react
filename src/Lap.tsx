// A separate component that represents the lap times. NOTE* this file was created so the laps could be displayed in a separate component from the stopwatch.

import React from 'react'

interface LapProps {
    time: number;
}

export default function Lap({time}: LapProps) {

    const textStyle = { //used to style the lap display text
        color: 'black',
        fontSize: '30px',
        letterSpacing: '2px',
        margin: '2px'
    };

    const divStyle = { //used to center the text
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    };

    const formatTime = (time: number) => {
        const getSeconds = `0${(time % 60)}`.slice(-2); //.slice(-2) ensures the stirng is always 2 characters long thus displaying 00:00:00
        const minutes = `${Math.floor(time / 60)}`;
        const getMinutes = `0${Number(minutes) % 60}`.slice(-2);
        const getHours = `0${Math.floor(time / 3600)}`.slice(-2);

        return `${getHours}:${getMinutes}:${getSeconds}`;
    }

    return(
        <div style = {divStyle}>
            <p style = {textStyle}> Lap: {formatTime(time)} </p>
        </div>
    )
}