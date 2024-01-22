import React, { useRef, useState } from 'react';
import StopWatchButton from './StopWatchButton';

export default function StopWatch() {
    const [counter, setCounter] = useState(0);
    const [laps, setLaps] = useState([0]);

    const intervalId = useRef(null);

    function incrementCounter(){
        setCounter(prevCounter => prevCounter + 1);
    }

    function startTimer(){
        intervalId.current = setInterval(incrementCounter, 1000)
    }

    function stopTimer(){
        if(intervalId.current){
            clearInterval(intervalId.current)
        }
    
    }

    function resetTimer(){
        stopTimer();
        setCounter(0);
        setLaps([0])
    }
    
    function recordLap(){
        setLaps(prevLaps => [...prevLaps, counter])
    }

    return(
        <div style = {{marginTop:"20px"}} >
            <div >
                <StopWatchButton name = "start" onClick={startTimer}  />
                <StopWatchButton name = "stop" onClick={stopTimer} />
                <StopWatchButton name = "reset" onClick={resetTimer}/>
                <StopWatchButton name = "record lap" onClick={recordLap} />
            </div>  
            <div style = {{display:"flex", marginTop:"20px"}}>
                <div style = {{marginRight:"30px"}}>time
                    <div style = {{marginTop:"20px"}} data-testid = "counter">{counter}</div>
                 </div> 
                <div>

                    <div>
                        Laps(s)
                    </div>
                    <div style = {{marginTop:"20px"}}>
                    {laps.map((lap, index) => {
                        if(index == 0) return null;
                        else return <div key = {index}>Lap {index}, time elapsed : {lap - laps[index - 1]}, timestamp = {lap} </div>
                    } )}
                    </div>
                   
                </div>
            </div>
  
        </div>
    
    )
}