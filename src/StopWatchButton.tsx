import React, {useState} from 'react'

type Props = {
    text: string;
} 

export default function StopWatchButton(props: Props) {
    let onClick = function() {
    };

    return(
        <button onClick={onClick}>{props.text}</button>
    );
}