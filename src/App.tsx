import React, { useEffect, useState } from 'react'
import StopWatch, { LapTable } from './StopWatch'
import StopWatchButton from './StopWatchButton'
import { Icon } from './Icons'

type renderBtnsProps={
    startFunc: () => void,
    resetFunc: () => void,
    pauseFunc: () => void,
    lapFunc: () => void,
    startFlag : boolean,
    totalElapsed: number
}

/**
 * This is a React functional component that renders a set of buttons for a stopwatch.
 *
 * @param {renderBtnsProps} props - The renderBtnsProps property passed to this component.
 * @param {function} props.lapFunc - The function to be executed when the "Lap" button is clicked.
 * @param {function} props.pauseFunc - The function to be executed when the "Pause" button is clicked.
 * @param {function} props.startFunc - The function to be executed when the "Start" button is clicked.
 * @param {function} props.resetFunc - The function to be executed when the "Reset" button is clicked.
 * @param {boolean} props.startFlag - A flag indicating whether the stopwatch is currently running.
 * @param {number} props.totalElapsed - The total elapsed time in seconds.
 *
 * @returns A JSX element that displays a set of buttons for controlling a stopwatch.
 *
 */
const RenderButtons=(props:renderBtnsProps)=>{
    return(
        <div style={{display: "flex", gap: "1rem", alignItems: "center" }}>
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
        <div style={{display: "flex", flexDirection: "column", gap: "2rem", alignItems:'center', height: "100vh", padding: "2rem 0"}} className="AppContainer">
            <StopWatch totalElapsed={totalElapsed} />
            <RenderButtons startFunc={startFunc} resetFunc={resetFunc} pauseFunc= {pauseFunc} lapFunc={lapFunc} startFlag={startFlag} totalElapsed={totalElapsed} />
            <LapTable laps={laps} />
            
        </div>
    )
}