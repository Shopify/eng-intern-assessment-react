import React, { useState } from 'react'

interface StopWatchButtonProps {
    name: string,
    onClick: React.MouseEventHandler<HTMLButtonElement>
}

export default function StopWatchButton({ onClick, name }: StopWatchButtonProps) {

    return(
        <button onClick={onClick} type='button'>{name}</button>
    )
}