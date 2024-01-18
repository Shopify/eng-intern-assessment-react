import React from 'react'

type StopWatchButtonProps = {
    text: String
    handleClick: React.MouseEventHandler
}

export default function StopWatchButton({handleClick, text}: StopWatchButtonProps) {
    return(
        <div>
            <button onClick={handleClick}>{text}</button>
        </div>
    )
}