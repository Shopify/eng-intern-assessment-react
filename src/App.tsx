import React, { useEffect, useState } from 'react'
import StopWatch from './StopWatch';
import StopWatchButton from './StopWatchButton';
import Laps from './Laps';

// The main component of the stopwatch, renders all subcomponents
// Responsible for state setup, variable declarations and function definitions
export default function App() {
    const [timeElapsed, setTimeElapsed] = useState<number>(0); // Time value of stopwatch
    const [status, setStatus] = useState<boolean>(false); // Status of stopwatch, true/false meaning on/off
    const [laps, setLaps] = useState<number[]>([]); // Laps that store the time between when the button to record it was pressed vs last pressed
    const [prevLap, setPrevLap] = useState<number>(0); // Previous total time elapsed of when the last lap was recorded

    // Stores the minutes, seconds and milliseconds as an array of strings
    let timeUnits: string[];
    let lapTimeUnits: string[];

    // Use of the useEffect hook allows for the time to continuously increase by 1 millisecond every 10 milliseconds
    // When the status is set to true, the time interval updates and is returned in a call to clear interval
    // useEffect is dependent on changes to status and timeElapsed
    useEffect(() => {
        let timeInterval: ReturnType<typeof setInterval>;

        if(status){
            timeInterval = setInterval(() => setTimeElapsed(timeElapsed+1) , 10);
        } 
        return () => clearInterval(timeInterval);
    }, [status, timeElapsed]);

    // Converts the number type time representing milliseconds into strings representing units of time
    // Strings less than 2 chars long get a leading 0
    function convertToTimeUnits(time: number): string[]{
        let milliseconds, seconds, minutes;

        milliseconds = (time%100).toString().padStart(2, "0");
        seconds = Math.floor((time/100)%60).toString().padStart(2, "0");
        minutes = Math.floor(time/6000).toString().padStart(2, "0");
        return[minutes, seconds, milliseconds];
    }
    
    // Stops or starts the stopwatch depending on the current status
    // Updates the button and status as such
    function toggleStopwatch(): void{
        status ? document.getElementById("toggle-stopwatch").innerHTML = "Start" :
        document.getElementById("toggle-stopwatch").innerHTML = "Stop";

        setStatus(prevStatus => {return !prevStatus});
    }

    // Resets the stopwatch by setting the time elapsed, laps and previous lap all to 0 or empty
    function resetStopwatch(): void{
        setTimeElapsed(0);
        setLaps([]);
        setPrevLap(0);
    }

    // Adds a new lap to the laps array by returning a new array containing the current laps and the new one
    // The new lap is the difference between the current time and the time of the previous lap
    // Updates the previous lap to the current time
    function addLap(time: number): void{
        setLaps(curLaps =>
            {return [...curLaps, time-prevLap]})

        setPrevLap(time)
    }

    return(
        <div>
            <StopWatch timeElapsed={timeElapsed} timeUnits={timeUnits} convertToTimeUnits={convertToTimeUnits} />
            <StopWatchButton timeElapsed={timeElapsed} toggleStopwatch={toggleStopwatch} resetStopwatch={resetStopwatch} addLap={addLap}/>
            <Laps convertToTimeUnits={convertToTimeUnits} laps={laps} lapTimeUnits={lapTimeUnits}/>
        </div>
    )
}