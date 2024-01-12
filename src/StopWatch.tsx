import React, { useState } from 'react';
import { displayTime } from './utils';

interface StopWatchProps {
    isCounting: string;
    addLapTime: (lapTime: string) => void;
    addLap: boolean;
}

const StopWatch: React.FC<StopWatchProps> = ({ isCounting, addLap, addLapTime }) => {
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);
    const [intervalId, setIntervalId] = useState(null);
    if (!intervalId && isCounting === 'counting') {
        const intervalID = setInterval(updateTime, 1000);
        setIntervalId(intervalID);
    }

    if (intervalId && (isCounting === 'stopCounting' || isCounting === 'reset')) {
        clearInterval(intervalId);
        setIntervalId(null);
    }

    if (isCounting === 'reset' && (seconds != 0 || minutes != 0 || hours != 0)) {
        setSeconds(0);
        setMinutes(0);
        setHours(0);
    }

    if (addLap) {
        addLapTime(displayTime(hours, minutes, seconds));
    }

    function updateTime() {
        setSeconds((prevSeconds) => {
            if (prevSeconds === 59) {
                setMinutes((prevMinutes) => {
                    if (prevMinutes === 59) {
                        setHours((prevHours) => prevHours + 1);
                        return 0;
                    } else {
                        return prevMinutes + 1;
                    }
                });
                return 0;
            } else {
                return prevSeconds + 1;
            }
        });
    }
 
    return(
        <div>{displayTime(hours, minutes, seconds)}</div>
    )
}

export default StopWatch;
