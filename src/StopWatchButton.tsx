import React, { MouseEventHandler } from 'react'

interface StopWatchButtonInterface { onClick: MouseEventHandler, text: string }

export default function StopWatchButton(props: StopWatchButtonInterface) {

    return(
        <button
            onClick={props.onClick}
            >
            {props.text}
        </button>
    )
}