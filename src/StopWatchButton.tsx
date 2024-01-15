import React from 'react';
import moment from 'moment';

/**
* Interface for stopwatch buttons.
*/
interface stopWatchProps {
    setTime: React.Dispatch<React.SetStateAction<moment.Duration>>
    setIsRunning: React.Dispatch<React.SetStateAction<boolean>>
    time: moment.Duration
    laps: moment.Duration[]
    addLap: React.Dispatch<React.SetStateAction<moment.Duration[]>>
    lapTime: moment.Duration
    setLapTime: React.Dispatch<React.SetStateAction<moment.Duration>>
}

/**
* Purpose:
*      Interface that has 3 buttons to add functionality
*      to the stopwatch itself.
* 
* Params:
*       setTime - useState Function - set's current time
*       setIsRunning = useState Function - set's boolean if running or not
*/
export default function StopWatchButton({setTime, setIsRunning, time, addLap, laps, lapTime, setLapTime}: stopWatchProps) {
    const handleLap = (currentTime: moment.Duration) => {
        addLap([...laps, currentTime]);
        setLapTime(moment.duration(0));
    }

    return(
        <div>
            <button onClick={() => setIsRunning(true)}>Start</button>
            <button onClick={() => setIsRunning(false)}>Stop</button>
            <button onClick={() => setTime(moment.duration(0))}>Reset</button>
            <button onClick={() => handleLap(lapTime)}>Lap</button>
        </div>
    )
}