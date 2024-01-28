import React from 'react'
import './Style.css'

export default function StopWatch(props: any) {
    return(
        <div>
            <section className='digits'>{props.formatTime(props.time)}</section>
        </div>
    )
}