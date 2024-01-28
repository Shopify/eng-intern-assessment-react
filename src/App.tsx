import React, {useCallback, useMemo, useState} from 'react'
import StopWatchButton from "./StopWatchButton";
import StopWatch from "./StopWatch";

export default function App() {
    const [time, setTime] = useState<number>(0);
    const [laps, setLaps] = useState<number[]>([]);

    const addLaps = useCallback((newTime) => setLaps([...laps, newTime]), [laps]);


    const [timerState, setTimerState] = useState<boolean>(false);
    const [resetTimer, setResetTimer] = useState<boolean>(false);

    const handleTimerState = (newState: boolean) => {
        setTimerState(newState);
    }
    const handleReset = () => {
        setResetTimer(true);
    }

    const handleLap = () => {
        addLaps(time);
    }

    return (
        <div>
            <StopWatchButton useTimer={timerState}
                             useTimerHandler={handleTimerState}
                             resetHandler={handleReset}
                             lapHandler={handleLap}
            />
            <StopWatch time={time}/>
        </div>
    )
}