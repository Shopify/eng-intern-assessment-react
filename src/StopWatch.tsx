import React, { useState, useEffect } from 'react'
import StopWatchButton from './StopWatchButton';

 //formats the unit of times into proper double digits 
export function formatTimeUnit(unit: number): number | string {
    return unit < 10 ? `0${unit}` : unit;
}

// Function to calculate the time in hours, minutes, seconds and milliseconds
export function timeCalculation(timeInMilliseconds: number): Array<number|string> {
    let hours: number = Math.floor(timeInMilliseconds / (1000 * 60 * 60));
    timeInMilliseconds -= hours * 1000 * 60 * 60;

    let minutes: number = Math.floor(timeInMilliseconds / (1000 * 60));
    timeInMilliseconds -= minutes * 1000 * 60;

    let seconds: number = Math.floor(timeInMilliseconds / 1000);
    timeInMilliseconds -= seconds * 1000;

    let milliseconds: number = Math.floor(timeInMilliseconds / 10);

    //returns the calculated time in an array
    return [formatTimeUnit(hours), formatTimeUnit(minutes), formatTimeUnit(seconds), formatTimeUnit(milliseconds)];
}

//Function to define the stopwatch components and Renders them
export default function StopWatch() {
    //Defining the variables 
    const [timeInMilliseconds, setTimeInMilliseconds] = useState<number>(0);
    const [timerArray, setTimerArray] = useState<Array<number|string>>([]);
    const [lapTimes, setLapTimes] = useState<number[]>([]); 
    
    // The use effect hook to update the timer array as the milliseconds are updated
    useEffect(() =>{
        let timerArray: Array<number|string> = timeCalculation(timeInMilliseconds);
        setTimerArray(timerArray);
    }, [timeInMilliseconds]);

    //Renders the stop watch and buttons for the functionality
    //Renders the lap feature 
    return(
        <main>
            <h1 className = "title">Stopwatch</h1>
            <div className = "watch-container">
                <p className="timer">{timerArray[0]}</p>
                <span>:</span>
                <p className="timer">{timerArray[1]}</p>
                <span>:</span>
                <p className="timer">{timerArray[2]}</p>
                <span>:</span>
                <p className="timer">{timerArray[3]}</p>
            </div>
            <StopWatchButton setTimeInMilliseconds={setTimeInMilliseconds} setLapTimes={setLapTimes} timeInMilliseconds={timeInMilliseconds}/>

            <div className="laptimes-container"> 
                {lapTimes.map((lapTime, index) => (
                    <div key={index} className="laptime">
                        <span>Lap {index + 1}:</span>
                        <span>{timeCalculation(lapTime).join(":")}</span>
                    </div> 
                ))}
            </div>
        </main>
    )
}

