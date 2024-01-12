import React, {useEffect, useState} from 'react'
import calculateDisplayTime from "./calculateDisplayTime";
import StopWatchButton from "./StopWatchButton";

export default function StopWatch() {
    // keeps track of the time to display in seconds
    const [timeInSec, setTimeInSec] = useState<number>(0);
    // keeps track of the time to display in the form [hh,mm,ss]
    const [timer, setTimer] = useState<Array<string>>([]);

    // updates the time displayed whenever timeInSec changes
    useEffect(() => {
        setTimer(calculateDisplayTime(timeInSec));
    }, [timeInSec])

    return (
        <div>
            <div className="time">
                <p className="display-text" data-testid="display-text">{timer[0]}</p>
                <p>:</p>
                <p className="display-text" data-testid="display-text">{timer[1]}</p>
                <p>:</p>
                <p className="display-text" data-testid="display-text">{timer[2]}</p>
            </div>
            <StopWatchButton setTimeInSec={setTimeInSec} timeInSec={timeInSec}/>

        </div>
    )
}
