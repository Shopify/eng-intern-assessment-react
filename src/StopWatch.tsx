
import React from 'react'
import { useRef } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import StopWatchButton from './StopWatchButton';



export default function StopWatch() {
    const [time, setTime] = useState(0); // Time is in 0.1 * seconds
    const [active, setActive] = useState(false);
    const [laps, setLaps] = useState([]);
    const [showLaps, setShowLaps] = useState(false);

    // Timer increases each render
    useEffect(()=>{
        if (active) {         
            let intervalChange = setInterval(() =>{
            setTime((previousTime) => previousTime+1);
        }, 100);
            return () => clearInterval(intervalChange);
        } 
    }, [time, active]);

    // Padding the left hand side with zeroes to make the displayed number have 2 digits
    function padLeft(time:number){
        if (time.toString().length < 2) {
            return "0" + time.toString();
        }

        else{
            return time.toString();
        }
    }

    // Separates time into minutes, seconds and milliseconds (first digit)
    function parseTime(time:number){
        const milliseconds = (time%10);
        const seconds = Math.floor((time/10) % 60);
        const minutes = Math.floor((time/600));
        return {minutes, seconds, milliseconds};
    }

    // Adds current time to all previous laps
    function addLap(){
        setLaps([...laps, currentTime]);
        setShowLaps(true);
    }

    // Reset all states
    function resetStopWatch(){
        setTime(0);
        setActive(false);
        setLaps([]);
        setShowLaps(false);
    }

    // Gets time in minutes, seconds, milliseconds (first digit)
    const currentTime = parseTime(time)  

    return(
        <div>
            <h1>Stopwatch</h1>

            <h2 className='timeDisplay'>
               {padLeft(currentTime.minutes)}:{padLeft(currentTime.seconds)}.{currentTime.milliseconds}
               <span className='smallText'>ms</span>
            </h2>

            <div className='buttonContainer'>
                <StopWatchButton label="Start" onPress={() => setActive(true)}/>      
                <StopWatchButton label="Stop" onPress={() => setActive(false)}/>            
                <StopWatchButton label="Lap" onPress={()=> addLap()}/>
                <StopWatchButton  label="Reset" onPress={() => resetStopWatch()}/> 
            </div>



            {showLaps? 
            <div>
                <h3>Laps</h3>
                    {laps.map(function(data) {
                    return (
                        <div className='lapsDisplay'>
                            {padLeft(data.minutes)}:{padLeft(data.seconds)}
                            <span>.{data.milliseconds}</span>
                        </div>
                    )})}
            </div>
            :null}

 
        </div>
    )
}