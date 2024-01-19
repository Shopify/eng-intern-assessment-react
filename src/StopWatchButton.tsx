import React from 'react'

export default function StopWatchButton({buttonAction, buttonName}:any) {
    return(
        <div>
            <button onClick={() => buttonAction()}>{buttonName.toUpperCase()}</button>
        </div>
    )
}