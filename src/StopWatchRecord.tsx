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

    useEffect(()=>{
        if(lapNumber==1){
            setRecordsList([])
        }else{
            setRecordsList([{time:currentTime-startTime-lastLapTime.current, ctime:currentTime-startTime},...recordsList])
        }

        lastLapTime.current = currentTime-startTime
    },[lapNumber,lastLapTime])

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