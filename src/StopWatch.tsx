import React, { useState, useEffect, useCallback } from 'react'
import StopWatchButton from './StopWatchButton'
/**
 * Formats a number representing time into a string with hours, minutes, seconds, and milliseconds.
 * @param {number} time - The time in milliseconds to format.
 * @returns {string} The formatted time string.
 */

export function formatTime(time:number):string{
    // Calculate hours, minutes, seconds, and milliseconds
    let hours = Math.floor(time / 360000);
    let remainingMs = time % 360000;
    let minutes = Math.floor(remainingMs / 6000);
    remainingMs = remainingMs % 6000;
    let seconds = Math.floor(remainingMs / 100);
    let milliseconds = remainingMs % 100; 
    
    
    // Format time components to ensure two-digit representation
    let result =minutes.toString().padStart(2,'0')+':'+seconds.toString().padStart(2,'0')+':'+milliseconds.toString().padStart(2,'0');
    
    // Conditionally include hours in the output if greater than 0
    return (hours>0)? hours.toString().padStart(2,'0')+':'+result : result;
    
}
export default function StopWatch() {
    // State hooks for managing stopwatch status and time values
    const [timerStatus,setTimerStatus] = useState(false);
    const [time,setTime] = useState(0);
    const [lapTime,setLapTimes]=useState([]);
    const [isLapDisabled,setLapDisabled]=useState(true);
    const maxLap=25;
    
    // Effect hook for handling the stopwatch interval
    useEffect(()=>{
        let interval: ReturnType<typeof setInterval> | null = null;

        if (timerStatus) {
            /// Set an interval to update the time every 10 milliseconds
            interval = setInterval(() => {setTime(prevTime => prevTime + 1);}, 10);
        } 

        return () => clearInterval(interval);
    },[timerStatus])

    // Function to start the stopwatch
    function startTimer(){
        setTimerStatus(true);
        setLapDisabled(false);
    }

    // Function to stop the stopwatch
    function stopTimer(){
        setTimerStatus(false);
        setLapDisabled(true);
    }

    // Function to reset the stopwatch
    function resetTimer(){
        setTimerStatus(false);
        setTime(0);
        setLapTimes([]);
        setLapDisabled(true)
    }

    // Function to record a lap time
    function addLap(){
        console.log("lapTime");
        if(lapTime.length>=maxLap  ){
            setLapDisabled(true);
            return;
        }
        lapTime.push(time);
    }
    
    // Component rendering
    return(
        <div className='stopwatch container-fluid d-flex flex-column'>
            <h1 className='stopwatch-title'>StopWatch</h1>
            <div className='stopwatch-content d-flex flex-column '>
                <div className='stopwatch-buttons row'>
                <StopWatchButton className='col'  onClick={startTimer} name='Start' isDisabled={timerStatus} ></StopWatchButton>
                <StopWatchButton className='col' onClick={stopTimer} name='Stop' isDisabled={!timerStatus}></StopWatchButton>
                <StopWatchButton className='col' onClick={resetTimer} name='Reset' isDisabled={false}></StopWatchButton>
                <StopWatchButton className='col' onClick={addLap} name='Lap' isDisabled={isLapDisabled}></StopWatchButton>
                </div>
                <div className='stopwatch-time row flex-grow-1'>
                    <h2 className='col-md-6'>{formatTime(time)}</h2>
                    {/* Display the numbered lap times */}
                    {lapTime.length > 0 && (
                        <div className='stopwatch-laptimes col-md-6'>
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