import React from 'react'
import "./styles/StopWatchButton.css"

interface StopWatchButtonProps {
    title: string,
    onClick: () => void
}

export default function StopWatchButton(props: StopWatchButtonProps) {
    return(
        <div>
            <button 
                className={`btn ${props.title}`}
                data-testid={`btn-${props.title}`}
                onClick={props.onClick}>
                {props.title}
            </button>
        </div>
    )
}