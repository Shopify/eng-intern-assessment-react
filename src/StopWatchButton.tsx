import React from 'react'

export default function StopWatchButton({startClicked, buttonValue}:any) {
    return(
        <div>
            <button onClick={() => startClicked()}>{buttonValue.toUpperCase()}</button>
        </div>
    )
}