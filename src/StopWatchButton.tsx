/***
 * This file represents the buttons on the stopwatch
 * @author Anny Zheng
 */
import React,{useEffect, useState} from 'react'
import './StopWatchButton.css'

type Props = {
    setTimeInSec: Function
    timeInSec: number;
};

export default function StopWatchButton(props: Props) {
   const {setTimeInSec,timeInSec} = props;
    const [laps, setLaps] = useState([]);
    const [isRunning, setIsRunning] = useState(false);

    useEffect(()=> {
        let interval:any;
        
        // use setInterval function to increase the time every second (1000 miliseconds)
        //only increase time when the clock is running
        if(isRunning) {
            interval = setInterval(()=> {
                setTimeInSec((previousState:number) => (previousState + 1))
            },1000)
        }
        
        return () => clearInterval(interval);
    },[isRunning])

    //Start counting when start button is clicked
    const handleStartButton = () => {
        if(isRunning==false)setIsRunning(true);
    }

    //Stop counting when stop button is clicked
    const handleStopButton = () => {
       setIsRunning(false);
    }

    //Set everything to 0 or empty
    const handleResetButton = () => {
        setIsRunning(false);
        setTimeInSec(0);
        setLaps([]);
    }

    //Store laps in array and add new lap to array when lap button is clicked
    const handleLapButton = () => {
        const lapTime = timeInSec;
        setLaps((prevLaps) => [...prevLaps, lapTime]);
      };

    //calculating hour, minutes, seconds from seconds
    const timeFormat = (sec:number) => {
        const hours:number = Math.floor(sec/3600);
        const minutes:number = Math.floor((sec%3600)/60);
        const seconds:number = Math.floor((sec%60));
        
        return {hours,minutes,seconds};
    };
   
    return(
        <div className='buttons-container'>
            <button onClick={handleStartButton}>Start</button>
            <button onClick={handleStopButton}>Stop</button>
            <button onClick={handleResetButton}>Reset</button>
            <button onClick={handleLapButton}>Lap</button>
        
            <div className='laps'>
                {/* this displays the laps */}
                {laps.map((lap, index) => (
                       <p key={index}> Lap {index + 1}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{timeFormat(lap).hours.toString().padStart(2,"0")}:
                       {timeFormat(lap).minutes.toString().padStart(2,"0")}:
                       {timeFormat(lap).seconds.toString().padStart(2,"0")}
                       </p>
                ))}
            </div>
        </div>
        
    )
}