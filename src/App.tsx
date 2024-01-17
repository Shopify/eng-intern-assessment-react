import React, { useState, useEffect } from 'react';
import StopWatchButton from './StopWatchButton';
import StopWatch from './StopWatch';

export default function App() {
    const [counting, setCounting] = useState(false);
    const [time, setTime] = useState(0);

    useEffect(() => {
        const updateTime = () => {
            setTime((prevTime) => prevTime + 0.1);
        };

        if (counting) {
            setTimeout(updateTime, 100)
        }

    }, [counting, time]);

    const start = () => {
        setCounting(true);
    };

    const stop = () => {
        setCounting(false);
    };


    return (
        <div>
            <StopWatch time={time} />
            <StopWatchButton title="Start" func={start} />
            <StopWatchButton title="Stop" func={stop} />
            {/* Assuming you'll add functionalities for these buttons later */}
            <StopWatchButton title="Reset" func={() => { }} />
            <StopWatchButton title="Lap" func={() => { }} />
        </div>
    );
}
