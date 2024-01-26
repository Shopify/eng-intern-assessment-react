import React, { useEffect, useState } from 'react'
import "./StopWatch.css";
import StopWatchButton from './StopWatchButton';
import LapList from './LapList';

export default function StopWatch() {
    
    const [time, setTime] = useState(0);
    const [isActive, setIsActive] = useState(false);
    const [laps, setLaps] = useState([]);
    
    useEffect(() => {
        let interval: NodeJS.Timeout;
        if(isActive) {
            interval = setInterval (() => 
                setTime(time + 1), 10);
        }
        return () => {
            clearInterval(interval);
        }
    }, [isActive, time]);

    const onStartStop =() => {
        setIsActive((prevIsActive) => !prevIsActive);
    };

    const onReset = () => {
        setTime(0);
        setIsActive(false);
        setLaps([]);
    };

    const onLap = () => {
        if (laps.length === 0) {
            setLaps([time]);
        } else {
            setLaps((prevLaps) => [...prevLaps, time]);
        }
    };

    const timer = (time: number) => {
        const hour = Math.floor(time / 360000);
        const minute = Math.floor((time % 360000) / 6000);
        const second = Math.floor((time % 6000) / 100);
        const milisecond = time % 100 ;
        
        return (
            <div className='stopwatch-container'>
                <div className='stopwatch-digits'>{hour} :&nbsp;</div>
                <div className='stopwatch-digits'>{minute} : &nbsp;</div>
                <div className='stopwatch-digits'>{second} :&nbsp;</div>
                <div className='stopwatch-digits'>{milisecond} </div>
            </div>
        );

    }

    return(

        <section className='stopwatch'>
            <h1 className='stopwatch-header'>Stopwatch App</h1>
            <h2 className='stopwatch-timer'>{timer(time)}</h2>
            <div>
                <StopWatchButton text="Laps" onClick={onLap}/>
                <StopWatchButton 
                text={isActive ? "Stop" : "Start" }
                onClick={onStartStop}/>
                <StopWatchButton text="Reset" onClick={onReset}/>
            </div>
            <LapList laps={laps} />
        </section>
    )
}