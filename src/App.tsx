import { time } from 'console';
import React, {useEffect, useState} from 'react';
import './CSS Files/App.css';
import calculateTimer from './Helper/CalculateTimer';
import StopWatchButton from './StopWatchButton';

// Main app component for stopwatch functionality
export default function App() {

    // State for tracking time in seconds
   const [timeInSeconds, setTimeInSeconds] = useState<number>(0);
    // State for formatted time array [hours, minutes, seconds]

   const [timerArray, setTimerArray] = useState<Array<number|string>>([]);
    // Effect to calculate time splits whenever timeInSeconds changes

    //Stores laptime times for lap button
    const [laps, setLaps] = useState<Array<string>>([]);

    
   useEffect(()=>{
       let timeArray: Array<number|string> = calculateTimer(timeInSeconds);
       setTimerArray(timeArray);
   },[timeInSeconds]);

   return (
    <main>
        <section className='time-container'>
           <p className='timer-text'>{timerArray[0]}</p>
           <span>:</span>
           <p className='timer-text'>{timerArray[1]}</p>
           <span>:</span>
           <p className='timer-text'>{timerArray[2]}</p>
       </section>
       <StopWatchButton setTimeInSeconds = {setTimeInSeconds}/>
    </main>    
       
   )
}
