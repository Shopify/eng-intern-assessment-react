import React, {useState} from 'react';
import calculateDisplayTime from "./calculateDisplayTime";

type ButtonProps = {
    setTimeInSec: Function;
    timeInSec: number;
};

export default function StopWatchButton(props: ButtonProps) {
    const {setTimeInSec, timeInSec} = props;
    const [intervalId, setIntervalId] = useState<number | undefined>(undefined); // To Keep track of the most recent interval id for the setInterval function used to handle Start/Stop buttons dynamically
    const [lapTimes, setLapTimes] = useState<Array<number>>([]); // Keeps track of the time elapsed between a lap and the lap before that for each of the laps
    const [totalTime, setTotalTime] = useState<Array<number>>([]); // Keeps track of the time the stopwatch showed at the time of each lap

    function handleStart() {
        // changes timeInSec to be displayed every 1 second
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
        setTotalTime([]);
    }

    function handleLap() {
        setTotalTime(prevState => [...prevState, timeInSec])
        // Update lapTimes array by calculating the time for the current lap
        // and appending it to the existing lap times, adjusting for total elapsed time.
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
                {lapTimes.length > 0 && (
                    <table className="lap-table">
                        <thead>
                        <tr>
                            <th data-testid="lap-head">Lap Number</th>
                            <th data-testid="lap-head">Time</th>
                            <th data-testid="lap-head">Total Time</th>
                        </tr>
                        </thead>
                        <tbody>
                        {lapTimes.map((lapTime, index) => (
                            <tr key={index} className="lap-row">
                                <td>{`Lap ${index + 1}`}</td>
                                <td data-testid="lap-time">{calculateDisplayTime(lapTime).join(':')}</td>
                                <td>{calculateDisplayTime(totalTime[index]).join(':')}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}