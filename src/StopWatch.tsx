import React, {useEffect, useState} from 'react'
import StopWatchButton from './StopWatchButton';

export default function StopWatch() {
    const [timeInSeconds, setTimeInSeconds] = useState(0);
    const [timeArray, setTimeArray] = useState<Array<number|string>>([]);
    const [timeLaps, setTimeLaps] = useState<Array<string>>([])
    const [laps, setLaps] = useState<Array<number|string>>([]);

    function calculateTimeInSeconds(timeInSeconds: number): (number | string)[] {
        let hours:number = Math.floor(timeInSeconds / 3600);
        let minutes:number = Math.floor((timeInSeconds - (hours * 3600)) / 60);
        let seconds:number = timeInSeconds - (hours * 3600) - (minutes * 60);
        
        return [
            hours < 10 ? `0${hours}` : hours,
            minutes < 10 ? `0${minutes}` : minutes,
            seconds < 10 ? `0${seconds}` : seconds
        ];
    }

    function here() {
        if (timeArray[0] !=  "00"|| timeArray[1] != "00" || timeArray[2] != "00") {
            console.log(timeLaps);
            let x = timeArray[0] + ":" + timeArray[1] + ":" +  timeArray[2]
            setTimeLaps([...timeLaps, x])
        }
    }

    function clear() {
        setTimeLaps([])
    }

    useEffect(() => {
        setTimeArray(calculateTimeInSeconds(timeInSeconds));
    }, [timeInSeconds]);
    return(
        <div>
            <main className="stopwatch-container">
            <section className="timer-display">
                <p id="hour">{timeArray[0]}</p>
                <span>:</span>
                <p id="minute">{timeArray[1]}</p>
                <span>:</span>
                <p id="second">{timeArray[2]}</p>
            </section>
            <StopWatchButton setTimeInSeconds={setTimeInSeconds}  setLap={here} clearLap={clear}/>
            <p>{timeLaps}</p>
        </main>
        </div>
    )
}
