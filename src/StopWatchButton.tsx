import React, { CSSProperties, useContext, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconDefinition } from '@fortawesome/free-solid-svg-icons'
import { faPlay, faPause, faStop, faFlag } from '@fortawesome/free-solid-svg-icons'
import { StopWatchStatus } from './App';
import SWContext from './SWContext'

import "./styles/StopWatchButton.css"

// Props for Button component
interface ButtonProps {
    icon: IconDefinition,
    callback: Function,
    style ?: CSSProperties | undefined,
    title ?: string | undefined
}

export default function StopWatchButton() {

    const {
        startTime, setStartTime,
        currentTime, setCurrentTime,
        lapNumber, setLapNumber,
        status, setStatus
    } = useContext(SWContext)

    // update current time every 10ms, calling Date.now() instead of accumulating time
    // to avoid time drift
    useEffect(() => {
        let interval: NodeJS.Timer;
        if (status==1) {
            interval = setInterval(() => setCurrentTime(Date.now()), 10);
        }
    
        return () => {clearInterval(interval);}
    }, [status]);

    // Button component
    const Button = (props:ButtonProps) => {

        const {icon,style,callback,title} = props

        return(
        <button className='button' type="button" title={title} style={style} onClick={()=>{callback()}} >
            <FontAwesomeIcon icon={icon}></FontAwesomeIcon>
        </button>)
    }

    // All buttons with be used in different status
    const startButton = <Button key={0} icon={faPlay} style={{color:"var(--color-blue)", width:"150px"}} title='Start'
        callback={() => {setStartTime(Date.now()); setCurrentTime(Date.now()); setStatus(1); setLapNumber(1)}} />

    const flagButton = <Button key={4}  icon={faFlag} style={{color:"var(--color-indigo)"}}  title='Lap'
        callback={() => setLapNumber(lapNumber+1)}/>

    const pauseButton =<Button key={2} icon={faPause} style={{color:"var(--color-blue)"}} title='Pause'
        callback={() => setStatus(2)}/>

    const resetButton =<Button key={3} icon={faStop} style={{color:"var(--color-red)"}} title='Reset'
        callback={() => {setStatus(0); setStartTime(0); setCurrentTime(0); setLapNumber(1)}}/>

    const resumeButton =<Button key={1}icon={faPlay} style={{color:"var(--color-blue)"}} title='Resume'
        callback={() => {setStartTime(startTime+Date.now()-currentTime); setStatus(1); setCurrentTime(Date.now())}}/>
    
    let buttonList : React.JSX.Element[] = []

    // switch button list based on status
    switch(status){
        case StopWatchStatus.Stoped:
            buttonList=[startButton]
            break

        case StopWatchStatus.Running:
            buttonList=[flagButton,pauseButton]
            break

        case StopWatchStatus.Paused:
            buttonList=[resetButton,resumeButton]
            break
    }

    // Use memo to prevent unnecessary re-rendering, since context is updated every 10ms
    return(
        <MeMoStopWatchButton status={status} buttonList={buttonList} lapNumber={lapNumber}/>
    )
}

const MeMoStopWatchButton =  React.memo(function MeMoStopWatchButton(props:{status:StopWatchStatus, lapNumber:number, buttonList:React.JSX.Element[]}) {
    return(
        <div className='button-section'>
            {props.buttonList}
        </div>
    )
// Only re-render when status or lapNumber changes
},(pProps,nProps) => {return pProps.status == nProps.status && pProps.lapNumber == nProps.lapNumber})