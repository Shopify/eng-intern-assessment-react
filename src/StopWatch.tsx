import React,{useState, useEffect} from 'react'
import './StopWatch.css'
import { time } from 'console';
import StopWatchButton from './StopWatchButton';
import video from './cloud.mp4'


export default function StopWatch() {
    const[timeInSec, setTimeInSec] = useState<number>(0);

    //calculating the hour, minutes, seconds from seconds
    const hours:number = Math.floor(timeInSec/3600);
    const minutes:number = Math.floor((timeInSec%3600)/60);
    const seconds:number = Math.floor((timeInSec%60));
    const [laps, setLaps] = useState<Array<number>>([]);

    useEffect(() => {
        
    },[timeInSec]);


    return(
        <div className='container'>
            
            <div className='video'>
                <video src={video} autoPlay muted loop>
                </video>
            </div>
      
            <div className='time-container'>
                <p className = "timer-text">{hours.toString().padStart(2,"0")}</p>
                <span>:</span>
                <p className = "timer-text">{minutes.toString().padStart(2,"0")}</p>
                <span>:</span>
                <p className = "timer-text">{seconds.toString().padStart(2,"0")}</p>
            </div>
            
            <StopWatchButton setTimeInSec={setTimeInSec} timeInSec={timeInSec}/>
            
            

            
        </div>
        

    )
}