import React, { useState } from 'react'
import StopWatch from './StopWatch'
import StopWatchButton from './StopWatchButton'

function App() {
    const [time, setTime] = useState<number>(0);
    const [isTiming, setIsTiming] = useState<boolean>(false);

    const startTime = () => {
        setIsTiming(!isTiming);
        setTime(time + 1);
        console.log('started!', isTiming, time);
    }

    const addLap = () => {
        return
    }

    const resetStopwatch = () => {
        setIsTiming(!isTiming);
        setTime(0);
        console.log('reset!', isTiming, time);
    }

    return(
        <div>
            <StopWatch time={time}/>
            <div>
                <StopWatchButton label={"start/stop"} handleButtonClick={() => startTime()}/>
                <StopWatchButton label={"lap"} handleButtonClick={() => addLap()}/>
                <StopWatchButton label={"reset"} handleButtonClick={() => resetStopwatch()}/>
            </div>
        </div>
    )
}

export default App;