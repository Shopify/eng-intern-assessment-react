import React from 'react'

export default function StopWatchButton(props: {onclick: Function, name: string}) {
    return(
        <button onClick={() => props.onclick()}>{props.name}</button>
    )
}