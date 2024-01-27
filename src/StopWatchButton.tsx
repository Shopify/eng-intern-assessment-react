import React from 'react'

interface buttonProps {
    label: string;
    handleButtonClick: () => void;
}

const StopWatchButton = ({label, handleButtonClick}:buttonProps) => {
    return(
        <button onClick={handleButtonClick}>{label}</button>
    )
}

export default StopWatchButton;