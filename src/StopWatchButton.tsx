import React, { useState } from 'react';
import calculateDisplayTime from "./Functions/calculateDisplayTime";

type ButtonProps = {
    setTimeInSec: Function;
    timeInSec: number;
};

export default function StopWatchButton(props: ButtonProps) {
    const { setTimeInSec, timeInSec } = props;
    const [intervalId, setIntervalId] = useState<number | undefined>(undefined);
    const [lapTimes, setLapTimes] = useState<Array<number>>([]);
    const [totalTime, setTotalTime] = useState<Array<number>>([]);

    function handleStart() {
        const newIntervalId: any = setInterval(() => {
            setTimeInSec((previousTime: number) => previousTime + 1);
        }, 1000);
        setIntervalId(newIntervalId);
    }

    function handleStop() {
        clearInterval(intervalId);
        setIntervalId(undefined);
    }

    function handleReset() {
        clearInterval(intervalId);
        setTimeInSec(0);
        setLapTimes([]);
        //setTotalTime(0);
    }

    function handleLap() {
        setTotalTime(prevState => [...prevState,timeInSec])
        setLapTimes(prevLapTimes => [...prevLapTimes, timeInSec - prevLapTimes.reduce((acc, lapTime) => acc + lapTime, 0)]);
    }

    return (
        <div>
            <div className="buttons-container">
                <button onClick={handleStart}>Start</button>
                <button onClick={handleStop}>Stop</button>
                <button onClick={handleReset}>Reset</button>
                <button onClick={handleLap}>Lap</button>
            </div>
            <div className="lap-times-container">
                <h3>Lap Times</h3>
                <table>
                    <thead>
                    <tr>
                        <th>Lap Number</th>
                        <th>Time</th>
                        <th>Total Time</th>
                    </tr>
                    </thead>
                    <tbody>
                    {lapTimes.map((lapTime, index) => (
                        <tr key={index} className="lap-row">
                            <td>{`Lap ${index + 1}`}</td>
                            <td>{calculateDisplayTime(lapTime).join(':')}</td>
                            <td>{calculateDisplayTime(totalTime[index]).join(':')}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

