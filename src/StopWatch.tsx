import React, { useState, useEffect, useCallback } from 'react'
import StopWatchButton from './StopWatchButton'

// Function to format the time. This is necessary since both the time and lap times need to be formatted
export function formatTime(time:number):string{
    let hours = Math.floor(time / 360000);
    let remainingMs = time % 360000;
    let minutes = Math.floor(remainingMs / 6000);
    remainingMs = remainingMs % 6000;
    let seconds = Math.floor(remainingMs / 100);
    let milliseconds = remainingMs % 100; // Remaining milliseconds
    console.log(seconds);
    let result =minutes.toString().padStart(2,'0')+':'+seconds.toString().padStart(2,'0')+':'+milliseconds.toString().padStart(2,'0');

    return (hours>0)? hours.toString().padStart(2,'0')+':'+result : result;
    
}
export default function StopWatch() {
    const [timerStatus,setTimerStatus] = useState(false);
    const [time,setTime] = useState(0);
    const [lapTime,setLapTimes]=useState([]);
    const [isLapDisabled,setLapDisabled]=useState(true);
    const maxLap=25;
    
    useEffect(()=>{
        let interval: ReturnType<typeof setInterval> | null = null;

        if (timerStatus) {
            interval = setInterval(() => {setTime(prevTime => prevTime + 1);}, 10);
        } 

        return () => clearInterval(interval);
    },[timerStatus])
    function startTimer(){
        setTimerStatus(true);
        setLapDisabled(false);
    }
    function stopTimer(){
        setTimerStatus(false);
        setLapDisabled(true);
    }
    function resetTimer(){
        setTimerStatus(false);
        setTime(0);
        setLapTimes([]);
        setLapDisabled(true)
    }
    function addLap(){
        console.log("lapTime");
        if(lapTime.length>=maxLap  ){
            setLapDisabled(true);
            return;
        }
        lapTime.push(time);
    } 
    return(
        <div className='stopwatch'>
            <h1 className='stopwatch-title'>StopWatch</h1>
            <div className='stopwatch-content'>
                <div className='stopwatch-buttons'>
                <StopWatchButton onClick={startTimer} name='Start' isDisabled={timerStatus} ></StopWatchButton>
                <StopWatchButton onClick={stopTimer} name='Stop' isDisabled={!timerStatus}></StopWatchButton>
                <StopWatchButton onClick={resetTimer} name='Reset' isDisabled={false}></StopWatchButton>
                <StopWatchButton onClick={addLap} name='Lap' isDisabled={isLapDisabled}></StopWatchButton>
                </div>
                <div className='stopwatch-time'>
                    <p>{formatTime(time)}</p>
                    {/* Display the numbered lap times */}
                    {lapTime.length > 0 && (
                        <div className='stopwatch-laptimes'>
                            <p>Lap times</p>
                            <ul>
                                {lapTime.map((lapTime, index) => {
                                    return <li key={index}>{(index + 1)+'.'} {formatTime(lapTime)}</li>
                                })}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}