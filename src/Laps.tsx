// The Lap History Component - Displays the Lap History with Lap # and Time in seconds
import React from 'react'
import { LapHistoryInterface } from './App'

export interface LapsInterface {
    lapHistory: LapHistoryInterface[]
}

export default function Laps({ lapHistory }: LapsInterface) {
    return (
        <div className="lap-history">
            {
                lapHistory.map((lap, index) =>
                    <div className="lap-history-item" key={index}>
                        <p className="lap-key lap-key-lap">Lap #{lap.lap}</p>
                        <p className="lap-key lap-key-time">Time {lap.time} seconds</p>
                    </div>
                )
            }
        </div>
    )
}