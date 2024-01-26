import React, {useState, useEffect} from 'react'
import StopWatchButton from './StopWatchButton';
import './StopWatch.css'

interface StopWatchProps {
    isRunning: boolean;
    onStart: () => void;
    onStop: () => void;
}

const StopWatch: React.FC<StopWatchProps> = ({isRunning, onStart, onStop}) => {
    // the state to store time
    const [time, setTime] = useState(0);

    // the state to store lap times
    const [laps, setLaps] = useState<number[]>([]);

    // the state to display laps table
    const [showLapsTable, setShowLapsTable] = useState(false)


    useEffect(() => {
        let intervalId: NodeJS.Timeout;

        if (isRunning) {
            intervalId = setInterval(() => {
                setTime(prevTime => prevTime + 1);
            }, 10);
        }
        return () => clearInterval(intervalId);
    }, [isRunning]);

    const formatTime = (milliseconds: number) => {
        const formattedHours = Math.floor(milliseconds / 360000)
        const formattedMinutes = Math.floor((milliseconds % 360000) / 6000);
        const formattedSeconds = Math.floor((milliseconds % 6000) / 100);
        const formattedMilliseconds = milliseconds % 100

        return `${formattedHours.toString().padStart(2, '0')}:${formattedMinutes.toString().padStart(2, '0')}:${formattedSeconds.toString().padStart(2, '0')}:${formattedMilliseconds.toString().padStart(2, '0')}`
    }


    // start timer with 'Start' button
    const startTimer = () => {
        onStart();
    }

    const stopTimer = () => {
        onStop();
    }

    const reset = () => {
        setTime(0);
        
        // clear laps on reset
        setLaps([]);

        // hide the laps table when reset
        setShowLapsTable(false)
    }

    const lap = () => {
        if (isRunning) {
            // calculate lap time and add to laps array
            const lapTime = time;
            setLaps((prevLaps) => [...prevLaps, lapTime])
            setShowLapsTable(true);
        }
    }
    return (
        <div className='stopWatch'>
            <p className='stopWatchDisplay'>
                {formatTime(time)}
            </p>
            <div className={`lapTableContainer ${showLapsTable ? 'show': ''}`}>
                <table className='lapTable'>
                    <thead>
                        <tr>
                            <th>Lap No.</th>
                            <th>Lap Time</th>
                            <th>Total Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {laps.map((lapTime, index) => (
                            <tr key={index} className={index === 0 ? 'newestLap' : index === 1 ? 'secondLap': ''}>
                                <td>
                                {laps.length - index}
                                </td>
                                <td>{formatTime(lapTime)}</td>
                                <td>{formatTime(time)}</td>
                            </tr>
                    ))}
                    </tbody>
                
                
                </table>
            </div>
            <StopWatchButton
                startTimer={startTimer}
                stopTimer={stopTimer}
                reset={reset}
                lap={lap} />

        </div>
    )
}
export default StopWatch