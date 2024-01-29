import React from 'react'

import { formatTime } from '../utils/formatTime'

interface StopWatchLapListProps {
    laps: number[]
}

export default function StopWatchLapList({ laps }: StopWatchLapListProps) {
    return (
        <div style={{ width: '100%', height: '280px', overflowY: 'scroll' }}>
            {laps && laps.map((lap, index) => {
                return (
                <div key={index} > <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <p style={{margin:'0'}}>{`Lap ${laps.length - index}`}</p> 
                    <p style={{margin:'0'}}>{formatTime(lap)}</p> </div>
                    <hr style={{ color: 'black', width: '100%', opacity: '0.2' }}></hr>
                </div>
                )
            })}
        </div>
    )
}