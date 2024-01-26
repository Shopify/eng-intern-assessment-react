import React from 'react';
import { useState } from "react";
import StopWatch from './StopWatch';
import StopWatchButton from './StopWatchButton';

export default function App() {

    const [timeInSeconds, setTimeInSeconds] = useState<number>(0);
    const [secondCount, setSecondCount] = useState<number>(0);

    const handleStartButton = (): void => {
        let second:any = setInterval(():void => {
            setTimeInSeconds((previousState:number) =>
                previousState + 1)
        }, 1000);
        setSecondCount(second);   
    }

    return(
        <div className='main_container'>
            <StopWatch 
                timeInSeconds={timeInSeconds}
                />
            <StopWatchButton 
                timeInSeconds={timeInSeconds}
                handleStartButton={handleStartButton}
                />
        </div>
    )
}