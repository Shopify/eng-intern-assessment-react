import React, { MouseEventHandler } from 'react'

import './StopWatchButton.css'


type StopWatchButtonProps = {
    name: string
    handleClick: MouseEventHandler<HTMLButtonElement>
}

export default function StopWatchButton({ name, handleClick }: StopWatchButtonProps) {
    return (
        <button className='stopwatch-button' onClick={handleClick}>{name}</button>
    )
}