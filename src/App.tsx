import React from 'react'
import StopWatch from './StopWatch'
import StopWatchButton from './StopWatchButton'

export interface Lap {
    startTime: number
    duration: number
}

export default function App() {
    const [laps, setLaps] = React.useState<Lap[]>([]);
    const [isRunning, setIsRunning] = React.useState(false);
    const [startTime, setStartTime] = React.useState(0);

    return(
        <div className="app-container">
            <StopWatch
                laps={laps}
                isRunning={isRunning}
                startTime={startTime}
            />
            <StopWatchButton/>
        </div>
    )
}