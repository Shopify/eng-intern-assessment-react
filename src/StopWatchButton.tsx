import React from 'react'

//text determines displayed text and style;
//onButtonClick is OnClick function
interface Props{
    text:string
    onButtonClick: () => void;
}
export default function StopWatchButton(props:Props) {
    return(
        <div>
            <button onClick={props.onButtonClick} id={props.text} className="btn btn-primary">{props.text}</button>
        </div>
    )
}