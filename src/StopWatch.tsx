import React from 'react'
import { getTime } from './helper';

type stopWatchDisplayProps = {
    totalElapsed: number,
}

type lapDisplayProps = {
    laps: number[][]
}


/**
 * This is a component that renders the stopwatch.
 *
 * @export
 * @param {stopWatchDisplayProps} props - The properties passed to this component.
 * @param {number} props.totalElapsed - The total elapsed time in seconds.
 *
 * @returns A JSX element that displays the hours, minutes, seconds, and milliseconds of the total elapsed time in a formatted manner.
 */
export default function StopWatch(props: stopWatchDisplayProps) {
    let {totalElapsed} = props;
    let {hours, minutes, seconds, ms} = getTime(totalElapsed)
    let render = [
        {
            name : "HH",
            type:  "hour",
            value: hours.toString().padStart(2, '0')
        },
        {
            name : "MM",
            type:  "minute",
            value: minutes.toString().padStart(2, '0')
        },
        {
            name : "SS",
            type:  "seconds",
            value: seconds.toString().padStart(2, '0')
        },
        {
            name : "ms",
            type:  "ms",
            value: ms.toString().padStart(2, '0')
        }
    ]
    return(
        <div style= {{display: 'flex', gap: "0.5rem"}} aria-label='stopwatchDisplay'>
            {
                render.map((item, index) => {
                    return <div key={index} style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                        <div aria-label={item.type} style={{fontStyle:'italic'}}>
                            {item.name}
                        </div>
                        <div aria-label={`value`} style={{fontWeight: "bolder", fontSize: "4rem", display: "flex", justifyContent: 'flex-start', border:"4px solid grey", padding: "0 0.2rem"}}>
                            {item.value}
                        </div>
                    </div>
                })
            }
        </div>
    )
}

export const LapTable = (props: lapDisplayProps) => {
    let {laps} = props;
    return(
        <>
            {
                laps.length>0 &&
                    laps.slice().reverse().map((lap, index) =>{
                        let {hours: curH, minutes: curM, seconds: curS, ms: curMs} = getTime(lap[0]) 
                        let {hours: totalH, minutes: totalM, seconds: totalS, ms: totalMs} = getTime(lap[1]) 
                        return <div key={index}>
                            Lap #{laps.length-index} || lapTime: {`${curH.toString().padStart(2, '0')}:${curM.toString().padStart(2, '0')}:${curS.toString().padStart(2, '0')}:${curMs.toString().padStart(2, '0')}`} || totalTime: {`${totalH.toString().padStart(2, '0')}:${totalM.toString().padStart(2, '0')}:${totalS.toString().padStart(2, '0')}:${totalMs.toString().padStart(2, '0')}`}
                        </div>
                    })
            }
        </>
    )
}