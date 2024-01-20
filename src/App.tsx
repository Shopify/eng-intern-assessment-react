import React, { useEffect, useState } from 'react'

export default function App() {
    const [timeElapsed, setTimeElapsed] = useState(0);
    const [status, setStatus] = useState(false);
    
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
    
    return(
        <div>
            <button id="toggle-stopwatch" onClick={toggleStopwatch}>Start</button>
            <button id="reset-stopwatch" onClick={() => setTimeElapsed(0)}>Reset</button>
            <button id="lap-stopwatch" >Lap</button>
            {timeElapsed}
        </div>
    )
}