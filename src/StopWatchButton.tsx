import React from 'react'

interface StopWatchButtonProps {
    content: string,
    onClick: () => void;
}

export default function StopWatchButton({ content, onClick = undefined} : StopWatchButtonProps) {
    return(
        <button onClick={onClick}>{ content }</button>
    )
}