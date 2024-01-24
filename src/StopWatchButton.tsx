import React from 'react'

type StopWatchButtonProps = {
    timerOn: boolean
}

export default function StopWatchButton({ timerOn }: StopWatchButtonProps) {



    return (
        <div>
            <button>{timerOn === false ? "Start" : "Stop"}</button>
            <button>Lap</button>
        </div>
    )
}