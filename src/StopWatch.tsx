import React from 'react'

export default function StopWatch(time:any) {
    let hours_diplay = time.hours < 10 ? '0'+time.hours : time.hours
    let minutes_diplay = time.minutes < 10 ? '0'+time.minutes : time.minutes
    let seconds_diplay = time.seconds < 10 ? '0'+time.seconds : time.seconds
    return(
        <div>{hours_diplay}:{minutes_diplay}:{seconds_diplay}</div>
    )
}