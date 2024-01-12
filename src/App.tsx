import React, { useState } from 'react';
import StopWatch from './StopWatch'
import StopWatchButton from './StopWatchButton'
import Laps from './Laps';
import { displayTime } from './utils';

export default function App() {
    const [stopWatchState, setStopWatchState] = useState('reset');
    const [lap, setLap] = useState(false);
    const [prevLapTime, setPrevLapTime] = useState(0);
    const [lapList, setLapList] = useState([]);

    const startCounting = () => {
        setStopWatchState('counting');
    }
    const stopCounting = () => {
        setStopWatchState('stopCounting');
    }
    const reset = () => {
        setStopWatchState('reset');
        setLapList([]);
    }
    const recordLap = () => {
        setLap(true);
    }
    const addLapTime = (lapTime: string) => {
        const lapTimeDiff = calculateLap(lapTime);
        setLapList([...lapList, lapTimeDiff]);
        setLap(false);
    }
    const calculateLap = (currLapTime: string) => {
        const [hours, minutes, seconds] = currLapTime.split(':');
        const currTimeInSeconds = parseInt(hours, 10) * 3600 + parseInt(minutes, 10) * 60 + parseInt(seconds);
        const diffInSeconds = currTimeInSeconds - prevLapTime;
        setPrevLapTime(currTimeInSeconds);
        return secondsToDisplayFormat(diffInSeconds);
    }
    const secondsToDisplayFormat = (totalSeconds: number) => {
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;
        return displayTime(hours, minutes, seconds);
    }

    return(
        <div>
            <StopWatch isCounting={stopWatchState} addLap={lap} addLapTime={addLapTime}></StopWatch>
            <StopWatchButton onStart={startCounting} onStop={stopCounting} onReset={reset} onLap={recordLap}></StopWatchButton>
            <Laps lapList={lapList}></Laps>
        </div>
    )
}