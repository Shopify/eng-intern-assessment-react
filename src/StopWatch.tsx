import React from 'react'

type stopWatchDisplayProps = {
    totalElapsed: number,
}

type lapDisplayProps = {
    laps: number[][]
}

export default function StopWatch(props: stopWatchDisplayProps) {
    let {totalElapsed} = props;
    return(
        <div>
            Time Elapsed: {totalElapsed}
        </div>
    )
}

export const LapTable = (props: lapDisplayProps) => {
    let {laps} = props;
    return(
        <>
            {
                laps.length>0 &&
                    laps.map((lap, index) =>{
                        return <div key={index}>
                            Lap Num: {index} || lapTime: {lap[0]} || totalTime: {lap[1]}
                        </div>
                    })
            }
        </>
    )
}