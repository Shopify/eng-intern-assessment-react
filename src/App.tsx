import React, { useEffect, useState } from 'react'

export default function App() {
    const [timeElapsed, setTimeElapsed] = useState(0);
    const [status, setStatus] = useState(false);
    const [laps, setLaps] = useState([]);
    const [prevLap, setPrevLap] = useState(0);

    useEffect(() => {
        let timeInterval: any;
        if(status){
            timeInterval = setInterval(() => setTimeElapsed(timeElapsed+1) , 1000);
        } 
        return () => clearInterval(timeInterval);
    }, [status, timeElapsed]);
    
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

    return(
        <div>
            <button id="toggle-stopwatch" onClick={toggleStopwatch}>Start</button>
            <button id="reset-stopwatch" onClick={resetStopwatch}>Reset</button>
            <button id="lap-stopwatch" onClick={() => addLap(timeElapsed)}>Lap</button>
            {timeElapsed}
            {laps.map((lap, index) => {
                return(
                    <p>Lap {index+1} | {lap}</p>
                )
            })}
        </div>
    )
}