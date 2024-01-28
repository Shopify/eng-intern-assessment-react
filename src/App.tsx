import './App.css';
import React, { useState, useEffect } from 'react'
import StopWatch from './StopWatch'
import StopWatchButton from './StopWatchButton'

function App() {
    const [time, setTime] = useState<number>(0);
    const [isTiming, setIsTiming] = useState<boolean>(false);

    useEffect(() => {
        console.log(time)
    }, [time]);

    useEffect(() => {
        console.log(isTiming)
    }, [isTiming]);

    const startTime = () => {
        isTiming === false ? setIsTiming(!isTiming) : null;
        setTime(time + 1);
    }

    const stopTime = () => {
        isTiming ? setIsTiming(!isTiming) : null;
    }

    const addLap = () => {
        return
    }

    const resetStopwatch = () => {
        isTiming === true ? setIsTiming(!isTiming) : null;
        setTime(0);
    }

    return(
        <div>
            <StopWatch time={time}/>
            <div>
                <StopWatchButton label={"start"} handleButtonClick={() => startTime()}/>
                <StopWatchButton label={"stop"} handleButtonClick={() => stopTime()}/>
                <StopWatchButton label={"lap"} handleButtonClick={() => addLap()}/>
                <StopWatchButton label={"reset"} handleButtonClick={() => resetStopwatch()}/>
            </div>
        </div>
    )
}

export default App;