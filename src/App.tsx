import React, {useState} from 'react'
import StopWatch from './StopWatch'
import StopWatchButton from './StopWatchButton'

export default function App() {
    const [isRunning, setRunning] = useState(false);
    const [time, setTime] = useState(0);
    const [laps, setLaps] = useState<number[]>([]);

    return(
        <div>
            <h1>Stopwatch</h1>
            <div role='stopwatch'>
                <StopWatch isRunning={isRunning} time={time} setTime={setTime} laps={laps}/>
            </div>
            <div role='stopwatch-buttons'>
                <StopWatchButton text='Start' setValue={setRunning}/>
                <StopWatchButton text='Stop'setValue={setRunning}/>
                <StopWatchButton text='Reset'setValue={setTime}/>
                <StopWatchButton text='Lap' time={time} setLaps={setLaps}/>
            </div>
        </div>
    );
}