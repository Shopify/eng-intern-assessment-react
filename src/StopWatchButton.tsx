import React from 'react'
import './StopWatchButton.css'

type StopWatchButtonProps = {
    text: string
    handleClick: React.MouseEventHandler
    color: string
}

export default function StopWatchButton({handleClick, text, color}: StopWatchButtonProps) {
    return(
        <div className="StopWatchButton">
            <button onClick={handleClick} style={{backgroundColor: color}}>{text}</button>
        </div>
    )
}