import React from 'react'

export type StopWatchButtonProps = {
  label: string
}

export default function StopWatchButton(props: StopWatchButtonProps) {
    return(
      <>
      {props.label}
      </>
    );
}