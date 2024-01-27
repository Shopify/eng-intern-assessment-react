import React, { useState, useEffect } from 'react';
import StopWatch from './StopWatch';
import StopWatchButton from './StopWatchButton';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import ListScroller from './ListScroller';


export default function App() {
    const [time, setTime] = useState(0);
    const [running, setRunning] = useState(false);
    const [timeList, setTimeList] = useState< number[][] >([]);
    const [timePress, setTimePress] = useState(Date.now());
    const [timePaused, setTimePaused] = useState(0);
    const [lastButton, setLastButton] = useState("Reset");
    var clockInterval: NodeJS.Timer;

    function updateTime() {
        if (running === true) {
            setTime((Date.now() - timePress) / 1000);
        }
    }

    function startButton() {
        if (lastButton === "Reset") {
            setTimePress(Date.now());
        }
        if (lastButton === "Stop") {
            setTimePress(timePress + Date.now() - timePaused);
        }
        setRunning(true);
        setLastButton("Start");
    }

    function stopButton() {
        if (lastButton === "Start") {
            setTimePaused(Date.now());
        }
        setRunning(false);
        setLastButton("Stop");
    }

    function resetButton() {
        setTime(0);
        setRunning(false);
        setTimeList([]);
        clearInterval(clockInterval);
        setLastButton("Reset");
    }

    function lapButton() {
        if (running) {
            if (timeList.length === 0) {
                setTimeList([[time, time]]);
            } else {
                setTimeList([...timeList, [time, time - timeList[timeList.length - 1][0]]]);
            }
        }
    }
    
    useEffect(() => {
        if (running) {
          clockInterval = setInterval(updateTime, 10);
        }
        return () => clearInterval(clockInterval);
    }, [running, time]);

    return (
        <div>
            <div className="center-div">
                <Card className="card-style" sx={{backgroundColor: "#f1dddf"}}>
                    <CardContent>
                        <h1 className="header-text">Shopify Stopwatch</h1>
                        <Grid container spacing={2}>
                            <Grid item>
                                <StopWatch time={time} />
                                <div className="button-div">
                                    <StopWatchButton buttonFunc={startButton} buttonName="Start" />
                                    <StopWatchButton buttonFunc={stopButton} buttonName="Stop" />
                                    <StopWatchButton buttonFunc={resetButton} buttonName="Reset" />
                                    <StopWatchButton buttonFunc={lapButton} buttonName="Lap" />
                                </div>
                            </Grid>
                            <Grid item>
                                <ListScroller timeList={timeList} />
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </div>
            <p className="footer-text">Made with ♡ by Joshua Dierickse</p>
        </div>
    )
}