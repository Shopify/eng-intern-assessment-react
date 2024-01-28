import React, {useState, useEffect} from 'react'

import App from './App'
import StopWatchButton from './StopWatchButton'

/** component that displays the stopwatch  */

type Props = {
    timerArray: Function[];
}

const StopWatch = (props: Props) => {
    const {timerArray} = props;
    
    const handleLapButton = () => {
        // setLaps(laps => [timeInSeconds, ...laps]);  

        // const formattedLapData: LapData[] = laps.map((l, index) => {
        //     const previousLap = laps[index + 1] || 0
        //     const lapTime = l - previousLap
        
        //     return {
        //       time: timerArray(lapTime),
        //       lap: laps.length - index,
        //     }
        //   })  
        console.log(timerArray);
    }

    return(
        <>
        <div>
            <h3><span>Lap</span>
            <span>Time</span>
            <span>Total Time</span></h3> 
        </div>
        </>
    );
}

export default StopWatch;
