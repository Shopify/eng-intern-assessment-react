import React from 'react'

export default function StopWatch({ time, laps }: any) {
    return (
        <div>
            <div>
                <div>{time.hours}</div>
                <div>:{time.minutes}</div>
                <div>:{time.seconds}</div>
                <div>:{time.milliseconds}</div>
            </div>
            <div>
                {laps.map((lap: any, index: any) => (
                    <div key={index}>{`Lap ${index + 1}: ${lap}`}</div>
                ))}
            </div>
        </div>
    )
}