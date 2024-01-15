import React from 'react'

interface StopWatchButtonProps {
    onClick: () => void;
    text: string;
  }

export default function StopWatchButton({onClick, text} : StopWatchButtonProps) {

    return(
        <button onClick={onClick}>
            {text}
        </button>
    )
}