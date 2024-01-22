import React from 'react'

export default function StopWatchButton({ text, handleClick }: { text:string, handleClick: React.MouseEventHandler<HTMLButtonElement> }) {
    return(
        <button onClick={handleClick}>
            {text}
        </button>
    )
}