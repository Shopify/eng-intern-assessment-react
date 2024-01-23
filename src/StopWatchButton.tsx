import React, {useState} from 'react'

export default function StopWatchButton() {

    const [start, setStart] = useState()

    return(
        <div>
            <button>Start</button>
            <button>Stop</button>
            <button>Lap</button>
        </div>
    )
}