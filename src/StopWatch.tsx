import React, {useEffect, useState} from 'react'
import StopWatchButton from './StopWatchButton';
import ShowLapsHistory from './ShowLapsHistory';
import "./stylesheets/stopWatch.css";
import { log } from 'console';

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
        if (timeArray[0] !=  "00"|| timeArray[1] != "00" || timeArray[2] != "00"  ) {
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

            <div className="main">
                <h1> <strong>The Unique Stopwatch</strong> </h1>
                
                <div className="hour">

                    <p className='time-element' id="hour">{timeArray[0]}</p>
                    <p className='caption'>Hours</p>

                </div>
                <p className='colon'>:</p>
                <div className="min">

                    <p className='time-element' id="minute">{timeArray[1]}</p>
                    <p className='caption'>Minutes</p>

                </div>
                <p className='colon'>:</p>
                <div className="sec">

                    <p className='time-element' id="second">{timeArray[2]}</p>
                    <p className='caption'>Seconds</p>

                </div>

                <StopWatchButton setTimeInSeconds={setTimeInSeconds} setLap={here} clearLap={clear}/>
                <br /> <hr />

                <div className="timeLaps">
                    <ShowLapsHistory showLaps={timeLaps} />
                </div>
                
            </div>
        </div>
    )
}
