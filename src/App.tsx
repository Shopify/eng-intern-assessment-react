import React, {useEffect, useState} from 'react'
import StopWatch from './StopWatch'
import StopWatchButton from './StopWatchButton'
import StopWatchLaps from './StopWatchLaps';

export default function App() {
    // stores time, in seconds
    const [time, setTime] = useState<number>(0);
    // stores whether watch is stopped
    const [stopped, setStopped] = useState<boolean>(true);
    // stores the laps, in same unit as time (seconds)
    const [laps, setLaps] = useState<number[]>([]);
    // stores current lap time, in same unit as time (seconds)
    const [currentLapTime, setCurrentLapTime] = useState<number>(0);

    useEffect(() => {
        let currentLapInterval: string | number | NodeJS.Timeout;
        let timeInterval: string | number | NodeJS.Timeout;
        
        if (!stopped) {
            currentLapInterval = setInterval(() => setCurrentLapTime(currentLapTime + 1), 1000);
            timeInterval = setInterval(() => setTime(time + 1), 1000);
        }

        // Clean up function
        return () => {
            clearInterval(currentLapInterval);
            clearInterval(timeInterval);
        };
    }, [stopped, time, currentLapTime])

    return(
        <div className='AppWindow'>
            <div className='AppContainer'>
                <StopWatch time={time} />
                <StopWatchButton 
                    stopped={stopped} 
                    laps={laps}
                    currentLapTime={currentLapTime}
                    setTime={setTime} 
                    setStopped={setStopped} 
                    setLaps={setLaps}
                    setCurrentLapTime={setCurrentLapTime}
                />
                <StopWatchLaps
                    laps={laps}
                    currentLapTime={currentLapTime}
                    stopped={stopped}
                />
            </div>
        </div>
    )
}