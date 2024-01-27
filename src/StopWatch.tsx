import React from 'react'

export default function StopWatch() {
    return(
        <>
            <div>00:00:00.00</div>
            <button>Start</button>
            <button disabled={true}>Stop</button>
            <button disabled={true}>Lap</button>
            <button>Reset</button>
        </>
    )
}