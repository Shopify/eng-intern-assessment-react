import React from 'react'

interface props {
    action: () => void
    text: string
}

export default function StopWatchButton(props: props) {
    return(
        <div>
            <button onClick={props.action}>{props.text}</button>
        </div>
    )
}