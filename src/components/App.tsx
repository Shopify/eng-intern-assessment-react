/**
 * @author Joshua Dierickse <jpcdieri@uwaterloo.ca>
 */

// Imports all dependencies
import React, { useState, useEffect } from 'react';
import StopWatch from './StopWatch';
import StopWatchButton from './StopWatchButton';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import ListScroller from './ListScroller';

/**
 * Generates the entire visible website and holds all the button press functions
 *
 * @param null
 * @return JSX Element that is essentially the entire visible website
 */
export default function App() {

    // Integer variable that holds the time value that gets displayed to the screen
    const [time, setTime] = useState(0);

    // Boolean variable that describes if the stop watch is running or not
    const [running, setRunning] = useState(false);

    // List of laps with both the absolute time (time the stop watch has been running) and the 
    const [timeList, setTimeList] = useState<{ absTime: number, lapTime: number }[]>([]);
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
            setLastButton("Stop");
        }
        setRunning(false);
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
                setTimeList([{absTime: time, lapTime: time}]);
            } else {
                setTimeList([...timeList, {absTime: time, lapTime: time - timeList[timeList.length - 1].absTime}]);
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
            <h4 className="footer-text">Made with ♡ by Joshua Dierickse</h4>
        </div>
    )
}