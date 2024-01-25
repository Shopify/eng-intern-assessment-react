import React from 'react'

interface Props{
    text:string
}
export default function StopWatchButton(props:Props) {
    return(
        <div>
            <button className="btn btn-primary">{props.text}</button>
        </div>
    )
}