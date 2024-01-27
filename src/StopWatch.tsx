import React, { useState, useEffect } from 'react'
// useState is a React Hook that allows for a state variable to be added to the components
// In this code, it will be used for running the timer and counting the time
// useEffect was later added for functionality of the lap button, as the code needs to do something after the render
import StopWatchButton from './StopWatchButton'

export default function StopWatch() {
    const [running, setRunning] = useState(false);
    const [time, setTime] = useState(0);

    const handleStart = () => {
        setRunning(true);
    }
    const handleStop = () => {
        setRunning(false);
    }
    const handleReset = () => {
        setRunning(false);
        setTime(0);
    }
    const handleLap = () => {

    }

    return(
        <div>
            {time} s, {time / 1000} ms

            <StopWatchButton
                onStart = {handleStart}
                onStop = {handleStop}
                onReset = {handleReset}
                onLap = {handleLap}
            />
        </div>
    );
}

// Lap button will display the difference in time from the previous lap button (or 0 if unpressed) to the current lap button press
// Lap button implementation could be done with pointers? Start pointer at 0 and add a new pointer each time lap is pressed
// Display could just take (time at lap button pressed) - (time at previous lap button pressed)
// Milliseconds can be added as a /1000 fraction of the current seconds

// Event handlers are needed to control the state of the timer using the buttons
// handleStart, handleStop, handleReset and handleLap are the event handlers being connected to each button