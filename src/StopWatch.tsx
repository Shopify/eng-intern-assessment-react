import React from 'react'

interface DisplayProps {
    elapsedMilliSecond: number
}

const  formatMilliSeconds = (elapsedMilliSecond: number) => {
    return 1;
}

export default function StopWatch({elapsedMilliSecond} : DisplayProps) {
    return(
        <div className="display"> 
          <h1>{formatMilliSeconds(elapsedMilliSecond)}</h1> 
        </div>
    )
}