import React from 'react'
import '../styles/StopWatchButton.css'

/*
This component renders a button with the text passed in from the parent component, StopWatch, as a prop

@params {string} displayText - the text to be displayed on the button
@params {function} onClick - the function to be called when the button is clicked
@params {string} buttonType - the style of the button
*/
const StopWatchButton = ({displayText, onClick, buttonType}: {displayText: string, onClick: () => void, buttonType: string}) => {
    return(
        <div>
            <button className={`stopwatch-button ${buttonType}`} onClick={onClick}>{displayText}</button>
        </div>
    )
}

export default StopWatchButton;