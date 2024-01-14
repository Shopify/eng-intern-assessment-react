import React from 'react'

export default function StopWatch({ milliSeconds }:{ milliSeconds: number }) {
    return(
        <div>
            <h1> 00:00:{ milliSeconds }</h1>
        </div>
    )
}