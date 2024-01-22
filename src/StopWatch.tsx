import React, {useState, useEffect, useRef}from 'react'
import StopWatchButton from './StopWatchButton'

export default function StopWatch() {
    
    const[isRunning, setIsRunning] = useState(false);
    const[elaspedTime, setElaspedTime]= useState(0);
    const[laps,setLaps]= useState(0)
    const intervalIdRef = useRef(null);
    const startTimeRef= useRef(0);
    
    useEffect(()=>{
        if(isRunning){
            intervalIdRef.current = setInterval(()=>{
                setElaspedTime(Date.now() - startTimeRef.current);
            },10)
        }

    },[isRunning])

    function formatTime(){
        let hours = Math.floor(elaspedTime / (1000 * 60 * 60));
        let minutes = Math.floor (elaspedTime/ (1000 * 60) % 60);
        let seconds = Math.floor (elaspedTime/ (1000) % 60);
        let milliseconds = Math.floor ((elaspedTime % 1000)/ 10);

        // Pad Start to Format 
        return `${minutes}:${seconds}:${milliseconds}`
    }

    return(

        <div>
            {/* Display */}
            <div className="">{formatTime()}</div>


            {/* Buttons  */}
            <div className="">
                <StopWatchButton/>
                <StopWatchButton/>
                <StopWatchButton/>
                <StopWatchButton/>
            </div>

        </div>
    )
}