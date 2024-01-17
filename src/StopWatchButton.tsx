import React from 'react'

interface StopWatchButtonProps {
    content: string,
    id: string,
    onClick: () => void;
}

export default function StopWatchButton({ content, id, onClick = undefined} : StopWatchButtonProps) {
    return(
        <button id={id} onClick={onClick}>{ content }</button>
    )
}