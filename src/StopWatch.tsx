import React from 'react'

export default function StopWatch({ milliSeconds }:{ milliSeconds: number }) {
    function getMilliseconds() : string {
        return (milliSeconds%1000).toLocaleString('en-US', {minimumIntegerDigits: 2}).slice(0,2)
    }
    function getSeconds() : string {
        var seconds = Math.floor(milliSeconds/1000)%60
        return seconds.toLocaleString('en-US', {minimumIntegerDigits: 2})
    }
    function getMinutes() : string {
        var minutes = Math.floor(milliSeconds/1000)/60
        return minutes.toLocaleString('en-US', {minimumIntegerDigits: 2, maximumFractionDigits: 0})
    }

    return(
        <div>
            <h1> {getMinutes()}:{getSeconds()}:{getMilliseconds()}</h1>
        </div>
    )
}