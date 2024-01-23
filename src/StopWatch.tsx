import React from 'react'
import { useState, useEffect } from 'react'
import StopWatchButton from './StopWatchButton'
import './StopWatchStyles.css'

export default function StopWatch() {


    const [time, setTime] = useState<number>(0); //state to manage elapsed time
    const [laps, setLaps] = useState<number[]>([]); //state to manage laps taken
    const [timerActive, setTimerActive] = useState<boolean>(false); //state to act as trigger
    
 
    useEffect(() => {
        if(timerActive){
            // store interval as variable so it can be cleaned up 
            const interval = setInterval(() => {
                setTime(oldCount => oldCount + 1);
            }, 1000);

            return () => {
                // will clean up interval to maintain memory and performance
                clearInterval(interval);
              };
        }
    }, [timerActive]);

    //callback function to start timer when start button is clicked
    function startTimer(): void {
        setTimerActive(true);
    }

    //callback function to pause timer when pause button is clicked
    function pauseTimer(): void {
        setTimerActive(false);
    }

    //callback function to reset timer when reset button is clicked, will also erase lap times
    function resetTimer(): void {
        setTime(0);
        setLaps(prevState => []);
        setTimerActive(false);
    }

    //callback function to save lap time from most recent lap
    function countLap(): void {
        let lapDifferenceTime: number; //variable to track the difference of times from now to the last lap 
        if(laps.length >= 1){
            let lastLap: number = laps[laps.length - 1];
            timerActive ? lapDifferenceTime = time - lastLap : lapDifferenceTime = 0; //makes sure if timer is paused and a lap is pressed it is 0 since timer isnt going
        }else{
            lapDifferenceTime = time;
        }

        setLaps(prevState => [...prevState, lapDifferenceTime]);
    }

    //hours calculation
    const hours = Math.floor(time / 3600);

    //minutes calculation
    const minutes = Math.floor((time % 3600) / 60);

    //seconds calculation
    const seconds = Math.floor((time % 60) );



    return(
        <div className="stopwatch-container">
            <div className="time-display" data-testid='time-display'>
                {hours.toString().padStart(2, "0")}:{minutes.toString().padStart(2, "0")}:{seconds.toString().padStart(2, "0")}
            </div>
            <div className='buttons-container'>
                <StopWatchButton startClicked={startTimer} pauseClicked={pauseTimer} resetClicked={resetTimer} lapClicked={countLap}/>
            </div>
            <div className="lap-display-container" data-testid="lap-display-container" >
                {laps.map((lap, index) => {
                    return(
                        <div className="lap">Lap {index + 1}: {lap} seconds</div>
                    )
                })}
            </div>
        </div>
    )
}