import React from 'react'


interface StopWatchButtonProps {
    buttonName: string;
    buttonFunction: () => void;
    disabled: boolean;
}

export default function StopWatchButton({buttonName, buttonFunction, disabled}: StopWatchButtonProps) {
    return (
        <div>
            <React.Fragment>
                <button onClick={() => buttonFunction()} disabled={disabled}>
                    {buttonName}
                </button>
            </React.Fragment>
        </div>
    )
}