//Import required modules - UseState to declare state of varialbe and useEffect allows hooking
import React from 'react'
import {useState, useEffect} from 'react';
import StopWatchButton from './StopWatchButton';


//Define the component for the StopWatch
const StopWatch = () => {
    
    //Create state variables
    const [time, setTime] = useState(0);
    const [isRunning, setRunning] = useState(false);
    const [laps, setLaps] = useState<number[]>([]);
    const [isStarted, setStarted] = useState(false);

    //Function to handle the Start/stop button
    const handleStartButton = () => {
        setRunning(isRunning);  //Like a lightswitch - Flips the state if timer is going on/off
        setStarted(true);      //Timer started
    }

    //Function to handle reset button - Resets timer to 0, deletes all laps
    const handleResetButton = () => {
        setTime(0);
        setLaps([]);
        setStarted(false); 
    }

    //Functions handles lap button - Add the current time to laps array
    const handleLapButton = () => {
        setLaps(laps.concat(time));
    }

    //Function formats time to HH:MM:SS:MS
    const formatTime = (time: number) => {
        let date = new Date(time);
        let hours = date.getUTCHours();
        let minutes = date.getUTCMinutes();
        let seconds = date.getUTCSeconds();
        let milliseconds = date.getUTCMilliseconds();

        return `${hours.toString().padStart(2, '0')}:
        ${minutes.toString().padStart(2, '0')}:
        ${seconds.toString().padStart(2, '0')}.
        ${milliseconds.toString().padStart(3, '0')}`;
    }

    //Effect hook to handle running state, and updating time


}





export default StopWatch;