import React from 'react'

interface buttonProps {
    label: string
}

const StopWatchButton = ({label}:buttonProps) => {
    return(
        <button>{label}</button>
    )
}

export default StopWatchButton;