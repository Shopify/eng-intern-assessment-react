import React from 'react'
import "./StopWatchButton.css"


interface StopWatchButtonProps {
    buttonName: string;
    buttonFunction: () => void;
    disabled: boolean;
    style?: React.CSSProperties;
}

export default function StopWatchButton({buttonName, buttonFunction, disabled, style}: StopWatchButtonProps) {
    return (
        <div>
            <React.Fragment>
                <button onClick={() => buttonFunction()} disabled={disabled} className={"basicButton"} style={style}>
                    {buttonName}
                </button>
            </React.Fragment>
        </div>
    )
}