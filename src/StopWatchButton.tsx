import React from 'react'
import './App.css'  

interface StopWatchButtonProps {
    onClick: () => void;
    label: string;
}

  export default function StopWatchButton({onClick, label}: StopWatchButtonProps) {
    return(
        <button className='stopwatch-button' onClick={onClick}>{label}</button>
    )
}