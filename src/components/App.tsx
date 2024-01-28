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

    // Initialize state variables 
    const [time, setTime] = useState(0);
    const [running, setRunning] = useState(false);
    const [timeList, setTimeList] = useState<{ absTime: number, lapTime: number }[]>([]);
    const [timePress, setTimePress] = useState(Date.now());
    const [timePaused, setTimePaused] = useState(0);
    const [lastButton, setLastButton] = useState("Reset");

    // Create a global clock interval variable
    var clockInterval: NodeJS.Timer;

    // Updates the current time only if the clock is running
    function updateTime() {
        if (running === true) {
            setTime((Date.now() - timePress) / 1000);
        }
    }

    // If the Start button gets clicked
    function startButton() {

        // If previous button pressed was Reset, update timePress to the current time
        if (lastButton === "Reset") {
            setTimePress(Date.now());
        }

        // If the previous button pressed was Stop, subtract off the extra paused time
        if (lastButton === "Stop") {
            setTimePress(timePress + Date.now() - timePaused);
        }
        setRunning(true);
        setLastButton("Start");
    }

    // If the Stop button gets clicked
    function stopButton() {

        // If the previous button pressed was Start, gather the current date and update lastButton and running variables
        if (lastButton === "Start") {
            setTimePaused(Date.now());
            setLastButton("Stop");
        }
        setRunning(false);
    }

    // If the Reset button gets clicked, reset time, running, timeList, lastButton and clear the interval
    function resetButton() {
        setTime(0);
        setRunning(false);
        setTimeList([]);
        setLastButton("Reset");
        clearInterval(clockInterval);
    }

    // If the Lab button gets clicked, extend the lap list with a lap of the current time
    function lapButton() {
        if (running) {
            if (timeList.length === 0) {
                setTimeList([{absTime: time, lapTime: time}]);
            } else {
                setTimeList([...timeList, {absTime: time, lapTime: time - timeList[timeList.length - 1].absTime}]);
            }
        }
    }
    
    // If running is true, updates the time variable by calling updateTime() every 10ms
    useEffect(() => {
        if (running) {
          clockInterval = setInterval(updateTime, 10);
        }
        return () => clearInterval(clockInterval);
    }, [running, time]);

    return (
        <div>
            <div className="center-div">

                {/* Centers the card */}
                <Card className="card-style" sx={{backgroundColor: "#f1dddf"}}>
                    <CardContent>
                        <h1 className="header-text">Shopify Stopwatch</h1>

                        {/* Creates a 2 by 1 grid with the time and the laps */}
                        <Grid container spacing={2}>

                            <Grid item>
                                <StopWatch time={time} />

                                {/* Displays the buttons in a row */}
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