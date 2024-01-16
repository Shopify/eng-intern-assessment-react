import React from 'react'

interface StopWatchButtonProps {
    title: string,
    onClick: () => void
}

export default function StopWatchButton(props: StopWatchButtonProps) {
    return(
        <div>
            <button onClick={props.onClick}>
                {props.title}
            </button>
        </div>
    )
}