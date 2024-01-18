import React from 'react'

import './StopWatchButton.css'


type Props = {
    name: string
}

export default function StopWatchButton(props: Props) {
    return (
        <button className='stopwatch-button'>{props.name}</button>
    )
}