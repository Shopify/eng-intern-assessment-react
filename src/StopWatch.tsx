import React from 'react'

type stopWatchDisplayProps = {
    totalElapsed: number,
    curElapsed: number,
    laps: number[][]
}

export default function StopWatch(props: stopWatchDisplayProps) {
    let {totalElapsed, curElapsed, laps} = props;
    return(
        <div>
            Time Elapsed: {totalElapsed}
            <br />
            {
                laps.length>0 &&
                    laps.map((lap, index) =>{
                        return <div key={index}>
                            Lap Num: {index} || lapTime: {lap[0]} || totalTime: {lap[1]}
                        </div>
                    })
            }
        </div>
    )
}