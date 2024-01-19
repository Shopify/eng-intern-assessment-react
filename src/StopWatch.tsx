import React, { useContext } from 'react'
import { splitTime } from "./utils"
import SWContext from './SWContext'

import "./styles/StopWatch.css"

export default function StopWatch() {

    const {
        startTime,
        currentTime
    } = useContext(SWContext)
    

    const formatedTime = splitTime(currentTime-startTime)

    return(
        <div className='time-area'>
            <span>{formatedTime[0]}</span>:
            <span>{formatedTime[1]}</span>:
            <span>{formatedTime[2]}</span>
            <span style={{fontSize:64}}>.</span>
            <span style={{fontSize:64}}>{formatedTime[3]}</span>
        </div>
    )
}