import React from 'react'

type StopWatchButtonProps = {
    type: string;
  };
  
  export default function StopWatchButton({ type }: StopWatchButtonProps) {
    return(
        <button>{type}</button>
    )
}