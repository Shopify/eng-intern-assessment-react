import React from 'react'

export default function StopWatchButton(props: any) {
    return(
        <div>
            <button onClick={props.onClick}>{props.label}</button>
        </div>
    )
}