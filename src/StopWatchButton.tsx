import React from 'react'
import './StopWatchButton.css'

interface StopWatchButtonProps {
    // any props that come into the component
    label:string,
    onClickHandler : ()=> void
    className: string
}

export default function StopWatchButton({label, onClickHandler, className}:StopWatchButtonProps) {
    return(
        <button className={className} onClick={onClickHandler}>{label}</button>
    )
}