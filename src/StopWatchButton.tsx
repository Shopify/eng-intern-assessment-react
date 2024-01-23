import React from 'react'

interface Props{ 
    name:string,
    onClick: () => void;
}

export default function StopWatchButton({name, onClick}:Props) {
    return(
        <button onClick={onClick}> {name} </button>
    )
}