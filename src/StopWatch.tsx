// A separate component that represents the stopwatch display.

import React from 'react'

interface Props {
    time: number;
}

export default function StopWatch({time}: Props) {

    const textStyle = {
        color: '#dbdada',
        fontSize: '80px',
        letterSpacing: '2px',
        margin: '2px'
    };

    const formatTime = (time: number) => {
        const getSeconds = `0${(time % 60)}`.slice(-2);
        const minutes = `${Math.floor(time / 60)}`;
        const getMinutes = `0${Number(minutes) % 60}`.slice(-2);
        const getHours = `0${Math.floor(time / 3600)}`.slice(-2);

        return `${getHours} : ${getMinutes} : ${getSeconds}`;
    }

    return(
        <div>
            <p style = {textStyle}> {formatTime(time)} </p>
        </div>
    )
}