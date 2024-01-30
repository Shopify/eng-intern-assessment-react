import React, {useState, useEffect} from 'react'
import StopWatchButton from './StopWatchButton';
import StopWatch from './StopWatch';
import './App.css';

/**  main component that renders the stopwatch and handles its functionality */

export default function App() {
    
    const [timeInSeconds, setTimeInSeconds] = useState<number>(0);
    const [currentTime, setcurrentTime] = useState<Array<number|string>>([]);

    let hours: number = Math.floor(timeInSeconds / 3600);   //convert seconds to hours
    let minutes: number = Math.floor((timeInSeconds - (hours * 3600)) / 60);  //convert seconds to minutes
    let seconds: number = timeInSeconds - (hours * 3600) - (minutes * 60);  // determine how much seconds

    //if hours is less than 10 display a 0 before the second digit, if more than 10 display it as is
    let hoursFormat = hours < 10 ? `0${hours}` : hours;
    let minutesFormat = minutes < 10 ? `0${minutes}` : minutes;
    let secondsFormat = seconds < 10 ? `0${seconds}` : seconds;

    useEffect (() => {
        let timeArr: Array<number|string> = [hoursFormat, minutesFormat, secondsFormat];
        setcurrentTime(timeArr);
    }, [hoursFormat, minutesFormat, secondsFormat])

    return(
        <>   
            <div className = "time-container">
                <p className="timer-text">{currentTime[0]}</p>
                <span>:</span>
                <p className="timer-text">{currentTime[1]}</p>
                <span>:</span>
                <p className="timer-text">{currentTime[2]}</p>
            </div> 
            <StopWatchButton setTimeInSeconds={setTimeInSeconds} currentTime={currentTime} />
            
        </>
    )
}