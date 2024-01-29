import React from 'react'
import './StopWatchButton.css'

interface Props {
   type: 'start' | 'stop' | 'lap' | 'reset';
   onClick: () => void;
}

export default function StopWatchButton({type, onClick} : Props) {
    return(
        <button className={`stopwatch-btn ${type}`} onClick={onClick}>
             {type}
        </button>
    )
}