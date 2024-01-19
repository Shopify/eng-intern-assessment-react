import React, { useEffect, useContext, useState, useRef } from "react";
import { timeToString } from "./utils"
import SWContext from './SWContext'

import "./styles/StopWatchRecord.css"

export default function StopWatchRecord() {

    const {
        startTime,
        currentTime,
        lapNumber,
        status
    } = useContext(SWContext)

    const lastLapTime = useRef<number>(0)
    const [recordsList, setRecordsList] = useState<{time:number, ctime:number} []>([])

    const updateRecordsList = () => {
        // reset the lap time when the stop watch is reset
        if(lapNumber==1){
            setRecordsList([])
        }else{
            // add the last lap time to the list
            setRecordsList([{time:currentTime-startTime-lastLapTime.current, ctime:currentTime-startTime},...recordsList])
        }

        lastLapTime.current = currentTime-startTime
    }

    // update the records list when the lap number changes
    useEffect(()=>{
        updateRecordsList()
    },[lapNumber])

    return(
        <div className={`lap-records ${status == 0 ? "":"expand"}`}>
            <table>
                <thead>
                    <tr>
                        <th scope="col">Lap #</th>
                        <th scope="col">Time</th>
                        <th scope="col">Cumulative Time</th>
                    </tr>
                </thead>
                <tbody>
                    {/* first row always update with time */}
                    <tr>
                        <td>#{lapNumber}</td>
                        <td>{timeToString(currentTime-startTime-lastLapTime.current)}</td>
                        <td>{timeToString(currentTime-startTime)}</td>
                    </tr>
                    {
                        recordsList.map((r,i) => {
                            return(
                            <tr key={i}>
                                <td>#{lapNumber-i-1}</td>
                                <td>{timeToString(r.time)}</td>
                                <td>{timeToString(r.ctime)}</td>
                            </tr>)
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}