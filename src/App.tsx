import React, {useState, useEffect, useRef} from 'react'
import StopWatch from './StopWatch'
import StopWatchButton from './StopWatchButton'
import "./App.css"

export default function App() {
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
        setLapTimes((prevTimes) => [...prevTimes, lapTime])
       }
    }

  
    return(
        <div className='stopwatch'>
            <div className='stopwatch-display'>

               {/* Display Timer*/}
               <div>
                 <StopWatch elaspedTime={elaspedTime} className="time-display"/>
               </div>
              
               {/* Display Laps*/}
               <div className='lap-display'>
               {/* Display laps and lap times */}
               {lapTimes.map((lapTime, index) => (
                   <div key={index}>{`Lap ${index + 1}: ${lapTime > 60 ? `${(lapTime/60).toFixed(4)}` : `00:${(Math.round(lapTime))}`}`}</div>
               ))}
                <StopWatchButton name="Lap" onClick={lap} className='lap'/> 
               </div>

             </div>
          

           {/* Display Buttons*/}
           <div className="button-display">
               <StopWatchButton name="Start" onClick={start} className='start' />
               <StopWatchButton name="Stop" onClick={stop} className='stop'/>
               <StopWatchButton name="Reset" onClick={reset} className='reset'/>
           </div>

     </div>
    )
}