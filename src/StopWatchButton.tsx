import React from 'react'
import './StopWatchButton.css'

interface StopWatchButtonProps {
    // any props that come into the component
    label:string,
    onClickHandler : ()=> void
    className: string
    isDisabled: boolean
}

export default function StopWatchButton({label, onClickHandler, className, isDisabled}:StopWatchButtonProps) {
    
    if (isDisabled){
    return(
            <button disabled className={className} onClick={onClickHandler}>{label}</button>
        )
    }
    else{
        return(
            <button className={className} onClick={onClickHandler}>{label}</button>
        )       
    }
}