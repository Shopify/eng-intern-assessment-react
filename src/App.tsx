import React from 'react'
import { useState, useEffect } from 'react';

import StopWatchButton from './StopWatchButton'
import StopWatch from './StopWatch'
import { calculateTime } from './StopWatchUtils';

export default function App() {
    const [isStopped, setIsStopped] = useState<boolean>(true);
    const [time, setTime] = useState<number>(0);
    const [laps, setLaps] = useState<number[]>([]);

    // const [minTime, setMinTime] = useState("12:12:12:12");
    // const [maxTime, setMaxTime] = useState(1);

    enum LapCategory {
        Green = "green",
        Red = "red",
        Black = "black"
    }

    // const calculatedLapTimes: [string, LapCategory][] = [];
    const calculatedLapTimes: number[] = [];

    // const minTime: number = 0;
    // const maxTime: number = 0;

    // const lapTimesWithColors: any = [];

    // useEffect(() => {
    //     const minTime = Math.min(...calculatedLapTimes);
    //     const maxTime = Math.max(...calculatedLapTimes);
    // }, [calculatedLapTimes])
    
    // calculatedLapTimes.map((lapTime) => {
    //     if (lapTime === minTime) {
    //         lapTimesWithColors.push({ lap: lapTime, colour: 'green' });
    //     } else if (lapTime === maxTime) {
    //         lapTimesWithColors.push({ lap: lapTime, colour: 'red' });
    //     } else {
    //         lapTimesWithColors.push({ lap: lapTime, colour: 'black' });
    //     }
    // });
    
    laps.map((lap: number, index: number) => {
        let calculatedTime = calculateTimeDifference(lap, (index !== 0 ? laps[index - 1] : 0));

        calculatedLapTimes.push(calculatedTime);

        // if (calculatedTime < minTime) {
        //     console.log("calculatedTime -->  ", calculatedTime)
        //     console.log("minTime -->  ", minTime)
        //     setMinTime(calculatedTime);
        //     calculatedLapTimes.push([calculatedTime, LapCategory.Green]);
        // }
        // else  {
        //     calculatedLapTimes.push([calculatedTime, LapCategory.Black]);
        // }

    })

    function calculateTimeDifference(currentTime: number, prevTime: number) {
        const timeDifference: number = currentTime - prevTime;

        // const result: string = calculateTime(timeDifference);

        return timeDifference;
    }
    
    return(
        <div className="container">
            <StopWatch isStopped={isStopped} 
                       time={time} 
                       setTime={setTime}/>
            <StopWatchButton isStopped={isStopped} 
                             setIsStopped={setIsStopped} 
                             time={time} 
                             setTime={setTime}
                             setLaps={setLaps}/>
            <div className="laps">
                <ul>
                    {calculatedLapTimes.map((lap: number, index: number) => {
                        return (
                            <li key={index}>
                                <span className='lap-index'><b>{`Lap ${index + 1}`}</b></span>
                                <span className='lap-time'>{calculateTime(lap)}</span>
                            </li>)
                    })}
                </ul>
            </div>
        </div>
    )
}