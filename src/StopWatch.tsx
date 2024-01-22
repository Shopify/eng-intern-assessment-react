import React, { useEffect, useState } from 'react'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Typography, ButtonGroup, Button, Hidden } from '@mui/material';
import Lap from './PreviousLap';
import PreviousLap from './PreviousLap';
import RadialSegment from './RadialSegment';

type Lap = {
    number: number;
    time: number;
}

export default function StopWatch() {


    function getWindowDimensions() {
        const { innerWidth: width, innerHeight: height } = window;
        return {
            width,
            height
        };
    }

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

    const { height, width } = useWindowDimensions();
    const [time, setTime] = useState(0);
    const [running, setRunning] = useState(false);
    const [lapCount, setLapCount] = useState(0);
    const [laps, setLaps] = useState<Array<Lap>>([]);
    useEffect(() => {
        let interval: NodeJS.Timer;
        if (running) {
            interval = setInterval(() => setTime(time + 10), 100);
        }
        return () => clearInterval(interval);
    }, [running, time])

    const changeState = (newState: boolean) => {
        //console.log(newState);
        setRunning(newState);
    }

    const addLap = () => {
        let currentLaps = laps;
        let newLap = { number: lapCount, time: time };
        currentLaps.push(newLap);
        setLaps(currentLaps);
        setTime(0);
        setLapCount(lapCount + 1);
    }

    const reset = () => {
        setTime(0);
        changeState(false);
        setLapCount(0);
        setLaps([]);
    }
    // console.log(width);
    // console.log(100 - (width / 10));
    // let widthMultiplier = (width / 1080) * 100;

    //console.log(widthMultiplier + 20);
    return (
        <div style={{ height: "100%" }}>
            <Typography variant="h2" style={{ textAlign: "center", color: "#3e98c7", marginBottom: 0}} gutterBottom>Stopwatch</Typography>
            <RadialSegment time={time} width={width} />
            <div style={{ textAlign: "start", color: "#3e98c7", position: "absolute", left: "35%", top: "15%", width: "100%" }}>
                <Typography variant="h5" style={{ textAlign: 'center' }}>Laps: </Typography>
                {laps.map(lap => <PreviousLap number={lap.number} time={lap.time} key={lap.number} />)}

            </div>
            <div style={{ textAlign: 'center', position: "absolute", bottom: "5%", left: 0, right: 0, marginLeft: "auto", marginRight: "auto", width: "100%" }}>
                <Typography variant="h5" style={{ textAlign: "center", color: "#3e98c7" }} gutterBottom>Lap {lapCount}</Typography>

                <ButtonGroup size="small" variant="outlined" aria-label="outlined primary button group">
                    <Button onClick={() => changeState(true)}>Start</Button>
                    <Button onClick={() => changeState(false)}>Stop</Button>
                    <Button onClick={addLap}>Lap</Button>
                    <Button onClick={reset}>Reset</Button>
                </ButtonGroup>
            </div>
            {/* <div style={{ textAlign: 'center', position: "absolute", left: 0, right: 0, bottom: (100 - widthMultiplier + 25)+ "%", marginLeft: "auto", marginRight: "auto", width: "100%" }}>
                <ButtonGroup size="small" variant="outlined" aria-label="outlined primary button group">
                    <Button onClick={() => changeState(true)}>Start</Button>
                    <Button onClick={() => changeState(false)}>Stop</Button>
                    <Button onClick={addLap}>Lap</Button>
                    <Button onClick={reset}>Reset</Button>
                </ButtonGroup>
            </div> */}

        </div>
    )
}