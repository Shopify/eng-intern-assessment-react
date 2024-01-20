import { time } from 'console';
import React, { useEffect, useState } from 'react'

export default function App() {
    const [timeElapsed, setTimeElapsed] = useState(0);
    const [status, setStatus] = useState(false);
    const [laps, setLaps] = useState([]);
    const [prevLap, setPrevLap] = useState(0);

    let milliseconds, seconds, minutes;
    let timeUnits = [];
    let lapTimeUnits = [];

    useEffect(() => {
        let timeInterval: any;
        if(status){
            timeInterval = setInterval(() => setTimeElapsed(timeElapsed+1) , 10);
        } 
        return () => clearInterval(timeInterval);
    }, [status, timeElapsed]);

    function convertToTimeUnits(time:number){
        let milliseconds, seconds, minutes;

        milliseconds = (time%100).toString().padStart(2, "0");
        seconds = Math.floor((time/100)%60).toString().padStart(2, "0");
        minutes = Math.floor(time/6000).toString().padStart(2, "0");
        return[minutes, seconds, milliseconds];
    }
    
    function toggleStopwatch(){
        if(!status){
            setStatus(true);
            document.getElementById("toggle-stopwatch").innerHTML = "Stop";
        }
        else{
            setStatus(false);
            document.getElementById("toggle-stopwatch").innerHTML = "Start";
        }
    }

    function resetStopwatch(){
        setTimeElapsed(0);
        setLaps([]);
        setPrevLap(0);
    }

    function addLap(time: number){
        setLaps(curLaps =>
            {return [...curLaps, time-prevLap]})
        setPrevLap(time)
    }
    
    timeUnits = convertToTimeUnits(timeElapsed);

    return(
        <div>
            <button id="toggle-stopwatch" onClick={toggleStopwatch}>Start</button>
            <button id="reset-stopwatch" onClick={resetStopwatch}>Reset</button>
            <button id="lap-stopwatch" onClick={() => addLap(timeElapsed)}>Lap</button>
            {timeUnits[0]}:{timeUnits[1]}.{timeUnits[2]}
            {laps.map((lap, index) => {
                lapTimeUnits = convertToTimeUnits(lap)
                return(
                    <p>Lap {index+1} | &emsp; {lapTimeUnits[0]}:{lapTimeUnits[1]}.{lapTimeUnits[2]}</p>
                )
            })}
        </div>
    )
}