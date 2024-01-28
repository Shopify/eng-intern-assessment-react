
import React, { useState, useEffect } from 'react';
import StopWatchButton from './StopWatchButton';
import Stopwatch from './StopWatch';
import './App.css';
//function which calculates time and devides it into hours minutes and seconds 
function calculateTime(timeseconds:number):Array<number>{
    let hours : number = Math.floor(timeseconds/3600);
    let minutes: number= Math.floor((timeseconds-(hours*3600))/60);
    let seconds: number = Math.floor(timeseconds-(hours*3600)-(minutes*60));

    return[
        hours,
        minutes,
        seconds
    ];
}
//function which formats the Lap times to hours minutes and seconds 
function formattedLapTime(timeseconds:number): string {
    let hours : number = Math.floor(timeseconds/3600);
    let minutes: number= Math.floor((timeseconds-(hours*3600))/60);
    let seconds: number = Math.floor(timeseconds-(hours*3600)-(minutes*60));
    let formattedLapoutput =' ';
    if (hours>0){
        formattedLapoutput+= `${hours}h `;
    }
    if (minutes>0 || hours >0){
        formattedLapoutput+=(`${minutes}m `);
    }
    formattedLapoutput+=`${seconds}s`;
    return formattedLapoutput;

}

export default function App() {
    //for tracking time in seconds
    const [timeseconds,setTimeinSeconds]=useState<number>(0);
    //for storing time in an array to help seperate them into hours minutes and seconds
    const [timerArray,setTimerArray]=useState<number[]>([]);
    //for storing lap times
    const [laps,setLaps] = useState<number[]>([]);
    //update timerArray whenever timeseconds changes
    useEffect(() =>{
        let timerArray: Array<number>=calculateTime(timeseconds);
    setTimerArray(timerArray);
},[timeseconds]);
  //Update lap time.Only works if stopwatch has already started
const addLap = () => {
    if (timeseconds==0) return;
    setLaps(currentLaps => [...currentLaps, timeseconds]);
};
//reset the laps when we click the reset button
const resetLap = () => {
    setLaps([]); 
};


    


    


    return(
        <main>
        <div className='App'>
            <h1>My Stopwatch App</h1>
            <h2>By Farhan Atef Zoha</h2>

        <Stopwatch timerArray= {timerArray} setTimerArray={setTimerArray}/>        
        <StopWatchButton setTimeinSeconds = {setTimeinSeconds} addLap={addLap}  resetLap={resetLap}/>


        </div>
        <h2></h2>
        <ul>
                {laps.map((lapTime, index) => (
                    <li key={index}>Lap {index + 1}: {formattedLapTime(lapTime)} </li>
                ))}
            </ul>


        </main>
        
    )
}