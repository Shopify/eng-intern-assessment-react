/***
 * This file represents the stopwatch
 * @author Anny Zheng
 */
import React,{useState, useEffect} from 'react'
import './StopWatch.css'
import StopWatchButton from './StopWatchButton';
import video from './cloud.mp4'

export default function StopWatch() {
    const[timeInSec, setTimeInSec] = useState<number>(0);

    //calculating hour, minutes, seconds from seconds
    const hours:number = Math.floor(timeInSec/3600);
    const minutes:number = Math.floor((timeInSec%3600)/60);
    const seconds:number = Math.floor((timeInSec%60));

    useEffect(() => {
        
    },[timeInSec]);

    return(
        <div className='container'>
            {/* this is the background */}
            <div className='video'>
                <video src={video} autoPlay muted loop>
                </video>
            </div>
            
            {/* this is the quote on the top */}
            <div className='quote'>
                <p>Good morning, and in case it's not morning for you,<br></br> 
                    good afternoon, good evening, and good night.
                </p>
            </div>
      
            {/* this is the actual stopwatch portion */}
            <div className='time-container'>
                <p className = "timer-text">
                {/* this is to make sure there are always two digits showing */}
                    {hours.toString().padStart(2,"0")}:
                    {minutes.toString().padStart(2,"0")}:
                    {seconds.toString().padStart(2,"0")}
                </p>
                <StopWatchButton setTimeInSec={setTimeInSec} timeInSec={timeInSec}/>

            </div>

        </div>

    )
}