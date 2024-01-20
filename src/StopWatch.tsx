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

    // Display the elsapsed time
    return(
        <p className='time-section' hidden={true}>
            <span>{formatedTime[0]}</span>:
            <span>{formatedTime[1]}</span>:
            <span>{formatedTime[2]}</span>
            <span className="ms-span">.</span>
            <span className="ms-span">{formatedTime[3]}</span>
        </p>
    )
}