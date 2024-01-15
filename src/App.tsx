import React from 'react'
import { useState, useEffect, useRef } from 'react'
import StopWatch from './StopWatch';
import StopWatchButton from './StopWatchButton';
import {formatTime} from './lib/utils';
import './styles/styles.css';

export default function App() {

    const [time, setTime] = useState<number>(0); 
    const [timerOn, setTimerOn] = useState<boolean>(false);
    let intervalRef = useRef<number | null>(null);
    const [laps, setLaps] = useState<number[]>([]); 

    const recordLap = () => {
        setLaps([...laps, time]); // Add current time to laps
    }

    const startTimer = () => {
        setTimerOn(true);
    }

    const stopTimer = () => {
        setTimerOn(false);
    }

    const resetTimer = () => {
        if(timerOn) return; //if timer is on, don't reset
        setTime(0);
        setLaps([]); //reset laps
    }

    useEffect(() => {
        
        if(timerOn) {
            intervalRef.current = window.setInterval(() => { //i used window.setInterval instead of setInterval so typescript knows i'm working with browser context
                setTime(prevTime => prevTime + 1)
            }, 1000) //update time every second
        }else{
            clearInterval(intervalRef.current);
        }

        return () => clearInterval(intervalRef.current); //cleanup by clearing interval

    }, [timerOn]);
    return(
        <div>
            <StopWatch time={time}/>

            <div className="btns">
                <StopWatchButton title='Start' onClick={startTimer} disabled={timerOn}/>
                <StopWatchButton title='Stop' onClick={stopTimer} disabled={!timerOn}/>
                <StopWatchButton title='Reset' onClick={resetTimer} disabled={timerOn}/>
                <StopWatchButton title='Lap' onClick={recordLap} disabled={!timerOn}/>
            </div>  

            {laps.length > 0 && (
                <div className='laps'>
                    <h3>Laps</h3>
                    <ul>
                        {laps.map((lapTime, index) => (
                            <li key={index}>Lap {index + 1}: {formatTime(lapTime)}</li> // Display laps
                        ))}
                    </ul>
                </div>
            )}
        </div>
    )
}