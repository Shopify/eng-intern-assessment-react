import React from 'react'

export default function StopWatchButton(props: { buttonFunc: Function, buttonName: string }) {
    return(
        <div>
            <button onClick={(event) => { props.buttonFunc(); }}>{ props.buttonName }</button>
        </div>
    )
}