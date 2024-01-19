import React, { useEffect, useState, useRef, useContext } from 'react'
import StopWatch from './StopWatch'
import StopWatchButton from './StopWatchButton'
import StopWatchRecord from './StopWatchRecord'
import {SWContextProvider} from './SWContextProvider'

import './styles/App.css'

export enum StopWatchStatus {
    Stoped, //0
    Running, //1
    Paused, //2
}

export default function App() {
    
    // const [startTime, setStartTime] = useState<number>(0)
    // const [currentTime, setCurrentTime] = useState<number>(0)
    // const [lapStartTime, setLapStartTime] = useState<number>(0)
    // const [status, setStatus] = useState<StopWatchStatus>(StopWatchStatus.Stoped)

    return(
        <SWContextProvider>
            <div className='view'>
                <div className='container'>
                    <StopWatch/>
                    <StopWatchButton/>
                    <StopWatchRecord/>
                </div>
            </div>
        </SWContextProvider>
    )
}