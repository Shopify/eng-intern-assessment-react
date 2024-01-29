import React from 'react'

interface StopWatchButtonProps {
    // any props that come into the component
    label:string,
    onClickHandler : ()=> void
}

export default function StopWatchButton({label, onClickHandler}:StopWatchButtonProps) {
    return(
        <button onClick={onClickHandler}>{label}</button>
    )
}