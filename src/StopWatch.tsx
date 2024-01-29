import React from 'react'

interface DisplayProps {
    formattedElapsedMilliSecond: string
}


export default function StopWatch({formattedElapsedMilliSecond} : DisplayProps) {
    return(
        <div className="displayContainer"> 
          <h1>{formattedElapsedMilliSecond}</h1> 
        </div>
    )
}