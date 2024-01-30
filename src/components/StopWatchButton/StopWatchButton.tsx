import React from "react"

// add types to passed button props
interface StopWatchButtonProps {
    buttonName : string;
    onClick : () => void;
}

// render the stopwatch button component
export default function StopWatchButton({ buttonName, onClick } : StopWatchButtonProps) {
    return(
        <button className="button" onClick={onClick}>
            {buttonName}
        </button>
    )
}