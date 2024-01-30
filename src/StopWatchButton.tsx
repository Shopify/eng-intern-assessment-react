import React,{useEffect, useState} from 'react'
import './StopWatchButton.css'
type Props = {
    setTimeInSec: Function
    timeInSec: number;
};

export default function StopWatchButton(props: Props) {
   const {setTimeInSec,timeInSec} = props;
   // const [intervalId, setIntervalId] = useState<number>(0);
    const [laps, setLaps] = useState([]);
    const [isRunning, setIsRunning] = useState(false);

    useEffect(()=> {
        let interval:any;

        if(isRunning) {
            interval = setInterval(()=> {
                setTimeInSec((previousState:number) => (previousState + 1))
            },1000)
        }
        return () => clearInterval(interval);
    },[isRunning])

    const handleStartButton = () => {
        setIsRunning(true);
    }

    const handleStopButton = () => {
       setIsRunning(false);
    }

    const handleResetButton = () => {
        setIsRunning(false);
        setTimeInSec(0);
        setLaps([]);
    }

    const handleLapButton = () => {
        const lapTime = timeInSec;
        setLaps((prevLaps) => [...prevLaps, lapTime]);
      };

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
            
            <div>
                <ul>
                {laps.map((lap, index) => (
                    <div>
                       <p key={index}> Lap {index + 1}:
                       {timeFormat(lap).hours.toString().padStart(2,"0")}:
                       {timeFormat(lap).minutes.toString().padStart(2,"0")}:
                       {timeFormat(lap).seconds.toString().padStart(2,"0")}
                       </p>
                    </div>
                    
                ))}
                </ul>
        
            </div>
        </div>
        
    )
}