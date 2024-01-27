import React from 'react'
import '../styles/StopWatchButton.css'
export type StopWatchButtonProps = {
  label: string
}

export default function StopWatchButton(props: StopWatchButtonProps) {
    return(
      <>
        <button className='StopWatchButton'>{props.label}</button>
      </>
    );
}