import React from 'react'
import './StopWatchButton.css'


type StopWatchButtonProps = {
    handleClick: any
    action: string
    color: string
}

export default function StopWatchButton({handleClick, action, color}: StopWatchButtonProps) {
    return(
        <div>
            <button className='button' onClick={handleClick} style={{ backgroundColor: color }}>{action}</button>
        </div>
    )
}