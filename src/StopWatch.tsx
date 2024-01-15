import React, { useEffect, useState } from 'react'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Typography, ButtonGroup, Button } from '@mui/material';

export default function StopWatch() {
    const [time, setTime] = useState(0);
    const [running, setRunning] = useState(false);
    const [laps, setLaps] = useState(0);

    useEffect(() => {
        let interval: NodeJS.Timer;
        if (running) {
            interval = setInterval(() => setTime(time + 1), 10);
        }
        return () => clearInterval(interval);
    }, [running, time])

    const minutes = Math.floor((time % 360000) / 6000);
    const seconds = Math.floor((time % 6000) / 100);
    const miliseconds = time % 100;

    const changeState = (newState: boolean) => {
        console.log(newState);
        setRunning(newState);
    }

    const addLap = () => {
        setTime(0);
        setLaps(laps + 1);
    }

    //console.log(time);
    return (
        <div>
            <Typography variant="h1" gutterBottom>Stopwatch</Typography>
            <Typography variant="h3" gutterBottom>{minutes} : {seconds} : {miliseconds}</Typography>
            <Typography variant="h4" gutterBottom>Laps: {laps}</Typography>
            <ButtonGroup variant="contained" aria-label="outlined primary button group">
                <Button onClick={() => changeState(true)}>Start</Button>
                <Button onClick={() => changeState(false)}>Stop</Button>
                <Button onClick={() => addLap()}>Lap</Button>
                <Button onClick={() => { setTime(0); changeState(false); }}>Reset</Button>
            </ButtonGroup>
        </div>
    )
}