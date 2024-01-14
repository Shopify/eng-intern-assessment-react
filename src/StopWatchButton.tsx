import React from 'react'
import { Button } from 'react-bootstrap'

export default function StopWatchButton({ content } : {content: string}) {
    return(
        <button>{ content }</button>
    )
}