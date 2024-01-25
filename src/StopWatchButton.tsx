import React from 'react'

interface Props{
    text:string
    onButtonClick: () => void;
}
export default function StopWatchButton(props:Props) {
    return(
        <div>
            <button onClick={props.onButtonClick} className="btn btn-primary">{props.text}</button>
        </div>
    )
}