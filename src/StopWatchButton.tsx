import React from 'react'

type Props = {
    name : string,
    onClick : () => void,
}
export default function StopWatchButton({name, onClick, } : Props) {
    return(
        <button onClick={onClick} data-testid = {name}>{name}</button>
    )
}