import React from 'react'

// Component that renders a button with the text passed in from the parent component, StopWatch, as a prop
const StopWatchButton = ({displayText, onClick}: {displayText: string, onClick: () => void}) => {
    return(
        <div>
            <button onClick={onClick}>{displayText}</button>
        </div>
    )
}

export default StopWatchButton;