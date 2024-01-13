import React, { useEffect, useState } from 'react'
import StopWatch from './StopWatch'
import StopWatchButton from './StopWatchButton'
import { Icon } from './Icons'
import { Button } from 'react-bootstrap'

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
        <div style={{display: "flex", gap: "1rem", alignItems: "center" }}>
            {/* { 
            (!props.startFlag) ?
                    <>
                        <Button />
                        <StopWatchButton type={'Start'} icon={<Icon name="play" />} action={props.startFunc} />
                    </>
                :
                    <>
                        <StopWatchButton type={"Lap"} icon={<Icon name="stopwatch" />} action={props.lapFunc} />
                        <StopWatchButton type={"Pause"} icon={<Icon name="pause" />} action={props.pauseFunc} />
                    </>
                
            } */}
            <StopWatchButton type={"Lap"} icon={<Icon name="stopwatch" />} action={props.lapFunc}  disabled = {!props.startFlag} />
            {
                (props.startFlag) ?
                    <StopWatchButton type={"Pause"} icon={<Icon name="pause" />} action={props.pauseFunc} />
                :
                    <StopWatchButton type={'Start'} icon={<Icon name="play" />} action={props.startFunc} />
            }
            <StopWatchButton type={"Reset"} icon={<Icon name="reset" />} action={props.resetFunc} disabled={props.totalElapsed<=0} />
        </div>
    )
}

export default function App() {
    const [totalElapsed, settotalElapsed] = useState<number>(0.0);      // total time lasped in seconds
    const [curElapsed, setcurElapsed] = useState<number>(0.0);          // current lap elapsed time
    const [laps, setlaps] = useState<number[][]>([])                 // stores laps as: [lap elapsed from 0, total elapsed time]
    const [startFlag, setStartFlag] = useState<boolean>(false)
    

    const startFunc=()=>{
        setStartFlag(true)
    }

    const resetFunc=()=>{
        setStartFlag(false);
        settotalElapsed(0.0)
        setcurElapsed(0.0);
        setlaps([])
    }

    const pauseFunc=()=>{
        setStartFlag(false)
    }
    const lapFunc=()=>{
        setlaps(prev => [...prev, [curElapsed, totalElapsed]])
        setcurElapsed(0.0)
    }

    useEffect(() => {
        let intervalId: NodeJS.Timer;
        if(startFlag) {
            intervalId = setInterval(() => {
                settotalElapsed(prev => parseFloat((prev + 0.1).toFixed(2)));
                setcurElapsed(prev => parseFloat((prev + 0.1).toFixed(2)));
            }, 100); // Update every millisecond
        }
        return () => clearInterval(intervalId);
    }, [startFlag]);

    return(
        <div style={{display: "flex", flexDirection: "column", gap: "2rem", margin: "1rem 1rem", justifyContent:'center', alignItems:'center', height: "90vh"}} className="AppContainer">
            <StopWatch totalElapsed={totalElapsed} curElapsed={curElapsed} laps={laps} />
            <RenderButtons startFunc={startFunc} resetFunc={resetFunc} pauseFunc= {pauseFunc} lapFunc={lapFunc} startFlag={startFlag} totalElapsed={totalElapsed} />
        </div>
    )
}