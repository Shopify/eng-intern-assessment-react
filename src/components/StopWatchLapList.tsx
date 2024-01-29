import React from 'react'

import { formatTime } from '../utils/formatTime'

interface StopWatchLapListProps {
    laps: number[]
}

export default function StopWatchLapList({ laps }: StopWatchLapListProps) {
    const getLapTime = (index : number) => { 
        const start = laps[index-1] ? laps[index-1] : 0
        const end = laps[index]
        return formatTime(end-start)
    }

    return (
        <div style={{ width: '100%', height: '280px', overflowY: 'scroll' }}>
            {laps && laps.map((lap, index) => {
                return (
                <div key={index} > <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <p style={{margin:'0'}}>{`Lap ${index+1}`}</p> 
                    <p style={{margin:'0'}}>{getLapTime(index)}</p> </div>
                    <hr style={{ color: 'black', width: '100%', opacity: '0.2' }}></hr>
                </div>
                )
            }).reverse()}
        </div>
    )
}