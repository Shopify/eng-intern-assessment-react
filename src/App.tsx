import { time } from 'console';
import React, {useEffect, useState} from 'react';
import './App.css';
import calculateTimer from './Helper/CalculateTimer';
import StopWatchButton from './StopWatchButton';


export default function App() {
   const [timeInSeconds, setTimeInSeconds] = useState<number>(0);
   const [timerArray, setTimerArray] = useState<Array<number|string>>([]);
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
