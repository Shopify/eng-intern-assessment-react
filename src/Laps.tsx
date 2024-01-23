import React from 'react'

export default function Laps({lapTimes}: any) {
    return(
        <div id="lap-list">
            <ul>
            {lapTimes.map((lapTime: any, index: any) => (
                <li key={index}>{lapTime}</li>
            ))}
            </ul>
        </div>
    )
}