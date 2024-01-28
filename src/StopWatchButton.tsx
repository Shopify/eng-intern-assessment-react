import React, { useState, useEffect, useRef } from 'react';
import { FaPlay, FaRegStopCircle, FaStopwatch } from "react-icons/fa";
import {GrPowerReset } from "react-icons/gr";
import './App.css';

/** seperate component that represents the start, stop and reset buttons */

type Props = {
    setTimeInSeconds: Function
}

const StopWatchButton = (props: Props) => {
    const { setTimeInSeconds } = props;

    const [ intervalId, setIntervalId ] = useState<number>(0);    //handles the interval id
    const [ active, setActive] = useState(true); //controls which button is active


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
    }
   
    return (  
        <>
        <div className="button-container">
            { active ? <button onClick = {handlePlayButton}><FaPlay /></button> : <button onClick = {handleStopButton}><FaRegStopCircle /></button> }
            <button onClick = {handleResetButton}><GrPowerReset /></button>
        </div>  
        </>
    );
}
 
export default StopWatchButton;