import React, { CSSProperties, useRef, useContext, useCallback, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconDefinition } from '@fortawesome/free-solid-svg-icons'
import { faPlay, faPause, faStop, faFlag } from '@fortawesome/free-solid-svg-icons'
import { StopWatchStatus } from './App';
import SWContext from './SWContext'

import "./styles/StopWatchButton.css"

interface ButtonProps {
    icon: IconDefinition,
    callback: Function,
    style ?: CSSProperties | undefined
}

export default function StopWatchButton() {

    const {
        startTime, setStartTime,
        currentTime, setCurrentTime,
        lapNumber, setLapNumber,
        status, setStatus
    } = useContext(SWContext)

    useEffect(() => {
        let interval: NodeJS.Timer;
        if (status==1) {
          interval = setInterval(() => setCurrentTime(Date.now()), 10);
        }
    
        return () => {clearInterval(interval);}
      }, [status]);

    const Button = (props:ButtonProps) => {

        const {icon,style,callback} = props

        return(
        <button className='button' style={style} onClick={()=>{callback()}}>
            <FontAwesomeIcon icon={icon}></FontAwesomeIcon>
        </button>)
    }

    const startButton = <Button key={0} icon={faPlay} style={{color:"rgb(0,122,255)", width:"150px"}} 
        callback={() => {setStartTime(Date.now()); setCurrentTime(Date.now()); setStatus(1); setLapNumber(1)}} />

    const flagButton = <Button key={4}  icon={faFlag} style={{color:"rgb(88,86,214)"}} 
        callback={() => setLapNumber(lapNumber+1)}/>

    const pauseButton =<Button key={2} icon={faPause} style={{color:"rgb(0,122,255)"}} 
        callback={() => setStatus(2)}/>

    const resetButton =<Button key={3} icon={faStop} style={{color:"rgb(255,59,48)"}} 
        callback={() => {setStatus(0); setStartTime(0); setCurrentTime(0); setLapNumber(1)}}/>

    const resumeButton =<Button key={1}icon={faPlay} style={{color:"rgb(0,122,255)"}} 
        callback={() => {setStartTime(startTime+Date.now()-currentTime); setStatus(1); setCurrentTime(Date.now())}}/>
    
    let buttonList : React.JSX.Element[] = []

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

    return(
        <div className='button-section'>
            <MeMoStopWatchButton status={status} buttonList={buttonList} lapNumber={lapNumber}/>
        </div>
    )
}

const MeMoStopWatchButton =  React.memo(function MeMoStopWatchButton(props:{status:StopWatchStatus, lapNumber:number, buttonList:React.JSX.Element[]}) {
    
    return(
        <div className='button-section'>
            {props.buttonList}
        </div>
    )
},(pProps,nProps) => {return pProps.status == nProps.status && pProps.lapNumber == nProps.lapNumber})