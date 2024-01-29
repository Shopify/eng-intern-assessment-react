import React,{useState, useEffect} from 'react'
import './StopWatch.css'
import { time } from 'console';
import StopWatchButton from './StopWatchButton';
import video from './cloud.mp4'

// function calculateTimer(timeInSec:number): Array<number> {
//     let hours:number = Math.floor(timeInSec/3600);
//     let minutes:number = Math.floor((timeInSec%3600)/60);
//     let seconds:number = Math.floor((timeInSec%60));

//     //show two digit
//     let hoursFormat = hours < 10 ? '0${hours}':hours;


//     return [
//         hoursFormat,
//         minutes,
//         seconds,
//     ];
// }


export default function StopWatch() {
    const[timeInSec, setTimeInSec] = useState<number>(0);
    const [timerArr, setTimerArr] = useState<Array<number>>([]);

    //calculating the hour, minutes, seconds from seconds
    const hours:number = Math.floor(timeInSec/3600);
    const minutes:number = Math.floor((timeInSec%3600)/60);
    const seconds:number = Math.floor((timeInSec%60));
    useEffect(() => {
        //increase time every 10 milisecond
        //let intervalId = setInterval(() => setTimeInSec(timeInSec+1),10);
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
            <StopWatchButton setTimeInSec={setTimeInSec} />
            
        </div>
        

    )
}