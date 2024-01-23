import React from 'react'


interface Props{ 
    name:string,
    onClick: () => void,
    className: string
  
}

export default function StopWatchButton({name, onClick, className}:Props) {
    return(
        // Leveraging Props, we enhance the ability to customize individual buttons 
        // and manage onclick event handlers more effectively.
        <button onClick={onClick} className={className}> {name} </button>
    )
}