import React, {useState, useEffect} from 'react'
import StopWatchButton from './StopWatchButton';

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
        const formattedMinutes = Math.floor((milliseconds % 360000) / 6000);
        const formattedSeconds = Math.floor((milliseconds % 6000) / 100);
        const formattedMilliseconds = milliseconds % 100

        return `${formattedMinutes.toString().padStart(2, '0')}:${formattedSeconds.toString().padStart(2, '0')}:${formattedMilliseconds.toString().padStart(2, '0')}`
    }

    // calculating hours
    const hours = Math.floor(time / 360000);

    // calculating minutes
    const minutes = Math.floor((time % 360000) / 6000);

    // calculating seconds
    const seconds = Math.floor((time % 6000) / 100);

    // calculating milliseconds
    const milliseconds = time % 100;

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
    }

    const lap = () => {
        if (isRunning) {
            // calculate lap time and add to laps array
            const lapTime = time;
            setLaps((prevLaps)=>[...prevLaps, lapTime])
        }
    }
    return (
        <div>
            <p>
                {hours.toString().padStart(2, '0')}:{minutes.toString().padStart(2, '0')}: {seconds.toString().padStart(2, '0')}:{milliseconds.toString().padStart(2, '0')}
            </p>
            <div>
                {laps.map((lapTime, index) => (
                    <div key={index}>
                        LAP NO. {laps.length - index}
                        <span>Lap Time: {formatTime(lapTime)}</span>
                        <span>Total Time: {formatTime(time)}</span>
                    </div>
                ))}
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