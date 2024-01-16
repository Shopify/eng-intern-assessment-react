import React from 'react'
import './stopWatchButton.styles.css'

type Button = 'Start' | 'Stop' | 'Reset' | 'Lap';

interface StopWatchButtonProps {
    type: Button,
    onClick: () => void,
}

export default function StopWatchButton(props: StopWatchButtonProps) {
    return(
        <div className="button-container">
            <button
                className={`stopwatch-button ${props.type}`}
                data-testid={`stopwatch-button-${props.type}`}
                onClick={props.onClick}
            >
                {props.type}
            </button>
        </div>
    )
}