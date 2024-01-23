import React, { useEffect, useState } from 'react';
import { Typography, ButtonGroup, Button, Hidden } from '@mui/material';
import Lap from './PreviousLap';
import PreviousLap from './PreviousLap';
import RadialSegment from './RadialSegment';

// Type created for lap object
type Lap = {
    number: number;
    time: number;
}

export default function StopWatch() {

    // functional helpers for resizing radial segment with screen width
    function getWindowDimensions() {
        const { innerWidth: width, innerHeight: height } = window;
        return {
            width,
            height
        };
    }

    //Custom hook that returns the dimensions of the window.
    function useWindowDimensions() {
        const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

        useEffect(() => {
            function handleResize() {
                setWindowDimensions(getWindowDimensions());
            }

            window.addEventListener('resize', handleResize);
            return () => window.removeEventListener('resize', handleResize);
        }, []);

        return windowDimensions;
    }

    // get screen height and wdith
    const { height, width } = useWindowDimensions();

    // states
    const [time, setTime] = useState(0);
    const [running, setRunning] = useState(false);
    const [lapCount, setLapCount] = useState(0);
    const [laps, setLaps] = useState<Array<Lap>>([]);

    // useEffect to use setInterval for time keeping
    useEffect(() => {
        let interval: NodeJS.Timer;
        // only increment if running state is true
        if (running) {
            interval = setInterval(() => setTime(time + 10), 100);
        }
        return () => clearInterval(interval);
    }, [running, time])

    // function to change state of timer (running or not running)
    const changeState = (newState: boolean) => {
        //console.log(newState);
        setRunning(newState);
    }

    // function to add lap
    const addLap = () => {
        let currentLaps = laps;
        let newLap = { number: lapCount, time: time };
        currentLaps.push(newLap);
        setLaps(currentLaps);
        setTime(0);
        setLapCount(lapCount + 1);
    }

    // function to reset timer
    const reset = () => {
        setTime(0);
        changeState(false);
        setLapCount(0);
        setLaps([]);
    }

    return (
        <div style={{ height: "100%", textAlign: 'center' }}>
            <Typography role='title_heading' variant="h2" style={{
                color: '#3e98c7',
                marginBottom: 0,
            }} gutterBottom>Stopwatch</Typography>
            <RadialSegment time={time} width={width} />
            <div data-testid="lap_list" style={{
                color: "#3e98c7", position: "absolute", left: "35%", top: "15%", width: "100%"
            }}>
                <Typography variant="h5" style={{ textAlign: 'center'}}>Laps: </Typography>
                {laps.map(lap => <PreviousLap number={lap.number} time={lap.time} key={lap.number} />)}

            </div>
            <div style={{ textAlign: 'center', position: "absolute", bottom: "5%", left: 0, right: 0, marginLeft: "auto", marginRight: "auto", width: "100%" }}>
                <Typography data-testid="lap_indicator" role="lap_count" variant="h5" style={{ textAlign: "center", color: "#3e98c7" }} gutterBottom>Lap {lapCount}</Typography>
                {/* Didn't use StopWatchButton component as it didnt seem necessary */}
                <ButtonGroup variant="outlined" aria-label="outlined primary button group">
                    <Button data-testid="start_button" onClick={() => changeState(true)}>Start</Button>
                    <Button data-testid="stop_button" onClick={() => changeState(false)}>Stop</Button>
                    <Button data-testid="lap_button" onClick={addLap}>Lap</Button>
                    <Button data-testid="reset_button" onClick={reset}>Reset</Button>
                </ButtonGroup>
            </div>
        </div>
    )
}