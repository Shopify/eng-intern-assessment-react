import React from 'react';
import StopWatch from "./StopWatch";
import StopWatchButton from "./StopWatchButton";
import './app.styles.css';

export type Lap = {
    id: number,
    timeElapsed: number,
    lapTime: number
}
export default function App() {
    // setting initial state of the stop watch app
    const [timeRunning, setTimeRunning] = React.useState<boolean>(false);
    const [timeElapsed, setTimeElapsed] = React.useState<number>(0);
    const [sessionLaps, setSessionLaps] = React.useState<Lap[]>([]);
    // reference to timeout object when it is called
    const timeoutRef = React.useRef<NodeJS.Timer>();

    // triggers every 10 milliseconds to update the time if startedTime is true
    // and / or triggers when startedTime has been toggled (user initiated stop watch)
    React.useEffect(() => {
        // only if the stop watch is initiated / started by user
        if (timeRunning) {
            // wait 10 milliseconds before updating the time elapsed
            timeoutRef.current = setTimeout(() => {
                setTimeElapsed((timeElapsed) => timeElapsed + 10);
            }, 10)
        }

        // when the timeout command completes clear the timeout
        return () => clearTimeout(timeoutRef.current)
    }, [timeRunning, timeElapsed])

    // starts the stop watch
    const onStartClick = () => {
        setTimeRunning(true);
    }

    // stops the stop watch
    const onStopClick = () => {
        clearTimeout(timeoutRef.current)
        setTimeRunning(false);
    }

    // resets the time elapsed back to zero and clears all existing laps
    const onResetClick = () => {
        setTimeElapsed(0);
        setSessionLaps([])
    }

    // creates lap object based on current state and add to collection of laps for current run
    const onLapClick = () => {
        // create the new Lap object based on current states
        const lastLapTime = sessionLaps.length === 0 ? 0 : sessionLaps[sessionLaps.length - 1].timeElapsed;
        const newLapID = sessionLaps.length + 1;
        const newLapObject = {
            id: newLapID,
            timeElapsed: timeElapsed,
            lapTime: timeElapsed - lastLapTime,
        }
        // add to collection of laps
        setSessionLaps(
            [...sessionLaps, newLapObject]
        )
    }

    // main render:
    // renders StopWatch with the StopWatchButtons as its children
    return (
        <div className="stop-watch-container">
            {/* StopWatch will re-render everytime the timeElapsed gets updated  or user adds a lap  to current run */}
                <StopWatch timeElapsed={timeElapsed} sessionLaps={sessionLaps}>
                    {/* conditional render button options based on whether the stop watch is running or not */}
                    {timeRunning ? (
                        <div className="button-container">
                            <StopWatchButton type='Lap' onClick={onLapClick}/>
                            <StopWatchButton type='Stop' onClick={onStopClick}/>
                        </div>
                    ) : (
                        <div className="button-container">
                            <StopWatchButton type='Reset' onClick={onResetClick}/>
                            <StopWatchButton type='Start' onClick={onStartClick}/>
                        </div>
                    )}
            </StopWatch>
        </div>
    )
}