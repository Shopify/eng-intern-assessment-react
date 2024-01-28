import React, {useEffect, useState, useRef} from 'react';
import StopWatchButton from './StopWatchButton';

//this component will build the visual time aspect of the stopwatch
export default function StopWatch() {
    //checks the time
    const [isTime, setTime] = useState(0); 
    //checks if timer is active 
    const [isActive, setIsActive] = useState(false);

    //handles start/stop  when clicked 
    const handleStartStop = () => { 
        setIsActive(!isActive); 
    }; 
    //handles reset functionality when clicked 
    const handleReset = () => {
        setTime(0);
        setIsActive(false); 
    };
    
    return(
    //all of this shows up on the actual application 
<div>
    <h1>Stopwatch Lap Timer </h1>
        <h3>Making Timing Better For Everyone.</h3>
        <StopWatchButton
        active ={isActive}
        startStop={handleStartStop}
        reset={handleReset}   
      />
      <h3>By: Anisha Mohapatra</h3>
</div>
    )
}