import React from 'react'
import StopWatch from './StopWatch'
import StopWatchButton from './StopWatchButton'

type renderBtnsProps={
    startFunc: () => void,
    endFunc: () => void,
    pauseFunc: () => void,
    lapFunc: () => void
}

const RenderButtons=(props:renderBtnsProps)=>{
    return(
        <div>
            <StopWatchButton type={"Start"} action={props.startFunc} />
            <StopWatchButton type={"Stop"} action={props.endFunc} />
            <StopWatchButton type={"Pause"} action={props.pauseFunc} />
            <StopWatchButton type={"Lap"} action={props.lapFunc} />
        </div>
    )
}

export default function App() {
    let totalElapsed: number = 0.0;      // total time lasped in seconds
    let curElapsed: number = 0.0        // current lap elapsed time
    let laps : number[][] = []             // stores laps as: [lap elapsed from 0, total elapsed time]

    const startFunc=()=>{}
    const endFunc=()=>{}
    const pauseFunc=()=>{}
    const lapFunc=()=>{}
    return(
        <div style={{display: "flex", flexDirection: "column", gap: "50px"}}>
            <StopWatch totalElapsed={totalElapsed} curElapsed={curElapsed} laps={laps} />
            <RenderButtons startFunc={startFunc} endFunc={endFunc} pauseFunc= {pauseFunc} lapFunc={lapFunc} />
        </div>
    )
}