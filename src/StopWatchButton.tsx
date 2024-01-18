import React, { MouseEventHandler } from 'react'

import './StopWatchButton.css'


type Props = {
    name: string
    handleClick: MouseEventHandler<HTMLButtonElement>
}

export default function StopWatchButton(props: Props) {
    return (
        <button className='stopwatch-button' onClick={props.handleClick}>{props.name}</button>
    )
}