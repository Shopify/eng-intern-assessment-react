
import React from 'react'
import { useRef } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import StopWatchButton from './StopWatchButton';



export default function StopWatch() {
    // Time is in seconds
    const [time, setTime] = useState(0);
    const [active, setActive] = useState(false);
    const [laps, setLaps] = useState([]);
    const [showLaps, setShowLaps] = useState(false);

    // Timer increases each render
    useEffect(()=>{
        if (active) {         
            let intervalChange = setInterval(() =>{
            setTime((previousTime) => previousTime+1)
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
        return {minutes, seconds, milliseconds}
    }

    
    function addLap(){
        setLaps([...laps, currentTime])
        setShowLaps(true)
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
            <h1 style={{textAlign:"center",}}>
               {padLeft(currentTime.minutes)}:{padLeft(currentTime.seconds)}
               <span>.{currentTime.milliseconds} ms</span>
            </h1>

            <div style={{textAlign:"center"}}>
                <StopWatchButton label="Start" onPress={() => setActive(true)}/>      
                <StopWatchButton label="Stop" onPress={() => setActive(false)}/>            
                <StopWatchButton label="Laps" onPress={()=> addLap()}/>
                <StopWatchButton  label="Reset" onPress={() => resetStopWatch()}/> 
            </div>



            {showLaps? 
            <div>
                <h2 style={{textAlign:"center",}}>Laps:</h2>
                <h3 style={{textAlign:"center",}}>

                    {laps.map(function(data) {
                    return (
                        <div>
                            {padLeft(data.minutes)}:{padLeft(data.seconds)}
                            <span>.{data.milliseconds} ms</span>
                        </div>
                    )})}
                </h3>
            </div>
            :null}

 
        </div>
    )
}