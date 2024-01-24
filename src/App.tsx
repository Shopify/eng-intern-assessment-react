import React, {useState, useEffect, useRef} from 'react'
import StopWatch from './StopWatch'
import StopWatchButton from './StopWatchButton'
import "./App.css"

export default function App() {
    const[isRunning, setIsRunning] = useState(false);
    const[elapsedTime, setElapsedTime]= useState(0);
    const[laps,setLaps]= useState(0);
    const [lapTimes, setLapTimes] = useState([]);
    const intervalIdRef = useRef(null);
    const startTimeRef= useRef(0);
    
    useEffect(()=>{
        if(isRunning){
            intervalIdRef.current = setInterval(()=>{
                setElapsedTime(Date.now() - startTimeRef.current);
            },10);
        }

        return()=>{
            clearInterval(intervalIdRef.current);
        }

    },[isRunning]);


    // Functions
    function start(){
        setIsRunning(true);
        startTimeRef.current = Date.now()- elapsedTime;
    }

    function stop(){
        setIsRunning(false);
    }

    function reset(){
        setElapsedTime(0);
        setIsRunning(false);
        setLaps(0);
        setLapTimes([]);
    }

    function lap(){
       if(isRunning){
        const lapTime = (Date.now() - startTimeRef.current)/1000;
        setLaps((prevLaps) => prevLaps + 1);
        setLapTimes((prevTimes) => [...prevTimes, lapTime])
       }else{
        window.alert("Cannot record lap when the stopwatch is not running.");
       }
    }

    function formatLapTime(lapTime: number) {
        const minutes = Math.floor((lapTime % 3600) / 60).toString().padStart(2, '0');
        const seconds = (lapTime % 60).toFixed(4).padStart(7, '0');
        return `${minutes}:${seconds}`;
    }

    return(
        <div className='stopwatch'>
            <div className='stopwatch-display'>

               {/* Display Timer*/}
               <div>
                 <StopWatch elapsedTime={elapsedTime} className="time-display"/>
               </div>
              
               {/* Display Laps*/}
               <div className='lap-display'>
                {/* Using .map() we can map through the laps and display them on screen */}
                {lapTimes.map((lapTime, index) => (
                    <div key={index}>{`Lap ${index + 1}: ${formatLapTime(lapTime)}`}</div>
                ))}

                
                <StopWatchButton name="Lap" onClick={lap} className='lap'/> 
               </div>

             </div>

           {/* StopWatch Buttons*/}
           <div className="button-display">
               <StopWatchButton name="Start" onClick={start} className='start' />
               <StopWatchButton name="Stop" onClick={stop} className='stop'/>
               <StopWatchButton name="Reset" onClick={reset} className='reset'/>
           </div>

     </div>
    )
}