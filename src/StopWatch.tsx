// useState is the React hook that allows for a state variable to be added to the components
// useEffect is the React hook that will be used to run the timer
import React, { useState, useEffect } from 'react'
import StopWatchButton from './StopWatchButton'

export default function StopWatch() {
    // running is given as a boolean
    // time is given as a set counter
    // laptime is given an array to as it will be a series of numbers
    // prevlaptime is a set counter that is to be calcualted around time
    const [running, setRunning] = useState(false);
    const [time, setTime] = useState(0);
    const [lapTime, setLapTime] = useState([])
    const [lapStartTime, setLapStartTime] = useState(0);

    // Start button sets the running clock to true
    const handleStart = () => {
        setRunning(true);
    }
    // Stop button sets the running clock to false
    const handleStop = () => {
        setRunning(false);
    }
    // Reset button stops the clock and resets the time counter to 0
    // handleReset was later changed to also reset the lap time and previous lap counter
    const handleReset = () => {
        setRunning(false);
        setTime(0);
        setLapTime([]);
        setLapStartTime(0);
    }
    // Lap itself is a concating array that adds the calculated lap  
    // Accounts for the first time lap is pressed and the counter between the last lap and the current time
    const handleLap = () => {
        // First time the lap button is pushed, the current lap time would be from 0 to the time
        if (lapStartTime === 0) {
            setLapTime((lapStartTime) => [...lapStartTime, time]);
        }
        // Every following lap button event
        else {
            // Current lap is calculated for every subsequent lap button push
            // curLap is the current time minus the previous lapstarting time which would give the time between the two
            const curLap = time - lapStartTime;
            setLapTime((lapStartTime) => [...lapStartTime, curLap])
        }
    }

    return(
        <div>
            {time} s, {time / 1000} ms
            <br />
            <StopWatchButton
                onStart = {handleStart}
                onStop = {handleStop}
                onReset = {handleReset}
                onLap = {handleLap}
            />
            <br />
            {/* Lap Time: {lapTime[-1]} s, {lapTime[-1] / 1000} ms */}
        </div>
    );
}

// Lap button will display the difference in time from the previous lap button (or 0 if unpressed) to the current lap button press
// Lap button implementation could be done with pointers? Start pointer at 0 and add a new pointer each time lap is pressed
// Display could just take (time at lap button pressed) - (time at previous lap button pressed)
// Milliseconds can be added as a /1000 fraction of the current seconds

// Event handlers are needed to control the state of the timer using the buttons
// handleStart, handleStop, handleReset and handleLap are the event handlers being connected to each button

// Lap button can be run internally with the same timer using some calculations and some states for maintaining the previous time
// as well as an array to hold all the data