import React from 'react'

interface StopWatchButtonProps {
    label: string;
    onClick: () => void; //will be called onClick, with no return value
}

export default function StopWatchButton({label, onClick}: StopWatchButtonProps) {
// this ensure reusable button component to render in Stopwatch.tsx
    return(
       <button className='btn' onClick={onClick}>
        {label}
       </button>
    )
}