import React, {useState, useEffect, useRef}from 'react'
import StopWatchButton from './StopWatchButton'
import { clear } from 'console';

export default function StopWatch() {
    
    const[isRunning, setIsRunning] = useState(false);
    const[elaspedTime, setElaspedTime]= useState(0);
    const[laps,setLaps]= useState(0);
    const [lapTimes, setLapTimes] = useState([]);
    const intervalIdRef = useRef(null);
    const startTimeRef= useRef(0);
    
    useEffect(()=>{
        if(isRunning){
            intervalIdRef.current = setInterval(()=>{
                setElaspedTime(Date.now() - startTimeRef.current);
            },10);
        }

        return()=>{
            clearInterval(intervalIdRef.current);
        }

    },[isRunning]);

    function formatTime(){
        let hours = Math.floor(elaspedTime / (1000 * 60 * 60));
        let minutes = Math.floor (elaspedTime/ (1000 * 60) % 60);
        let seconds = Math.floor (elaspedTime/ (1000) % 60);
        let milliseconds = Math.floor ((elaspedTime % 1000)/ 10);

        // Format for clock display
        let formatHours= String(hours).padStart(2,"0");
        let formatMinutes= String(minutes).padStart(2,"0");
        let formatSeconds= String(seconds).padStart(2,"0");
        let formatMilliseconds = String(milliseconds).padStart(2, "0");


        // Formating Return
        return `${formatMinutes}:${formatSeconds}:${formatMilliseconds}`
    }

    // Functions

    function start(){
        setIsRunning(true);
        startTimeRef.current = Date.now()- elaspedTime;
    }

    function stop(){
        setIsRunning(false);
    }

    function reset(){
        setElaspedTime(0);
        setIsRunning(false);
        setLaps(0);
        setLapTimes([]);
    }

    function lap(){
       if(isRunning){
        const lapTime = (Date.now() - startTimeRef.current)/1000;
        setLaps((prevLaps) => prevLaps + 1);
        // setLapTimes([lapTime / 1000]);
        setLapTimes((prevTimes) => [...prevTimes, lapTime])
       }
    }

  

    return(

        <div className=''>
           
            <div className=''>

                {/* Display Timer*/}
                <div className="">{formatTime()}</div>

                {/* Display Laps*/} 
                {/* <div className=''> {laps === 0 ? null : `${laps}`} </div> */}

                <div className=''>
                {/* Display laps and lap times */}
                {lapTimes.map((lapTime, index) => (
                    <div key={index}>{`Lap ${index + 1}: ${lapTime}`}</div>
                ))}
                </div>

                <StopWatchButton name="Lap Counter" onClick={lap}/> 

            </div>
           

            {/* Display Buttons*/}
            <div className="">
                <StopWatchButton name="Start" onClick={start}/>
                <StopWatchButton name="Stop" onClick={stop}/>
                <StopWatchButton name="Reset" onClick={reset}/>
            </div>

        </div>
    )
}