import React from 'react'
import './Style.css'

export default function LappedTimes(props: any) {
    return(
        <div className='laps'>
        {props.laps.map((lap: number, i: number) => (
        <div key={i}> 
            {i > 0 && (
            <span>Lap {i}: {props.formatTime(props.laps[i - 1])}</span>
        )}</div>
    ))}

    </div>
    )
}