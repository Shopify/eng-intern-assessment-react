import React from 'react'

export default function StopWatchButton(props:any) {
    return(
        <div>
            <button onClick={props.stopWatchHandler}>{props.name}</button>
        </div>
    )
}