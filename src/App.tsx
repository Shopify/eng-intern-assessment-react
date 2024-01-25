import React, { useState, useEffect } from 'react';
import StopWatch from './StopWatch';
import StopWatchButton from './StopWatchButton';
import LabComponent from './LapComponent';

export default function App() {
    const [time, setTime] = useState(0);
    const [running, setRunning] = useState(false);
    const [timeList, setTimeList] = useState([]);
    const [timePress, setTimePress] = useState(Date.now())
    var clockInterval: NodeJS.Timer;

    function updateTime() {
        if (running === true) {
            setTime((Date.now() - timePress) / 1000);
        }
    }

    function startButton() {
        if (time === 0) {
            setTimePress(Date.now());
        }
        setRunning(true);
    }

    function stopButton() {
        setRunning(false);
    }

    function resetButton() {
        setTime(0);
        setRunning(false);
        setTimeList([]);
        clearInterval(clockInterval)
    }

    function lapButton() {
        if (running) {
            if (timeList.length === 0) {
                setTimeList([[time, time]]);
            } else {
                setTimeList([...timeList, [time, time - timeList[timeList.length - 1][0]]]);
            }
        }
    }
    
    useEffect(() => {
        if (running) {
          clockInterval = setInterval(updateTime, 10);
        }
        return () => clearInterval(clockInterval);
    }, [running, time]);

    return (
        <div>
            <StopWatch time={time} />
            <StopWatchButton buttonFunc={startButton} buttonName="Start" />
            <StopWatchButton buttonFunc={stopButton} buttonName="Stop" />
            <StopWatchButton buttonFunc={resetButton} buttonName="Reset" />
            <StopWatchButton buttonFunc={lapButton} buttonName="Lap" />
            {timeList.map((labTime, index) => {
                console.log(labTime);
                return (
                    <LabComponent
                        key={index}
                        lapNumber={index}
                        absTime={labTime[0]}
                        lapTime={labTime[1]}
                        />
                );
            })}
        </div>
    )
}