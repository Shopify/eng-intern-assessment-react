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


    useEffect(() => {
        let intervalId: NodeJS.Timeout;

        if (isRunning) {
            intervalId = setInterval(() => {
                setTime(prevTime => prevTime + 1);
            }, 10);
        }
        return () => clearInterval(intervalId);
    }, [isRunning]);

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
    }

    const lap = () => {
        console.log('I may need another state to keep all the laps')
    }
    return (
        <div>
            <p>
                {hours.toString().padStart(2, '0')}:{minutes.toString().padStart(2, '0')}: {seconds.toString().padStart(2, '0')}:{milliseconds.toString().padStart(2, '0')}
            </p>
            <StopWatchButton
                startTimer={startTimer}
                stopTimer={stopTimer}
                reset={reset}
                lap={lap} />

        </div>
    )
}
export default StopWatch