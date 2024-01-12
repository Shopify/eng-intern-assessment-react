import React, { useState, useEffect } from 'react';
import StopWatchButton from './StopWatchButton';

export default function StopWatch() {
    const [time, setTime] = useState(0);
    const [timerOn, setTimerOn] = useState(false);
    const [laps, setLaps] = useState<number[]>([]);
    const formatTime = (time:number) => {
        const getSeconds = `0${(time % 60)}`.slice(-2);
        const minutes = `${Math.floor(time / 60)}`;
        const getMinutes = `0${parseInt(minutes, 10) % 60}`.slice(-2);
        const getHours = `0${Math.floor(time / 3600)}`.slice(-2);
        return `${getHours}:${getMinutes}:${getSeconds}`;
    };

    return(
        <div>
            <h1>{formatTime(time)}</h1>

        </div>
    )
}