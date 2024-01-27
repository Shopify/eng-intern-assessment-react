import React from 'react'
import './Style.css'

export default function StopWatch(props: any) {
    //functions to format time in a more readable manner

    const getMili = (ms:number) => ('0' + Math.floor(ms / 1000 / 60) % 60).slice(-2)
    const getSec = (ms:number) => ('0' + Math.floor(ms / 1000) % 60).slice(-2)
    const getMin = (ms:number) => ('0' + (ms / 10) % 100).slice(-2);
    
    const formatTime = (ms: number) => `${getMili(ms)}:${getSec(ms)}:${getMin(ms)}`

    return(
        <div>
            <section className='digits'>{formatTime(props.time)}</section>
        </div>
    )
}