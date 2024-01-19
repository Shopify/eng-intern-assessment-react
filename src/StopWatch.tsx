import React from 'react'
import StopWatchButton from './StopWatchButton'

interface Time{
    hours: number,
    minutes: number,
    seconds: number,
    milliseconds: number
}

const [time, setTime] = React.useState<Time>({
    hours: 0,
    minutes: 0,
    seconds: 0,
    milliseconds: 0
})
const [lapNum, setLapNum] = React.useState(0)
const [state, setState] = React.useState("INITIAL")

export default function StopWatch() {



    return(
        <div>
            <StopWatchButton state={state} setState={setState}/>
        </div>
    )
}