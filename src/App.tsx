import React, { useEffect } from 'react'
import StopWatch from './StopWatch'
import StopWatchButton from './StopWatchButton'
import './App.css'

/**
 * Used for representing and storing recorded Laps
 * @param endTime the time used in the timer in milliseconds when the lap ended
 * @param duration the duration of the lap in milliseconds - the time between the end of the previous lap and the end of this lap
 */
export interface Lap {
    endTime: number
    duration: number
}

/**
 * Main App component that handles the state and functionality of the stopwatch
 * @returns the App component
 */
export default function App() {
    const [laps, setLaps] = React.useState<Lap[]>([]);
    const [isRunning, setIsRunning] = React.useState(false);
    const [timeCounter, setTimeCounter] = React.useState(0);

    // useEffect hook for incrementing the time counter every millisecond only when the stopwatch is running
    useEffect(() => {
        const interval = setInterval(() => {
            if (isRunning) {
                setTimeCounter(prevTimeCounter => prevTimeCounter + 1);
            }
        }, 1);
    
        return () => clearInterval(interval);
    }, [isRunning]);

    return(
        <div data-testid="app-container" className="app-container">
            <div className="centre">
                <div>
                    <StopWatch
                        laps={laps}
                        time={timeCounter}
                    />
                    <StopWatchButton
                        isRunning={isRunning}
                        
                        // The stopStart function toggles the running state
                        stopStart={() => {
                            if (isRunning) {
                                setIsRunning(false);
                            } else {
                                setIsRunning(true);
                            }
                        }}

                        // Use the current time as the end time of the lap we're recording and calculate its duration based on the previous lap's end time
                        lap={() => {
                            // Don't add a lap if the last lap was at the same time
                            if(laps.length > 0 && laps[laps.length - 1].endTime === timeCounter) {
                                return;
                            }

                            setLaps([
                                ...laps,
                                {
                                    endTime: timeCounter,
                                    duration: timeCounter - (laps.length > 0 ? laps[laps.length - 1].endTime : 0),
                                },
                            ]);
                        }}

                        // Reset the state of the stopwatch
                        reset={() => {
                            setLaps([]);
                            setTimeCounter(0);
                        }}
                    />`
                </div>
            </div>
        </div>
    )
}