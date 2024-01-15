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
export default function StopWatchButton({setTime, setIsRunning, addLap, laps, lapTime, setLapTime}: stopWatchProps) {
    /**
     *  Purpose:
     *      Handles the click of the lap button to display accurate lap times
     * 
     */
    const handleLap = (currentTime: moment.Duration) => {
        addLap([...laps, currentTime]);
        setLapTime(moment.duration(0));
    }

    /**
     * Purpose:
     *      Handles the reset of the timer
     * 
     *      Resets the list of laps and timers. Stops the time.
     */
    const handleReset = () => {
        setIsRunning(false);
        setLapTime(moment.duration(0));
        setTime(moment.duration(0));
        addLap([]);
    }

    return(
        <div>
            <button onClick={() => setIsRunning(true)}>Start</button>
            <button onClick={() => setIsRunning(false)}>Stop</button>
            <button onClick={() => handleReset()}>Reset</button>
            <button onClick={() => handleLap(lapTime)}>Lap</button>
        </div>
    )
}