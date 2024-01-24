import React from 'react';
import { useState } from "react";
import StopWatch from './StopWatch';
import StopWatchButton from './StopWatchButton';

export default function App() {

    const [timeInSeconds, setTimeInSeconds] = useState<number>(0)

    return(
        <div className='main_container'>
            <StopWatch 
                timeInSeconds={timeInSeconds}
                />
            <StopWatchButton 
                setTimeInSeconds={setTimeInSeconds}/>
        </div>
    )
}