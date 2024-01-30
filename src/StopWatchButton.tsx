import React, { useState } from 'react';
import { FaPlay, FaRegStopCircle, FaStopwatch } from "react-icons/fa";
import {GrPowerReset } from "react-icons/gr";
import './App.css';

/** seperate component that represents the start, stop and reset buttons */

type Props = {
    setTimeInSeconds: Function
    currentTime: any;
}

const StopWatchButton = (props: Props) => {
    const { setTimeInSeconds } = props;
    const { currentTime } = props;

    const [ intervalId, setIntervalId ] = useState<number>(0);    //handles the interval id
    const [ active, setActive] = useState(true); //controls which button is active
    const [ lapTime, setLapTime ] = useState<Array<number|string>>([]);
    const [ previousTime, setPreviousTime] = useState<Array<number|string>>([]);


    //controls the play button while animates the timer
    const handlePlayButton = () => {
        if(active)
        {
            let interval:any = setInterval(() => {
                setTimeInSeconds((previousState:number) => previousState + 1);
            }, 1000);

            setIntervalId(interval);    
            setActive(false);
        }
    } 

    //controls the stop button which stops the timer
    const handleStopButton = () => {
        setActive(true);
        clearInterval(intervalId);
    }

    //controls the reset button which resets the timer back to 0
    const handleResetButton = () => {
        clearInterval(intervalId);
        setTimeInSeconds(0);
        setLapTime([]);
        const clearList = document.getElementById('lapTimes');
        clearList.innerHTML = " ";
    }

    const handleLapButton = () => {
        let lapsed;
        setPreviousTime(currentTime);
        let text = document.getElementById("lapTimes");
        text.style.display = 'block';
        let demo = document.createElement('li');
        demo.classList.add('lapTime-list')
        let time : Array<number | string> = calculateLapTime(previousTime, currentTime);
        setLapTime(time);
        if((previousTime == null || previousTime.length == 0) || (lapTime == null || lapTime.length == 0))
        {
            //a condition check for the first lapsed time that occurs as lapsed time would most likely be the same as current time
            lapsed = document.createTextNode(`${currentTime[0]}:${currentTime[1]}:${currentTime[2]}` + " " + `${currentTime[0]}:${currentTime[1]}:${currentTime[2]}`);
            text.appendChild(demo).appendChild(lapsed)
        } 
        else
        {
            lapsed = document.createTextNode(`${currentTime[0]}:${currentTime[1]}:${currentTime[2]}` + " " +  `${time[0]}:${time[1]}:${time[2]}`);
            text.appendChild(demo).appendChild(lapsed);
        }
    }; 
   
    //calculates lapsed time (not sure how lapsed time should be calculated)
    const calculateLapTime = (previousTime:Array<number|string>, currentTime:Array<number|string>): Array<number|string> =>
    {

        let previousHours, previousMinutes, previousSeconds;
        let timeHours, timeMinutes, timeSeconds;
        let hoursLapsed, minutesLapsed, secondsLapsed;
        let hoursLapsedFormat, minutesLapsedFormat, secondsLapsedFormat;

        // Check if any of the variables are strings instead of numbers for some reason
        previousHours = typeof previousTime[0] == 'string' ? parseInt(previousTime[0]) : previousTime[0];
        previousMinutes = typeof previousTime[1] == 'string' ? parseInt(previousTime[1]) : previousTime[1];
        previousSeconds = typeof previousTime[2] == 'string' ? parseInt(previousTime[2]) : previousTime[2];

        // do the same here
        timeHours = typeof currentTime[0] == 'string' ? parseInt(currentTime[0]) : currentTime[0];
        timeMinutes = typeof currentTime[1] == 'string' ? parseInt(currentTime[1]) : currentTime[1];
        timeSeconds = typeof currentTime[2] == 'string' ? parseInt(currentTime[2]) : currentTime[2];

        hoursLapsed = Math.abs(timeHours - previousHours);
        minutesLapsed = Math.abs(timeMinutes - previousMinutes);
        secondsLapsed = Math.abs(timeSeconds - previousSeconds);

        hoursLapsedFormat = hoursLapsed < 10 ? `0${hoursLapsed}` : hoursLapsed;
        minutesLapsedFormat = minutesLapsed < 10 ? `0${minutesLapsed}` : minutesLapsed;
        secondsLapsedFormat = secondsLapsed < 10 ? `0${secondsLapsed}` : secondsLapsed;

        return [
            hoursLapsedFormat,
            minutesLapsedFormat,
            secondsLapsedFormat,
        ];
        
    }

    return (  
        <>
        <div className="button-container">
            { active ? <button data-testid = "startButton" onClick = {handlePlayButton}><FaPlay /></button> : <button data-testid = "stopButton" className = "Stop" onClick = {handleStopButton}><FaRegStopCircle /></button> }
            <button data-testid = "resetButton" onClick = {handleResetButton}><GrPowerReset /></button>
            <button data-testid = "lapButton" onClick = {handleLapButton}><FaStopwatch /></button>
        </div>  
        <div>
        <ol data-testid = "lapTimes" id = "lapTimes">
            <h3><span>Lap</span><span>Time</span><span>Lapsed Time</span></h3> 
        </ol>
        </div>
        </>
    );
}
 
export default StopWatchButton;