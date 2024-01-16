import React from 'react'


interface StopWatchButtonProps {
    buttonName: string;
    buttonFunction: () => void;
}
export default function StopWatchButton({buttonName, buttonFunction}: StopWatchButtonProps) {
    return (
        <div>
            <React.Fragment>
                <button onClick={() => buttonFunction()}>
                    {buttonName}
                </button>
            </React.Fragment>
        </div>
    )
}