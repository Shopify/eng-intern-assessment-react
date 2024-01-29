import React from 'react'

interface buttonProps {
    label: string;
    handleButtonClick: () => void;
}

const StopWatchButton = ({label, handleButtonClick}:buttonProps) => {
    return(
        <button className='digital' onClick={handleButtonClick}>{label}</button>
    )
}

export default StopWatchButton;