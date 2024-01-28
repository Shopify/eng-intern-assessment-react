import React, { useEffect } from 'react'
import StopWatch from './StopWatch'
import StopWatchButton from './StopWatchButton'
import './App.css'

export interface Lap {
    startTime: number
    duration: number
}

export default function App() {
    const [laps, setLaps] = React.useState<Lap[]>([]);
    const [isRunning, setIsRunning] = React.useState(false);
    const [timeCounter, setTimeCounter] = React.useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            if (isRunning) {
                setTimeCounter(timeCounter + 1);
            }
        }
        , 1);
        return () => clearInterval(interval);
    }, [isRunning, timeCounter]);

    return(
        <div className="app-container">
            <div className="centre">
                <div>
                <StopWatch
                    laps={laps}
                    isRunning={isRunning}
                    time={timeCounter}
                />
                <StopWatchButton
                    isRunning={isRunning}
                    stopStart={() => {
                        if (isRunning) {
                            setIsRunning(false);
                        } else {
                            setIsRunning(true);
                        }
                    }}
                    lap={() => {
                        if (isRunning) {
                            setLaps([
                                ...laps,
                                {
                                    startTime: timeCounter,
                                    duration: timeCounter - (laps.length > 0 ? laps[laps.length - 1].startTime : 0),
                                },
                            ]);
                        }
                    }}
                    reset={() => {
                        setLaps([]);
                        setTimeCounter(0);
                    }}
                />
                </div>
            </div>
        </div>
    )
}