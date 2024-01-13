import React, { useState } from 'react'
import StopWatch from './StopWatch'
import StopWatchButton from './StopWatchButton'

type renderBtnsProps={
    startFunc: () => void,
    resetFunc: () => void,
    pauseFunc: () => void,
    lapFunc: () => void,
    startFlag : boolean,
    totalElapsed: number
}

const RenderButtons=(props:renderBtnsProps)=>{
    return(
        <div>
            { 
            (!props.startFlag) ?
                    <StopWatchButton type={"Start"} action={props.startFunc} />
                :
                    <>
                        <StopWatchButton type={"Pause"} action={props.pauseFunc} />
                        <StopWatchButton type={"Lap"} action={props.lapFunc} />
                    </>
                
            }
            {props.totalElapsed>0 && <StopWatchButton type={"Reset"} action={props.resetFunc} />}
        </div>
    )
}

export default function App() {
    const [totalElapsed, settotalElapsed] = useState<number>(0.0);      // total time lasped in seconds
    const [curElapsed, setcurElapsed] = useState<number>(0.0);          // current lap elapsed time
    const [laps, setlaps] = useState<number[][]>([])                 // stores laps as: [lap elapsed from 0, total elapsed time]
    const [startFlag, setStartFlag] = useState<boolean>(false)
    

    const startFunc=()=>{}
    const resetFunc=()=>{}
    const pauseFunc=()=>{}
    const lapFunc=()=>{}

    return(
        <div style={{display: "flex", flexDirection: "column", gap: "50px"}}>
            <StopWatch totalElapsed={totalElapsed} curElapsed={curElapsed} laps={laps} />
            <RenderButtons startFunc={startFunc} resetFunc={resetFunc} pauseFunc= {pauseFunc} lapFunc={lapFunc} startFlag={startFlag} totalElapsed={totalElapsed} />
        </div>
    )
}