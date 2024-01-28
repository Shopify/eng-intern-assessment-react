// useState is the React hook that allows for a state variable to be added to the components
// useRef is the React hook that will be used to run the timer
import React, { useState, useEffect } from 'react'
import StopWatchButton from './StopWatchButton'

export default function StopWatch() {
    // running is given as a boolean
    // time is given as a set state
    // laptime is given an array to as it will be a series of numbers
    // prevlaptime is a set state that will be calculated around time
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
    // Reset button stops the clock and resets the time counter to 0 as well as clearing the laptime array and lapstarttime to 0
    const handleReset = () => {
        setRunning(false);
        setTime(0);
        setLapTime([]);
        setLapStartTime(0);
    }
    // Lap itself is a concating array that adds the calculated lap  
    // Accounts for the first time lap is pressed and the counter between the last lap and the current time
    const handleLap = () => {
        // First time the lap button is pushed, the current time is set as the lapstart time
        if (lapStartTime === 0) {
            setLapTime((lapStartTime) => [...lapStartTime, time]);
            setLapStartTime(time);
        }
        // Every following lap button event
        else {
            // Current lap is calculated for every subsequent lap button push
            // curLap is the current time minus the previous lapstarting time which would give the time between the two
            const curLap = time - lapStartTime;
            setLapTime((lapStartTime) => [...lapStartTime, curLap]);
            setLapStartTime(time);
        }
    }

    useEffect(() => {
        let timer: NodeJS.Timeout;

        // I wanted the StopWatch to count in milliseconds for an accurate lap time, so the setInterval timer counts in +10 for milliseconds
        // As opposed to +1000 for seconds. This can be taken care of in the div section by using a floor function to take just the seconds
        // +10 is technically 10 milliseconds but +1 was found to be slowing the timer, so +10 was changed for efficiency
        if (running) {
            timer = setInterval(() => {
                setTime((prevTime) => prevTime + 10);
            }, 10);
        } 
        // The 
        else {
            clearInterval(timer);
        }
        // Cleanup function: clear the interval on component unmount or when the running state changes
        return () => clearInterval(timer);
    // running is declared here as the dependency array so the timer is only ran when running === true
    }, [running]);

    return(
        <div>
            {Math.floor(time / 1000)} s, {time % 1000} ms
            <br />
            <StopWatchButton
                onStart = {handleStart}
                onStop = {handleStop}
                onReset = {handleReset}
                onLap = {handleLap}
            />
            <br />
    
            {/* I had the lap times stored as an array, so an a hash table was used to grab each lap time and placed into the lap time list */}
            Lap Time:
            <ol>
                {lapTime.map((lap, index) => (
                    <li key={index}>{Math.floor(lap / 1000)} s, {lap % 1000} ms</li>
                ))}

            </ol>
        </div>
    );
}

// Lap button will display the difference in time from the previous lap button to the current lap button press
// Lap button implementation could be done with states. Starting state at 0 and add a new state to update each time lap is pressed
// Display could just take (time at lap button pressed) - (time at previous lap button pressed)
// Milliseconds can be added as a /1000 fraction of the current seconds

// Event handlers are needed to control the state of the timer using the buttons
// handleStart, handleStop, handleReset and handleLap are the event handlers being connected to each button
