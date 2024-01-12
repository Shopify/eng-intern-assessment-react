import React, { useState } from 'react';
import StopWatch from './StopWatch'
import StopWatchButton from './StopWatchButton'
import Laps from './Laps';
import { displayTime } from './utils';

const styles: { [key: string]: React.CSSProperties } = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    },
    title: {
        fontWeight: 200
    }
};

export default function App() {
    const [stopWatchState, setStopWatchState] = useState('reset');
    const [lap, setLap] = useState(false);
    const [totalTimeAtPrevLap, setTotalTimeAtPrevLap] = useState(0);
    const [lapList, setLapList] = useState([]);

    const startCounting = () => {
        setStopWatchState('counting');
    }
    const stopCounting = () => {
        setStopWatchState('stopCounting');
    }
    const reset = () => {
        setStopWatchState('reset');
        setTotalTimeAtPrevLap(0);
        setLapList([]);
    }
    const recordLap = () => {
        if (stopWatchState === 'counting') {
            setLap(true);
        }
    }
    const addLapTime = (lapTime: string) => {
        const newLap = calculateLap(lapTime);
        setLapList([...lapList, newLap]);
        setLap(false);
    }
    const calculateLap = (currLapTime: string) => {
        const [hours, minutes, seconds] = currLapTime.split(':');
        const currTimeInSeconds = parseInt(hours, 10) * 3600 + parseInt(minutes, 10) * 60 + parseInt(seconds);
        const diffInSeconds = currTimeInSeconds - totalTimeAtPrevLap;
        setTotalTimeAtPrevLap(currTimeInSeconds);
        return {
            lapTime: secondsToDisplayFormat(diffInSeconds),
            overallTime: secondsToDisplayFormat(currTimeInSeconds)
        }
    }
    const secondsToDisplayFormat = (totalSeconds: number) => {
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;
        return displayTime(hours, minutes, seconds);
    }

    return(
        <div style={styles.container}>
            <h1 style={styles.title}>Welcome to Maggie's StopWatch!</h1>
            <StopWatch isCounting={stopWatchState} addLap={lap} addLapTime={addLapTime}></StopWatch>
            <StopWatchButton onStart={startCounting} onStop={stopCounting} onReset={reset} onLap={recordLap}></StopWatchButton>
            <Laps lapList={lapList}></Laps>
        </div>
    )
}