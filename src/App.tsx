import React, { useEffect, useState } from 'react'
import StopWatch from './StopWatch';
import StopWatchButton from './StopWatchButton';
import StopwatchLaps from './StopwatchLaps';
import "./styles.css";
import { act } from 'react-dom/test-utils';

// Converts the number type time representing milliseconds into strings representing units of time
// Strings less than 2 chars long get a leading 0, millisecond checks for 3
export function convertToTimeUnits(time: number): string[]{
    let milliseconds: string, seconds: string, minutes: string;

    milliseconds = (time%1000).toString().padStart(3, "0");
    seconds = Math.floor((time/1000)%60).toString().padStart(2, "0");
    minutes = Math.floor(time/60000).toString().padStart(2, "0");
    return[minutes, seconds, milliseconds];
}

// The main component of the stopwatch, renders all subcomponents
// Responsible for state setup, variable declarations and function definitions
export default function App() {
    const [timeElapsed, setTimeElapsed] = useState<number>(0);
    const [status, setStatus] = useState<boolean>(false);
    const [laps, setLaps] = useState<number[]>([]);
    const [prevLap, setPrevLap] = useState<number>(0);

    let timeInterval: ReturnType<typeof setInterval>;
    let curTime: number;

    // Keeping track of time, dependent on changes to status and timeElapsed
    // useEffect ensures setInterval does not run infinitely
    useEffect(() => {
        curTime = Date.now();

        // Only updates time if the status is set to true
        if(status) timeInterval = setInterval(() => 
            act(() => setTimeElapsed(timeElapsed+(Date.now()-curTime))) , 10);
        return () => clearInterval(timeInterval);
    }, [status, timeElapsed]);
    
    // Stops or starts the stopwatch depending on the current status
    // Updates the button and status as such
    function toggleStopwatch(): void{
        status ? document.getElementById("toggle-stopwatch").innerHTML = "Start" :
        document.getElementById("toggle-stopwatch").innerHTML = "Stop";

        setStatus(prevStatus => {return !prevStatus}); // Inverses the status
    }

    // Resets the stopwatch by setting the time elapsed, laps and previous lap all to 0 or empty
    function resetStopwatch(): void{
        setTimeElapsed(0);
        setLaps([]);
        setPrevLap(0);
        document.getElementById("toggle-stopwatch").innerHTML = "Start";
        setStatus(false);
    }

    // Adds new lap to laps array by returning a new array containing the current laps and the new one
    function addLap(time: number): void{
        setLaps(curLaps =>
            {return [...curLaps, time-prevLap]})

        setPrevLap(time)
    }

    return(
        <div>
            <StopWatch timeElapsed={timeElapsed} />
            {/* Renders 3 buttons that resets and toggles the stopwatch as well as adding laps */}
            <div className="btn-wrapper">
                <StopWatchButton id="reset-stopwatch" text="Reset" handleClick={resetStopwatch} />
                <StopWatchButton id="toggle-stopwatch" text="Start" handleClick={toggleStopwatch} />
                <StopWatchButton id="lap-stopwatch" text="Lap" handleClick={() => addLap(timeElapsed)} />
            </div>
            <StopwatchLaps laps={laps} />
        </div>
    )
}