import React from 'react'

interface Props{
    label: string;
    onPress?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function StopWatchButton(props: Props) {

    return(
        <div>
            <button  onClick={props.onPress}>
                {props.label}
            </button>
        </div>
    )
}